# SCSS Mixins

Reusable SCSS mixins for typography, focus states, accessibility, and text utilities.

```scss
@use '@grundtone/design-system/scss/lib' as gt;

.my-heading { @include gt.heading('h2'); }
.my-label   { @include gt.form-label; }
```

---

## Typography

### `heading($level)`

Responsive heading styles. Applies base font-size, weight, line-height, and scales up at `md`/`lg`/`xl` breakpoints automatically.

```scss
.page-title  { @include gt.heading('h1'); }
.section     { @include gt.heading('h3'); }
```

Output for `heading('h1')`:

```css
.page-title {
  font-size: 2.25rem;
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}
@media (min-width: 768px)  { .page-title { font-size: 2.5rem; } }
@media (min-width: 1024px) { .page-title { font-size: 2.75rem; } }
@media (min-width: 1280px) { .page-title { font-size: 3rem; } }
```

Shorthand aliases: `h1` through `h6`.

```scss
.hero { @include gt.h1; }  // same as heading('h1')
```

| Level | Base size | Weight   | Breakpoints      |
| ----- | --------- | -------- | ---------------- |
| `h1`  | 2.25rem   | bold     | md, lg, xl       |
| `h2`  | 1.875rem  | bold     | md, lg           |
| `h3`  | 1.5rem    | bold     | md, lg           |
| `h4`  | 1.25rem   | semibold | md               |
| `h5`  | 1.125rem  | semibold | md               |
| `h6`  | 1rem      | semibold | md               |

### `body-text`

Standard paragraph text using CSS custom properties.

```scss
.article-body { @include gt.body-text; }
// → font-size: var(--font-size-base); line-height: var(--line-height-normal);
```

### `small-text`

Secondary/small text.

```scss
.caption { @include gt.small-text; }
// → font-size: var(--font-size-sm); line-height: var(--line-height-normal);
```

### `lead-text`

Intro/lead paragraph — slightly larger than body.

```scss
.intro { @include gt.lead-text; }
// → font-size: var(--font-size-xl); font-weight: var(--font-weight-normal);
```

---

## Form typography

| Mixin          | Size             | Weight   | Color                  |
| -------------- | ---------------- | -------- | ---------------------- |
| `form-label`   | `--font-size-lg` | semibold | inherited              |
| `form-hint`    | `--font-size-sm` | normal   | `--color-text-secondary` |
| `form-error`   | `--font-size-sm` | semibold | `--color-error`        |

```scss
.field-label { @include gt.form-label; }
.field-hint  { @include gt.form-hint; }
.field-error { @include gt.form-error; }
```

---

## Focus

### `focus`

Accessible focus outline using the theme focus color.

```scss
.btn:focus-visible { @include gt.focus; }
// → outline: 3px solid var(--color-focus); outline-offset: 1px;
```

### `focus-reset`

Remove focus outline (use sparingly — always provide an alternative indicator).

```scss
.custom-focus:focus { @include gt.focus-reset; }
```

---

## Accessibility

### `sr-only`

Visually hidden but available to screen readers.

```scss
.skip-link { @include gt.sr-only; }
```

### `sr-only-focusable`

Combine with `sr-only` to make an element visible when focused (e.g. skip links).

```scss
.skip-link {
  @include gt.sr-only;
  @include gt.sr-only-focusable;
}
```

---

## Text utilities

### `text-truncate`

Single-line text truncation with ellipsis.

```scss
.card-title { @include gt.text-truncate; }
// → overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
```

### `unstyled-list`

Remove default list styling.

```scss
.nav-list { @include gt.unstyled-list; }
// → padding-left: 0; list-style: none;
```

---

## Print

### `print-only` / `screen-only`

Wrap content in a media query.

```scss
.page-break { @include gt.print-only { page-break-before: always; } }
.no-print   { @include gt.print-only { display: none; } }
.hero-video { @include gt.screen-only { display: block; } }
```

