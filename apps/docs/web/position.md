# Position

Position and inset utilities for controlling element placement. Included in
`@grundtone/design-system` CSS — see [Installation](/guide/installation) for setup.

All utilities support responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## Position values

Control element positioning with short class names:

<CodePreview name="zi-position" />

| Class       | CSS                  |
| ----------- | -------------------- |
| `.static`   | `position: static`   |
| `.relative` | `position: relative` |
| `.absolute` | `position: absolute` |
| `.fixed`    | `position: fixed`    |
| `.sticky`   | `position: sticky`   |

---

## Inset

Pin elements to edges of their positioned parent. Inline directions (`start`/`end`) use logical
properties for RTL support:

<CodePreview name="zi-inset" />

| Class        | CSS                     | Description              |
| ------------ | ----------------------- | ------------------------ |
| `.inset-0`   | `inset: 0`              | All edges                |
| `.inset-x-0` | `inset-inline: 0`       | Left + right (RTL-aware) |
| `.inset-y-0` | `inset-block: 0`        | Top + bottom             |
| `.top-0`     | `top: 0`                | Top edge                 |
| `.bottom-0`  | `bottom: 0`             | Bottom edge              |
| `.start-0`   | `inset-inline-start: 0` | Start (left in LTR)      |
| `.end-0`     | `inset-inline-end: 0`   | End (right in LTR)       |

---

## Sticky header

Create a header that stays visible while scrolling, layered above content with
[z-index](/web/z-index):

<CodePreview name="zi-sticky-header" />

```html
<header class="sticky top-0 z-sticky">Navigation</header>
```

---

## Position shortcuts

Pre-composed classes for common fixed/sticky patterns. Z-index values use CSS custom properties from
the [z-index token system](/web/z-index):

| Class           | Position | Edges                           | Z-index           |
| --------------- | -------- | ------------------------------- | ----------------- |
| `.fixed-top`    | `fixed`  | `top: 0` + `inset-inline: 0`    | `var(--z-fixed)`  |
| `.fixed-bottom` | `fixed`  | `bottom: 0` + `inset-inline: 0` | `var(--z-fixed)`  |
| `.sticky-top`   | `sticky` | `top: 0`                        | `var(--z-sticky)` |

---

## Responsive

Change position at different breakpoints:

```html
<!-- Static on mobile, sticky from md -->
<nav class="static md:sticky md:top-0 md:z-sticky">...</nav>

<!-- Absolute on mobile, fixed from lg -->
<div class="absolute lg:fixed lg:inset-x-0 lg:bottom-0">...</div>
```

---

## Comparison with Bootstrap

| Feature           | Bootstrap 5           | Grundtone                       |
| ----------------- | --------------------- | ------------------------------- |
| Position naming   | `.position-relative`  | `.relative`                     |
| Inset utilities   | `.top-0`, `.start-0`  | Same + `.inset-0`, `.inset-x-0` |
| RTL support       | `.start-0` / `.end-0` | Same (logical properties)       |
| `!important`      | On every utility      | None                            |
| Responsive        | `.position-md-sticky` | `.md:sticky`                    |
| Shortcuts z-index | Hardcoded values      | CSS custom properties           |
