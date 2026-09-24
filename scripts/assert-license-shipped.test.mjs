// @vitest-environment node
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterEach, describe, expect, it } from 'vitest';

/**
 * End-to-end cells: they run the REAL scripts as processes and read exit code
 * and printed line. The decision itself is tested in-process in
 * scripts/lib/license-shipped.test.mjs; these cover the part a library test
 * cannot see — that the exit codes and the output are what CI reacts to.
 */

const GUARD = fileURLToPath(
  new URL('./assert-license-shipped.mjs', import.meta.url),
);
const SYNC = fileURLToPath(new URL('./sync-license.mjs', import.meta.url));
const LICENCE = 'MIT License\n\nCopyright (c) 2026 Example\n';
const temps = [];

function workspace(packages) {
  const root = mkdtempSync(join(tmpdir(), 'licence-guard-'));
  temps.push(root);
  writeFileSync(join(root, 'LICENSE'), LICENCE);
  mkdirSync(join(root, 'packages'));
  for (const pkg of packages) {
    const dir = join(root, 'packages', pkg.dir);
    mkdirSync(dir);
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({
        name: pkg.name,
        license: pkg.license,
        private: pkg.private,
      }),
    );
    if (pkg.text !== undefined) writeFileSync(join(dir, 'LICENSE'), pkg.text);
  }
  return root;
}

function run(script, root) {
  try {
    const stdout = execFileSync(process.execPath, [script], {
      env: { ...process.env, LICENSE_GUARD_ROOT: root },
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { code: 0, stdout, stderr: '' };
  } catch (error) {
    return {
      code: error.status,
      stdout: error.stdout?.toString() ?? '',
      stderr: error.stderr?.toString() ?? '',
    };
  }
}

afterEach(() => {
  while (temps.length > 0)
    rmSync(temps.pop(), { recursive: true, force: true });
});

describe('assert-license-shipped (exit codes and output)', () => {
  it('exits 0 and prints the denominator when everything ships its text', () => {
    const root = workspace([
      { dir: 'a', name: '@x/a', license: 'MIT', text: LICENCE },
    ]);
    const { code, stdout } = run(GUARD, root);
    expect(code).toBe(0);
    expect(stdout).toContain('1 published package(s)');
  });

  it('exits 1 and names the package when the text is missing', () => {
    const root = workspace([{ dir: 'a', name: '@x/a', license: 'MIT' }]);
    const { code, stderr } = run(GUARD, root);
    expect(code).toBe(1);
    expect(stderr).toContain('@x/a');
  });

  it('exits 2 on an empty workspace, or LICENSE_GUARD_ROOT=/tmp would be a green', () => {
    const root = workspace([]);
    const { code, stderr } = run(GUARD, root);
    expect(code).toBe(2);
    expect(stderr).toContain('no published packages found');
  });
});

describe('sync-license', () => {
  it('writes the copies, leaves private packages alone, and the guard then passes', () => {
    const root = workspace([
      { dir: 'a', name: '@x/a', license: 'MIT' },
      { dir: 'internal', name: '@x/internal', private: true },
    ]);
    expect(run(GUARD, root).code).toBe(1);
    expect(run(SYNC, root).code).toBe(0);
    expect(run(GUARD, root).code).toBe(0);
    expect(readFileSync(join(root, 'packages', 'a', 'LICENSE'), 'utf8')).toBe(
      LICENCE,
    );
    expect(() =>
      readFileSync(join(root, 'packages', 'internal', 'LICENSE'), 'utf8'),
    ).toThrow();
  });
});
