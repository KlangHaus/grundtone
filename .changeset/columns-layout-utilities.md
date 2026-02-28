---
'@grundtone/design-tokens': minor
---

feat(design-tokens): alignment, display, order utilities and expanded responsive grid

New features:

- `_alignment.scss` — 54 utility classes for justify-content, justify-items, justify-self,
  align-items, align-content, align-self, place-content, place-items, place-self
- `_display.scss` — rewritten with modern naming (`.flex`, `.grid`, `.hidden` instead of `.d-flex`,
  `.d-none`), flex-direction, flex-wrap, grow/shrink
- `_order.scss` — order-first, order-last, order-none, order-1 through order-12
- `responsive-variants` mixin — DRY generator for all breakpoints including 2xl
- Expanded responsive grid: col-start/end, row-span/start/end, gap, grid-flow all have responsive
  variants
- All utilities work for both flex and grid layouts, no `!important`
- Short naming convention with `{bp}:` prefix (`.md:justify-center` instead of
  `.justify-content-md-center`)

Breaking changes:

- `_flexbox.scss` deleted (was dead code, never imported in build)
- Display classes renamed: `.d-flex` → `.flex`, `.d-none` → `.hidden`, `.d-block` → `.block`
- `.grid { display: grid }` moved from `_grid.scss` to `_display.scss`
