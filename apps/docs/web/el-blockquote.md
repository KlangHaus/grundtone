# Blockquote

Base element styles for `<blockquote>`. Clean default with left accent border.

For variants see [Blockquote Variants](/web/c-blockquote).

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
