// Flade-metadata for grundtone.com. ÉN kilde, fordi de samme strenge ellers
// ville ligge i nuxt.config, i to sider og i GitHubs repo-felter — og drifte.
//
// 🔴 TEKSTEN ER [cmo]s, IKKE MIN. Ordret fra
// `docs/market/grundtone/2026-08-24-seo-baseline-cmo-svar.md` §G4, som selv
// genbruger den godkendte hero-copy ordret på kerneclaimet. Skal den ændres,
// ændres cmo's dokument først.
//
// 🔴 OG [cmo]+[seo] AFTALTE EN RÆKKEFØLGE, SOM DENNE ÆNDRING OVERHOLDER:
// felter først → mål igen → KUN DEREFTER hero-rækkefølgen. Ændres begge på én
// gang, kan en senere forbedring ikke tilskrives nogen af dem. Derfor rører
// denne ændring INGEN hero- eller sidetekst.

/**
 * Sitet er ren SSG (`nuxi generate`), så en canonical kan ikke udledes af
 * runtime-requesten — den ville blive byggemaskinens. Origin skal derfor være
 * eksplicit. Overskrivelig for preview-miljøer, men default er produktionen,
 * fordi en manglende env-var ellers ville udgive canonicals mod localhost.
 */
export const SITE_URL = (
  process.env.NUXT_PUBLIC_SITE_URL ?? 'https://grundtone.com'
).replace(/\/$/, '');

/** [cmo] §G4, 43 tegn — bevidst kortere end sidens egen <title>. */
export const OG_TITLE = 'grundtone — change your brand in one place';

/** [cmo] §G4, 148 tegn. */
export const OG_DESCRIPTION =
  'Open source design system, Vue/Nuxt-first. Update tokens once — your app and email templates restyle instantly. No rebuild, no drift.';

/**
 * [cmo], leveret 2026-08-24 til `/studio` (docs@ad140fe, samme dokument §G4).
 *
 * 🔴 BEVIDST IKKE en oversaettelse af `OG_DESCRIPTION`: /studio er et ANDET
 * produkt (SaaS, visuelt, no-code) end grundtone selv (OSS-bibliotek), saa
 * beskrivelsen siger hvad Studio ER frem for at gengive bibliotekets
 * kerneclaim. En oversaettelse ville have givet et delekort der beskriver det
 * forkerte produkt.
 */
export const OG_DESCRIPTION_STUDIO_DA =
  'grundtone Studio — rediger design-tokens visuelt, uden kode. Opdater ét sted, se ændringen live på tværs af alle dine brands. Bygget på open source grundtone.';

/**
 * 🔴 og:image er BEVIDST UDELADT. [cmo] leverede et billed-KONCEPT til
 * [designer] (§G4: vis princippet — én tokenværdi reflekteret samtidig i
 * 2-3 synligt forskellige overflader), ikke en fil, og der findes ingen fil i
 * `public/`. Et `og:image` der peger på noget ikke-eksisterende giver et
 * ØDELAGT kort, ikke et manglende — værre end ingen tag. Tilføjes når
 * [designer] leverer filen.
 */

export interface PageSeo {
  /** Rutens sti med foranstillet skråstreg, fx '/studio'. */
  path: string;
  /** Sidens egen OG-titel. Falder tilbage til den site-brede. */
  title?: string;
  /** BCP-47-agtig OG-locale, fx 'da_DK'. */
  locale?: string;
  /** Sidens egen OG-beskrivelse. Falder tilbage til den site-brede. */
  description?: string;
}

/**
 * Canonical + og:url pr. rute, plus valgfri per-side-override af titel/locale.
 *
 * Canonical peger på ruten selv, ikke på forsiden: en canonical der samler
 * alle ruter på ét URL ville bede søgemaskiner om at ignorere undersiderne.
 */
export function pageSeo(opts: PageSeo) {
  const url = `${SITE_URL}${opts.path === '/' ? '/' : opts.path}`;
  return {
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { property: 'og:url', content: url },
      // 🔴 BEGGE kort, ikke kun og:. Maalt i det byggede HTML: saettes kun
      // og:title, beholder twitter:title den site-brede engelske default, og
      // de to kort viser hver sin titel for samme side. Det er ikke synligt i
      // kilden — kun i artefaktet.
      ...(opts.title
        ? [
            { property: 'og:title', content: opts.title },
            { name: 'twitter:title', content: opts.title },
          ]
        : []),
      ...(opts.description
        ? [
            { property: 'og:description', content: opts.description },
            { name: 'twitter:description', content: opts.description },
          ]
        : []),
      ...(opts.locale ? [{ property: 'og:locale', content: opts.locale }] : []),
    ],
  };
}
