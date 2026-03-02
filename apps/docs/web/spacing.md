# Spacing & Visibility

Margin, padding, and visibility utilities. Included in `@grundtone/design-tokens` CSS — see
[Installation](/guide/installation) for setup.

All utilities support responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## How it works

Spacing utilities follow the pattern `.{property}{direction}-{size}`:

- **Property:** `m` (margin) or `p` (padding)
- **Direction:** blank (all), `x` (inline), `y` (block), `t` (top), `b` (bottom), `s` (start), `e`
  (end)
- **Size:** `0`–`24` from the spacing scale

Inline directions (`x`, `s`, `e`) use CSS logical properties for automatic RTL support.

---

## Margin

### All sides

<CodePreview name="sp-margin" />

### Directional margin

Use `t`/`b` for top/bottom, `s`/`e` for inline-start/end (RTL-aware):

<CodePreview name="sp-margin-dir" />

| Abbreviation | CSS property          | Description                     |
| ------------ | --------------------- | ------------------------------- |
| `.m-{n}`     | `margin`              | All sides                       |
| `.mx-{n}`    | `margin-inline`       | Left + right (RTL-aware)        |
| `.my-{n}`    | `margin-block`        | Top + bottom                    |
| `.mt-{n}`    | `margin-top`          | Top only                        |
| `.mb-{n}`    | `margin-bottom`       | Bottom only                     |
| `.ms-{n}`    | `margin-inline-start` | Start (left in LTR, right RTL)  |
| `.me-{n}`    | `margin-inline-end`   | End (right in LTR, left in RTL) |

---

## Auto margins

### Centering with mx-auto

Center a block element horizontally:

<CodePreview name="sp-mx-auto" />

### Pushing with mt-auto

Push an element to the bottom of a flex container:

<CodePreview name="sp-mt-auto" />

| Class      | CSS                         | Common use                       |
| ---------- | --------------------------- | -------------------------------- |
| `.mx-auto` | `margin-inline: auto`       | Center block elements            |
| `.ms-auto` | `margin-inline-start: auto` | Push to end in flex row          |
| `.me-auto` | `margin-inline-end: auto`   | Push to start in flex row        |
| `.mt-auto` | `margin-top: auto`          | Push to bottom in flex column    |
| `.mb-auto` | `margin-bottom: auto`       | Push to top in flex column       |
| `.m-auto`  | `margin: auto`              | Center in both axes (with width) |

---

## Padding

### All sides

<CodePreview name="sp-padding" />

### Axis padding

Use `px` for horizontal (inline) and `py` for vertical (block):

<CodePreview name="sp-padding-axis" />

| Abbreviation | CSS property           | Description                     |
| ------------ | ---------------------- | ------------------------------- |
| `.p-{n}`     | `padding`              | All sides                       |
| `.px-{n}`    | `padding-inline`       | Left + right (RTL-aware)        |
| `.py-{n}`    | `padding-block`        | Top + bottom                    |
| `.pt-{n}`    | `padding-top`          | Top only                        |
| `.pb-{n}`    | `padding-bottom`       | Bottom only                     |
| `.ps-{n}`    | `padding-inline-start` | Start (left in LTR, right RTL)  |
| `.pe-{n}`    | `padding-inline-end`   | End (right in LTR, left in RTL) |

---

## Responsive spacing

Add a breakpoint prefix to change spacing at different viewports:

<CodePreview name="sp-responsive" />

```html
<!-- Tight on mobile, spacious on desktop -->
<section class="p-2 md:p-6 lg:p-10">...</section>

<!-- No margin on mobile, auto-center from md -->
<div class="mx-0 md:mx-auto" style="max-width: 600px">...</div>

<!-- Stack tight, then add vertical spacing on desktop -->
<div class="my-2 lg:my-8">...</div>
```

---

## Composing spacing

Combine multiple spacing classes on one element:

<CodePreview name="sp-composition" />

```html
<!-- Different horizontal and vertical padding -->
<div class="px-4 py-2">...</div>

<!-- Asymmetric inline padding -->
<div class="ps-8 pe-2">...</div>

<!-- Push right with auto + fixed margin -->
<div class="ms-auto me-4">...</div>
```

---

## Spacing scale

The scale matches the gap utilities for consistency. Values use `rem` (relative to root font size):

| Suffix | Value    | px  | Suffix | Value   | px  |
| ------ | -------- | --- | ------ | ------- | --- |
| `0`    | 0        | 0   | `5`    | 1.25rem | 20  |
| `px`   | 1px      | 1   | `6`    | 1.5rem  | 24  |
| `0-5`  | 0.125rem | 2   | `7`    | 1.75rem | 28  |
| `1`    | 0.25rem  | 4   | `8`    | 2rem    | 32  |
| `1-5`  | 0.375rem | 6   | `9`    | 2.25rem | 36  |
| `2`    | 0.5rem   | 8   | `10`   | 2.5rem  | 40  |
| `2-5`  | 0.625rem | 10  | `11`   | 2.75rem | 44  |
| `3`    | 0.75rem  | 12  | `12`   | 3rem    | 48  |
| `3-5`  | 0.875rem | 14  | `14`   | 3.5rem  | 56  |
| `4`    | 1rem     | 16  | `16`   | 4rem    | 64  |
|        |          |     | `20`   | 5rem    | 80  |
|        |          |     | `24`   | 6rem    | 96  |

---

## Visibility

Control element visibility without removing it from the layout.

### invisible vs hidden

`.invisible` hides the element but **keeps its space**. `.hidden` removes it from the layout
entirely:

<CodePreview name="sp-hidden-vs-invisible" />

<CodePreview name="sp-visibility" />

| Class        | CSS                   | Layout space |
| ------------ | --------------------- | ------------ |
| `.visible`   | `visibility: visible` | Kept         |
| `.invisible` | `visibility: hidden`  | Kept         |
| `.hidden`    | `display: none`       | Removed      |

> **When to use which:** Use `.invisible` for skeleton loading states, fade transitions, or keeping
> layout stable. Use `.hidden` when the element should not affect layout at all.

---

## Comparison with Bootstrap

| Feature            | Bootstrap 5               | Grundtone                            |
| ------------------ | ------------------------- | ------------------------------------ |
| Naming             | `.mt-md-3` (infix)        | `.md:mt-3` (prefix)                  |
| `!important`       | On every utility          | None                                 |
| Scale              | 0–5 (6 values)            | 0–24 (25 values)                     |
| RTL support        | `.ms-*` / `.me-*`         | Same + `px`/`mx` use `margin-inline` |
| Logical properties | Only start/end            | All inline directions                |
| Visibility         | `.visible` / `.invisible` | Same, plus responsive variants       |
| Responsive         | `.mt-md-3`                | `.md:mt-3`                           |
