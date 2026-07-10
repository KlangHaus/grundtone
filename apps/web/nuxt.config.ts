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
      htmlAttrs: { lang: 'da' },
      title: 'grundtone — open source design system',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Open source design system der fungerer i Vue, React, React Native og email på samme tid. Token-native. Framework-agnostisk.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
    },
  },
  devtools: { enabled: false },
});
