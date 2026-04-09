# @grundtone/react-native

## 2.22.0

### Minor Changes

- Unified version 2.22.0 release:

  - @grundtone/vue: TypeScript declarations now shipped in dist/types/index.d.ts (fixes TS users
    getting 'any' types)
  - @grundtone/vue: Re-exports createTheme, iconRegistry, and all core types — users no longer need
    to install @grundtone/core or @grundtone/icons separately
  - All packages: Unified version number (was split across 2.2.0, 2.17.0, 2.21.6)

### Patch Changes

- Updated dependencies []:
  - @grundtone/core@2.22.0
  - @grundtone/icons@2.22.0
  - @grundtone/utils@2.22.0

## 2.17.0

### Patch Changes

- Updated dependencies []:
  - @grundtone/core@2.17.0
  - @grundtone/utils@2.17.0

## 2.12.0 - 2026-03-22

### Patch Changes

- Updated dependencies
  [[`fc456bf`](https://github.com/grundtone/grundtone/commit/fc456bfc25e1263f3fc19140f8108698072c269d)]:
  - @grundtone/utils@2.12.0
  - @grundtone/icons@2.2.0

## 2.11.0 - 2026-03-22

### Minor Changes

- [`c37762e`](https://github.com/grundtone/grundtone/commit/c37762e4ae7944dffc13d04de43a5b0ba83fcf32)
  Thanks [@allanasp](https://github.com/allanasp)! - Add Stepper component, checkout flow, and fixes

  - **design-system**: Add `_stepper.scss` (horizontal dots, checkmarks, connecting lines,
    error/simple variants)
  - **vue**: Add `GTStepper` molecule (14 tests) with v-model:activeStep, allClickable, simple
    variant. Fix Input charWidth with padding compensation. Fix Breadcrumb li margin override. Add
    checkout flow to Vue playground (4-step: Cart → Delivery → Payment → Confirm using GTStepper,
    GTAddressInput, GTCard, GTRadioGroup, GTCheckbox, useField, useToast).
  - **react-native**: Add `GTStepper` with Pressable steps and dot/check/error indicators

## 2.10.0 - 2026-03-22

### Minor Changes

- [`200846b`](https://github.com/grundtone/grundtone/commit/200846b19a450ca48fc97919cf858989483c4318)
  Thanks [@allanasp](https://github.com/allanasp)! - Add Tooltip component, Toast playground updates

  - **design-system**: Add `_tooltip.scss` (dark minimal Sonner-style bubble with auto-positioning
    and arrow)
  - **vue**: Add `GTTooltip` atom (click with help icon, hover with 300ms delay, auto-flips
    top↔bottom, 13 tests). Toast icons vertically centered. Toast added to all playgrounds with
    variant icons.
  - **react-native**: Add `GTTooltip` (long-press trigger with Modal overlay). Toast vertically
    centered.

## 2.9.1 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`009ab18`](https://github.com/grundtone/grundtone/commit/009ab18cbff1652f5b42665bfcc7bc37a4e310b7)]:
  - @grundtone/icons@2.1.2

## 2.9.0 - 2026-03-21

### Minor Changes

- [`efee6cf`](https://github.com/grundtone/grundtone/commit/efee6cfe57c2ec6f038bd2ddc7bd7004a71e2a67)
  Thanks [@allanasp](https://github.com/allanasp)! - Add OverflowMenu, SearchField, Tag, Textarea,
  BackLink, and BackToTop components

  - **design-system**: Add `_overflow-menu.scss` (dropdown with keyboard nav, smart positioning),
    `_search-field.scss` (input + submit with magnifying glass icon, suggestions dropdown),
    `_tag.scss` (interactive metadata: display, dismissible, selectable), `_textarea.scss`
    (multi-line input with character count), redesign `_back-link.scss` (baked-in styling with CSS
    arrow), `_back-to-top.scss` (sticky scroll button, mobile icon-only). Add OverflowMenu and
    BackToTop vanilla JS behaviors.
  - **vue**: Add `GTOverflowMenu` (18 tests), `GTSearchField` (17 tests), `GTTag` (15 tests),
    `GTTextarea` (20 tests), `GTBackLink` (5 tests), `GTBackToTop` (8 tests). Move SearchField from
    atoms to molecules.
  - **react-native**: Add `GTOverflowMenu` (Modal + FlatList), `GTSearchField` (TextInput + submit),
    `GTTag` (Pressable with selected/dismissible), `GTTextarea` (multiline with count), `GTBackLink`
    (chevron + optional label), `GTBackToTop` (ScrollView ref).
  - **icons**: Add missing `external-link` SVG icon to navigation category (fixes Card component
    warning).

### Patch Changes

- Updated dependencies
  [[`efee6cf`](https://github.com/grundtone/grundtone/commit/efee6cfe57c2ec6f038bd2ddc7bd7004a71e2a67)]:
  - @grundtone/icons@2.1.1

## 2.8.0 - 2026-03-21

### Minor Changes

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
  [`9cf5217`](https://github.com/grundtone/grundtone/commit/9cf52174c298cab51259a2ca948523eef26a1516)]:
  - @grundtone/utils@2.8.0

## 2.6.0 - 2026-03-21

### Minor Changes

- [`a8f16af`](https://github.com/grundtone/grundtone/commit/a8f16af2101e8fddec6e5e7e08cf287ca76937f4)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTTabs with underline, segment, pill
  variants and slide transitions

## 2.5.0 - 2026-03-21

### Minor Changes

- [`47eec5f`](https://github.com/grundtone/grundtone/commit/47eec5f72d7299faf3b97bfc32513d6df4ff9ea4)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTSelect, GTAutocomplete, GTAddressInput
  with DAWA integration

## 2.4.0 - 2026-03-21

### Minor Changes

- [`b24dbd9`](https://github.com/grundtone/grundtone/commit/b24dbd9a10bf80685d571ab69ff40ec1098fc9a6)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTAccordion with 3 variants, 3 transitions,
  animated RN expand/collapse

## 2.3.0 - 2026-03-21

### Minor Changes

- [`f155ea5`](https://github.com/grundtone/grundtone/commit/f155ea5b91ab9e7393a96dc3654aa92b46210db5)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTDetails disclosure component with
  default, subtle, and card variants

## 2.2.0 - 2026-03-21

### Minor Changes

- [`d087e51`](https://github.com/grundtone/grundtone/commit/d087e51106acb475d92a51e063ce540a0ea41d47)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTBadge component, replace legacy .tag, fix
  AnchorLinks click highlight

## 2.1.0 - 2026-03-21

### Minor Changes

- [`36758db`](https://github.com/grundtone/grundtone/commit/36758db0b2b3823e5a71e5bc7b14ed80b7ee4a25)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTInput component with label, help text,
  error state, and accessibility support across all platforms. Includes generateId utility, SCSS
  element reset and component classes, Vue SFC with 27 tests, React Native component, docs for
  Vue/web/RN, demos, and playground examples.

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

- [`1e90785`](https://github.com/grundtone/grundtone/commit/1e90785ab0b0ad5df1437a1b87e15db602582cd6)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTCookieMessage and GTAnchorLinks
  components, cookie icon, fix RN Card shadow types

- Updated dependencies
  [[`36758db`](https://github.com/grundtone/grundtone/commit/36758db0b2b3823e5a71e5bc7b14ed80b7ee4a25),
  [`1e90785`](https://github.com/grundtone/grundtone/commit/1e90785ab0b0ad5df1437a1b87e15db602582cd6),
  [`33219d3`](https://github.com/grundtone/grundtone/commit/33219d309b4ad6f56df0f02083a5730f5543a1d4),
  [`fe730ff`](https://github.com/grundtone/grundtone/commit/fe730ff700a9801f6985aa326d899fdb03e0f88f)]:
  - @grundtone/utils@2.1.0
  - @grundtone/icons@2.1.0
  - @grundtone/core@2.1.0

## 2.0.0 - 2026-03-09

### Minor Changes

- [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26)
  Thanks [@allanasp](https://github.com/allanasp)! - Add branding system with logo variants and
  platform helpers.

  - `createBranding()` factory for centralised brand name, tagline, and logo paths
  - Six logo variants (primary 1080, pwa512, pwa192, appleTouchIcon 180, favicon32, favicon16)
  - Web: `brandingHeadTags()` generates favicon/apple-touch-icon `<link>` tags
  - React Native: `getLogoSource()` returns `ImageSourcePropType` for `<Image>`
  - Build script `scripts/generate-logo-variants.ts` to regenerate variants from source

### Patch Changes

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
