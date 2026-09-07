# Print

Shipped print utilities and component overrides for browser printing. Import the main CSS bundle
(`@grundtone/design-system/dist/index.css` or `@grundtone/vue/css`) — print rules are included
automatically.

For SCSS-only consumers, the `print-only` / `screen-only` mixins in [SCSS Mixins](/web/mixins#print)
remain available for custom rules.

---

## Utility classes

| Class | Screen | Print |
| --- | --- | --- |
| `.no-print` | visible | hidden |
| `.screen-only` | visible | hidden |
| `.print-only` | hidden | `display: block` |
| `.print-only-inline` | hidden | `display: inline` |
| `.break-before` | — | force page break before |
| `.break-after` | — | force page break after |
| `.break-inside-avoid` | — | avoid break inside element |

### Examples

```html
<nav class="no-print">…toolbar…</nav>

<footer class="print-only">
  Printed from Example App — {{ date }}
</footer>

<h2 class="break-before">Appendix</h2>
```

---

## Rich text (`.prose`)

Wrap printable article content in `.prose` (optionally with `.container-prose` for reading width).
Print rules include:

- Page-break avoidance on headings, paragraphs, lists, code, tables, and images
- `h1` sizing (screen prose only styled `h2`/`h3` before)
- Tables, blockquotes, `hr`, and responsive images
- External link URLs appended after the link text (`http…` only)
- Background preservation on code blocks and table headers

```html
<article class="container-prose prose">
  <h1>Report</h1>
  <p>Body copy with <a href="https://example.com">a citation</a>.</p>
</article>
```

See also [Prose](/web/c-prose).

---

## Components hidden on print

Fixed or interactive UI is hidden automatically:

| Component | Notes |
| --- | --- |
| `.modal` | Overlays |
| `.toast`, `.toast-container` | Notifications |
| `.cookie-message` | Fixed bar only; `.cookie-message--static` stays |
| `.back-to-top`, `.skip-link` | Navigation chrome |
| `.tooltip`, `.overflow-menu` | Ephemeral UI |
| `.carousel__prev`, `__next`, `__indicators` | Slides print in sequence |
| `.tabs__list` | Active panel prints; tab bar hidden |

---

## Tables

`.table-wrapper--responsive` stacks rows as cards below `40rem`. On print, tabular layout is
restored so columns and headers print correctly.

---

## Page setup

Default `@page` margin is `1.5cm`. `html`/`body` `overflow: hidden` (common in app shells) is reset so
content is not clipped.

---

## Docs site

The VitePress documentation shell hides its own nav, sidebar, and code-preview tabs when printing.
Mark app chrome with `.no-print` in your own layouts the same way.
