import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  defaultBranding,
  createBranding,
  LOGO_VARIANT_SIZES,
  type LogoVariants,
} from './branding';

// branding.ts PÅSTÅR tre ting om filer den ikke selv læser: at stierne
// findes, at SVG-viewBoxes har de angivne mål, og at PNG'erne har de angivne
// pixel-dimensioner. Denne test binder påstandene til filerne — ellers kan
// et nyt mærke (som #140) eller en omdøbt fil drive tavst fra metadataene.
const here = dirname(fileURLToPath(import.meta.url));
const PKG_PREFIX = '@grundtone/core/';
const assetPath = (p: string) => resolve(here, '..', p.replace(PKG_PREFIX, ''));

const logoKeys = Object.keys(defaultBranding.logos) as (keyof LogoVariants)[];

describe('defaultBranding.logos', () => {
  it('every declared variant points at a file that exists in the package', () => {
    const missing = logoKeys
      .map(k => ({ k, p: defaultBranding.logos[k] }))
      .filter(({ p }) => !p || !existsSync(assetPath(p)));
    expect(missing).toEqual([]);
  });

  it('every declared variant has size metadata', () => {
    for (const k of logoKeys) {
      expect(LOGO_VARIANT_SIZES[k], `LOGO_VARIANT_SIZES.${k}`).toBeDefined();
    }
  });

  it('SVG variants: viewBox matches LOGO_VARIANT_SIZES (aspect ratio source of truth)', () => {
    const svgKeys = logoKeys.filter(k =>
      defaultBranding.logos[k]!.endsWith('.svg'),
    );
    expect(svgKeys.length).toBeGreaterThan(0);
    for (const k of svgKeys) {
      const svg = readFileSync(assetPath(defaultBranding.logos[k]!), 'utf8');
      const m = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
      expect(m, `${k}: viewBox missing or not origin-anchored`).not.toBeNull();
      expect({ width: Number(m![1]), height: Number(m![2]) }, k).toEqual(
        LOGO_VARIANT_SIZES[k],
      );
    }
  });

  it('PNG variants: IHDR pixel dimensions match LOGO_VARIANT_SIZES', () => {
    const pngKeys = logoKeys.filter(k =>
      defaultBranding.logos[k]!.endsWith('.png'),
    );
    expect(pngKeys.length).toBeGreaterThan(0);
    for (const k of pngKeys) {
      const buf = readFileSync(assetPath(defaultBranding.logos[k]!));
      // PNG: 8-byte signature, then IHDR chunk; width/height are big-endian
      // uint32 at offsets 16 and 20.
      expect(buf.subarray(1, 4).toString('ascii'), `${k}: not a PNG`).toBe(
        'PNG',
      );
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      expect({ width, height }, k).toEqual(LOGO_VARIANT_SIZES[k]);
    }
  });
});

describe('createBranding', () => {
  it('is additive: a pre-#140 override (no SVG keys) keeps all new SVG defaults', () => {
    const b = createBranding({ name: 'Acme', logos: { primary: '/acme.png' } });
    expect(b.name).toBe('Acme');
    expect(b.logos.primary).toBe('/acme.png');
    expect(b.logos.wordmarkSvg).toBe(defaultBranding.logos.wordmarkSvg);
    expect(b.logos.lockupFullSvg).toBe(defaultBranding.logos.lockupFullSvg);
  });

  it('returns a copy, not the default object', () => {
    const b = createBranding();
    expect(b).toEqual(defaultBranding);
    expect(b).not.toBe(defaultBranding);
  });
});
