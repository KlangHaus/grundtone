# Email

`@grundtone/email` provides framework-agnostic, **token-themed** email building blocks. You author
emails with MJML blocks that read grundtone design tokens; the build step compiles them to
bulletproof, responsive, **CSS-inlined HTML** with <code v-pre>{{handlebars}}</code> placeholders left intact for a
send-time templating layer, plus a plain-text fallback.

The only coupling between grundtone and the email artifact is **token values** from
`@grundtone/core` — there is no Vue or React in the output. Email is just HTML + inlined CSS, themed
by tokens, so grundtone stays multi-framework.

```
@grundtone/core (tokens)
   │  resolveEmailTheme()
   ▼
blocks (token-themed MJML)  →  compile (MJML → inlined HTML)  →  artifact (HTML + text, {{vars}})
                                                                     │
                                       published to CDN ─────────────┤── notifications service fills vars, sends via Resend
                                       (same pipeline as design tokens)
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

const theme = resolveEmailTheme();
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

const { html } = compileMjml(mjml, { validationLevel: 'strict' });
const text = toPlainText(html); // plain-text fallback, {{url}} preserved
```

`html` is bulletproof inlined HTML that still contains <code v-pre>{{url}}</code>. A consumer fills the placeholders
at send time.

## Theming

`resolveEmailTheme(theme?, options?)` projects a grundtone `Theme` into the `EmailTheme` that blocks
read from. With no argument it uses the default light preset. To brand an email, pass a resolved
theme from `createTheme`:

```ts
import { createTheme } from '@grundtone/core';

const branded = createTheme({ light: { primary: '#996600' } });
const theme = resolveEmailTheme(branded.light);
```

Lengths are converted from the token `rem` scale to `px` (Outlook is unreliable with `rem`); the
values still come from tokens. Web fonts default to IBM Plex Sans via `<mj-font>`, with the token
font stack as the fallback for clients that block web fonts.

See [Blocks](/email/blocks) for the building blocks and [Templates](/email/templates) for authoring,
the send-time variable contract, and the CDN publish pipeline.

## Security note

`renderTemplate` HTML-escapes recipient data, which is safe in HTML **text** and quoted
**attribute** contexts. Escaping does **not** validate URL schemes — a value placed in
<code v-pre>href="{{url}}"</code> is emitted verbatim, so `javascript:`/`data:` URLs survive. Pass trusted/validated
URLs for link placeholders; URL-scheme allowlisting belongs at the data boundary (the built-in
templates use system-generated URLs).
