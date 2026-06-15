# @grundtone/email

## 0.1.0

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
