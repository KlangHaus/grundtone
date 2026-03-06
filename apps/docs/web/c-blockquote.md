# Blockquote Variants

Modifier classes that extend the base [`<blockquote>`](/web/el-blockquote) element style.

---

## Quotes

Decorative typographic quote mark as a pseudo-element.

| Class | Purpose |
| --- | --- |
| `.blockquote--quotes` | Adds a large `"` character in the top-left corner |

<CodePreview name="c-bq-quotes" />

```html
<blockquote class="blockquote--quotes">
  <p>Name tokens by function — not color.</p>
</blockquote>
```

---

## Gradient

Left accent fades from primary to transparent.

| Class | Purpose |
| --- | --- |
| `.blockquote--gradient` | Replaces solid border-left with a gradient pseudo-element |

<CodePreview name="c-bq-gradient" />

```html
<blockquote class="blockquote--gradient">
  <p>Name tokens by function — not color.</p>
</blockquote>
```

---

## Pull Quote

Magazine-style centered pull-quote with top/bottom borders.

| Class | Purpose |
| --- | --- |
| `.blockquote--pull` | Removes background and left border, adds horizontal rules, centers text |

<CodePreview name="c-bq-pull" />

```html
<blockquote class="blockquote--pull">
  <p>Name tokens by function — not color.</p>
</blockquote>
```
