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

const GUARD = fileURLToPath(
  new URL('./assert-license-shipped.mjs', import.meta.url),
);
const SYNC = fileURLToPath(new URL('./sync-license.mjs', import.meta.url));

/**
 * 🔴 THE CELLS RUN THE SCRIPTS, not a copy of their rules — same form as
 * check-dts-paths.test.mjs. A cell that reimplements the decision it checks
 * stays green on a script that was deleted.
 *
 * What is under test is one sentence: a package that DECLARES a licence must
 * SHIP its text, byte for byte, in the directory npm packs from. The defect it
 * was written against (2026-09-24) was nine packages declaring MIT with no
 * LICENSE file anywhere in the repository.
 */

const LICENCE = 'MIT License\n\nCopyright (c) 2026 Example\n';
const temps = [];

function workspace({ packages, licence = LICENCE }) {
  const root = mkdtempSync(join(tmpdir(), 'licence-guard-'));
  temps.push(root);
  if (licence !== null) writeFileSync(join(root, 'LICENSE'), licence);
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
    if (pkg.licenceText !== undefined && pkg.licenceText !== null) {
      writeFileSync(join(dir, 'LICENSE'), pkg.licenceText);
    }
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

describe('assert-license-shipped', () => {
  it('passes when every published package ships the same text, and says how many it walked', () => {
    const root = workspace({
      packages: [
        { dir: 'a', name: '@x/a', license: 'MIT', licenceText: LICENCE },
        { dir: 'b', name: '@x/b', license: 'MIT', licenceText: LICENCE },
      ],
    });
    const { code, stdout } = run(GUARD, root);
    expect(code).toBe(0);
    // The denominator is part of the output, so a green cannot be confused with
    // a run that walked nothing.
    expect(stdout).toContain('2 published package(s)');
  });

  it('fails, naming the package, when a declared licence has no text in the tarball directory', () => {
    const root = workspace({
      packages: [
        { dir: 'a', name: '@x/a', license: 'MIT', licenceText: LICENCE },
        { dir: 'b', name: '@x/b', license: 'MIT' },
      ],
    });
    const { code, stderr } = run(GUARD, root);
    expect(code).toBe(1);
    expect(stderr).toContain('@x/b');
    expect(stderr).toContain('no LICENSE file');
  });

  it('fails on DRIFT: a copy edited in one place is two grants under one name', () => {
    const root = workspace({
      packages: [
        { dir: 'a', name: '@x/a', license: 'MIT', licenceText: LICENCE },
        {
          dir: 'b',
          name: '@x/b',
          license: 'MIT',
          licenceText: `${LICENCE}and one more line\n`,
        },
      ],
    });
    const { code, stderr } = run(GUARD, root);
    expect(code).toBe(1);
    expect(stderr).toContain('@x/b');
    expect(stderr).toContain('differs from the root LICENSE');
  });

  it('ignores private packages, because nothing is shipped from them', () => {
    const root = workspace({
      packages: [
        { dir: 'a', name: '@x/a', license: 'MIT', licenceText: LICENCE },
        { dir: 'internal', name: '@x/internal', private: true },
      ],
    });
    const { code, stdout } = run(GUARD, root);
    expect(code).toBe(0);
    expect(stdout).toContain('1 published package(s)');
  });

  it('fails LOUDLY on an empty workspace, or LICENSE_GUARD_ROOT=/tmp would be a green', () => {
    const root = workspace({ packages: [] });
    const { code, stderr } = run(GUARD, root);
    expect(code).toBe(2);
    expect(stderr).toContain('no published packages found');
  });

  it('flags a package that ships text but declares no licence field', () => {
    const root = workspace({
      packages: [
        { dir: 'a', name: '@x/a', license: undefined, licenceText: LICENCE },
      ],
    });
    const { code, stderr } = run(GUARD, root);
    expect(code).toBe(1);
    expect(stderr).toContain('no `license` field');
  });
});

describe('sync-license', () => {
  it('writes the root text into every published package, and the guard then passes', () => {
    const root = workspace({
      packages: [
        { dir: 'a', name: '@x/a', license: 'MIT' },
        { dir: 'b', name: '@x/b', license: 'MIT' },
        { dir: 'internal', name: '@x/internal', private: true },
      ],
    });
    expect(run(GUARD, root).code).toBe(1);

    const sync = run(SYNC, root);
    expect(sync.code).toBe(0);
    expect(sync.stdout).toContain('2 published package(s) updated');

    expect(run(GUARD, root).code).toBe(0);
    expect(readFileSync(join(root, 'packages', 'a', 'LICENSE'), 'utf8')).toBe(
      LICENCE,
    );
    // A private package is not given one: it ships nothing.
    expect(() =>
      readFileSync(join(root, 'packages', 'internal', 'LICENSE'), 'utf8'),
    ).toThrow();
  });
});
