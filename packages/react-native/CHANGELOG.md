# @grundtone/react-native

## 2.4.0

### Minor Changes

- [`b24dbd9`](https://github.com/grundtone/grundtone/commit/b24dbd9a10bf80685d571ab69ff40ec1098fc9a6)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTAccordion with 3 variants, 3 transitions,
  animated RN expand/collapse

## 2.3.0

### Minor Changes

- [`f155ea5`](https://github.com/grundtone/grundtone/commit/f155ea5b91ab9e7393a96dc3654aa92b46210db5)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTDetails disclosure component with
  default, subtle, and card variants

## 2.2.0

### Minor Changes

- [`d087e51`](https://github.com/grundtone/grundtone/commit/d087e51106acb475d92a51e063ce540a0ea41d47)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTBadge component, replace legacy .tag, fix
  AnchorLinks click highlight

## 2.1.0

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
