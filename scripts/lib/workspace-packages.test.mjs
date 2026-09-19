// @vitest-environment node
import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import {
  assertPlausible,
  globParents,
  workspaceGlobs,
} from './workspace-packages.mjs';

const YAML = readFileSync(
  new URL('../../pnpm-workspace.yaml', import.meta.url),
  'utf8',
);

describe('workspaceGlobs', () => {
  it('reads the real file, so the cell cannot pass on a fixture alone', () => {
    const globs = workspaceGlobs(YAML);
    expect(globs).toContain('packages/*');
    expect(globs).toContain('apps/*');
    // 🔴 The one the hardcoded list forgot.
    expect(globs).toContain('apps/playground/*');
  });

  it('stops at the end of the list instead of swallowing the next key', () => {
    const globs = workspaceGlobs(
      'packages:\n  - packages/*\n  - apps/*\n\nonlyBuiltDependencies:\n  - esbuild\n',
    );
    expect(globs).toEqual(['packages/*', 'apps/*']);
    expect(globs).not.toContain('esbuild');
  });

  it('returns nothing when there is no packages key, rather than guessing', () => {
    expect(workspaceGlobs('onlyBuiltDependencies:\n  - esbuild\n')).toEqual([]);
  });
});

describe('globParents', () => {
  it('derives the parents the hardcoded list should have had', () => {
    expect(globParents(['packages/*', 'apps/*', 'apps/playground/*'])).toEqual([
      'packages',
      'apps',
      'apps/playground',
    ]);
  });

  it('ignores an entry that is not a directory glob', () => {
    expect(globParents(['packages/*', '!packages/private'])).toEqual([
      'packages',
    ]);
  });
});

// 🔴 THE CELLS THAT MAKE DERIVING WORTH ANYTHING. Deriving a list is only
// better than hardcoding one if a short or empty derivation is LOUD. Without
// these, a parser that silently returned [] would make every guard downstream
// pass with an empty denominator — the exact failure this riff is about.
describe('assertPlausible', () => {
  it('throws when the derivation comes back empty', () => {
    expect(() => assertPlausible([], 3, 'workspace parents')).toThrow(
      /derived 0, expected at least 3/,
    );
  });

  it('throws when the derivation is merely SHORT, not only when empty', () => {
    expect(() => assertPlausible(['packages'], 3, 'workspace parents')).toThrow(
      /derived 1/,
    );
  });

  it('names what was being derived, so a red says which instrument broke', () => {
    expect(() => assertPlausible([], 1, 'deploy scripts')).toThrow(
      /deploy scripts/,
    );
  });

  it('passes a list that meets the floor, and returns it unchanged', () => {
    const list = ['packages', 'apps', 'apps/playground'];
    expect(assertPlausible(list, 3, 'workspace parents')).toBe(list);
  });
});
