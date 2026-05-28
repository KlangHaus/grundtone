# Blocks

Blocks are the building units of an email. Each is a pure function — theme + options in,
section-level MJML out — so they compose by concatenation. `createBlocks(theme)` returns the set
pre-bound to a theme:

```ts
import { resolveEmailTheme, createBlocks } from '@grundtone/email';

const b = createBlocks(resolveEmailTheme());
const body = [b.heading({ text: 'Hi' }), b.text({ text: 'Welcome.' })].join('\n');
```

Every block reads its colours, fonts, spacing and radii from the resolved `EmailTheme` — nothing is
hand-picked — and the build step inlines the resulting CSS.

## header

A centered brand logo.

```ts
b.header({ logoUrl: 'https://cdn.example.com/logo.png', logoAlt: 'Grundtone', logoWidth: '140px' });
```

| Option | Type | Notes |
| --- | --- | --- |
| `logoUrl` | `string` | Absolute URL to the logo image. |
| `logoAlt` | `string` | Alt text / fallback when images are blocked. |
| `logoWidth` | `string?` | Display width. Defaults to `140px`. |
| `href` | `string?` | Optional link wrapping the logo. |
| `align` | `'left' \| 'center' \| 'right'?` | Defaults to `center`. |

## heading

A themed heading using the `h1`/`h2` named type styles.

```ts
b.heading({ text: 'Welcome {{name}}', level: 1 });
```

| Option | Type | Notes |
| --- | --- | --- |
| `text` | `string` | May contain <code v-pre>{{placeholders}}</code> and inline markup. |
| `level` | `1 \| 2?` | `1` = display, `2` = section heading. Defaults to `1`. |
| `align` | `'left' \| 'center' \| 'right'?` | |

## text

A paragraph of body copy.

```ts
b.text({ text: 'Body copy.', size: 'lead', muted: true });
```

| Option | Type | Notes |
| --- | --- | --- |
| `text` | `string` | May contain <code v-pre>{{placeholders}}</code> and inline markup. |
| `size` | `'base' \| 'lead' \| 'small'?` | Defaults to `base`. |
| `muted` | `boolean?` | Render in the secondary text colour. |
| `align` | `'left' \| 'center' \| 'right'?` | |

## button

A bulletproof call-to-action button.

```ts
b.button({ label: 'Open', href: '{{url}}', variant: 'primary' });
```

| Option | Type | Notes |
| --- | --- | --- |
| `label` | `string` | |
| `href` | `string` | Destination URL, typically a placeholder. |
| `variant` | `'primary' \| 'secondary'?` | `secondary` is outlined. Defaults to `primary`. |
| `align` | `'left' \| 'center' \| 'right'?` | |

## infobox

A tinted callout themed from the status tokens.

```ts
b.infobox({ tone: 'warning', title: 'Heads up', text: 'The link expires in {{hours}} hours.' });
```

| Option | Type | Notes |
| --- | --- | --- |
| `tone` | `'info' \| 'success' \| 'warning' \| 'error'` | Picks the matching status palette. |
| `text` | `string` | Body content. |
| `title` | `string?` | Optional bold title line. |

## invoiceTable

A line-items table (faktura) with a Handlebars <code v-pre>{{#each}}</code> loop left intact for the send-time layer.

```ts
b.invoiceTable({
  each: 'items',
  columns: [
    { header: 'Description', cell: '{{this.description}}' },
    { header: 'Qty', cell: '{{this.quantity}}', align: 'right' },
    { header: 'Amount', cell: '{{this.amount}}', align: 'right' },
  ],
  total: { label: 'Total', value: '{{total}}' },
});
```

| Option | Type | Notes |
| --- | --- | --- |
| `columns` | `{ header, cell, align? }[]` | `cell` is a per-item expression, e.g. <code v-pre>{{this.amount}}</code>. |
| `each` | `string?` | Iterable to loop. Defaults to `items`. |
| `total` | `{ label, value }?` | Optional totals row. |

## divider / spacer

```ts
b.divider();
b.spacer({ size: 'xl' }); // size is a spacing token; defaults to md
```

## footer

Small, muted, centered footer below the card, with an optional unsubscribe link.

```ts
b.footer({ text: 'Grundtone ApS · Copenhagen', unsubscribeUrl: '{{unsubUrl}}', unsubscribeLabel: 'Unsubscribe' });
```

| Option | Type | Notes |
| --- | --- | --- |
| `text` | `string` | Footer lines. |
| `unsubscribeUrl` | `string?` | Appends an unsubscribe link (required for marketing). |
| `unsubscribeLabel` | `string?` | Defaults to `Unsubscribe`. |
