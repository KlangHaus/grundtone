import { describe, expect, it } from 'vitest';
import * as vue from '@grundtone/vue';
import {
  COMPONENT_NAMES,
  COMPOSABLE_NAMES,
  VALUE_NAMES,
} from './registrations';

// Measured against the BUILT package, i.e. the artifact a consumer installs —
// not against src, which is not published. A component added to the library
// without being listed here would simply never be auto-imported, and nothing
// would say so.

const exported = new Set(Object.keys(vue));

describe('registration lists match what @grundtone/vue exports', () => {
  it('sees a real export surface (denominator, not an empty module)', () => {
    expect(exported.size).toBeGreaterThan(50);
  });

  it('lists every exported GT* component, and no name the entry lacks', () => {
    const fromEntry = [...exported]
      .filter(name => /^GT[A-Z]/.test(name))
      .sort();
    expect([...COMPONENT_NAMES].sort()).toEqual(fromEntry);
  });

  it('lists every exported composable', () => {
    const fromEntry = [...exported]
      .filter(name => /^use[A-Z]/.test(name))
      .sort();
    expect([...COMPOSABLE_NAMES].sort()).toEqual(fromEntry);
  });

  it('only registers values the entry actually exports', () => {
    for (const name of [
      ...COMPOSABLE_NAMES,
      ...VALUE_NAMES,
      ...COMPONENT_NAMES,
    ]) {
      expect(exported.has(name), name).toBe(true);
    }
  });
});
