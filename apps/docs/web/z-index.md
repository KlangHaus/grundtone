# Z-Index

Layering utilities for controlling stacking order. Included in `@grundtone/design-tokens` CSS — see
[Installation](/guide/installation) for setup.

All utilities support responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## How it works

Grundtone uses a **two-tier z-index system**:

1. **Utility scale** (`.z-0` to `.z-50`) — for general layout stacking within your page
2. **Semantic tokens** (`.z-dropdown`, `.z-modal`, etc.) — for component layers, backed by CSS
   custom properties so themes can override them

This avoids the common anti-pattern of arbitrary `z-index: 9999` values scattered through your CSS.

---

## Utility scale

Use `.z-{n}` to control stacking order between sibling elements:

<CodePreview name="zi-scale" />

### Reorder stacking

The first element in the DOM normally renders on top. Use z-index to reorder:

<CodePreview name="zi-reorder" />

| Class     | Value           |
| --------- | --------------- |
| `.z-auto` | `z-index: auto` |
| `.z-0`    | `z-index: 0`    |
| `.z-10`   | `z-index: 10`   |
| `.z-20`   | `z-index: 20`   |
| `.z-30`   | `z-index: 30`   |
| `.z-40`   | `z-index: 40`   |
| `.z-50`   | `z-index: 50`   |

---

## Semantic layers

For component layering (dropdowns, modals, tooltips), use semantic classes that reference CSS custom
properties. This ensures a consistent, predictable stacking order across your entire application:

<CodePreview name="zi-semantic" />

| Class               | CSS property              | Value | Use case            |
| ------------------- | ------------------------- | ----- | ------------------- |
| `.z-dropdown`       | `var(--z-dropdown)`       | 1000  | Dropdown menus      |
| `.z-sticky`         | `var(--z-sticky)`         | 1020  | Sticky elements     |
| `.z-fixed`          | `var(--z-fixed)`          | 1030  | Fixed positioned    |
| `.z-modal-backdrop` | `var(--z-modal-backdrop)` | 1040  | Modal backdrop      |
| `.z-modal`          | `var(--z-modal)`          | 1050  | Modal dialogs       |
| `.z-popover`        | `var(--z-popover)`        | 1060  | Popovers, floating  |
| `.z-tooltip`        | `var(--z-tooltip)`        | 1070  | Tooltips            |
| `.z-toast`          | `var(--z-toast)`          | 1080  | Toast notifications |

> **Custom values:** Override any layer in your CSS: `--z-modal: 2000;` and all `.z-modal` classes
> update automatically.

---

## Modal overlay

Combine z-index and [position](/web/position) utilities for a modal with backdrop:

<CodePreview name="zi-overlay" />

```html
<!-- Backdrop covers entire viewport -->
<div class="fixed inset-0 z-modal-backdrop bg-modal">
  <!-- Modal dialog centered on top -->
  <div class="z-modal">...</div>
</div>
```

> `.bg-modal` uses the `--color-modal-backdrop` token. See [Colors](/web/colors#background-utilities)
> for all background utilities.

---

## Using in SCSS

For component styles, use the CSS custom properties directly or the `z-index()` function:

```scss
// Direct custom property
.my-dropdown {
  z-index: var(--z-dropdown);
}

// Using the z-index() function
@use '@grundtone/design-tokens/scss' as gt;

.my-modal {
  z-index: gt.z-index('modal'); // → var(--z-modal)
}
```

---

## Responsive

Change z-index at different breakpoints:

<CodePreview name="zi-responsive" />

```html
<!-- Behind on mobile, on top from lg -->
<div class="z-0 lg:z-30">...</div>
```

---

## Comparison with Bootstrap

| Feature             | Bootstrap 5            | Grundtone                          |
| ------------------- | ---------------------- | ---------------------------------- |
| Z-index tokens      | SCSS variables only    | SCSS + CSS custom properties       |
| Utility classes     | None                   | `.z-0`–`.z-50` + semantic classes  |
| Customizable layers | Change SCSS, recompile | Override `--z-*` in CSS at runtime |
| Semantic layers     | Variables, no classes  | Classes + CSS vars + SCSS function |
| `!important`        | On every utility       | None                               |
| Responsive          | No                     | All breakpoints                    |
