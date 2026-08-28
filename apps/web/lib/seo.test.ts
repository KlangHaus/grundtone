import { describe, expect, it } from 'vitest';
import {
  OG_DESCRIPTION,
  OG_DESCRIPTION_STUDIO_DA,
  OG_TITLE,
  SITE_URL,
  pageSeo,
} from './seo';

// `pageSeo()` er en ren funktion, og dens output ender ORDRET i det serverede
// HTML. Artefakt-gaten (`scripts/assert-flade-metadata.mjs`) måler resultatet
// efter flettning med nuxt.config; disse tests måler funktionens egen kontrakt,
// så en regression kan lokaliseres uden et fuldt build.

describe('pageSeo', () => {
  it('bygger canonical og og:url af samme URL', () => {
    const { link, meta } = pageSeo({ path: '/studio' });
    expect(link[0]).toEqual({
      rel: 'canonical',
      href: 'https://grundtone.com/studio',
    });
    expect(meta).toContainEqual({
      property: 'og:url',
      content: 'https://grundtone.com/studio',
    });
  });

  // 🔴 Forsiden er '/' og må ikke blive '' eller '//' — en canonical der peger
  // på et andet URL end siden selv, beder om at blive afindekseret.
  it('holder forsidens canonical på præcis roden', () => {
    expect(pageSeo({ path: '/' }).link[0].href).toBe('https://grundtone.com/');
  });

  // 🔴 Kernen i den fejl artefakt-gaten fandt: sættes og:title uden
  // twitter:title, arver Twitter-kortet den site-brede default, og de to kort
  // viser hver sin titel for samme side.
  it('sætter BEGGE korts titel, ikke kun og:', () => {
    const { meta } = pageSeo({ path: '/x', title: 'T' });
    expect(meta).toContainEqual({ property: 'og:title', content: 'T' });
    expect(meta).toContainEqual({ name: 'twitter:title', content: 'T' });
  });

  it('sætter BEGGE korts beskrivelse, ikke kun og:', () => {
    const { meta } = pageSeo({ path: '/x', description: 'D' });
    expect(meta).toContainEqual({ property: 'og:description', content: 'D' });
    expect(meta).toContainEqual({ name: 'twitter:description', content: 'D' });
  });

  // Negativ kontrol: udelades et felt, må funktionen ikke opfinde et. Ellers
  // ville siden overskrive den site-brede default med tom eller forkert tekst.
  it('udelader felter der ikke er sat', () => {
    const keys = pageSeo({ path: '/x' }).meta.map(m =>
      'property' in m ? m.property : m.name,
    );
    expect(keys).toEqual(['og:url']);
  });

  it('sætter og:locale kun når den er givet', () => {
    expect(pageSeo({ path: '/x', locale: 'da_DK' }).meta).toContainEqual({
      property: 'og:locale',
      content: 'da_DK',
    });
  });
});

describe('konstanterne er [cmo]s, ordret', () => {
  it('pinner apex-teksten', () => {
    expect(OG_TITLE).toBe('grundtone — change your brand in one place');
    expect(OG_DESCRIPTION).toBe(
      'Open source design system, Vue/Nuxt-first. Update tokens once — your app and email templates restyle instantly. No rebuild, no drift.',
    );
  });

  // 🔴 Den danske er BEVIDST ikke en oversættelse: /studio er et andet produkt
  // end biblioteket. Testen fanger en velmenende "harmonisering".
  it('pinner den danske /studio-tekst og holder den forskellig fra apex', () => {
    expect(OG_DESCRIPTION_STUDIO_DA).toBe(
      'grundtone Studio — rediger design-tokens visuelt, uden kode. Opdater ét sted, se ændringen live på tværs af alle dine brands. Bygget på open source grundtone.',
    );
    expect(OG_DESCRIPTION_STUDIO_DA).not.toBe(OG_DESCRIPTION);
  });

  it('har ingen afsluttende skråstreg i SITE_URL', () => {
    expect(SITE_URL).toBe('https://grundtone.com');
    expect(SITE_URL.endsWith('/')).toBe(false);
  });
});
