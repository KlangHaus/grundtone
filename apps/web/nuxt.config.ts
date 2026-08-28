// grundtone.com landing site — fully static (SSG). `nuxi generate` prerenders
// every route to plain HTML for Bunny Edge Storage + Pull Zone hosting
// (infra/docs/MASTER-PLAN.md #3: apex via PullZone/Flatten-record).
// studio.grundtone.com serves /studio — edge-rule/redirect until it warrants
// its own build ([infra] call).
import { OG_DESCRIPTION, OG_TITLE } from './lib/seo';

export default defineNuxtConfig({
  compatibilityDate: '2026-03-13',
  ssr: true,
  modules: ['@grundtone/nuxt'],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/studio'],
    },
  },
  grundtone: {
    // Default grundtone theme — the site IS the design-system showcase, so it
    // runs stock tokens rather than a custom brand.
    components: true,
    composables: true,
    prefix: 'GT',
  },
  css: ['~/assets/css/landing.css'],
  app: {
    head: {
      // English is canonical site copy (Allan-direktiv 2026-08-04, cmo 46b3447).
      // NB: den gamle description nævnte "React" (web) — den pakke findes ikke;
      // rettet samtidig med sprogskiftet.
      htmlAttrs: { lang: 'en' },
      title: 'grundtone — open source design system',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Build-sha i HTML'en, så deploy-smoken kan binde "sitet svarer" til
        // "DENNE commits build er live" — ellers består smoken på enhver
        // tidligere deploy ([review]-fund på #136). 'dev' lokalt.
        { name: 'build-sha', content: process.env.BUILD_SHA ?? 'dev' },
        {
          name: 'description',
          content:
            'Open source design system for Vue/Nuxt with the same tokens theming your email templates. Token-native. Framework-agnostic. Runtime theming, no rebuild.',
        },
        // Site-brede Open Graph/Twitter-defaults. Teksten er [cmo]s, ordret fra
        // seo-baseline-cmo-svar.md §G4 — se lib/seo.ts for kilde og for hvorfor
        // og:image bevidst mangler. Pr.-rute-felterne (canonical, og:url) kan
        // ikke stå her: de afhænger af ruten og sættes i siderne.
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'grundtone' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: OG_TITLE },
        { property: 'og:description', content: OG_DESCRIPTION },
        // summary frem for summary_large_image: det store format viser et
        // billede vi ikke har endnu, og et tomt stort kort er daarligere end
        // et lille korrekt. Skiftes naar [designer] leverer og:image.
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: OG_TITLE },
        { name: 'twitter:description', content: OG_DESCRIPTION },
      ],
      // Served from apps/web/public — copies of @grundtone/core/assets (official mark).
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],
    },
  },
  devtools: { enabled: false },
});
