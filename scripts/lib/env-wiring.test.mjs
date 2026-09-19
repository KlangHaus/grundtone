// @vitest-environment node
//
// node, not the root config's jsdom: this reads workflow and script files from
// disk through `import.meta.url`, which under jsdom is an http URL.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { envNamesMapped, envNamesRead, unmappedNames } from './env-wiring.mjs';

const root = fileURLToPath(new URL('../..', import.meta.url));
const read = p => readFileSync(root + p, 'utf8');

describe('envNamesRead', () => {
  it('finds both spellings a script uses', () => {
    expect(
      envNamesRead("process.env.FOO; process.env['BAR']; process.env.FOO"),
    ).toEqual(['BAR', 'FOO']);
  });

  it('ignores lowercase property access that is not an env name', () => {
    expect(envNamesRead('process.envy.thing; obj.process.env.x')).toEqual([]);
  });
});

describe('envNamesMapped', () => {
  const workflow = `
jobs:
  docs:
    steps:
      - name: First
        run: pnpm one
        env:
          ALPHA: \${{ secrets.ALPHA }}
          BETA: ci
      - name: Second
        run: pnpm two
        env:
          GAMMA: \${{ vars.GAMMA }}
`;

  it('returns the keys of the step that runs the command', () => {
    expect(envNamesMapped(workflow, 'pnpm one')).toEqual(['ALPHA', 'BETA']);
    expect(envNamesMapped(workflow, 'pnpm two')).toEqual(['GAMMA']);
  });

  // 🔴 The discriminating case: a name mapped on ANOTHER step must not count,
  // or the cell passes while the script reads undefined.
  it('does not borrow a key from a neighbouring step', () => {
    expect(envNamesMapped(workflow, 'pnpm one')).not.toContain('GAMMA');
  });

  // 🔴 The flaw the first version had: `env:` above `run:` was invisible,
  // because it only ever looked forward from the command.
  it('sees an env block written above the run line', () => {
    const envFirst = `
jobs:
  release:
    steps:
      - name: Assert
        env:
          PUBLISHED: \${{ steps.changesets.outputs.published }}
        run: node scripts/assert-release-published.mjs
`;
    expect(envNamesMapped(envFirst, 'assert-release-published.mjs')).toEqual([
      'PUBLISHED',
    ]);
  });

  it('returns nothing when the command is not in the file', () => {
    expect(envNamesMapped(workflow, 'pnpm absent')).toEqual([]);
  });
});

// 🔴 THE REGRESSION THIS EXISTS FOR: #208 read BUNNY_DEPLOY_OPTIONAL in both
// publish scripts and release.yml mapped it nowhere, so the escape hatch could
// never open. These assert the real files, not a fixture.
describe('the Bunny publish steps map every env var their scripts read', () => {
  const releaseYml = read('.github/workflows/release.yml');
  const RUNNER_SUPPLIED = ['CI', 'HOME', 'GITHUB_ACTIONS', 'NODE_ENV'];

  it.each([
    [
      'pnpm --filter @grundtone/docs publish:bunny',
      '/apps/docs/scripts/publish-bunny.ts',
    ],
    [
      'pnpm --filter @grundtone/email publish:cdn',
      '/packages/email/scripts/publish-cdn.ts',
    ],
  ])('%s', (command, scriptPath) => {
    const mapped = envNamesMapped(releaseYml, command);
    expect(mapped.length, `no env block found for: ${command}`).toBeGreaterThan(
      0,
    );

    const missing = unmappedNames(
      envNamesRead(read(scriptPath)),
      mapped,
      RUNNER_SUPPLIED,
    );
    expect(missing, `${scriptPath} reads names the step does not map`).toEqual(
      [],
    );
  });
});
