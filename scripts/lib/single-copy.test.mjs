import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import { installedCopies, checkSingleVersion } from './single-copy.mjs';

// Cells for the KH-1221 guard. The decision is driven directly; the script that
// turns it into an exit code is exercised by scripts/lib/single-copy.scripts.test.mjs.

const temps = [];

/** Build a node_modules tree with the copies a test wants. */
function tree(copies) {
  const root = mkdtempSync(join(tmpdir(), 'single-copy-'));
  temps.push(root);
  for (const [path, version] of Object.entries(copies)) {
    const dir = join(root, path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({ name: 'vue', version }),
    );
  }
  return root;
}

afterEach(() => {
  while (temps.length > 0)
    rmSync(temps.pop(), { recursive: true, force: true });
});

describe('installedCopies', () => {
  it('🔴 finds the HOISTED root copy, not only nested ones', () => {
    // The one that matters, and the one a naive `*/node_modules/vue` glob
    // misses — nothing precedes `node_modules` for the root copy. I made
    // exactly that mistake while checking this guard: my comparison scan
    // reported one version where the guard correctly reported two.
    const root = tree({ 'node_modules/vue': '3.5.43' });
    expect(installedCopies(root, 'vue').map(c => c.version)).toEqual([
      '3.5.43',
    ]);
  });

  it('finds a nested copy beside the hoisted one', () => {
    const root = tree({
      'node_modules/vue': '3.5.43',
      'node_modules/nuxt/node_modules/vue': '3.5.42',
    });
    const versions = installedCopies(root, 'vue')
      .map(c => c.version)
      .sort();
    expect(versions).toEqual(['3.5.42', '3.5.43']);
  });

  it('reports the path of each copy, because the path is what an operator acts on', () => {
    const root = tree({ 'node_modules/nuxt/node_modules/vue': '3.5.42' });
    expect(installedCopies(root, 'vue')[0].path).toContain('nuxt');
  });
});

describe('checkSingleVersion', () => {
  it('passes on one version, however many copies of it', () => {
    // Two directories holding the SAME version is duplication, not two
    // instances with separate module state. The rule is about versions.
    const copies = [
      { version: '3.5.43', path: 'a' },
      { version: '3.5.43', path: 'b' },
    ];
    expect(checkSingleVersion(copies, 'vue').ok).toBe(true);
  });

  it('🔴 fails on two versions and names both', () => {
    const r = checkSingleVersion(
      [
        { version: '3.5.43', path: 'a' },
        { version: '3.5.42', path: 'b' },
      ],
      'vue',
    );
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('3.5.42');
    expect(r.reason).toContain('3.5.43');
    expect(r.reason).toContain('override');
  });

  it('🔴 fails on ZERO copies rather than reporting a clean tree', () => {
    // The blind-guard case: a scan that finds nothing must not be the same
    // outcome as a scan that found one. Otherwise a broken scanner reads as a
    // healthy tree, which is the worst state a guard can be in.
    const r = checkSingleVersion([], 'vue');
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('zero copies');
  });
});
