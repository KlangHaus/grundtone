import { describe, it, expect } from 'vitest';

import {
  acceptDrift,
  declaredInPnpmWorkspace,
  declaredInToml,
} from './vuln-accepts.mjs';

describe('declaredInToml', () => {
  it('finder erklærede id-felter', () => {
    expect([
      ...declaredInToml('[[IgnoredVulns]]\nid = "GHSA-aaaa-bbbb-cccc"\n'),
    ]).toEqual(['GHSA-aaaa-bbbb-cccc']);
  });

  // 🔴 Kernen: vores egen reason-tekst henviser til den ANDEN accepts id.
  // Et naivt "find alle GHSA-id'er" ville måle prosaen OM nøglen.
  it('tæller ikke et id der blot NÆVNES i en reason', () => {
    const toml = [
      '[[IgnoredVulns]]',
      'id = "GHSA-aaaa-bbbb-cccc"',
      'reason = "samme nåbarhed som GHSA-dddd-eeee-ffff"',
    ].join('\n');

    expect([...declaredInToml(toml)]).toEqual(['GHSA-aaaa-bbbb-cccc']);
  });

  it('tåler whitespace omkring lighedstegnet og enkelt-anførselstegn', () => {
    expect([...declaredInToml("  id   =   'GHSA-1111-2222-3333'")]).toEqual([
      'GHSA-1111-2222-3333',
    ]);
  });
});

describe('declaredInPnpmWorkspace', () => {
  const yaml = [
    'auditConfig:',
    '  ignoreGhsas:',
    '    # en kommentar med GHSA-zzzz-zzzz-zzzz i',
    '    - GHSA-aaaa-bbbb-cccc',
    '    - GHSA-dddd-eeee-ffff',
    'andenNøgle: true',
    '    - GHSA-9999-9999-9999',
  ].join('\n');

  it('læser listen og stopper ved næste nøgle', () => {
    expect([...declaredInPnpmWorkspace(yaml)]).toEqual([
      'GHSA-aaaa-bbbb-cccc',
      'GHSA-dddd-eeee-ffff',
    ]);
  });

  it('tæller ikke et id i en kommentar', () => {
    expect([...declaredInPnpmWorkspace(yaml)]).not.toContain(
      'GHSA-zzzz-zzzz-zzzz',
    );
  });

  it('giver tom mængde når nøglen mangler', () => {
    expect([...declaredInPnpmWorkspace('noget: andet\n')]).toEqual([]);
  });
});

describe('acceptDrift', () => {
  it('finder intet når de er ens', () => {
    expect(acceptDrift(new Set(['A']), new Set(['A']))).toEqual([]);
  });

  it('peger på HVILKEN fil en accept kun står i', () => {
    expect(acceptDrift(new Set(['A', 'B']), new Set(['B', 'C']))).toEqual([
      { id: 'A', onlyIn: 'osv-scanner.toml' },
      { id: 'C', onlyIn: 'pnpm-workspace.yaml' },
    ]);
  });
});
