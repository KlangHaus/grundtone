# Typography

Grundtone's type system uses **IBM Plex Sans** for body and headings and **IBM Plex Mono** for code.
All values are exposed as CSS custom properties. Override any token via SCSS `@use ... with ()`.

---

## Font Families

| Token                     | Stack                                                                     |
| ------------------------- | ------------------------------------------------------------------------- |
| `--font-family-base`      | IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif |
| `--font-family-heading`   | IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif |
| `--font-family-mono`      | IBM Plex Mono, Courier New, monospace                                     |

---

## Font Size Scale

9 steps from `xs` (0.75rem / 12px) to `5xl` (3rem / 48px).

| Token               | rem    | px  |
| -------------------- | ------ | --- |
| `--font-size-xs`     | 0.75   | 12  |
| `--font-size-sm`     | 0.875  | 14  |
| `--font-size-base`   | 1      | 16  |
| `--font-size-lg`     | 1.125  | 18  |
| `--font-size-xl`     | 1.25   | 20  |
| `--font-size-2xl`    | 1.5    | 24  |
| `--font-size-3xl`    | 1.875  | 30  |
| `--font-size-4xl`    | 2.25   | 36  |
| `--font-size-5xl`    | 3      | 48  |

---

## Font Weight Scale

7 steps from thin (100) to extrabold (800).

| Token                     | Value |
| ------------------------- | ----- |
| `--font-weight-thin`      | 100   |
| `--font-weight-light`     | 300   |
| `--font-weight-normal`    | 400   |
| `--font-weight-medium`    | 500   |
| `--font-weight-semibold`  | 600   |
| `--font-weight-bold`      | 700   |
| `--font-weight-extrabold` | 800   |

---

## Line Height

| Token                   | Value |
| ----------------------- | ----- |
| `--line-height-none`    | 1     |
| `--line-height-tight`   | 1.25  |
| `--line-height-snug`    | 1.375 |
| `--line-height-normal`  | 1.5   |
| `--line-height-relaxed` | 1.625 |
| `--line-height-loose`   | 2     |

---

## Letter Spacing

| Token    | Value    |
| -------- | -------- |
| tighter  | −0.05em  |
| tight    | −0.025em |
| normal   | 0        |
| wide     | 0.025em  |
| wider    | 0.05em   |
| widest   | 0.1em    |

---

## Heading Element Defaults

All `<h1>`–`<h6>` elements receive default sizing, weight, and line height from the elements layer.
Sizes are responsive and scale up at the `md` and `lg` breakpoints.

| Element | Base size | Weight   | Line height |
| ------- | --------- | -------- | ----------- |
| `h1`    | 2.25rem   | bold     | 1.2         |
| `h2`    | 1.875rem  | semibold | 1.2         |
| `h3`    | 1.5rem    | semibold | 1.25        |
| `h4`    | 1.25rem   | semibold | 1.3         |
| `h5`    | 1.125rem  | medium   | 1.4         |
| `h6`    | 1rem      | medium   | 1.5         |

<CodePreview name="el-headings" />

---

## Line Length

To ensure optimal readability, a maximum width is set for the line length of body and lead text. Use `.max-w-prose` (65ch) to limit the line width.

```html
<div class="max-w-prose">
  <p class="lead">Lead text with optimal line length.</p>
  <p class="body-text">Body text that does not stretch too far.</p>
</div>
```

---

## Line Spacing

Line spacing is based on the text types' line heights. See [Line Height](/web/font-utilities#line-height) for the available `leading-*` utility classes.

| Text type    | Line height        |
| ------------ | ------------------ |
| Body text    | `normal` (1.5)     |
| Lead         | `normal` (1.5)     |
| Heading      | `tight` (1.25)     |
| Display text | `tight` (1.25)     |

---

## SCSS Customization

Override any typography token via `@use ... with ()`:

```scss
@use '@grundtone/design-tokens/scss/lib' as gt with (
  $font-family-base: 'Inter', sans-serif,
  $font-family-heading: 'Inter', sans-serif,
);
```

All CSS custom properties will automatically reflect your overrides.
