import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const wfDir = join(root, '.github/workflows');

// assert-osv-ignores-expire.py fails when OSV_EXPECTED differs from the number
// of accepts in osv-scanner.toml. The count is repeated in every workflow that
// runs the script, so adding one accept means updating N files. On 2026-10-22
// only osv-scanner.yml had moved to 9: release.yml and prerelease-next.yml
// still said 8, and both would have stopped a publish at that gate.
// Count with tomllib, exactly as the guard does. A regex disagrees with the
// parser on valid spellings such as `[[ IgnoredVulns ]]`, and then this test
// stays green while the guard goes red: the bug the guard's own docstring
// records for its first version.
const countAccepts = toml =>
  Number(
    execFileSync(
      'python3',
      [
        '-c',
        "import sys, tomllib; print(len(tomllib.loads(sys.stdin.read()).get('IgnoredVulns', [])))",
      ],
      { input: toml, encoding: 'utf8' },
    ).trim(),
  );

const accepts = countAccepts(
  readFileSync(join(root, 'osv-scanner.toml'), 'utf8'),
);

const consumers = readdirSync(wfDir)
  .filter(f => /\.ya?ml$/.test(f))
  .flatMap(f =>
    readFileSync(join(wfDir, f), 'utf8')
      .split('\n')
      .filter(line => !line.trimStart().startsWith('#'))
      .flatMap(line => {
        const m = line.match(/OSV_EXPECTED:\s*['"]?(\d+)['"]?/);
        return m ? [{ file: f, value: Number(m[1]) }] : [];
      }),
  );

describe('OSV_EXPECTED matches osv-scanner.toml', () => {
  it('counts accepts the way the guard does, whatever the spelling', () => {
    const spaced =
      "[[IgnoredVulns]]\nid = 'A'\n\n[[ IgnoredVulns ]]\nid = 'B'\n";
    expect(countAccepts(spaced)).toBe(2);
  });

  it('finds the accepts and the workflows that count them', () => {
    expect(accepts).toBeGreaterThan(0);
    expect(consumers.map(c => c.file).sort()).toEqual([
      'osv-scanner.yml',
      'prerelease-next.yml',
      'release.yml',
    ]);
  });

  it.each(consumers)('$file expects every accept', ({ value }) => {
    expect(value).toBe(accepts);
  });
});
