import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { driftVerdict } from './drift-verdict.mjs';
import { publishablePackages } from './publishable-packages.mjs';

const registry = map => name => {
  if (!(name in map)) throw new Error(`registry unreadable for ${name}`);
  return map[name] === null ? { state: 'unpublished' } : { version: map[name] };
};

describe('driftVerdict', () => {
  const packages = [
    { name: 'a', version: '3.3.0' },
    { name: 'b', version: '3.2.0' },
    { name: 'c', version: '0.1.0' },
  ];

  it('--allow-equal: equal is fine, behind is BEHIND', () => {
    const { rows, failures } = driftVerdict({
      packages,
      lookup: registry({ a: '3.3.0', b: '3.2.1', c: null }),
      allowEqual: true,
    });
    expect(failures).toEqual([{ name: 'b', local: '3.2.0', published: '3.2.1' }]);
    expect(rows.map(r => r[3])).toEqual(['ok', 'BEHIND', 'ok']);
  });

  it('strict: equal is NOT AHEAD (SemVer §11)', () => {
    const { failures } = driftVerdict({
      packages: [packages[0]],
      lookup: registry({ a: '3.3.0' }),
      allowEqual: false,
    });
    expect(failures).toHaveLength(1);
  });

  it('a registry that cannot be read throws — it is never a green row', () => {
    expect(() =>
      driftVerdict({ packages, lookup: registry({}), allowEqual: true }),
    ).toThrow(/registry unreadable/);
  });
});

// 🔴 THE SET (task 1amk32fku64). The gate used to check seven hand-listed
// directories; react-native and email were outside them. Measured on the real
// repo, so a hand-written list cannot creep back unnoticed.
describe('the drift set is every publishable package', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const found = publishablePackages(root, { readdirSync, readFileSync });
  const names = found.map(p => p.name);

  it('includes the two packages the old list left out', () => {
    expect(names).toContain('@grundtone/react-native');
    expect(names).toContain('@grundtone/email');
  });

  it('includes the seven the old list had', () => {
    for (const dir of ['core', 'utils', 'icons', 'design-system', 'vue', 'nuxt', 'mcp']) {
      expect(names).toContain(`@grundtone/${dir}`);
    }
  });
});
