# @grundtone/email

## 0.3.3 - 2026-09-24

### Patch Changes

- [#231](https://github.com/KlangHaus/grundtone/pull/231)
  [`8930bbe`](https://github.com/KlangHaus/grundtone/commit/8930bbef4f321511d54e2c10de0fc28ec9e23b53)
  Thanks [@allanasp](https://github.com/allanasp)! - Ship the MIT licence text inside the package
  itself.

  Every package already declared `license: MIT`, and npm has served that to everyone installing them
  — but the text existed nowhere in the repository, and the README's licence badge linked to a file
  that answered 404. npm includes `LICENSE` from the package directory only; it does not reach up to
  a monorepo root, so a root-level file would satisfy a human browsing GitHub and nobody who
  installs the package.

  No terms change: this makes the grant that was already published readable in the artefact that
  carries it.

- Updated dependencies
  [[`8930bbe`](https://github.com/KlangHaus/grundtone/commit/8930bbef4f321511d54e2c10de0fc28ec9e23b53)]:
  - @grundtone/core@3.2.2

## 0.3.2 - 2026-09-19

### Patch Changes

- Updated dependencies
  [[`90bc07d`](https://github.com/KlangHaus/grundtone/commit/90bc07df2e7cdff7368a692fdd60f354da5445d2)]:
  - @grundtone/core@3.2.0

## 0.3.1 - 2026-08-23

### Patch Changes

- Updated dependencies
  [[`e4ae9d6`](https://github.com/KlangHaus/grundtone/commit/e4ae9d6947bd21716476c776fdea80b2f51d307c)]:
  - @grundtone/core@3.0.0

## 0.3.0 - 2026-08-05

### Minor Changes

- [#111](https://github.com/KlangHaus/grundtone/pull/111)
  [`180ca8e`](https://github.com/KlangHaus/grundtone/commit/180ca8eea0beea013358f3119aba2d20b804a06a)
  Thanks [@allanasp](https://github.com/allanasp)! - Ny skabelon `vies-verification-failed` (da+en):
  momsnummer kunne ikke verificeres hos VIES — ruling-konform copy (ToS §5.5: 14-dages frist, ingen
  efteropkrævning ved rettidig rettelse), deep link til /orgs/:slug/billing. Vars: fornavn,
  momsnummer, plan_navn, org_slug.

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
