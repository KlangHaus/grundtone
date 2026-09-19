import { describe, expect, it } from 'vitest';
import { checkUploaded, OPT_IN, resolveDeployMode } from './bunny-deploy.mjs';

const label = 'publish-bunny';
const secrets = (zone, apiKey) => [
  { name: 'BUNNY_DOCS_STORAGE_ZONE', value: zone },
  { name: 'BUNNY_DOCS_STORAGE_API_KEY', value: apiKey },
];

describe('resolveDeployMode', () => {
  it('deployer når begge secrets er sat', () => {
    const r = resolveDeployMode({ required: secrets('zone', 'key'), label });
    expect(r.mode).toBe('deploy');
    expect(r.missing).toEqual([]);
  });

  // 🔴 CELLEN FOR DET, DER SKETE: release-kørsel 35459568087 havde begge
  // tomme og blev grøn. Nu er det en fejl, og beskeden navngiver hvilke.
  it.each([
    ['begge tomme', '', ''],
    ['begge usatte', undefined, undefined],
    ['kun zone sat', 'zone', undefined],
    ['kun nøgle sat', undefined, 'key'],
    ['whitespace', ' ', '\t'],
  ])('fejler ved %s', (_, zone, apiKey) => {
    const r = resolveDeployMode({ required: secrets(zone, apiKey), label });
    expect(r.mode).toBe('fail');
    expect(r.missing.length).toBeGreaterThan(0);
    for (const name of r.missing) expect(r.reason).toContain(name);
  });

  it('nævner kun NAVNE, aldrig værdier', () => {
    const r = resolveDeployMode({ required: secrets('zone-navn', ''), label });
    expect(r.reason).toContain('BUNNY_DOCS_STORAGE_API_KEY');
    expect(r.reason).not.toContain('zone-navn');
  });

  it('springer kun over på et positivt erklæret opt-in', () => {
    const skipped = resolveDeployMode({
      required: secrets('', ''),
      optional: '1',
      label,
    });
    expect(skipped.mode).toBe('skip');
    expect(skipped.reason).toContain(OPT_IN);

    // Et opt-in, der ikke er præcis '1', er ikke et opt-in: "true"/"0"/"" er
    // den slags værdier, der lander i en env-var ved et uheld.
    for (const value of ['0', 'true', 'ja', '', ' ']) {
      expect(
        resolveDeployMode({ required: secrets('', ''), optional: value, label })
          .mode,
        `optional=${JSON.stringify(value)}`,
      ).toBe('fail');
    }
  });

  it('opt-in kan ikke skjule et deploy, der ellers ville køre', () => {
    const r = resolveDeployMode({
      required: secrets('zone', 'key'),
      optional: '1',
      label,
    });
    expect(r.mode).toBe('deploy');
  });
});

describe('checkUploaded', () => {
  it('0 filer er ikke et deploy', () => {
    const r = checkUploaded(0, label);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('0 filer');
  });

  it('mindst én fil tæller som udgivet, og antallet står i beskeden', () => {
    const r = checkUploaded(42, label);
    expect(r.ok).toBe(true);
    expect(r.reason).toContain('42');
  });
});
