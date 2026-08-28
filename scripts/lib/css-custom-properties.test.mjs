import { describe, it, expect } from 'vitest';

import { undefinedCustomProperties } from './css-custom-properties.mjs';

describe('undefinedCustomProperties', () => {
  it('finder et navn der hverken er defineret eller har fallback', () => {
    const css = `:root { --ease: ease; } .a { transition: all 1s var(--ease-ease); }`;

    expect(undefinedCustomProperties(css)).toEqual([
      { name: '--ease-ease', occurrences: 1 },
    ]);
  });

  // 🔴 Kernen i hvorfor de 61 deklarationer var døde og de 6 ikke var:
  // en fallback gør referencen gyldig, også når navnet ikke findes.
  it('accepterer en udefineret reference MED fallback', () => {
    const css = `.a { transition: all 1s var(--ease-ease-in, ease-in); }`;

    expect(undefinedCustomProperties(css)).toEqual([]);
  });

  it('tæller forekomster, så alvoren kan læses af meldingen', () => {
    const css = `.a { color: var(--x); } .b { color: var(--x); } .c { color: var(--y); }`;

    expect(undefinedCustomProperties(css)).toEqual([
      { name: '--x', occurrences: 2 },
      { name: '--y', occurrences: 1 },
    ]);
  });

  it('regner en property for defineret uanset hvor den defineres', () => {
    const css = `.theme { --brand: red; } .a { color: var(--brand); }`;

    expect(undefinedCustomProperties(css)).toEqual([]);
  });

  it('tillader eksplicit erklærede forbruger-satte properties', () => {
    const css = `.a { aspect-ratio: var(--aspect-ratio); }`;

    expect(
      undefinedCustomProperties(css, { allow: ['--aspect-ratio'] }),
    ).toEqual([]);
  });

  // En tom stylesheet må aldrig læse som en bestået måling af noget.
  it('finder intet i tom CSS', () => {
    expect(undefinedCustomProperties('')).toEqual([]);
  });
});
