# @grundtone/email

## 0.2.0 - 2026-07-13

### Minor Changes

- [#54](https://github.com/KlangHaus/grundtone/pull/54)
  [`0ca7d77`](https://github.com/KlangHaus/grundtone/commit/0ca7d77bfda6ee97cc45880d63f7e1cf66753c02)
  Thanks [@allanasp](https://github.com/allanasp)! - Migrate to mjml 5. mjml's render is now
  asynchronous, so the compile chain is async accordingly: `compileMjml`, `compileTemplate` and
  `renderEmail` now return Promises (add `await`). `renderTemplate` (pure Handlebars interpolation)
  stays synchronous, and the published artifact shape/contract is unchanged — the Go notifications
  consumer is unaffected.

### Patch Changes

- [#48](https://github.com/KlangHaus/grundtone/pull/48)
  [`1c29557`](https://github.com/KlangHaus/grundtone/commit/1c295570c3701417d0cf6cad8c3873cdc2f87b01)
  Thanks [@allanasp](https://github.com/allanasp)! - Add the CDN publish step (`publish:cdn`, wired
  into `release.yml`): uploads the `compile:templates` output tree to Bunny Edge Storage so
  notifications' `CDNRenderer` can fetch published templates via `TEMPLATE_CDN_BASE_URL`. Skips
  cleanly until the Bunny zone secrets (`BUNNY_EMAIL_STORAGE_ZONE` / `BUNNY_EMAIL_STORAGE_API_KEY`)
  are provisioned. Upload failures are captured to Sentry (`SENTRY_DSN`, also optional) with tracing
  spans around each PUT; refuses to flip the "current" manifest pointer if zero artifacts were found
  for the version being published. No change to the package's public API or compiled artifact shape.

## 0.1.0 - 2026-07-13

### Minor Changes

- [#16](https://github.com/KlangHaus/grundtone/pull/16)
  [`571e383`](https://github.com/KlangHaus/grundtone/commit/571e38329ea22d7a0ed1c23b0dbf161a7e90839a)
  Thanks [@allanasp](https://github.com/allanasp)! - Add `@grundtone/email`: framework-agnostic,
  token-themed MJML email building blocks. Authoring uses blocks that read grundtone tokens; the
  build step compiles to bulletproof, CSS-inlined HTML with `{{handlebars}}` placeholders preserved
  for a send-time layer, plus a plain-text fallback. Includes a theme resolver, base layout, blocks
  (header, heading, text, button, divider, spacer, infobox, invoice table, footer), the
  `defineTemplate`/`compileTemplate`/`renderTemplate` API, built-in templates (magic-link,
  verify-email, org-invite, invoice), and a CDN-shaped publish script.
