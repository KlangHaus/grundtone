import { describe, expect, it } from 'vitest';
import { checkFladeMetadata } from './flade-metadata.mjs';

// Artefakt-målingen (byg sitet, muter HTML'en) er stadig den vigtigste — den
// fangede twitter:title-fejlen, som ingen enkelt kildefil viser. Disse tests
// måler noget andet: at HVER REGEL for sig kan blive rød. Med kun CLI-formen
// kunne reglerne kun prøves i flok.

const OK = (over = '') => `
<link rel="canonical" href="https://grundtone.com/x">
<meta property="og:url" content="https://grundtone.com/x">
<meta property="og:type" content="website">
<meta property="og:site_name" content="grundtone">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="T">
<meta name="twitter:title" content="T">
<meta property="og:description" content="D">
<meta name="twitter:description" content="D">
${over}`;

const two = html => [
  { rel: 'index.html', html },
  { rel: 'studio/index.html', html },
];
const run = (files, exists = () => true) => checkFladeMetadata(files, exists);
const alwaysThere = () => true;

describe('checkFladeMetadata', () => {
  it('godkender et komplet sæt', () => {
    expect(run(two(OK())).errors).toEqual([]);
  });

  // 🔴 Den positive kontrol: færre end to ruter ER en fejl, så en tom eller
  // flyttet output-mappe ikke kan melde grønt uden at måle noget.
  it('afviser færre end to ruter — et nul er ikke et pas', () => {
    expect(run([{ rel: 'index.html', html: OK() }]).errors[0]).toMatch(
      /fandt kun 1/,
    );
    expect(run([]).errors[0]).toMatch(/fandt kun 0/);
  });

  it('kræver præcis én canonical', () => {
    const dobbelt = OK('<link rel="canonical" href="https://grundtone.com/x">');
    expect(run(two(dobbelt)).errors.join()).toMatch(/2 canonical-tags/);
  });

  it.each([
    ['look-alike domæne', 'https://grundtone.com.angriber.dk/x'],
    ['praefiks-naboskab', 'https://grundtone.comfoo/x'],
    ['fremmed vaert', 'https://example.com/x'],
  ])('afviser canonical mod %s', (_n, href) => {
    const html = OK().replace('https://grundtone.com/x"', `${href}"`);
    expect(run(two(html)).errors.join()).toMatch(/peger uden for/);
  });

  it('kræver at og:url og canonical er enige', () => {
    const html = OK().replace(
      '<meta property="og:url" content="https://grundtone.com/x">',
      '<meta property="og:url" content="https://grundtone.com/y">',
    );
    expect(run(two(html)).errors.join()).toMatch(/er uenige/);
  });

  it.each(['og:type', 'og:site_name', 'og:locale'])('kræver %s', key => {
    const html = OK().replace(new RegExp(`<meta property="${key}"[^>]*>`), '');
    expect(run(two(html)).errors.join()).toMatch(new RegExp(`mangler ${key}`));
  });

  // 🔴 Fejlen der motiverede hele gaten: og: og twitter: uenige for samme side.
  it.each([
    ['titel', 'twitter:title', 'ANDET'],
    ['beskrivelse', 'twitter:description', 'ANDET'],
  ])('afviser uenig %s mellem de to kort', (_n, tag, val) => {
    const html = OK().replace(
      new RegExp(`(<meta name="${tag}" content=")[^"]*`),
      `$1${val}`,
    );
    expect(run(two(html)).errors.join()).toMatch(/er uenige/);
  });

  it('afviser og:image paa et fremmed domæne', () => {
    const html = OK(
      '<meta property="og:image" content="https://grundtone.com.angriber.dk/k.png">',
    );
    expect(run(two(html)).errors.join()).toMatch(/ligger uden for/);
  });

  it('afviser og:image hvis filen ikke findes i outputtet', () => {
    const html = OK(
      '<meta property="og:image" content="https://grundtone.com/k.png">',
    );
    expect(run(two(html), () => false).errors.join()).toMatch(
      /ikke findes i outputtet/,
    );
  });

  it('accepterer og:image naar filen findes', () => {
    const html = OK(
      '<meta property="og:image" content="https://grundtone.com/k.png">',
    );
    expect(run(two(html), alwaysThere).errors).toEqual([]);
  });

  // 🔴 En fejlside der hævder et kanonisk URL beder om at blive indekseret som det.
  it('afviser canonical paa en fallback-side', () => {
    const files = [
      ...two(OK()),
      {
        rel: '404.html',
        html: '<link rel="canonical" href="https://grundtone.com/">',
      },
    ];
    expect(run(files).errors.join()).toMatch(/fallback-siden har en canonical/);
  });

  it('tillader fallback-sider uden canonical', () => {
    const files = [...two(OK()), { rel: '200.html', html: '<html></html>' }];
    const r = run(files);
    expect(r.errors).toEqual([]);
    expect(r.fallbacks).toBe(1);
    expect(r.routes).toBe(2);
  });
});
