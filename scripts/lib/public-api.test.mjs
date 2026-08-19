import { describe, it, expect } from 'vitest';

import { exportedNames, removedExports } from './public-api.mjs';

// Den ægte sag, målt 2026-08-19: npm's 2.23.3 havde tre komponenter som
// develops 2.24.0 manglede, og version-drift-gaten var grøn under det.
const PUBLISHED = `
export { GTButton } from './atoms/Button';
export { GTHeader } from './molecules/Header';
export { GTFooter } from './molecules/Footer';
export { GTMasonry } from './molecules/Masonry';
export type { ButtonProps } from './atoms/Button';
`;
const NEXT = `
export { GTButton } from './atoms/Button';
export { GTHero } from './molecules/Hero';
export type { ButtonProps } from './atoms/Button';
`;

describe('exportedNames', () => {
  it('læser både value- og type-eksporter', () => {
    expect([...exportedNames(PUBLISHED)].sort()).toEqual([
      'ButtonProps',
      'GTButton',
      'GTFooter',
      'GTHeader',
      'GTMasonry',
    ]);
  });

  it('bruger det EKSPORTEREDE navn ved omdøbning, ikke det interne', () => {
    expect([
      ...exportedNames(`export { internal as GTPublic } from './x';`),
    ]).toEqual(['GTPublic']);
  });

  it('læser også const/function/class/type-erklæringer', () => {
    const s = `export const A = 1; export function B() {} export class C {} export type D = string;`;
    expect([...exportedNames(s)].sort()).toEqual(['A', 'B', 'C', 'D']);
  });
});

describe('removedExports', () => {
  it('finder de tre komponenter et publish ville fjerne', () => {
    expect(removedExports(PUBLISHED, NEXT)).toEqual([
      'GTFooter',
      'GTHeader',
      'GTMasonry',
    ]);
  });

  it('tilføjelser er ikke fjernelser — GTHero må gerne være ny', () => {
    expect(removedExports(NEXT, PUBLISHED)).toEqual(['GTHero']);
    expect(removedExports(PUBLISHED, PUBLISHED)).toEqual([]);
  });

  it('en ERKLÆRET fjernelse er lovlig — det er tavsheden der er problemet', () => {
    expect(
      removedExports(PUBLISHED, NEXT, ['GTFooter', 'GTHeader', 'GTMasonry']),
    ).toEqual([]);
    // men kun den erklærede: de øvrige skal stadig fanges
    expect(removedExports(PUBLISHED, NEXT, ['GTFooter'])).toEqual([
      'GTHeader',
      'GTMasonry',
    ]);
  });
});

describe('type-modifikatoren', () => {
  it('tæller ikke "type" med i navnet — ellers matcher en erklæret fjernelse aldrig', () => {
    expect(
      [...exportedNames(`export { type Foo, Bar } from './x';`)].sort(),
    ).toEqual(['Bar', 'Foo']);
  });

  it('en erklæret fjernelse af en TYPE virker', () => {
    const pub = `export { type Gone, Kept } from './x';`;
    const next = `export { Kept } from './x';`;
    expect(removedExports(pub, next)).toEqual(['Gone']);
    expect(removedExports(pub, next, ['Gone'])).toEqual([]);
  });
});
