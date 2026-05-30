# Templates

A template bundles a subject, optional preheader, and a block-composed body per locale.

```ts
import { defineTemplate, compileTemplate, renderEmail } from '@grundtone/email';

const welcome = defineTemplate({
  key: 'welcome',
  variables: ['name', 'url'],
  locales: {
    en: {
      subject: 'Welcome {{name}}',
      preheader: 'Verify your email to get started.',
      build: (b) => ({
        content:
          b.heading({ text: 'Welcome {{name}}' }) +
          b.button({ label: 'Verify', href: '{{url}}' }),
      }),
    },
  },
});
```

Compile once to the publishable artifact (placeholders intact), or compile and fill data in one
step:

```ts
const artifact = compileTemplate(welcome, 'en'); // { subject, html, text, variables, errors }
const { subject, html, text } = renderEmail(welcome, 'en', { name: 'Allan', url: 'https://…' });
```

The built-in templates — `magic-link`, `verify-email`, `org-invite`, `invoice` — are exported from
`@grundtone/email/templates`.

## The send-time variable contract

The compiled artifact carries **Handlebars** syntax that survives MJML compilation untouched:

- <code v-pre>{{var}}</code> — a value. HTML-escaped in the HTML body, raw in subject/text.
- <code v-pre>{{#each items}} … {{/each}}</code> — loops (e.g. invoice line items, where each item exposes
  <code v-pre>{{this.description}}</code>, <code v-pre>{{this.quantity}}</code>, <code v-pre>{{this.amount}}</code>).
- <code v-pre>{{#if name}} … {{/if}}</code> — conditionals.

`renderTemplate(artifact, data)` performs the substitution in JS — for previews, tests, and
TypeScript consumers. The Go notifications service performs the equivalent (Handlebars-compatible)
substitution on the published artifact before sending via Resend.

::: warning URL placeholders
HTML escaping makes recipient data safe in HTML text and quoted-attribute contexts, but it does
**not** validate URL schemes — a value in <code v-pre>href="{{url}}"</code> is emitted verbatim, so
`javascript:`/`data:` URLs survive. Pass trusted/validated URLs for link placeholders.
:::

## Plain text

Every artifact ships a plain-text fallback. It is auto-derived from the compiled HTML (links become
`text [href]`, the hidden preheader is skipped, and placeholders are preserved). Templates whose body
doesn't auto-derive into readable text — such as the invoice table — provide an authored `text` body
instead.

## Publishing

`pnpm compile:templates` compiles every built-in template × locale into a versioned, CDN-shaped
artifact tree under `published/` (sibling to `dist`, so the npm tarball stays clean):

```
v{version}/{key}/{locale}.json   the publishable artifact (placeholders intact)
v{version}/manifest.json         index of templates, locales and variables
manifest.json                    "current" pointer to the latest manifest
```

This mirrors the design-token publish pipeline: change a token → re-compile → re-publish → the email
design updates. Everything is compiled and validated in memory first; the script refuses to publish
(and touches nothing on disk) if any template fails to compile. It does not upload — it produces the
artifact a deploy step or the studio publish pipeline consumes.
