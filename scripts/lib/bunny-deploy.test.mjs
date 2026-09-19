import { describe, expect, it, vi } from 'vitest';
import {
  applyDeployMode,
  checkUploaded,
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
