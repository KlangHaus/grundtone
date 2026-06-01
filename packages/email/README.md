# @grundtone/email

Framework-agnostic, **token-themed** email building blocks for grundtone. Authoring happens with
MJML blocks that read grundtone design tokens; the build step compiles them to bulletproof,
responsive, **CSS-inlined HTML** with `{{handlebars}}` placeholders left intact for a send-time
templating layer, plus a plain-text fallback.

The only coupling between grundtone and the email artifact is **token values** from
`@grundtone/core` — there is no Vue or React in the output. Email is just HTML + inlined CSS, themed
by tokens, so grundtone stays multi-framework.

```
@grundtone/core (tokens)
   │  resolveEmailTheme()
   ▼
blocks (token-themed MJML)  →  compile (MJML → inlined HTML)  →  artifact (HTML + text, {{vars}})
                                                                     │
                                              published to CDN ──────┤── notifications service (Go) fills vars, sends via Resend
                                              (same pipeline as tokens)
```

## Install

```bash
pnpm add @grundtone/email
```

## Quick start

```ts
import {
  resolveEmailTheme,
  createBlocks,
  baseLayout,
  compileMjml,
  toPlainText,
} from '@grundtone/email';

const theme = resolveEmailTheme(); // or resolveEmailTheme(createTheme({ light: { primary: '#996600' } }).light)
const b = createBlocks(theme);

const mjml = baseLayout({
  theme,
  preheader: 'Your sign-in link is ready.',
  content: [
    b.heading({ text: 'Sign in' }),
    b.text({ text: 'Click below to sign in.', size: 'lead' }),
    b.button({ label: 'Sign in', href: '{{url}}' }),
  ].join('\n'),
});

const { html, errors } = compileMjml(mjml, { validationLevel: 'strict' });
const text = toPlainText(html); // plain-text fallback, {{url}} preserved
```

`html` is bulletproof inlined HTML that still contains `{{url}}`. A consumer fills the placeholders
at send time.

## Authoring templates

A template bundles a subject, optional preheader, and a block-composed body per locale:

```ts
import { defineTemplate, compileTemplate, renderEmail } from '@grundtone/email';

const welcome = defineTemplate({
  key: 'welcome',
  variables: ['name', 'url'],
  locales: {
    en: {
      subject: 'Welcome {{name}}',
      preheader: 'Verify your email to get started.',
      build: b => ({
        content:
          b.heading({ text: 'Welcome {{name}}' }) + b.button({ label: 'Verify', href: '{{url}}' }),
      }),
    },
  },
});

// Compile once to the publishable artifact (placeholders intact):
const artifact = compileTemplate(welcome, 'en'); // { subject, html, text, variables, errors }

// Or compile + fill data in one step (direct send from TypeScript):
const { subject, html, text } = renderEmail(welcome, 'en', { name: 'Allan', url: 'https://…' });
```

Built-in templates (`magic-link`, `verify-email`, `org-invite`, `invoice`) are exported from
`@grundtone/email/templates`.

## Variables & the send-time contract

The compiled artifact carries **Handlebars** syntax:

- `{{var}}` — HTML-escaped in the HTML body, raw in subject/text.
- `{{#each items}} … {{/each}}` — loops (e.g. invoice line items).
- `{{#if name}} … {{/if}}` — conditionals.

Escaping makes recipient data safe in HTML **text** and quoted **attribute** contexts, but it does
**not** validate URL schemes — a value placed in `href="{{url}}"` is emitted verbatim, so
`javascript:`/`data:` URLs survive. Pass trusted/validated URLs for link placeholders (the built-in
templates use system-generated URLs); URL-scheme allowlisting belongs at the data boundary.

`renderTemplate(artifact, data)` performs the substitution in JS (for previews, tests, and
TypeScript consumers). The Go notifications service performs the equivalent substitution on the
published artifact before sending via Resend.

## Publishing

`pnpm compile:templates` compiles every built-in template × locale to a versioned, CDN-shaped
artifact tree under `published/` (`v{version}/{key}/{locale}.json` + `manifest.json`). This mirrors
the design-token publish pipeline: change a token → re-compile → re-publish → email design updates.
The script does not upload — it produces the artifact a deploy step (or the studio publish pipeline)
consumes.

## Blocks

`header`, `heading`, `text`, `button`, `divider`, `spacer`, `infobox` (status-themed),
`invoiceTable` (line-items with a `{{#each}}` loop), `footer`. All read their colours, fonts,
spacing and radii from the resolved `EmailTheme` — nothing is hand-picked, and the build step
inlines the resulting CSS.

## Notes

- Lengths are converted from the token `rem` scale to `px` for the email medium (Outlook is
  unreliable with `rem`); the values still come from tokens.
- Web fonts default to IBM Plex Sans (grundtone's base font) via `<mj-font>`, with the token font
  stack as the fallback for clients that block web fonts.
