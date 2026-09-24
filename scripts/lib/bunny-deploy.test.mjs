import { describe, expect, it, vi } from 'vitest';
import {
  applyDeployMode,
  checkUploaded,
  classifyBunnyAuthFailure,
  probeBunnyRead,
  resolveDeployMode,
} from './bunny-deploy.mjs';

const label = 'publish-bunny';
const secrets = (zone, apiKey) => [
  { name: 'BUNNY_DOCS_STORAGE_ZONE', value: zone },
  { name: 'BUNNY_DOCS_STORAGE_API_KEY', value: apiKey },
];

describe('resolveDeployMode', () => {
  it('deploys when both secrets are set', () => {
    const r = resolveDeployMode({ required: secrets('zone', 'key'), label });
    expect(r.mode).toBe('deploy');
    expect(r.missing).toEqual([]);
  });

  // 🔴 THE CELL FOR WHAT HAPPENED: release run 35459568087 had both empty and
  // went green. Now it is a failure, and the message names which ones.
  it.each([
    ['both empty', '', ''],
    ['both unset', undefined, undefined],
    ['only zone set', 'zone', undefined],
    ['only key set', undefined, 'key'],
    ['whitespace', ' ', '\t'],
  ])('fails on %s', (_, zone, apiKey) => {
    const r = resolveDeployMode({ required: secrets(zone, apiKey), label });
    expect(r.mode).toBe('fail');
    expect(r.missing.length).toBeGreaterThan(0);
    for (const name of r.missing) expect(r.reason).toContain(name);
  });

  it('names only NAMES, never values', () => {
    const r = resolveDeployMode({ required: secrets('zone-name', ''), label });
    expect(r.reason).toContain('BUNNY_DOCS_STORAGE_API_KEY');
    expect(r.reason).not.toContain('zone-name');
  });

  // 🔴 THERE IS NO SKIP MODE, and that is deliberate ([sikkerhed], 19/9):
  // the old `BUNNY_DEPLOY_OPTIONAL` escape hatch was read here and mapped in
  // no workflow, so it could never open. A missing secret has exactly one
  // outcome now.
  it('has no third outcome: a missing secret always fails', () => {
    for (const optional of ['1', '0', 'true', '', undefined]) {
      const r = resolveDeployMode({
        required: secrets('', ''),
        optional,
        label,
      });
      expect(r.mode, `optional=${JSON.stringify(optional)}`).toBe('fail');
    }
  });
});

describe('applyDeployMode', () => {
  const io = () => ({
    warn: vi.fn(),
    error: vi.fn(),
    exit: vi.fn(),
  });

  it('returns without exiting on a declared deploy', () => {
    const o = io();
    applyDeployMode({ mode: 'deploy', reason: 'ok' }, o);
    expect(o.exit).not.toHaveBeenCalled();
    expect(o.error).not.toHaveBeenCalled();
  });

  it('fail errors and exits 1', () => {
    const fail = io();
    applyDeployMode({ mode: 'fail', reason: 'empty secret' }, fail);
    expect(fail.error).toHaveBeenCalledWith('empty secret');
    expect(fail.exit).toHaveBeenCalledWith(1);
  });

  // 🔴 [sikkerhed] on #208: the gate must open on a positively declared
  // `deploy`, not on "neither known failure matched". A mode nobody wrote
  // handling for must stop the deploy, not sail through it.
  it.each([['skip'], ['dry-run'], [''], [undefined], ['DEPLOY']])(
    'refuses to deploy on the undeclared mode %j',
    mode => {
      const o = io();
      applyDeployMode({ mode, reason: 'whatever' }, o);
      expect(o.exit).toHaveBeenCalledWith(1);
      expect(o.error).toHaveBeenCalledTimes(1);
      expect(o.error.mock.calls[0][0]).toContain('unknown deploy mode');
    },
  );
});

describe('checkUploaded', () => {
  it('0 files is not a deploy', () => {
    const r = checkUploaded(0, label);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('0 files');
  });

  it('at least one file counts as published, and the count is in the message', () => {
    const r = checkUploaded(42, label);
    expect(r.ok).toBe(true);
    expect(r.reason).toContain('42');
  });
});

