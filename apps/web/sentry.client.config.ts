import * as Sentry from '@sentry/nuxt';

// Browser-side error reporting for grundtone.com.
//
// WHY ONLY A CLIENT CONFIG, AND NO sentry.server.config.*
// apps/web is `ssr: true` + `nuxi generate`, i.e. prerendered: there is no
// server runtime to instrument, only a client that hydrates. Measured in
// @sentry/nuxt's own module.js: the client plugin is registered `mode:
// "client"`, gated solely on this file existing — not on SSR or Nitro — while
// the entire server half sits inside `if (serverConfigFile)`. Omitting the
// server config therefore registers nothing server-side, and `nuxi generate`
// never touches it. This is also why the missing `error.vue` and `plugins/`
// are not an obstacle: the module contributes its own plugin.
//
// 🔴 THE DSN IS BAKED IN AT BUILD TIME, NOT AT DEPLOY TIME.
// On a prerendered site `runtimeConfig.public` is inlined into the emitted
// bundles during `nuxi generate`. A `NUXT_PUBLIC_SENTRY_DSN` set at deploy
// time changes nothing — the value must be present in the build environment.
// This differs from grundtone-studio, which serves from a Nitro server and can
// be overridden per environment without rebuilding. Copying studio's wording
// here would have been wrong.
//
// 🔴 THIS IS A SEPARATE VALUE FROM THE EXISTING `SENTRY_DSN` SECRET.
// That one is consumed by the build-time publish scripts (publish-bunny.ts,
// publish-cdn.ts) and is handled as a repository secret. A browser DSN is
// public by construction — it ships inside the JavaScript every visitor
// downloads. Reusing the secret would publish a value that is currently
// treated as confidential, and would mix visitor errors with CI publish
// failures in one project. Which project the browser reports to is a decision
// for [sikkerhed]/Allan, not something to settle by reaching for the nearest
// existing value.

const config = useRuntimeConfig();

// The port opens only on a positively declared value. Unset or empty means the
// SDK initialises disabled — no network calls, no events — rather than
// half-configured. A build without a DSN is therefore inert by construction,
// not silently broken.
const dsn = config.public.sentryDsn;

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  environment: config.public.sentryEnvironment || 'unknown',

  // This is a static marketing site: no sessions, no user data, no
  // long-running transactions worth sampling heavily. Tracing stays low in
  // production and full elsewhere, matching studio so the two dashboards are
  // comparable.
  tracesSampleRate:
    config.public.sentryEnvironment === 'production' ? 0.1 : 1.0,

  // Replay and profiling are deliberately off. They capture DOM state, which
  // is a GDPR question nobody has answered for a public site yet. Turning them
  // on is a decision with a reviewer, not a default.
  integrations: [],
});
