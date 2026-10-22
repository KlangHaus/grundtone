import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const wfDir = join(root, '.github/workflows');

// assert-osv-ignores-expire.py fails when OSV_EXPECTED differs from the number
// of accepts in osv-scanner.toml. The count is repeated in every workflow that
// runs the script, so adding one accept means updating N files. On 2026-10-22
// only osv-scanner.yml had moved to 9: release.yml and prerelease-next.yml
// still said 8, and both would have stopped a publish at that gate.
const accepts = (
  readFileSync(join(root, 'osv-scanner.toml'), 'utf8').match(
    /^\[\[IgnoredVulns\]\]/gm,
  ) ?? []
).length;

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