describe('classifyBunnyAuthFailure', () => {
  const base = {
    zone: 'kh-email',
    host: 'storage.bunnycdn.com',
    label: 'publish-cdn',
  };

  it('says the key is read-only when a read works and the write does not', () => {
    // The only branch that can name ONE cause, because the read proves the key,
    // the zone and the region are all right.
    const r = classifyBunnyAuthFailure({
      ...base,
      uploadStatus: 401,
      readStatus: 404,
    });
    expect(r.cause).toBe('read-only-key');
    expect(r.reason).toContain('READ-ONLY');
    expect(r.reason).toContain('read/write password');
  });

  it.each([[200], [404]])(
    'treats a read of %i as proof the key can read (404 = empty zone)',
    readStatus => {
      expect(
        classifyBunnyAuthFailure({ ...base, uploadStatus: 401, readStatus })
          .cause,
      ).toBe('read-only-key');
    },
  );

  it('🔴 refuses to name one cause when the read is ALSO 401, and says why', () => {
    // The discriminating case. Key, zone and region all answer 401, so a
    // message that picked one would send the reader after the wrong thing.
    const r = classifyBunnyAuthFailure({
      ...base,
      uploadStatus: 401,
      readStatus: 401,
    });
    expect(r.cause).toBe('credentials');
    expect(r.reason).toContain('AccessKey');
    expect(r.reason).toContain('zone name');
    expect(r.reason).toContain('region');
    expect(r.reason).toContain('cannot be told apart');
  });

  it('names the zone and the endpoint, because those are what the operator compares', () => {
    const r = classifyBunnyAuthFailure({
      ...base,
      host: 'ny.storage.bunnycdn.com',
      uploadStatus: 401,
      readStatus: 401,
    });
    expect(r.reason).toContain('kh-email');
    expect(r.reason).toContain('ny.storage.bunnycdn.com');
  });

  it('says so when no probe was made rather than implying a cause', () => {
    const r = classifyBunnyAuthFailure({
      ...base,
      uploadStatus: 401,
      readStatus: null,
    });
    expect(r.cause).toBe('unknown');
    expect(r.reason).toContain('no read probe');
  });

  it('does not claim an auth problem for a non-401 write failure', () => {
    const r = classifyBunnyAuthFailure({
      ...base,
      uploadStatus: 507,
      readStatus: null,
    });
    expect(r.cause).toBe('not-401');
    expect(r.reason).toContain('507');
  });

  it('never puts a key in a message — no branch receives one', () => {
    // The nevner: every branch of the function, driven, and none of them can
    // print a secret because none of them is given one. What this does NOT
    // cover: a caller that concatenates the key into its own log line.
    for (const readStatus of [null, 200, 404, 401]) {
      for (const uploadStatus of [401, 500]) {
        const r = classifyBunnyAuthFailure({
          ...base,
          uploadStatus,
          readStatus,
        });
        expect(r.reason).not.toMatch(/AccessKey:/);
        expect(r.reason).toEqual(expect.any(String));
      }
    }
  });
});

describe('probeBunnyRead', () => {
  const ok = status => async () => ({ status });

  it('returns the status the zone answered', async () => {
    expect(
      await probeBunnyRead('storage.bunnycdn.com', 'z', 'k', ok(404)),
    ).toBe(404);
    expect(
      await probeBunnyRead('storage.bunnycdn.com', 'z', 'k', ok(401)),
    ).toBe(401);
  });

  it('asks the zone root at the endpoint it was given', async () => {
    const seen = [];
    await probeBunnyRead(
      'ny.storage.bunnycdn.com',
      'kh-email',
      'secret',
      async (url, init) => {
        seen.push([url, init]);
        return { status: 200 };
      },
    );
    expect(seen[0][0]).toBe('https://ny.storage.bunnycdn.com/kh-email/');
    expect(seen[0][1].headers.AccessKey).toBe('secret');
  });

  it('🔴 returns null on a transport error rather than a status', async () => {
    // The discriminating case: a DNS or TLS failure is not an authorization
    // answer, and returning 0 or 401 here would make the classifier name a
    // cause the network never reported.
    const thrower = async () => {
      throw new Error('getaddrinfo ENOTFOUND');
    };
    expect(await probeBunnyRead('nope.invalid', 'z', 'k', thrower)).toBeNull();
  });
});
