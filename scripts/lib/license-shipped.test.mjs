import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { licenceProblems, publishedPackages } from './license-shipped.mjs';

/**
 * In-process cells for the DECISION, per this repo's cut: scripts/lib is where
 * the choice is made and is never excluded from coverage. The thin script that
 * prints and exits has its own end-to-end cells in
 * scripts/assert-license-shipped.test.mjs.
 */

const LICENCE = 'MIT License\n\nCopyright (c) 2026 Example\n';
const temps = [];

function workspace(packages, licence = LICENCE) {
  const root = mkdtempSync(join(tmpdir(), 'licence-lib-'));
  temps.push(root);
  writeFileSync(join(root, 'LICENSE'), licence);
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

afterEach(() => {
  while (temps.length > 0)
    rmSync(temps.pop(), { recursive: true, force: true });
});

describe('publishedPackages', () => {
  it('lists the packages that reach consumers and skips private ones', () => {
    const root = workspace([
      { dir: 'a', name: '@x/a', license: 'MIT', text: LICENCE },
      { dir: 'internal', name: '@x/internal', private: true },
    ]);
    expect(publishedPackages(root).map(p => p.name)).toEqual(['@x/a']);
  });

  it('skips a directory whose package.json cannot be read, rather than throwing', () => {
    const root = workspace([
      { dir: 'a', name: '@x/a', license: 'MIT', text: LICENCE },
    ]);
    mkdirSync(join(root, 'packages', 'broken'));
    writeFileSync(
      join(root, 'packages', 'broken', 'package.json'),
      '{ not json',
    );
    expect(publishedPackages(root).map(p => p.name)).toEqual(['@x/a']);
  });
});

describe('licenceProblems', () => {
  it('finds nothing when every published package ships the same text', () => {
    const root = workspace([
      { dir: 'a', name: '@x/a', license: 'MIT', text: LICENCE },
      { dir: 'b', name: '@x/b', license: 'MIT', text: LICENCE },
    ]);
    const { packages, problems } = licenceProblems(root);
    expect(problems).toEqual([]);
    expect(packages).toHaveLength(2);
  });

  it('names the package whose declared licence has no text in the tarball directory', () => {
    const root = workspace([
      { dir: 'a', name: '@x/a', license: 'MIT', text: LICENCE },
      { dir: 'b', name: '@x/b', license: 'MIT' },
    ]);
    const { problems } = licenceProblems(root);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('@x/b');
    expect(problems[0]).toContain('no LICENSE file');
  });

  it('catches DRIFT: a copy edited in one place is two grants under one name', () => {
    const root = workspace([
      { dir: 'a', name: '@x/a', license: 'MIT', text: LICENCE },
      { dir: 'b', name: '@x/b', license: 'MIT', text: `${LICENCE}extra\n` },
    ]);
    const { problems } = licenceProblems(root);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('differs from the root LICENSE');
  });

  it('flags a package that ships text but declares no licence field', () => {
    const root = workspace([{ dir: 'a', name: '@x/a', text: LICENCE }]);
    const { problems } = licenceProblems(root);
    expect(problems[0]).toContain('no `license` field');
  });

  it('reports an EMPTY package set rather than an empty problem list', () => {
    // The caller turns this into exit 2. Without it, pointing the guard at an
    // empty directory would look exactly like a clean repository.
    const root = workspace([]);
    const { packages, problems } = licenceProblems(root);
    expect(packages).toEqual([]);
    expect(problems).toEqual([]);
  });
});
