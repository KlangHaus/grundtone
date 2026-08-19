// Tester DRIFT-BESLUTNINGEN i hero-ikonernes vendoring.
//
// Hvorfor en test på et vedligeholdelses-script: vendoring fryser filer, og en
// frys-detektor der ikke kan fejle er værre end ingen — den ser grøn ud.
// Præcis den klasse kostede studio#225 måneder med en placeholder-logo, fordi
// intet kunne se at kopien var gammel. Netværk og filsystem er injiceret, så
// selve beslutningen kan måles uden at hente noget.
import { describe, it, expect } from 'vitest';

import {
  VARIANTS,
  fileFor,
  planFor,
  renderManifest,
  sha,
} from './vendor-hero-icons.mjs';

const buf = s => Buffer.from(s);
// Kilden som scriptet ville producere den: variantnavn → indhold.
const encoded = name => buf(`encoded:${name}`);

describe('planFor — drift-beslutningen', () => {
  it('melder ok når hver fil svarer til kilden', () => {
    const plan = planFor(VARIANTS, {
      encoded,
      existing: file => {
        const name = VARIANTS.find(v => fileFor(v) === file);
        return sha(encoded(name));
      },
    });
    expect(plan).toHaveLength(7);
    expect(plan.every(p => p.status === 'ok')).toBe(true);
  });

  it('melder drift for præcis den fil hvis indhold afviger', () => {
    const plan = planFor(VARIANTS, {
      encoded,
      existing: file =>
        file === 'icon-bluegold.webp'
          ? sha(buf('noget andet'))
          : sha(encoded(VARIANTS.find(v => fileFor(v) === file))),
    });
    const bad = plan.filter(p => p.status !== 'ok');
    expect(bad.map(p => p.file)).toEqual(['icon-bluegold.webp']);
    expect(bad[0].status).toBe('drift');
  });

  it('skelner en MANGLENDE fil fra en ændret — de kræver samme handling, men ikke samme fejlbesked', () => {
    const plan = planFor(['BlueGold', 'BluePink'], {
      encoded,
      existing: file =>
        file === 'icon-bluegold.webp' ? null : sha(encoded('BluePink')),
    });
    expect(plan.map(p => p.status)).toEqual(['missing', 'ok']);
  });

  it('afleder filnavnet ét sted, så manifest og script ikke kan drive fra hinanden', () => {
    expect(VARIANTS.map(fileFor)).toEqual([
      'icon-bluegold.webp',
      'icon-bluepink.webp',
      'icon-bluewhite.webp',
      'icon-blackwhite.webp',
      'icon-goldwhite.webp',
      'icon-pinkgold.webp',
      'icon-pinkwhite.webp',
    ]);
  });
});

describe('renderManifest', () => {
  it('viser hver variant med kilde- og vendoret sha, og en samlet vægt', () => {
    const md = renderManifest([
      { name: 'BlueGold', srcSha: 'aaaa', outSha: 'bbbb', kb: 9 },
      { name: 'BluePink', srcSha: 'cccc', outSha: 'dddd', kb: 8 },
    ]);
    expect(md).toContain('| BlueGold | aaaa | bbbb | 9 |');
    expect(md).toContain('| BluePink | cccc | dddd | 8 |');
    expect(md).toContain('Samlet: 17 KB for 2 billeder.');
    // Manifestet SKAL sige hvordan man verificerer — ellers er sha'erne
    // dekoration, ikke en kontrol.
    expect(md).toContain('UDEN `--write`');
  });
});
