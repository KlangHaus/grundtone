import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  CHANGESETS_ACTION_CONTRACTS,
  releaseCommandViolations,
} from './release-workflow.mjs';

const V1 = 'a45c4d594aa4e2c509dc14a9f2b3b67ba3780d0d';
const V2 = 'ae32849d5ba541f9ae29e40e22a623bc13562f51';

const countOf = (text, s) => text.split(s).length - 1;
const replaceAll = (text, from, to) => {
  expect(text.includes(from)).toBe(true);
  return text.replaceAll(from, to);
};

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

  it('a pin without a recorded contract, or not pinned to a SHA', () => {
    expect(
      check({
        workflow: mutateWorkflow(
          `changesets/action@${V1}`,
          'changesets/action@0000000000000000000000000000000000000000',
        ),
      }),
    ).toMatch(/no recorded contract for changesets\/action@0{40}/);
    expect(
      check({
        workflow: mutateWorkflow(
          `changesets/action@${V1}`,
          'changesets/action@v1',
        ),
      }),
    ).toMatch(/must be pinned to a full commit SHA, found "v1"/);
  });

  it('an input the pinned v1 does not declare', () => {
    expect(
      check({
        workflow: mutateWorkflow(
          'publish: pnpm release\n',
          'publish: pnpm release\n          publish-script: pnpm release\n',
        ),
      }),
    ).toMatch(
      /input "publish-script" is not an input of changesets\/action v1\.9\.0/,
    );
  });

  it('a v1 output name read in its v2 kebab-case form', () => {
    expect(
      countOf(workflow, 'steps.changesets.outputs.publishedPackages'),
    ).toBe(2);
    expect(
      check({
        workflow: mutateWorkflow(
          'steps.changesets.outputs.publishedPackages',
          'steps.changesets.outputs.published-packages',
        ),
      }),
    ).toMatch(
      /output "published-packages" is not an output of changesets\/action v1\.9\.0 \(read 1x/,
    );
  });
});

// v2 renamed inputs and outputs. The runner only warns about an undeclared
// input, so a bump that changes the SHA alone keeps every v1 name.
describe('releaseCommandViolations reads the changesets/action v2 contract', () => {
  const v2Pin = () =>
    replaceAll(workflow, `changesets/action@${V1}`, `changesets/action@${V2}`);
  const v2Names = text =>
    replaceAll(
      text
        .replace(
          '          version: pnpm version-packages\n',
          '          version-script: pnpm version-packages\n',
        )
        .replace(
          '          publish: pnpm release\n',
          '          publish-script: pnpm release\n',
        )
        .replace(
          "          commit: 'chore(release)",
          "          commit-message: 'chore(release)",
        )
        .replace(
          "          title: 'chore(release)",
          "          pr-title: 'chore(release)",
        ),
      'steps.changesets.outputs.publishedPackages',
      'steps.changesets.outputs.published-packages',
    );

  it('the v2 pin with the v1 names is red, naming each rename', () => {
    const out = check({ workflow: v2Pin() });
    for (const [from, to] of [
      ['publish', 'publish-script'],
      ['version', 'version-script'],
      ['commit', 'commit-message'],
      ['title', 'pr-title'],
    ]) {
      expect(out).toContain(
        `input "${from}" is not read by changesets/action v2.1.2: it was renamed to "${to}"`,
      );
    }
    expect(out).toMatch(
      /must have exactly `publish-script: pnpm release`, found \[\]/,
    );
    expect(out).toMatch(
      /output "publishedPackages" is not read by changesets\/action v2\.1\.2: it was renamed to "published-packages" \(read 2x/,
    );
  });

  it('the v2 pin with the v2 names holds', () => {
    expect(
      releaseCommandViolations({ workflow: v2Names(v2Pin()), scripts }, SPEC),
    ).toEqual([]);
  });

  it('the v2 pin with one camelCase output left is red', () => {
    const one = v2Names(v2Pin()).replace(
      'steps.changesets.outputs.published-packages',
      'steps.changesets.outputs.publishedPackages',
    );
    expect(check({ workflow: one })).toMatch(
      /output "publishedPackages" is not read by changesets\/action v2\.1\.2: it was renamed to "published-packages" \(read 1x/,
    );
  });

  it('the v2 pin with a publish-script that bypasses the release command is red', () => {
    const bypass = v2Names(v2Pin()).replace(
      'publish-script: pnpm release\n',
      'publish-script: pnpm build:packages && changeset publish\n',
    );
    expect(check({ workflow: bypass })).toMatch(
      /must have exactly `publish-script: pnpm release`/,
    );
  });
});

describe('releaseCommandViolations on the job itself', () => {
  it('release.yml pins the v1 SHA from the contract table', () => {
    expect(workflow).toContain(`uses: changesets/action@${V1} `);
    expect(Object.keys(CHANGESETS_ACTION_CONTRACTS)).toEqual([V1, V2]);
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
