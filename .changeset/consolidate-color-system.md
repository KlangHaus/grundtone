---
'@grundtone/core': minor
'@grundtone/design-tokens': minor
'@grundtone/vue': minor
---

Consolidate color system with core as single source of truth.

- Rename shade-based tokens: `primaryHover` → `primaryLight`, `primaryActive` → `primaryDark`, etc.
- Expand from 26 to 37 semantic color tokens (add `backgroundAlt`, `surfaceRaised`,
  `surfaceOverlay`, `textInverse`, `textPlaceholder`, `textDisabled`, `borderMedium`,
  `borderInverse`, status `*Dark` variants)
- Fix value drift in design-tokens (`success: #28a745` → `#198754`, `info: #17a2b8` → `#0dcaf0`)
- Remove duplicate semantic maps from design-tokens `_color-palette.scss` (raw palette retained)
- Remove duplicate `$color-primary-*` variables from `_variables.scss`
- Add background utility classes: `.bg-alt`, `.bg-surface`, `.bg-surface-alt`, `.bg-surface-raised`,
  `.bg-overlay`
- Delete obsolete `theme.d.ts`
- Add Colors documentation page with swatches and migration table
