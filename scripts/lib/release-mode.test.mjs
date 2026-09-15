import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { releaseMode } from './release-mode.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const CLI = join(root, 'scripts/release-mode.mjs');

const changeset = id => ({
  id,
  summary: 'summary',
  releases: [{ name: '@grundtone/vue', type: 'patch' }],
});

describe('releaseMode', () => {
  it('skips the gates when changesets are pending, naming them', () => {
    expect(
      releaseMode({
        changesets: [changeset('tiptap'), changeset('react-native-3x')],
        preState: undefined,
      }),
    ).toMatchObject({ gates: 'skip', pending: ['react-native-3x', 'tiptap'] });
  });

  it('runs the gates when nothing is pending (positive control)', () => {
    expect(releaseMode({ changesets: [], preState: undefined })).toMatchObject({
      gates: 'run',
      pending: [],
    });
  });

  // changesets/action drops the ids recorded in pre mode and then PUBLISHES
  // when nothing is left. Counting them as pending would skip the gates on a
  // run that publishes.
  it('runs the gates in pre mode when every changeset is already recorded', () => {
    expect(
      releaseMode({
        changesets: [changeset('a')],
        preState: { mode: 'pre', changesets: ['a'] },
      }),
    ).toMatchObject({ gates: 'run' });
  });

  it('skips in pre mode only for changesets not yet recorded', () => {
    expect(
      releaseMode({
        changesets: [changeset('a'), changeset('b')],
        preState: { mode: 'pre', changesets: ['a'] },
      }),
    ).toMatchObject({ gates: 'skip', pending: ['b'] });
  });

  it('ignores an exited pre state, as the action does', () => {
    expect(
      releaseMode({
        changesets: [changeset('a')],
        preState: { mode: 'exit', changesets: ['a'] },
      }),
    ).toMatchObject({ gates: 'skip', pending: ['a'] });
  });

  it('throws on input it cannot count instead of guessing', () => {
    expect(() => releaseMode({ changesets: undefined })).toThrow(TypeError);
    expect(() =>
      releaseMode({ changesets: [], preState: { mode: 'pre' } }),
    ).toThrow(/pre\.json/);
  });
});

/** A throwaway repository root with an optional .changeset directory. */
function fixture({ changesets = [], preJson, withChangesetDir = true } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'release-mode-'));
  if (withChangesetDir) {
    mkdirSync(join(dir, '.changeset'));
    writeFileSync(join(dir, '.changeset/README.md'), '# Changesets\n');
    for (const id of changesets) {
      writeFileSync(
        join(dir, '.changeset', `${id}.md`),
        "---\n'@grundtone/vue': patch\n---\n\nSummary.\n",
      );
    }
    if (preJson !== undefined) {
      writeFileSync(join(dir, '.changeset/pre.json'), preJson);
    }
  }
  return dir;
}

function runCli(dir, { withOutput = true } = {}) {
  const outputFile = join(dir, 'github-output');
  const env = { ...process.env };
  delete env.GITHUB_OUTPUT;
  if (withOutput) env.GITHUB_OUTPUT = outputFile;
  const r = spawnSync(process.execPath, [CLI], {
    cwd: dir,
    env,
    encoding: 'utf8',
  });
  return {
    status: r.status,
    log: `${r.stdout}${r.stderr}`,
    output: existsSync(outputFile) ? readFileSync(outputFile, 'utf8') : null,
  };
}

// The accept cells of fklbe0cwm8fth7c9jj1tx3ca, provoked against the real
// @changesets/read and @changesets/pre on a real directory.
describe('scripts/release-mode.mjs', () => {
  it('pending changesets: gates=skip with an explicit log line', () => {
    const r = runCli(fixture({ changesets: ['tiptap-security-bump'] }));
    expect(r.status).toBe(0);
    expect(r.output).toBe('gates=skip\n');
    expect(r.log).toMatch(
      /::notice title=Publish gates skipped::1 pending changeset\(s\).*tiptap-security-bump/,
    );
  });

  it('no pending changesets: gates=run', () => {
    const r = runCli(fixture());
    expect(r.status).toBe(0);
    expect(r.output).toBe('gates=run\n');
  });

  it('detection fails (no .changeset directory): exit 1, nothing written', () => {
    const r = runCli(fixture({ withChangesetDir: false }));
    expect(r.status).toBe(1);
    expect(r.output).toBeNull();
    expect(r.log).toMatch(
      /::error title=Release mode undetermined::.*Failing closed/,
    );
  });

  it('detection fails (unreadable pre.json): exit 1, nothing written', () => {
    const r = runCli(fixture({ changesets: ['a'], preJson: '{ not json' }));
    expect(r.status).toBe(1);
    expect(r.output).toBeNull();
  });

  it('GITHUB_OUTPUT missing: exit 1 instead of a silent default', () => {
    const r = runCli(fixture({ changesets: ['a'] }), { withOutput: false });
    expect(r.status).toBe(1);
    expect(r.log).toMatch(/GITHUB_OUTPUT is not set/);
  });
});
