# Typography

Font size, font weight, line height, and font family utilities.
All values reference CSS custom properties from the theme.

---

## Font Size

| Class      | CSS variable            | Default  |
| ---------- | ----------------------- | -------- |
| `text-xs`  | `var(--font-size-xs)`   | 0.75rem  |
| `text-sm`  | `var(--font-size-sm)`   | 0.875rem |
| `text-base`| `var(--font-size-base)` | 1rem     |
| `text-lg`  | `var(--font-size-lg)`   | 1.125rem |
| `text-xl`  | `var(--font-size-xl)`   | 1.25rem  |
| `text-2xl` | `var(--font-size-2xl)`  | 1.5rem   |
| `text-3xl` | `var(--font-size-3xl)`  | 1.875rem |
| `text-4xl` | `var(--font-size-4xl)`  | 2.25rem  |
| `text-5xl` | `var(--font-size-5xl)`  | 3rem     |

<CodePreview name="ty-sizes" />

---

## Font Weight

| Class           | CSS variable                 | Value |
| --------------- | ---------------------------- | ----- |
| `font-thin`     | `var(--font-weight-thin)`    | 100   |
| `font-light`    | `var(--font-weight-light)`   | 300   |
| `font-normal`   | `var(--font-weight-normal)`  | 400   |
| `font-medium`   | `var(--font-weight-medium)`  | 500   |
| `font-semibold` | `var(--font-weight-semibold)`| 600   |
| `font-bold`     | `var(--font-weight-bold)`    | 700   |
| `font-extrabold`| `var(--font-weight-extrabold)`| 800  |

<CodePreview name="ty-weights" />

---

## Line Height

| Class            | CSS variable                | Value |
| ---------------- | --------------------------- | ----- |
| `leading-none`   | `var(--line-height-none)`   | 1     |
| `leading-tight`  | `var(--line-height-tight)`  | 1.25  |
| `leading-snug`   | `var(--line-height-snug)`   | 1.375 |
| `leading-normal` | `var(--line-height-normal)` | 1.5   |
| `leading-relaxed`| `var(--line-height-relaxed)`| 1.625 |
| `leading-loose`  | `var(--line-height-loose)`  | 2     |

---

## Font Family

| Class         | CSS variable               |
| ------------- | -------------------------- |
| `font-base`   | `var(--font-family-base)`  |
| `font-heading`| `var(--font-family-heading)`|
| `font-mono`   | `var(--font-family-mono)`  |

---

## Responsive Variants

All typography classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

```html
<h1 class="text-2xl md:text-4xl font-bold">
  Responsive heading
</h1>
```

---

## SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.heading {
  font-size: gt.font-size('3xl');
  font-weight: gt.font-weight('bold');
  line-height: gt.line-height('tight');
}
```
