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
