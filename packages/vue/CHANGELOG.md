# @grundtone/vue

## 2.0.0 - 2026-03-09

### Major Changes

- [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60)
  Thanks [@allanasp](https://github.com/allanasp)! - And it begins! The Ui library

  - design token
  - components in vue
  - types
  - composables/hooks

- [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60)
  Thanks [@allanasp](https://github.com/allanasp)! - Complete v1.0.0 release of Grundtone - a Vue 3
  design system with:

### Minor Changes

- [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26)
  Thanks [@allanasp](https://github.com/allanasp)! - Consolidate color system with core as single
  source of truth.

  - Rename shade-based tokens: `primaryHover` → `primaryLight`, `primaryActive` → `primaryDark`,
    etc.
  - Expand from 26 to 37 semantic color tokens (add `backgroundAlt`, `surfaceRaised`,
    `surfaceOverlay`, `textInverse`, `textPlaceholder`, `textDisabled`, `borderMedium`,
    `borderInverse`, status `*Dark` variants)
  - Fix value drift in design-system (`success: #28a745` → `#198754`, `info: #17a2b8` → `#0dcaf0`)
  - Remove duplicate semantic maps from design-system `_color-palette.scss` (raw palette retained)
  - Remove duplicate `$color-primary-*` variables from `_variables.scss`
  - Add background utility classes: `.bg-alt`, `.bg-surface`, `.bg-surface-alt`,
    `.bg-surface-raised`, `.bg-overlay`
  - Delete obsolete `theme.d.ts`
  - Add Colors documentation page with swatches and migration table

- [`7ed86fa`](https://github.com/grundtone/grundtone/commit/7ed86facc17a308f5532ff235fad5d94a37b044c)
  Thanks [@allanasp](https://github.com/allanasp)! - feat(theme): support separate light and dark
  theme config in ThemeProvider

  - Add `ThemeConfig` type: `Partial<Theme>` or `{ light?: Partial<Theme>; dark?: Partial<Theme> }`
  - ThemeProvider now applies mode-specific overrides when theme has `light`/`dark` keys
  - Backward compatible: single theme object still applies to both modes
  - Update docs: theme-configuration, installation, ThemeProvider README

### Patch Changes

- [`8e5f24b`](https://github.com/grundtone/grundtone/commit/8e5f24b04c6bf8807069caa8ebc941584f165c31)
  Thanks [@allanasp](https://github.com/allanasp)! - Add comprehensive platform-specific
  documentation and 12-column grid system

  Major updates:

  - Added platform-specific usage examples (Web, iOS, Android, React Native) to all design token
    pages
  - Created new conceptual guide "Design Tokens vs Utilities" explaining cross-platform workflow
  - Added complete 12-column CSS Grid system with responsive utilities
  - Refactored spacing scale to industry-standard 0-6 system

  New features:

  - Grid utilities: .grid, .grid-cols-_, .col-span-_, .gap-\*, responsive variants
  - Standardized spacing utilities: .m-0 to .m-6, .p-0 to .p-6 with directional variants
  - Platform-specific code examples in Swift, Kotlin, and TypeScript

  Breaking changes:

  - Spacing scale simplified: removed non-standard sizes (305, 405, 505, etc.) - migrate to standard
    0-6 scale

- Updated dependencies
  [[`4279eed`](https://github.com/grundtone/grundtone/commit/4279eed1b1395ab676ad20a7e443ccdabab57c61),
  [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26),
  [`51ecd83`](https://github.com/grundtone/grundtone/commit/51ecd8308f5da2f9b161424b81dee9e7dcf3118f),
  [`43ad018`](https://github.com/grundtone/grundtone/commit/43ad018020e8c7a7156d1a99a323f156966feff9),
  [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26),
  [`cd4c165`](https://github.com/grundtone/grundtone/commit/cd4c1659c34d925d5744502f01b8d8eb97d128c0),
  [`6a885a9`](https://github.com/grundtone/grundtone/commit/6a885a9d0ac1a0ee15647529b9bc998db7b5863f),
  [`765408b`](https://github.com/grundtone/grundtone/commit/765408b1334d695924e10d4f476ac85be9ee9530),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`8e5f24b`](https://github.com/grundtone/grundtone/commit/8e5f24b04c6bf8807069caa8ebc941584f165c31),
  [`434dbb6`](https://github.com/grundtone/grundtone/commit/434dbb6db98a36b64448b1a6064b8c86cd2e39c5),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`995f630`](https://github.com/grundtone/grundtone/commit/995f63062cd9dbb030b148d6d9a5f8b6e026fd20),
  [`dc5c1df`](https://github.com/grundtone/grundtone/commit/dc5c1df068373bd455d2a857874f366f28aacb2a),
  [`73b3572`](https://github.com/grundtone/grundtone/commit/73b3572d4b278c7972213f8d6a6f0e98c8516c85),
  [`9df8418`](https://github.com/grundtone/grundtone/commit/9df8418fbc5f4ec9637d67ba823f4709d0e0f587),
  [`7ed86fa`](https://github.com/grundtone/grundtone/commit/7ed86facc17a308f5532ff235fad5d94a37b044c),
  [`27c611f`](https://github.com/grundtone/grundtone/commit/27c611f19752d39182178a4e44d8942c090a18e7),
  [`611ce6e`](https://github.com/grundtone/grundtone/commit/611ce6e80d8588fd3c525061a2bc74e1ff585389),
  [`b538711`](https://github.com/grundtone/grundtone/commit/b538711d025c26a6eaaf7f56e2abdb3e003def1c)]:
  - @grundtone/design-system@2.0.0
  - @grundtone/core@2.0.0
  - @grundtone/shared@2.0.0

## 1.0.0 - 2025-12-31

### Major Changes

- [`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)
  Thanks [@allanasp](https://github.com/allanasp)! - Initial release of Grundtone design system with
  grid system, design tokens, Vue 3 components, and Nuxt module

### Patch Changes

- Updated dependencies
  [[`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)]:
  - @grundtone/core@1.0.0
  - @grundtone/shared@1.0.0
