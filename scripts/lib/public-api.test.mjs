import { describe, it, expect } from 'vitest';

import {
  auditPackage,
  keyframeNames,
  removedKeyframes,
  exportedNames,
  removedExports,
  removedEntryPoints,
} from './public-api.mjs';

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

describe('stjerne-eksporter', () => {
  it('fejler HØJT frem for at tie — en parser der ser 0 navne ville skjule et tab', () => {
    expect(() => exportedNames(`export * from './x';`)).toThrow(
      /stjerne-eksport/,
    );
    expect(() => exportedNames(`export * as ns from './x';`)).toThrow(
      /stjerne-eksport/,
    );
  });

  it('rører ikke almindelige eksporter', () => {
    expect([...exportedNames(`export { A } from './a';`)]).toEqual(['A']);
  });
});

describe('removedEntryPoints — eksport-map-nøgler', () => {
  const pub = {
    exports: { '.': {}, './css': {}, './css/utilities': {}, './scss': {} },
  };
  const next = {
    exports: { '.': {}, './css': {}, './scss': {}, './scss/lib': {} },
  };

  it('finder den nøgle et publish ville fjerne (den ægte sag: ./css/utilities)', () => {
    expect(removedEntryPoints(pub, next)).toEqual(['./css/utilities']);
  });

  it('tilføjelser er ikke fjernelser — en ren overmængde taber intet', () => {
    const udvidet = { exports: { ...pub.exports, './nyt': {} } };
    expect(removedEntryPoints(pub, udvidet)).toEqual([]);
    // og omvendt ER en fjernelse: min første udgave af denne test brugte to
    // sæt der hver havde noget det andet manglede, og forventede [] — den
    // fejlede korrekt. En "tilføjelser tæller ikke"-test skal bruge en REN
    // overmængde, ellers måler den to ting på én gang.
    expect(removedEntryPoints(udvidet, pub)).toEqual(['./nyt']);
  });

  it('ignorerer "." — den findes altid, og dens indhold dækkes af .d.ts-diffen', () => {
    expect(
      removedEntryPoints({ exports: { '.': {} } }, { exports: {} }),
    ).toEqual([]);
  });

  it('en erklæret fjernelse er lovlig', () => {
    expect(removedEntryPoints(pub, next, ['./css/utilities'])).toEqual([]);
  });

  it('tåler en pakke helt uden exports-map', () => {
    expect(removedEntryPoints({}, {})).toEqual([]);
    expect(removedEntryPoints(pub, {})).toEqual([
      './css',
      './css/utilities',
      './scss',
    ]);
  });
});

// 🔴 Regressionen fra [review]s fund 2026-08-20. De ti eksisterende tests var
// alle grønne, mens gaten var blind for nuxt og mcp: `removedEntryPoints()`
// var rigtig, men blev aldrig kaldt for dem, fordi en type-guard lå foran.
// En test af funktionen alene kunne per konstruktion ikke se det. Denne
// tester det led, fejlen sad i — at de to tab er uafhængige.
describe('auditPackage', () => {
  const localPkg = { exports: { '.': './dist/index.js' } };
  const publishedPkg = {
    exports: { '.': './dist/index.js', './css': './dist/index.css' },
  };

  it('sammenligner exports-mappen for en pakke UDEN typer', () => {
    const result = auditPackage({ localPkg, publishedPkg });

    expect(result.entryPointsRemoved).toEqual(['./css']);
    expect(result.comparedTypes).toBe(false);
    expect(result.exportsRemoved).toEqual([]);
  });

  it('sammenligner begge dele når typer findes på begge sider', () => {
    const result = auditPackage({
      localPkg,
      publishedPkg,
      localDts: `export { A } from './a';`,
      publishedDts: `export { A } from './a';\nexport { B } from './b';`,
    });

    expect(result.entryPointsRemoved).toEqual(['./css']);
    expect(result.exportsRemoved).toEqual(['B']);
    expect(result.comparedTypes).toBe(true);
  });

  it('respekterer erklærede fjernelser i begge tab', () => {
    const result = auditPackage({
      localPkg,
      publishedPkg,
      localDts: `export { A } from './a';`,
      publishedDts: `export { A } from './a';\nexport { B } from './b';`,
      allowedRemovals: ['./css', 'B'],
    });

    expect(result.entryPointsRemoved).toEqual([]);
    expect(result.exportsRemoved).toEqual([]);
  });

  it('kun én side har typer: exports-mappen måles stadig', () => {
    for (const half of [
      { localDts: `export { A } from './a';` },
      { publishedDts: `export { A } from './a';` },
    ]) {
      const result = auditPackage({ localPkg, publishedPkg, ...half });
      expect(result.comparedTypes).toBe(false);
      expect(result.entryPointsRemoved).toEqual(['./css']);
    }
  });
});

describe('removedKeyframes', () => {
  const pub =
    '@keyframes gt-fade-in{}@keyframes gt-spin{}@keyframes toast-enter{}';

  it('finder et gt-keyframe der er væk', () => {
    expect(removedKeyframes(pub, '@keyframes gt-spin{}')).toEqual([
      'gt-fade-in',
    ]);
  });

  // 🔴 De upraefiksede er utilsigtede globale navne fra en aeldre kopi. At gate
  // paa dem ville fastlaase et uheld som en kontrakt.
  it('ignorerer upræfiksede navne', () => {
    expect(
      removedKeyframes(pub, '@keyframes gt-fade-in{}@keyframes gt-spin{}'),
    ).toEqual([]);
  });

  it('respekterer en erklæret fjernelse', () => {
    expect(
      removedKeyframes(pub, '@keyframes gt-spin{}', ['gt-fade-in']),
    ).toEqual([]);
  });

  it('finder intet når intet mangler', () => {
    expect(removedKeyframes(pub, pub)).toEqual([]);
  });

  it('læser navne med bindestreg og understreg', () => {
    expect([...keyframeNames('@keyframes a_b-c{}@keyframes  d {}')]).toEqual([
      'a_b-c',
      'd',
    ]);
  });
});
