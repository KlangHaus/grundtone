# @grundtone/vue

## 2.8.0 - 2026-03-21

### Minor Changes

- [`ccb6a4e`](https://github.com/grundtone/grundtone/commit/ccb6a4e5833b18115cf520ef625c802ed55c42ba)
  Thanks [@allanasp](https://github.com/allanasp)! - Add DateInput component for day/month/year date
  entry

  - **design-system**: Add `_date-input.scss` with flex layout, field widths
    (`box-sizing: content-box` for correct sizing across all input sizes), and sub-labels
  - **vue**: Add `GTDateInput` component with auto-advance, numeric filtering, accessible markup
    (`role="group"`, `aria-labelledby`, per-field labels, `inputmode="numeric"`)
  - **vue**: Add `useDateField` composable — reactive date validation with
    `UseFieldReturn`-compatible interface for `useFormValidation` integration
  - **utils**: Add `isValidDate`, `isDateInPast`, `isDateInFuture` validation functions and
    `date()`, `datePast()`, `dateFuture()` validators

- [`8fc757a`](https://github.com/grundtone/grundtone/commit/8fc757a37e5cb862f4d6c48b8a1271088535ff6d)
  Thanks [@allanasp](https://github.com/allanasp)! - Add Radio, Checkbox, and CheckboxGroup
  components

  - **design-system**: Add `_choice.scss` with shared BEM for radio/checkbox (native hidden inputs +
    custom indicators), CodePreview examples for Modal/Radio/Checkbox
  - **vue**: Add `GTCheckbox` (standalone atom), `GTRadioGroup` and `GTCheckboxGroup` (molecules)
    with option hints and collapse content slots
  - **react-native**: Add `GTRadioGroup` and `GTCheckboxGroup` with Pressable + custom indicators

- [`9cf5217`](https://github.com/grundtone/grundtone/commit/9cf52174c298cab51259a2ca948523eef26a1516)
  Thanks [@allanasp](https://github.com/allanasp)! - Add SkipLink, Spinner, and Modal components
  with shared animations and utilities

  - **design-system**: Add `_animations.scss` (shared keyframes: fade, scale, slide-up/down/right,
    spin), `_modal.scss` (BEM + 6 transition modes), `_spinner.scss`, Modal vanilla JS behavior
    (focus trap, scroll lock, open/close events)
  - **vue**: Add `GTSkipLink` (keyboard-only skip-to-content link), `GTSpinner` (sm/lg, light/dark,
    text, backdrop), `GTModal` (Teleport, Vue Transition, persistent variant, 6 animation modes)
  - **react-native**: Add `GTSpinner` (Animated.View rotation) and `GTModal` (RN Modal wrapper with
    theme tokens)
  - **utils**: Add `createFocusTrap()` and `createScrollLock()` (framework-agnostic DOM utilities)
  - Fix Dart Sass deprecations (nth→list.nth, slash division→interpolated strings)
  - Fix Accordion test, docs changelog frontmatter, docs missing dependencies
  - Add CLAUDE.md files for AI-assisted development context
  - Add blog, shop, login, signup pages to Vue playground

### Patch Changes

- Updated dependencies
  [[`ccb6a4e`](https://github.com/grundtone/grundtone/commit/ccb6a4e5833b18115cf520ef625c802ed55c42ba),
  [`8fc757a`](https://github.com/grundtone/grundtone/commit/8fc757a37e5cb862f4d6c48b8a1271088535ff6d),
  [`9cf5217`](https://github.com/grundtone/grundtone/commit/9cf52174c298cab51259a2ca948523eef26a1516)]:
  - @grundtone/design-system@2.8.0
  - @grundtone/utils@2.8.0

## 2.7.1 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`f41cfa6`](https://github.com/grundtone/grundtone/commit/f41cfa697d66f842719621865c8ddafe96cf3b25)]:
  - @grundtone/design-system@2.7.1

## 2.7.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`98a30f3`](https://github.com/grundtone/grundtone/commit/98a30f3c7786ac7425b5249740cb22e351874f16)]:
  - @grundtone/design-system@2.7.0

## 2.6.1 - 2026-03-21

### Patch Changes

- [`fd7b9e7`](https://github.com/grundtone/grundtone/commit/fd7b9e736af8c3b2964a8bb9089c55583c18f1ae)
  Thanks [@allanasp](https://github.com/allanasp)! - fix(accordion): improve accessibility — English
  defaults, sr-only show/hide labels, prefers-reduced-motion
- Updated dependencies
  [[`fd7b9e7`](https://github.com/grundtone/grundtone/commit/fd7b9e736af8c3b2964a8bb9089c55583c18f1ae)]:
  - @grundtone/design-system@2.6.1

## 2.6.0 - 2026-03-21

### Minor Changes

- [`a8f16af`](https://github.com/grundtone/grundtone/commit/a8f16af2101e8fddec6e5e7e08cf287ca76937f4)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTTabs with underline, segment, pill
  variants and slide transitions

### Patch Changes

- Updated dependencies
  [[`a8f16af`](https://github.com/grundtone/grundtone/commit/a8f16af2101e8fddec6e5e7e08cf287ca76937f4)]:
  - @grundtone/design-system@2.6.0

## 2.5.0 - 2026-03-21

### Minor Changes

- [`47eec5f`](https://github.com/grundtone/grundtone/commit/47eec5f72d7299faf3b97bfc32513d6df4ff9ea4)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTSelect, GTAutocomplete, GTAddressInput
  with DAWA integration

### Patch Changes

- Updated dependencies
  [[`47eec5f`](https://github.com/grundtone/grundtone/commit/47eec5f72d7299faf3b97bfc32513d6df4ff9ea4)]:
  - @grundtone/design-system@2.5.0

## 2.4.0 - 2026-03-21

### Minor Changes

- [`b24dbd9`](https://github.com/grundtone/grundtone/commit/b24dbd9a10bf80685d571ab69ff40ec1098fc9a6)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTAccordion with 3 variants, 3 transitions,
  animated RN expand/collapse

### Patch Changes

- Updated dependencies
  [[`b24dbd9`](https://github.com/grundtone/grundtone/commit/b24dbd9a10bf80685d571ab69ff40ec1098fc9a6)]:
  - @grundtone/design-system@2.4.0

## 2.3.0 - 2026-03-21

### Minor Changes

- [`f155ea5`](https://github.com/grundtone/grundtone/commit/f155ea5b91ab9e7393a96dc3654aa92b46210db5)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTDetails disclosure component with
  default, subtle, and card variants

### Patch Changes

- Updated dependencies
  [[`f155ea5`](https://github.com/grundtone/grundtone/commit/f155ea5b91ab9e7393a96dc3654aa92b46210db5)]:
  - @grundtone/design-system@2.3.0

## 2.2.0 - 2026-03-21

### Minor Changes

- [`d087e51`](https://github.com/grundtone/grundtone/commit/d087e51106acb475d92a51e063ce540a0ea41d47)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTBadge component, replace legacy .tag, fix
  AnchorLinks click highlight

### Patch Changes

- Updated dependencies
  [[`d087e51`](https://github.com/grundtone/grundtone/commit/d087e51106acb475d92a51e063ce540a0ea41d47)]:
  - @grundtone/design-system@2.2.0

## 2.1.0 - 2026-03-21

### Minor Changes

- [`36758db`](https://github.com/grundtone/grundtone/commit/36758db0b2b3823e5a71e5bc7b14ed80b7ee4a25)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTInput component with label, help text,
  error state, and accessibility support across all platforms. Includes generateId utility, SCSS
  element reset and component classes, Vue SFC with 27 tests, React Native component, docs for
  Vue/web/RN, demos, and playground examples.

- [`1e90785`](https://github.com/grundtone/grundtone/commit/1e90785ab0b0ad5df1437a1b87e15db602582cd6)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTCookieMessage and GTAnchorLinks
  components, cookie icon, fix RN Card shadow types

- [`33219d3`](https://github.com/grundtone/grundtone/commit/33219d309b4ad6f56df0f02083a5730f5543a1d4)
  Thanks [@allanasp](https://github.com/allanasp)! - feat: add GTAlert component with Expo Snack
  embeds

  - New status icons: info-circle, check-circle, alert-triangle, alert-circle (status category)
  - Design system: `.alert` CSS component with 4 semantic variants, transparent backgrounds
  - Vue: GTAlert molecule with heading, icon, dismissible, footer slot
  - React Native: GTAlert with theme-driven transparent backgrounds
  - Re-export `createTheme` from `@grundtone/react-native`
  - Replace callout with alert (breaking: `.callout` removed)
  - Docs: Expo Snack embeds for interactive RN component previews

- [`fe730ff`](https://github.com/grundtone/grundtone/commit/fe730ff700a9801f6985aa326d899fdb03e0f88f)
  Thanks [@allanasp](https://github.com/allanasp)! - feat: icon categories, configurable icon color,
  RN components (GTIcon, GTButton), Expo playground

  - Icon system: subdirectory-based categories, auto-generated registry with category metadata
  - Core config: add `iconColor` to `defineGrundtoneConfig` with three-layer resolution (prop →
    config → currentColor)
  - Design system: icon utility SCSS classes with prefix support (`{prefix}-icon`)
  - Vue Icon: add `color` prop with config fallback
  - React Native: GTIcon (react-native-svg) and GTButton (Pressable) components with full theme
    support
  - Expo playground: SDK 54, pnpm workspace, expo-router with Grundtone theme provider
  - Docs: web icon classes, RN icons, icon gallery component, nav restructure (Design System,
    Frameworks dropdown, Core Concepts dropdown)
  - Third-party: credit react-native-svg

### Patch Changes

- Updated dependencies
  [[`36758db`](https://github.com/grundtone/grundtone/commit/36758db0b2b3823e5a71e5bc7b14ed80b7ee4a25),
  [`1e90785`](https://github.com/grundtone/grundtone/commit/1e90785ab0b0ad5df1437a1b87e15db602582cd6),
  [`33219d3`](https://github.com/grundtone/grundtone/commit/33219d309b4ad6f56df0f02083a5730f5543a1d4),
  [`fe730ff`](https://github.com/grundtone/grundtone/commit/fe730ff700a9801f6985aa326d899fdb03e0f88f),
  [`c7e2fbe`](https://github.com/grundtone/grundtone/commit/c7e2fbed5d370449cb61e92b3bcade97897e0581)]:
  - @grundtone/utils@2.1.0
  - @grundtone/design-system@2.1.0
  - @grundtone/icons@2.1.0
  - @grundtone/core@2.1.0

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
  - @grundtone/utils@2.0.0

## 1.0.0 - 2025-12-31

### Major Changes

- [`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)
  Thanks [@allanasp](https://github.com/allanasp)! - Initial release of Grundtone design system with
  grid system, design tokens, Vue 3 components, and Nuxt module

### Patch Changes

- Updated dependencies
  [[`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)]:
  - @grundtone/core@1.0.0
  - @grundtone/utils@1.0.0
