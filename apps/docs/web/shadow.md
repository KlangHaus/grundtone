# Shadow

Utility classes for `box-shadow`. All values reference CSS custom properties (`--shadow-*`)
set by the theme, so shadows adapt to your design tokens.

---

## Available Classes

| Class | CSS |
| --- | --- |
| `shadow-xs` | `box-shadow: var(--shadow-xs)` |
| `shadow-sm` | `box-shadow: var(--shadow-sm)` |
| `shadow-md` | `box-shadow: var(--shadow-md)` |
| `shadow-lg` | `box-shadow: var(--shadow-lg)` |
| `shadow-xl` | `box-shadow: var(--shadow-xl)` |
| `shadow-2xl` | `box-shadow: var(--shadow-2xl)` |
| `shadow-inner` | `box-shadow: var(--shadow-inner)` |
| `shadow-none` | `box-shadow: none` |

### Shadow Scale

<CodePreview name="sh-scale" />

### Inner & None

<CodePreview name="sh-special" />

### Combined with Rounded & Transitions

<CodePreview name="sh-combined" />

---

## Responsive Variants

All shadow classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

```html
<!-- No shadow on mobile, medium shadow from md up -->
<div class="md:shadow-md md:rounded-lg">Responsive card</div>

<!-- Subtle shadow on mobile, larger on desktop -->
<div class="shadow-sm lg:shadow-xl">Elevating card</div>
```

---

## SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.card {
  box-shadow: gt.shadow('md');
  border-radius: gt.radius('lg');
}
```
