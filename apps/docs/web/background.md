# Background Color

Semantic background color utilities. All values reference theme color tokens
so they adapt to light/dark mode automatically.

---

## Surface Backgrounds

| Class              | CSS variable                     |
| ------------------ | -------------------------------- |
| `bg-background`    | `var(--color-background)`        |
| `bg-background-alt`| `var(--color-background-alt)`    |
| `bg-surface`       | `var(--color-surface)`           |
| `bg-surface-alt`   | `var(--color-surface-alt)`       |
| `bg-surface-raised`| `var(--color-surface-raised)`    |
| `bg-overlay`       | `var(--color-surface-overlay)`   |
| `bg-backdrop`      | `var(--color-modal-backdrop)`    |
| `bg-transparent`   | `transparent`                    |

<CodePreview name="bg-surfaces" />

## Brand & Status

| Class             | CSS variable                  |
| ----------------- | ----------------------------- |
| `bg-primary`      | `var(--color-primary)`        |
| `bg-primary-light`| `var(--color-primary-light)`  |
| `bg-primary-dark` | `var(--color-primary-dark)`   |
| `bg-secondary`    | `var(--color-secondary)`      |
| `bg-success`      | `var(--color-success)`        |
| `bg-success-light`| `var(--color-success-light)`  |
| `bg-warning`      | `var(--color-warning)`        |
| `bg-warning-light`| `var(--color-warning-light)`  |
| `bg-error`        | `var(--color-error)`          |
| `bg-error-light`  | `var(--color-error-light)`    |
| `bg-info`         | `var(--color-info)`           |
| `bg-info-light`   | `var(--color-info-light)`     |

<CodePreview name="bg-brand" />

---

## Responsive Variants

All background classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

```html
<div class="bg-surface md:bg-surface-raised">
  Surface on mobile, raised from md up
</div>
```

---

## SCSS

```scss
@use '@grundtone/design-system/scss/lib' as gt;

.card {
  background-color: gt.color('surface-raised');
}
```
