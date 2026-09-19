import { describe, expect, it, vi } from 'vitest';
import {
  applyDeployMode,
  checkUploaded,
  OPT_IN,
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

  it('skips only on a positively declared opt-in', () => {
    const skipped = resolveDeployMode({
      required: secrets('', ''),
      optional: '1',
      label,
    });
    expect(skipped.mode).toBe('skip');
    expect(skipped.reason).toContain(OPT_IN);

    // An opt-in that is not exactly '1' is not an opt-in: "true"/"0"/"" are
    // the kinds of values that land in an env var by accident.
    for (const value of ['0', 'true', 'yes', '', ' ']) {
      expect(
        resolveDeployMode({ required: secrets('', ''), optional: value, label })
          .mode,
        `optional=${JSON.stringify(value)}`,
      ).toBe('fail');
    }
  });

  it('the opt-in cannot hide a deploy that would otherwise run', () => {
    const r = resolveDeployMode({
      required: secrets('zone', 'key'),
      optional: '1',
      label,
    });
    expect(r.mode).toBe('deploy');
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

  it('skip warns and exits 0; fail errors and exits 1', () => {
    const skip = io();
    applyDeployMode({ mode: 'skip', reason: 'declared' }, skip);
    expect(skip.warn).toHaveBeenCalledWith('declared');
    expect(skip.exit).toHaveBeenCalledWith(0);

    const fail = io();
    applyDeployMode({ mode: 'fail', reason: 'empty secret' }, fail);
    expect(fail.error).toHaveBeenCalledWith('empty secret');
    expect(fail.exit).toHaveBeenCalledWith(1);
  });

  // 🔴 [sikkerhed] on #208: the gate must open on a positively declared
  // `deploy`, not on "neither known failure matched". A mode nobody wrote
  // handling for must stop the deploy, not sail through it.
  it.each([['dry-run'], [''], [undefined], ['DEPLOY']])(
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
