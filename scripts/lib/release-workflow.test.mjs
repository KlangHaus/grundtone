import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { releaseCommandViolations } from './release-workflow.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const workflow = readFileSync(
  join(root, '.github/workflows/release.yml'),
  'utf8',
);
const { scripts } = JSON.parse(
  readFileSync(join(root, 'package.json'), 'utf8'),
);

const SPEC = {
  job: 'release',
  releaseScript: 'release',
  gatesScript: 'release:gates',
  gateMarkers: [
    'osv-scanner --recursive',
    'assert-osv-ignores-expire.py',
    'scripts/assert-release-invariants.mjs',
    'scripts/assert-no-downgrade-publish.mjs',
  ],
  installMarker: 'osv-scanner_linux_amd64',
};

const check = (files = {}) =>
  releaseCommandViolations({ workflow, scripts, ...files }, SPEC).join('\n');

describe('release.yml publishes only through the gated release command', () => {
  it('holds on the real release.yml and package.json', () => {
    expect(releaseCommandViolations({ workflow, scripts }, SPEC)).toEqual([]);
  });
});

// Each mutant breaks exactly one property of the real files and must be seen.
describe('releaseCommandViolations sees each way a publish could go around the gates', () => {
  const mutateWorkflow = (from, to) => {
    expect(workflow.includes(from)).toBe(true);
    return workflow.replace(from, to);
  };

  it('a publish input that calls changeset publish directly', () => {
    expect(
      check({
        workflow: mutateWorkflow(
          'publish: pnpm release\n',
          'publish: pnpm build:packages && changeset publish\n',
        ),
      }),
    ).toMatch(/must have exactly `publish: pnpm release`/);
  });

  it('a release script that publishes before its gates', () => {
    expect(
      check({
        scripts: {
          ...scripts,
          release:
            'pnpm build:packages && changeset publish && pnpm release:gates',
        },
      }),
    ).toMatch(/publishes before its gates/);
  });

  it('a release script without the gates', () => {
    expect(
      check({
        scripts: {
          ...scripts,
          release: 'pnpm build:packages && changeset publish',
        },
      }),
    ).toMatch(/does not run "pnpm release:gates"/);
  });

  it('a gate chained with ; or || so a failure does not stop the chain', () => {
    const semicolon = scripts['release:gates'].replace(
      ' && node scripts/assert-no',
      '; node scripts/assert-no',
    );
    const orElse = scripts['release:gates'].replace(
      ' && node scripts/assert-no',
      ' || node scripts/assert-no',
    );
    expect(
      check({ scripts: { ...scripts, 'release:gates': semicolon } }),
    ).toMatch(/must be a plain && chain/);
    expect(check({ scripts: { ...scripts, 'release:gates': orElse } })).toMatch(
      /must be a plain && chain/,
    );
  });

  it('a gate removed from the gates script', () => {
    expect(
      check({
        scripts: {
          ...scripts,
          'release:gates': scripts['release:gates'].replace(
            ' && node scripts/assert-no-downgrade-publish.mjs',
            '',
          ),
        },
      }),
    ).toMatch(
      /assert-no-downgrade-publish\.mjs" must occur exactly once .* found 0/,
    );
  });

  it('continue-on-error anywhere in the job', () => {
    expect(
      check({
        workflow: mutateWorkflow(
          '        id: changesets\n',
          '        id: changesets\n        continue-on-error: true\n',
        ),
      }),
    ).toMatch(/must not continue on error/);
  });

  it('a conditional scanner install', () => {
    expect(
      check({
        workflow: mutateWorkflow(
          '      - name: Install osv-scanner (checksum verified)\n',
          "      - name: Install osv-scanner (checksum verified)\n        if: github.event_name == 'workflow_dispatch'\n",
        ),
      }),
    ).toMatch(/install step must not be conditional/);
  });

  it('a missing job', () => {
    expect(
      releaseCommandViolations(
        { workflow, scripts },
        { ...SPEC, job: 'publish' },
      ),
    ).toEqual(['job "publish" not found']);
  });
});
