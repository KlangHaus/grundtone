# Accessibility Functions

Compile-time WCAG 2.1 contrast calculations for static color values. Use these to validate color
pairs and auto-select accessible text colors during SCSS compilation.

::: warning Static colors only
These functions operate on hardcoded hex/rgb values (e.g. `#3b82f6`). They cannot evaluate CSS
custom properties like `var(--color-primary)` — those are resolved at runtime by the browser.
:::

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;
```

---

## `luminance($color)`

Returns the relative luminance of a color per WCAG 2.1 (0 = black, 1 = white).

```scss
$lum: gt.luminance(#ffffff); // 1
$lum: gt.luminance(#000000); // 0
```

---

## `contrast-ratio($color1, $color2)`

WCAG 2.1 contrast ratio between two colors. Range: 1 (identical) to 21 (black/white).

```scss
$ratio: gt.contrast-ratio(#ffffff, #000000); // 21
$ratio: gt.contrast-ratio(#3b82f6, #ffffff); // ~4.6
```

---

## WCAG Compliance Checks

Boolean functions that test a foreground/background pair against WCAG thresholds.

| Function                       | Standard         | Min ratio |
| ------------------------------ | ---------------- | --------- |
| `is-wcag-aa-compliant()`       | AA normal text   | 4.5:1     |
| `is-wcag-aaa-compliant()`      | AAA normal text  | 7:1       |
| `is-wcag-aa-large-compliant()` | AA large text    | 3:1       |

```scss
@if gt.is-wcag-aa-compliant(#333, #fff) {
  // safe for normal text
}
```

---

## `auto-text-color($background)`

Returns `#fff` or `#000` — whichever has better contrast against the background.

```scss
color: gt.auto-text-color(#3b82f6); // #fff (white on blue)
color: gt.auto-text-color(#fef3c7); // #000 (black on light yellow)
```

---

## `most-accessible-color($background, $text-colors)`

Pick the highest-contrast color from a list of candidates.

```scss
$best: gt.most-accessible-color(#1e3a8a, (#fff, #e5e5e5, #a3a3a3));
// Returns #fff (highest contrast against dark blue)
```

---

## `accessible-shade($family, $background, $min-ratio: 4.5)`

Find the closest shade from a [palette color family](/web/colors) that meets a minimum contrast
ratio against a background.

```scss
$shade: gt.accessible-shade('blue', #fff, 4.5);
// Returns the blue shade with best contrast that still passes AA
```

Available families: `gray`, `blue`, `green`, `red`, `yellow`, `indigo`.

---

## `validate-contrast` (mixin)

Emits `@warn` at compile time if a color pair fails WCAG AA. Use it to catch accessibility
regressions during builds.

```scss
@include gt.validate-contrast(#666, #fff, 'card body text');
// ⚠ card body text: contrast 5.74 — AA passed, AAA failed.
```

| Ratio   | Warning level |
| ------- | ------------- |
| < 3     | Fails all WCAG levels |
| 3–4.49  | AA failed (large text only) |
| >= 4.5  | No warning |
