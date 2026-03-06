# Blockquote

Base element styles for `<blockquote>`. Clean default with left accent border.

---

## Styling

| Property | Value |
| --- | --- |
| `border-left` | `3px solid var(--color-primary)` |
| `background` | `var(--color-surface)` |
| `padding` | `var(--space-lg) var(--space-xl)` |
| `border-radius` | `var(--radius-md)` |
| `color` | `var(--color-text-secondary)` |
| `font-style` | `italic` |
| `line-height` | `var(--line-height-relaxed)` |

Nested `<p>` tags have `margin: 0`.

### Preview

<CodePreview name="el-blockquote" />

---

## Usage

```html
<blockquote>
  <p>Design tokens are contracts between design and implementation.</p>
</blockquote>
```

---

## Variants

### `.blockquote--quotes`

Decorative typographic quote mark as a pseudo-element.

| Class | Purpose |
| --- | --- |
| `.blockquote--quotes` | Adds a large `"` character in the top-left corner |

<CodePreview name="el-bq-quotes" />

```html
<blockquote class="blockquote--quotes">
  <p>Name tokens by function — not color.</p>
</blockquote>
```

---

### `.blockquote--gradient`

Left accent fades from primary to transparent.

| Class | Purpose |
| --- | --- |
| `.blockquote--gradient` | Replaces solid border-left with a gradient pseudo-element |

<CodePreview name="el-bq-gradient" />

```html
<blockquote class="blockquote--gradient">
  <p>Name tokens by function — not color.</p>
</blockquote>
```

---

### `.blockquote--pull`

Magazine-style centered pull-quote with top/bottom borders.

| Class | Purpose |
| --- | --- |
| `.blockquote--pull` | Removes background and left border, adds horizontal rules, centers text |

<CodePreview name="el-bq-pull" />

```html
<blockquote class="blockquote--pull">
  <p>Name tokens by function — not color.</p>
</blockquote>
```
