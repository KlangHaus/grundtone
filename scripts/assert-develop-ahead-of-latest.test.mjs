// Tester SAMMENLIGNINGEN i version-drift-gaten.
//
// Hvorfor en test på noget så lille: gaten er selv en sikkerhedsmekanisme, og
// en sikkerhedsmekanisme der ikke kan fejle er værre end ingen — den ser
// grøn ud. Den vigtigste case er `mcp`-tilfældet fra 2026-08-05: develop og
// npm stod BEGGE på 0.1.0. En naiv "er develop bagud?"-test ville have
// accepteret det, men `0.1.0-next.5` sorterer UNDER sin egen udgivne 0.1.0
// (SemVer §11), så `next` ville igen have været bagud for `latest`.
import { describe, it, expect } from 'vitest';

import { gt } from './lib/semver-gt.mjs';
import { lookupPublished } from './lib/npm-dist-tag.mjs';

describe('version-drift-gaten', () => {
  it('accepterer en højere version', () => {
    expect(gt('2.23.0', '2.22.0')).toBe(true);
    expect(gt('2.24.0', '2.23.3')).toBe(true);
    expect(gt('0.2.0', '0.1.0')).toBe(true);
  });

  it('afviser en lavere version — den fejl vi faktisk havde', () => {
    expect(gt('2.1.0', '2.22.0')).toBe(false);
    expect(gt('2.15.0', '2.23.3')).toBe(false);
  });

  // 🔴 Kernen: lighed er en FEJL, ikke en accept.
  it('afviser LIGHED — mcp stod 0.1.0 begge steder', () => {
    expect(gt('0.1.0', '0.1.0')).toBe(false);
  });

  // Grunden til at lighed er en fejl, gjort eksplicit: en prerelease sorterer
  // under sin egen udgivelse. Ville nogen løsne lighedsreglen, brydes denne.
  it('holder fast i at en prerelease er LAVERE end sin egen udgivelse', () => {
    expect(gt('0.1.0-next.5', '0.1.0')).toBe(false);
    expect(gt('2.24.0-next.9', '2.24.0')).toBe(false);
    // …men stadig højere end en lavere udgivelse:
    expect(gt('2.24.0-next.9', '2.23.3')).toBe(true);
  });

  it('sammenligner numerisk, ikke leksikalt', () => {
    // '9' > '10' leksikalt — den klassiske fælde.
    expect(gt('2.10.0', '2.9.0')).toBe(true);
    expect(gt('2.9.0', '2.10.0')).toBe(false);
  });
});

// 🔴 Den anden halvdel af gaten: hvad den gør, når den ikke KAN måle.
//
// Sammenligningen ovenfor er kun så god som det tal, den får. Svarede
// opslaget tom streng ved enhver fejl, læste gaten et registry-udfald som
// "aldrig udgivet — intet at være bagud for" og blev grøn præcis dér, hvor
// den intet havde målt. Fraværet er det svære at måle rigtigt: et tomt svar
// ser ens ud, uanset om der ikke var noget, eller om vi ikke kunne se efter.
describe('opslaget på npm dist-tag', () => {
  const fail = stderr => () => {
    const err = new Error('Command failed: npm view');
    err.stderr = stderr;
    throw err;
  };

  it('læser en udgivet version', () => {
    expect(
      lookupPublished('@grundtone/vue', 'latest', () => '2.23.3\n'),
    ).toEqual({
      state: 'published',
      version: '2.23.3',
    });
  });

  it('behandler en pakke npm ikke kender som uudgivet', () => {
    expect(
      lookupPublished(
        '@grundtone/nope',
        'latest',
        fail('npm error code E404\nnpm error 404 Not Found'),
      ),
    ).toEqual({ state: 'unpublished' });
  });

  it('behandler et kendt navn UDEN det dist-tag som uudgivet under tagget', () => {
    // npm skriver en tom linje og exit 0 — pakken findes, tagget gør ikke.
    expect(lookupPublished('@grundtone/vue', 'next', () => '\n')).toEqual({
      state: 'unpublished',
    });
  });

  // Kernen: et opslag der ikke lykkedes må ALDRIG ende samme sted som
  // "findes ikke". Denne gren er også den hårde gate i prerelease-next.yml,
  // lige før et publish der ikke kan gøres om.
  it('KASTER ved et udfald frem for at kalde pakken uudgivet', () => {
    expect(() =>
      lookupPublished(
        '@grundtone/vue',
        'latest',
        fail('npm error network ETIMEDOUT'),
      ),
    ).toThrow(/ikke lykkedes/);
  });

  it('kaster også ved rate limit — alt vi ikke kan tolke er en fejl', () => {
    expect(() =>
      lookupPublished(
        '@grundtone/vue',
        'latest',
        fail('npm error 429 Too Many Requests'),
      ),
    ).toThrow();
  });

  // En fejltekst der tilfældigvis indeholder cifrene 404 uden at være et
  // 404-svar må ikke smutte igennem som "findes ikke".
  it('lader ikke et løst "404" i en anden fejl passere som uudgivet', () => {
    expect(() =>
      lookupPublished(
        '@grundtone/vue',
        'latest',
        fail('npm error ECONNRESET after 404 ms'),
      ),
    ).toThrow();
  });
});
