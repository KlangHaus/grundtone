# @grundtone/core

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
  Thanks [@allanasp](https://github.com/allanasp)! - Add branding system with logo variants and
  platform helpers.

  - `createBranding()` factory for centralised brand name, tagline, and logo paths
  - Six logo variants (primary 1080, pwa512, pwa192, appleTouchIcon 180, favicon32, favicon16)
  - Web: `brandingHeadTags()` generates favicon/apple-touch-icon `<link>` tags
  - React Native: `getLogoSource()` returns `ImageSourcePropType` for `<Image>`
  - Build script `scripts/generate-logo-variants.ts` to regenerate variants from source

- [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26)
  Thanks [@allanasp](https://github.com/allanasp)! - Consolidate color system with core as single
  source of truth.

  - Rename shade-based tokens: `primaryHover` → `primaryLight`, `primaryActive` → `primaryDark`,
    etc.
  - Expand from 26 to 37 semantic color tokens (add `backgroundAlt`, `surfaceRaised`,
    `surfaceOverlay`, `textInverse`, `textPlaceholder`, `textDisabled`, `borderMedium`,
    `borderInverse`, status `*Dark` variants)
  - Fix value drift in design-tokens (`success: #28a745` → `#198754`, `info: #17a2b8` → `#0dcaf0`)
  - Remove duplicate semantic maps from design-tokens `_color-palette.scss` (raw palette retained)
  - Remove duplicate `$color-primary-*` variables from `_variables.scss`
  - Add background utility classes: `.bg-alt`, `.bg-surface`, `.bg-surface-alt`,
    `.bg-surface-raised`, `.bg-overlay`
  - Delete obsolete `theme.d.ts`
  - Add Colors documentation page with swatches and migration table

- [`cd4c165`](https://github.com/grundtone/grundtone/commit/cd4c1659c34d925d5744502f01b8d8eb97d128c0)
  Thanks [@allanasp](https://github.com/allanasp)! - refactor: consolidate spacing system with
  single source of truth

  Core:

  - Spacing values in `theme-preset.ts` are now the single source of truth for the 8px base unit
    system
  - Added documentation comments to `defaultSpacing` for cross-platform use (web rem / RN numbers)
  - Changed `4xl` spacing from `5rem` (80px) to `6rem` (96px) to follow 8px grid multiples
  - Removed `ThemeConfig` type (replaced by the full `Theme` type from theme system)
  - Removed `DEFAULT_THEME` constant (replaced by `defaultTheme` / `createTheme`)
  - Removed `style.css`, `breakpoints.ts`, and `.d.ts` declaration files
  - Removed constants barrel re-export from package entry

  Design tokens:

  - Simplified `_spacing.scss`: removed granular `$spacers` numeric map and `:root` block
  - Replaced with semantic `$spacing-xs` through `$spacing-4xl` variables aligned with core
  - Removed duplicate `$space-*` variables from `_variables.scss`
  - Added `$spacing-4xl: 6rem` (96px) to match core

- [`6a885a9`](https://github.com/grundtone/grundtone/commit/6a885a9d0ac1a0ee15647529b9bc998db7b5863f)
  Thanks [@allanasp](https://github.com/allanasp)! - Remove duplicated token values from
  design-tokens SCSS — single source of truth is now @grundtone/core theme-preset.ts.

  - Export defaultSpacing, defaultRadius, defaultShadows, defaultTransitions, defaultTypography from
    core
  - Add defaultZIndex and ThemeZIndex interface to core
  - Unified codegen script (generate-token-defaults.ts) generates all \*-defaults.scss from core TS
  - Delete \_spacing.scss, \_z-index.scss, \_variables.scss (pure duplicates)
  - Refactor \_radius.scss, \_shadows.scss, \_typography.scss to import generated defaults
  - Remove 62.5% rem trick from typography, align all values with core TS
  - Replace hardcoded :root values in index.scss with loops over generated SCSS maps

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

## 1.0.0 - 2025-12-31

### Major Changes

- [`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)
  Thanks [@allanasp](https://github.com/allanasp)! - Initial release of Grundtone design system with
  grid system, design tokens, Vue 3 components, and Nuxt module
