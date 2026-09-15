import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { releaseGateViolations } from './release-workflow.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const release = readFileSync(
  join(root, '.github/workflows/release.yml'),
  'utf8',
);

const SPEC = {
  job: 'release',
  modeStepId: 'release_mode',
  gateMarkers: [
    'osv-scanner --recursive',
    'assert-osv-ignores-expire.py',
    'scripts/assert-release-invariants.mjs',
    'scripts/assert-no-downgrade-publish.mjs',
  ],
  publishMarker: 'changesets/action',
  publishScript: 'pnpm release',
};

const SKIP_IF = "if: steps.release_mode.outputs.gates != 'skip'";

describe('release.yml keeps the publish gates fail-closed', () => {
  it('holds on the real workflow', () => {
    expect(releaseGateViolations(release, SPEC)).toEqual([]);
  });
});

// Each mutant breaks exactly one property on the real file and must be seen.
describe('releaseGateViolations sees each way the gates could open', () => {
  const mutate = (from, to) => {
    expect(release.split(from).length - 1).toBeGreaterThan(0);
    return release.replace(from, to);
  };

  it('a gate that runs only on an explicit "run" (missing output would skip it)', () => {
    const v = releaseGateViolations(
      mutate(SKIP_IF, "if: steps.release_mode.outputs.gates == 'run'"),
      SPEC,
    );
    expect(v.join('\n')).toMatch(/must carry exactly/);
  });

  it('a gate without its condition removed entirely', () => {
    const v = releaseGateViolations(mutate(`        ${SKIP_IF}\n`, ''), SPEC);
    expect(v.join('\n')).toMatch(/must carry exactly/);
  });

  it('a publish script handed to changesets unconditionally', () => {
    const v = releaseGateViolations(
      mutate(
        "publish: ${{ steps.release_mode.outputs.gates != 'skip' && 'pnpm release' || '' }}",
        'publish: pnpm release',
      ),
      SPEC,
    );
    expect(v.join('\n')).toMatch(/receive its script only when the gates ran/);
  });

  it('continue-on-error anywhere in the job', () => {
    const v = releaseGateViolations(
      mutate(
        '        id: release_mode\n',
        '        id: release_mode\n        continue-on-error: true\n',
      ),
      SPEC,
    );
    expect(v.join('\n')).toMatch(/must not continue on error/);
  });

  it('a gate marker that no longer exists (renamed script)', () => {
    const v = releaseGateViolations(
      mutate(
        'scripts/assert-no-downgrade-publish.mjs',
        'scripts/assert-no-downgrade.mjs',
      ),
      SPEC,
    );
    expect(v.join('\n')).toMatch(/exactly one step of release, found 0/);
  });

  it('a conditional release-mode step', () => {
    const v = releaseGateViolations(
      mutate(
        '        id: release_mode\n',
        "        id: release_mode\n        if: github.ref == 'refs/heads/develop'\n",
      ),
      SPEC,
    );
    expect(v.join('\n')).toMatch(/must not be conditional/);
  });

  it('a missing job', () => {
    expect(releaseGateViolations(release, { ...SPEC, job: 'publish' })).toEqual(
      ['job "publish" not found'],
    );
  });
});
