// grundtone.com landing site — fully static (SSG). `nuxi generate` prerenders
// every route to plain HTML for Bunny Edge Storage + Pull Zone hosting
// (infra/docs/MASTER-PLAN.md #3: apex via PullZone/Flatten-record).
// studio.grundtone.com serves /studio — edge-rule/redirect until it warrants
// its own build ([infra] call).
import { OG_DESCRIPTION, OG_TITLE } from './lib/seo';

// ─── Sentry: declare the branch OUT LOUD, and ship nothing when inert ────────
//
// FAILURE DIRECTION, DECLARED BEFORE THE CODE.
// The tempting rule is "a production build without a DSN must fail". Measured,
// it cannot be done today without breaking a deploy that currently works:
// BUILD_SHA is set only by deploy-web.yml (absent in ci.yml and locally), so it
// is a reliable production marker — but no DSN exists anywhere yet, so failing
// on that branch would break the next grundtone.com deploy.
//
// So the fallback publishes NOTHING instead: with no DSN the module is not
// registered at all, and no Sentry code reaches the bundle. That matters more
// than the warning. Registering it anyway would leave an output that READS as
// instrumented — module present, config present, @sentry/* in 17 chunks — while
// reporting nothing, and nothing would say so. Something that resembles
// coverage is worse than an absence, because an absence is visible.
//
// The declaration below is machine-readable on purpose (`WEB_SENTRY=`), so a
// build log can be asserted on rather than read by a human who may not look.
const sentryDsn = process.env.NUXT_PUBLIC_SENTRY_DSN ?? '';
const isProductionDeploy = Boolean(process.env.BUILD_SHA);

if (sentryDsn) {
  console.info('WEB_SENTRY=active — browser error reporting is wired');
} else if (isProductionDeploy) {
  // GitHub Actions renders `::warning::` as an annotation, so this is visible
  // on the run itself and not only in the log body.
  console.warn(
    '::warning title=grundtone.com ships without error reporting::' +
      'WEB_SENTRY=absent — NUXT_PUBLIC_SENTRY_DSN is unset on a production ' +
      'build (BUILD_SHA is present). The Sentry module is NOT registered, so ' +
      'the site is uninstrumented rather than falsely instrumented. Client ' +
      'errors reach nobody. This becomes a hard failure once a DSN exists.',
  );
} else {
  console.info(
    'WEB_SENTRY=absent — no NUXT_PUBLIC_SENTRY_DSN; Sentry module not ' +
      'registered (expected outside a production deploy)',
  );
}

export default defineNuxtConfig({
  compatibilityDate: '2026-03-13',
  ssr: true,
  modules: ['@grundtone/nuxt', ...(sentryDsn ? ['@sentry/nuxt/module'] : [])],
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
  runtimeConfig: {
    public: {
      // Browser-facing Sentry DSN. Empty by default so a build without it is
      // inert rather than half-configured — see sentry.client.config.ts.
      //
      // 🔴 Inlined at BUILD time. apps/web is prerendered, so this value is
      // baked into the emitted bundles by `nuxi generate`; setting
      // NUXT_PUBLIC_SENTRY_DSN at deploy time changes nothing. It must be
      // present in the build environment.
      //
      // Deliberately NOT the existing `SENTRY_DSN` repository secret: that one
      // feeds the build-time publish scripts, while a browser DSN is public by
      // construction and ships to every visitor.
      sentryDsn: '',
      sentryEnvironment: '',
    },
  },
  // 'hidden': emit client source maps for the Sentry upload without
  // referencing them from the served bundles. Without this the upload has
  // nothing to work with and stack traces point at minified output.
  sourcemap: { client: 'hidden' },
  sentry: {
    // 🔴 Off by default. The plugin otherwise sends build-time telemetry to
    // Sentry on every build — an outbound third-party data flow that arrived
    // as a side effect of adding the module, not as a decision. The build log
    // says so itself: "Sending telemetry data on issues and performance to
    // Sentry". EU-first doctrine makes silent egress the wrong default.
    telemetry: false,
    sourceMapsUploadOptions: {
      org: 'klanghaus',
      // 🔴 The project name is a placeholder until someone provisions it.
      // Upload requires SENTRY_AUTH_TOKEN, which grundtone does NOT have as a
      // repository secret (grundtone-studio does). Without the token the
      // upload step skips silently, and traces will point at minified lines —
      // the acceptance criterion for this work is therefore not met by
      // merging this file alone.
      project: 'grundtone-web',
      sourcemaps: {
        // The maps exist ONLY for Sentry. grundtone.com is served as static
        // files from edge storage, so a shipped .map is a public source
        // disclosure — stricter here than for a private SaaS.
        filesToDeleteAfterUpload: ['.output/public/**/*.map'],
      },
    },
  },
  devtools: { enabled: false },
});
