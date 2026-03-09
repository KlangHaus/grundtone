# @grundtone/design-system

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

- [`4279eed`](https://github.com/grundtone/grundtone/commit/4279eed1b1395ab676ad20a7e443ccdabab57c61)
  Thanks [@allanasp](https://github.com/allanasp)! - Auto-generate `_color-defaults.scss` from
  `@grundtone/core` theme-preset.

  - Add `generate:colors` script that converts core color presets to SCSS maps
  - Prepend generation to `build` so values always stay in sync
  - Replace hardcoded color tables in docs with `<ColorTokens>` Vue component
  - Color tables now render from core at VitePress build time — no manual hex duplication

- [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26)
  Thanks [@allanasp](https://github.com/allanasp)! - Add branding system with logo variants and
  platform helpers.

  - `createBranding()` factory for centralised brand name, tagline, and logo paths
  - Six logo variants (primary 1080, pwa512, pwa192, appleTouchIcon 180, favicon32, favicon16)
  - Web: `brandingHeadTags()` generates favicon/apple-touch-icon `<link>` tags
  - React Native: `getLogoSource()` returns `ImageSourcePropType` for `<Image>`
  - Build script `scripts/generate-logo-variants.ts` to regenerate variants from source

- [`51ecd83`](https://github.com/grundtone/grundtone/commit/51ecd8308f5da2f9b161424b81dee9e7dcf3118f)
  Thanks [@allanasp](https://github.com/allanasp)! - Add btn-secondary, btn-outlined, btn-negative,
  and btn-unstyled button variants to elements layer. Secondary uses --color-secondary, outlined is
  border-only with hover fill, negative uses --color-error for destructive actions, and unstyled
  fully resets button styling for custom wrappers.

- [`43ad018`](https://github.com/grundtone/grundtone/commit/43ad018020e8c7a7156d1a99a323f156966feff9)
  Thanks [@allanasp](https://github.com/allanasp)! - feat(design-system): alignment, display, order
  utilities and expanded responsive grid

  New features:

  - `_alignment.scss` — 54 utility classes for justify-content, justify-items, justify-self,
    align-items, align-content, align-self, place-content, place-items, place-self
  - `_display.scss` — rewritten with modern naming (`.flex`, `.grid`, `.hidden` instead of
    `.d-flex`, `.d-none`), flex-direction, flex-wrap, grow/shrink
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
  design-system SCSS — single source of truth is now @grundtone/core theme-preset.ts.

  - Export defaultSpacing, defaultRadius, defaultShadows, defaultTransitions, defaultTypography from
    core
  - Add defaultZIndex and ThemeZIndex interface to core
  - Unified codegen script (generate-token-defaults.ts) generates all \*-defaults.scss from core TS
  - Delete \_spacing.scss, \_z-index.scss, \_variables.scss (pure duplicates)
  - Refactor \_radius.scss, \_shadows.scss, \_typography.scss to import generated defaults
  - Remove 62.5% rem trick from typography, align all values with core TS
  - Replace hardcoded :root values in index.scss with loops over generated SCSS maps

- [`765408b`](https://github.com/grundtone/grundtone/commit/765408b1334d695924e10d4f476ac85be9ee9530)
  Thanks [@allanasp](https://github.com/allanasp)! - Add elements and components layers to
  design-system. Elements style HTML tags directly (body, header, footer, blockquote, hr) — no class
  needed. Components provide class-based patterns (prose, callout, article-card, article-meta,
  breadcrumb, skip-link, author-card, back-link, blockquote variants). Cascade order: elements →
  components → utilities, so utilities always win. Inline body and .sr-only blocks removed from
  index.scss — body moved to elements, sr-only now uses the accessibility utility import.

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

- [`434dbb6`](https://github.com/grundtone/grundtone/commit/434dbb6db98a36b64448b1a6064b8c86cd2e39c5)
  Thanks [@allanasp](https://github.com/allanasp)! - feat(design-system): modern container system
  replacing Bootstrap-style containers

  New features:

  - Fluid gutters via `clamp(1rem, 4vw, 2rem)` — smooth scaling, no breakpoint jumps
  - CSS custom properties `--container-max` and `--container-gutter` for runtime configuration
  - Logical properties (`padding-inline`, `margin-inline`) for automatic RTL support
  - All layout containers are container query contexts (`container-type: inline-size`)
  - `.container-prose` — optimal reading width (65ch)
  - `.breakout` — full-viewport-width children inside containers
  - Computed max-widths from `$grid-breakpoints` — no separate `$container-max-widths` map

  Breaking changes:

  - Container query type classes renamed: `.container` → `.cq-contain`, `.container-normal` →
    `.cq-normal`, `.container-size` → `.cq-size`, `.container-{name}` → `.cq-{name}`
  - Removed `$container-max-widths` SCSS variable (max-widths are now computed)

- [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60)
  Thanks [@allanasp](https://github.com/allanasp)! - Initial release of @grundtone/design-system
  with comprehensive SCSS/CSS design system including colors, typography, spacing,

- [`995f630`](https://github.com/grundtone/grundtone/commit/995f63062cd9dbb030b148d6d9a5f8b6e026fd20)
  Thanks [@allanasp](https://github.com/allanasp)! - Remove CSS @property registrations — hardcoded
  initial-values were out of sync with core TS, inherits: false broke dark mode, and none of the
  registered properties were used for animation. Delete registered-properties.ts,
  useRegisteredProperties composable, and all related exports.

- [`dc5c1df`](https://github.com/grundtone/grundtone/commit/dc5c1df068373bd455d2a857874f366f28aacb2a)
  Thanks [@allanasp](https://github.com/allanasp)! - Add semantic HTML element styles: headings
  (h1–h6), address, hgroup. Refactor header/footer — bare elements reset to `display: block`, layout
  classes (`.header`, `.footer`) moved to components layer. Remove redundant display:block rules for
  article, aside, main, nav, search, section. Add text-decoration, text-transform, and
  letter-spacing utility classes. Add typography overview page. Remove price component (replaced by
  `.line-through` utility). Add `.lead` component and `.prose > p:first-child` auto-lead styling.
  Add `.body-text`, `.body-text-sm`, and `.body-text-bold` body text components. Add `.help-text`
  component for form field hints. Add `.error-text` component for form validation errors. Add
  `.caption` component for image captions. Add `.display-text` component for large highlighted
  numbers. Add `.facit` component for calculation results with double underline. Add
  `.external-link` and `.function-link` components.

- [`73b3572`](https://github.com/grundtone/grundtone/commit/73b3572d4b278c7972213f8d6a6f0e98c8516c85)
  Thanks [@allanasp](https://github.com/allanasp)! - feat(design-system): spacing and visibility
  utilities

  New features:

  - `_spacing.scss` — modernized margin and padding utilities with 25-step scale matching gap
  - Logical properties for RTL support: `.mx-*` uses `margin-inline`, `.ms-*`/`.me-*` use
    `margin-inline-start`/`margin-inline-end`
  - Auto margins: `.mx-auto`, `.ms-auto`, `.mt-auto` etc. for centering and flex push
  - `.visible` / `.invisible` visibility utilities with responsive variants
  - All utilities use `{bp}:` prefix convention and no `!important`

  Breaking changes:

  - `_spacing.scss` rewritten: `.mt-md-3` → `.md:mt-3`, `.mr-3` → `.me-3`, `.ml-3` → `.ms-3`

- [`27c611f`](https://github.com/grundtone/grundtone/commit/27c611f19752d39182178a4e44d8942c090a18e7)
  Thanks [@allanasp](https://github.com/allanasp)! - Add transition utilities (transition-colors,
  -shadow, -transform, -opacity, -all, -none) with responsive variants and prefers-reduced-motion
  support. Clean up accessibility functions — remove broken code that called non-existent palette
  functions, keep working WCAG contrast calculations. Add docs for transitions and accessibility.

- [`611ce6e`](https://github.com/grundtone/grundtone/commit/611ce6e80d8588fd3c525061a2bc74e1ff585389)
  Thanks [@allanasp](https://github.com/allanasp)! - Add width utilities (w-auto, w-full, w-25,
  w-50, etc. with responsive variants). Clean up SCSS mixins — remove 14 broken/obsolete mixins,
  consolidate h1–h6 into heading($level) using
  $responsive-typography map, switch to CSS custom
  properties. Fix SCSS functions — correct duration/ease defaults, remove dead code. Add docs for
  width, functions, and mixins.

- [`b538711`](https://github.com/grundtone/grundtone/commit/b538711d025c26a6eaaf7f56e2abdb3e003def1c)
  Thanks [@allanasp](https://github.com/allanasp)! - feat(design-system): z-index and position
  utilities

  New features:

  - `_z-index.scss` utility classes: `.z-auto`, `.z-0`–`.z-50` scale + semantic `.z-dropdown`,
    `.z-modal`, `.z-tooltip`, `.z-toast` etc. backed by CSS custom properties
  - `_position.scss` rewritten: `.relative`, `.absolute`, `.sticky` etc. with inset utilities
    (`.inset-0`, `.inset-x-0`, `.start-0`, `.end-0`) using logical properties for RTL
  - All utilities responsive via `{bp}:` prefix, no `!important`
  - Added `--z-toast: 1080` token for toast notifications
  - Position shortcuts (`.fixed-top`, `.sticky-top`) now use `var(--z-*)` instead of hardcoded
    values

  Breaking changes:

  - `_z-index.scss` core: removed overlapping tokens (`header`, `sidebar`, `overlay`, `above`,
    `top: 9999`), removed duplicate `:root` block
  - `_position.scss`: `.position-relative` → `.relative`, `!important` removed

### Patch Changes

- [`9df8418`](https://github.com/grundtone/grundtone/commit/9df8418fbc5f4ec9637d67ba823f4709d0e0f587)
  Thanks [@allanasp](https://github.com/allanasp)! - Add text-align, border, rounded, and overflow
  utility classes. Refactor text-align to use responsive-variants mixin. Add text-align docs page
  with live examples.
- Updated dependencies
  [[`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26),
  [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26),
  [`cd4c165`](https://github.com/grundtone/grundtone/commit/cd4c1659c34d925d5744502f01b8d8eb97d128c0),
  [`6a885a9`](https://github.com/grundtone/grundtone/commit/6a885a9d0ac1a0ee15647529b9bc998db7b5863f),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`8e5f24b`](https://github.com/grundtone/grundtone/commit/8e5f24b04c6bf8807069caa8ebc941584f165c31),
  [`7ed86fa`](https://github.com/grundtone/grundtone/commit/7ed86facc17a308f5532ff235fad5d94a37b044c)]:
  - @grundtone/core@2.0.0

## 1.0.0 - 2025-12-31

### Major Changes

- [`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)
  Thanks [@allanasp](https://github.com/allanasp)! - Initial release of Grundtone design system with
  grid system, design tokens, Vue 3 components, and Nuxt module
