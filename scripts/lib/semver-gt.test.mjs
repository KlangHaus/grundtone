import { describe, it, expect } from 'vitest';

import { baseVersion, gt, parse } from './semver-gt.mjs';

describe('parse', () => {
  it('læser kerne og prerelease', () => {
    expect(parse('2.24.0')).toEqual({
      major: 2,
      minor: 24,
      patch: 0,
      pre: null,
    });
    expect(parse('0.1.0-next.5')).toEqual({
      major: 0,
      minor: 1,
      patch: 0,
      pre: 'next.5',
    });
  });

  // SemVer §10: build-metadata indgår IKKE i præcedens.
  it('ser bort fra build-metadata', () => {
    expect(parse('1.0.0+build.5').pre).toBeNull();
    expect(parse('1.0.0-next.1+build.5').pre).toBe('next.1');
  });

  // 🔴 En gate der ikke kan læse en version skal STANDSE, ikke gætte.
  it('kaster på noget uparsebart frem for at gætte', () => {
    for (const v of ['', 'v2.24.0', '2.24', 'latest', '2.24.0.1']) {
      expect(() => parse(v)).toThrow(/unparseable/);
    }
  });
});

describe('gt', () => {
  it('sammenligner kernen numerisk, ikke leksikalt', () => {
    expect(gt('2.24.0', '2.23.3')).toBe(true);
    expect(gt('2.9.0', '2.10.0')).toBe(false);
    expect(gt('1.0.0', '0.99.99')).toBe(true);
  });

  // Grunden til at lighed er en FEJL i drift-gaten: mcp stod 0.1.0 begge steder.
  it('afviser lighed', () => {
    expect(gt('0.1.0', '0.1.0')).toBe(false);
  });

  it('rangerer en prerelease UNDER sin egen udgivelse (§11)', () => {
    expect(gt('0.1.0-next.5', '0.1.0')).toBe(false);
    expect(gt('0.1.0', '0.1.0-next.5')).toBe(true);
    expect(gt('2.24.0-next.9', '2.23.3')).toBe(true);
  });

  // 🔴 Regressionen målt 2026-08-20: som strenge sorterer 'next.10' UNDER
  // 'next.9', så sammenligningen var vendt om for ethvert løbenummer der fik
  // et ciffer mere. Ikke nåbar i dag, fordi intet kald sammenligner to
  // prereleases — fejlen ventede på den første der gjorde.
  it('sammenligner numeriske prerelease-led NUMERISK', () => {
    expect(gt('0.1.0-next.10', '0.1.0-next.9')).toBe(true);
    expect(gt('0.1.0-next.9', '0.1.0-next.10')).toBe(false);
    expect(gt('0.1.0-next.100', '0.1.0-next.99')).toBe(true);
  });

  it('rangerer numerisk led under alfanumerisk, og flere led over færre', () => {
    expect(gt('1.0.0-alpha', '1.0.0-1')).toBe(true);
    expect(gt('1.0.0-alpha.1', '1.0.0-alpha')).toBe(true);
    expect(gt('1.0.0-alpha', '1.0.0-alpha.1')).toBe(false);
  });
});

describe('baseVersion', () => {
  it('dropper prerelease-suffikset', () => {
    expect(baseVersion('2.24.0-next.5')).toBe('2.24.0');
    expect(baseVersion('2.24.0')).toBe('2.24.0');
  });

  // 🔴 [quality]s fund: `version.split('-')[0]` lod metadata blive staaende,
  // saa stemplingen producerede `2.1.0+build-next.5` — ugyldig, fordi
  // build-metadata skal staa SIDST (§10).
  it('dropper OGSAA build-metadata', () => {
    expect(baseVersion('2.1.0+build')).toBe('2.1.0');
    expect(baseVersion('2.1.0-next.5+build.7')).toBe('2.1.0');
  });

  it('kaster frem for at stemple noget uparsebart', () => {
    expect(() => baseVersion('v2.1')).toThrow(/unparseable/);
  });
});
