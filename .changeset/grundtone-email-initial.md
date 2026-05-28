---
'@grundtone/email': minor
---

Add `@grundtone/email`: framework-agnostic, token-themed MJML email building blocks. Authoring uses
blocks that read grundtone tokens; the build step compiles to bulletproof, CSS-inlined HTML with
`{{handlebars}}` placeholders preserved for a send-time layer, plus a plain-text fallback. Includes
a theme resolver, base layout, blocks (header, heading, text, button, divider, spacer, infobox,
invoice table, footer), the `defineTemplate`/`compileTemplate`/`renderTemplate` API, built-in
templates (magic-link, verify-email, org-invite, invoice), and a CDN-shaped publish script.
