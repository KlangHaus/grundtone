# Border & Border Radius

Utility classes for borders and border radius. Both use semantic design tokens and support
responsive variants.

---

## Border

### All Sides

| Class      | CSS                                          |
| ---------- | -------------------------------------------- |
| `border`   | `border: 1px solid var(--color-border-light)` |
| `border-0` | `border: 0`                                  |

<CodePreview name="bd-all" />

### Individual Sides

| Class      | CSS                                                    |
| ---------- | ------------------------------------------------------ |
| `border-t` | `border-top: 1px solid var(--color-border-light)`       |
| `border-b` | `border-bottom: 1px solid var(--color-border-light)`    |
| `border-s` | `border-inline-start: 1px solid var(--color-border-light)` |
| `border-e` | `border-inline-end: 1px solid var(--color-border-light)`   |

`border-s` and `border-e` use logical properties — they flip automatically in RTL layouts.

<CodePreview name="bd-sides" />

### Border Colors

Apply to any element that already has a border:

| Class            | CSS variable                  |
| ---------------- | ----------------------------- |
| `border-light`   | `var(--color-border-light)`   |
| `border-medium`  | `var(--color-border-medium)`  |
| `border-strong`  | `var(--color-border-strong)`  |
| `border-inverse` | `var(--color-border-inverse)` |

<CodePreview name="bd-colors" />

---

## Border Radius

| Class          | CSS variable        | Value    |
| -------------- | ------------------- | -------- |
| `rounded-none` | —                   | 0        |
| `rounded-xs`   | `var(--radius-xs)`  | 0.125rem |
| `rounded-sm`   | `var(--radius-sm)`  | 0.25rem  |
| `rounded-md`   | `var(--radius-md)`  | 0.375rem |
| `rounded-lg`   | `var(--radius-lg)`  | 0.5rem   |
| `rounded-xl`   | `var(--radius-xl)`  | 0.75rem  |
| `rounded-2xl`  | `var(--radius-2xl)` | 1rem     |
| `rounded-3xl`  | `var(--radius-3xl)` | 1.5rem   |
| `rounded-full` | `var(--radius-full)`| 9999px   |

<CodePreview name="bd-radius" />

### Combined Example

<CodePreview name="bd-combined" />

---

## Responsive Variants

All border and radius classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

```html
<!-- No border on mobile, border from md up -->
<div class="md:border md:rounded-lg">Responsive card</div>

<!-- Square on mobile, rounded from sm up -->
<img class="rounded-none sm:rounded-full" src="avatar.jpg" />
```

---

## SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.card {
  border: 1px solid gt.color('border-light');
  border-radius: gt.radius('md');
}
```
