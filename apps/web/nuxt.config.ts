// grundtone.com landing site — fully static (SSG). `nuxi generate` prerenders
// every route to plain HTML for Bunny Edge Storage + Pull Zone hosting
// (infra/docs/MASTER-PLAN.md #3: apex via PullZone/Flatten-record).
// studio.grundtone.com serves /studio — edge-rule/redirect until it warrants
// its own build ([infra] call).
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@grundtone/vue/scss/lib" as tokens;`,
        },
      },
    },
  },
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
