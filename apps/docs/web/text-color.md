# Text Color

Semantic text color utilities. Values reference theme color tokens
so they adapt to light/dark mode automatically.

---

## Available Classes

| Class            | CSS variable                   |
| ---------------- | ------------------------------ |
| `text-default`   | `var(--color-text)`            |
| `text-secondary` | `var(--color-text-secondary)`  |
| `text-tertiary`  | `var(--color-text-tertiary)`   |
| `text-inverse`   | `var(--color-text-inverse)`    |
| `text-placeholder`| `var(--color-text-placeholder)`|
| `text-disabled`  | `var(--color-text-disabled)`   |
| `text-primary`   | `var(--color-primary)`         |
| `text-on-primary`| `var(--color-on-primary)`      |
| `text-success`   | `var(--color-success)`         |
| `text-warning`   | `var(--color-warning)`         |
| `text-error`     | `var(--color-error)`           |
| `text-info`      | `var(--color-info)`            |
| `text-inherit`   | `inherit`                      |

<CodePreview name="tc-semantic" />

<CodePreview name="tc-status" />

---

## Responsive Variants

All text color classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

```html
<p class="text-secondary md:text-default">
  Secondary on mobile, default from md up
</p>
```

---

## SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.caption {
  color: gt.color('text-secondary');
}
```
