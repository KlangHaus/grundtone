# @grundtone/utils

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

## 2.17.0

### Patch Changes

- Updated dependencies []:
  - @grundtone/core@2.17.0

## 2.12.0 - 2026-03-22

### Minor Changes

- [`fc456bf`](https://github.com/grundtone/grundtone/commit/fc456bfc25e1263f3fc19140f8108698072c269d)
  Thanks [@allanasp](https://github.com/allanasp)! - Add FileUpload, PasswordInput, OtpInput,
  Fieldset, and password/OTP validators

  - **design-system**: Add `_file-upload.scss` (modern drop zone), `_password-input.scss` (show/hide
    toggle), `_otp-input.scss` (single-digit fields), `_fieldset.scss` (form grouping). Web docs for
    all four with CodePreview.
  - **vue**: Add `GTFileUpload` (drag-and-drop, file validation, 12 tests), `GTPasswordInput`
    (eye/eye-off icon toggle, spellcheck=false, 12 tests), `GTOtpInput` (auto-advance, paste, filled
    state, 12 tests)
  - **utils**: Add `isStrongPassword`, `getPasswordStrength`, `isValidOtp` validation functions +
    `password()`, `passwordStrength()`, `otp()` validator factories
  - **icons**: Add eye, eye-off, upload, file SVG icons (17 total)

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

## 2.1.0 - 2026-03-21

### Minor Changes

- [`36758db`](https://github.com/grundtone/grundtone/commit/36758db0b2b3823e5a71e5bc7b14ed80b7ee4a25)
  Thanks [@allanasp](https://github.com/allanasp)! - Add GTInput component with label, help text,
  error state, and accessibility support across all platforms. Includes generateId utility, SCSS
  element reset and component classes, Vue SFC with 27 tests, React Native component, docs for
  Vue/web/RN, demos, and playground examples.

### Patch Changes

- Updated dependencies
  [[`fe730ff`](https://github.com/grundtone/grundtone/commit/fe730ff700a9801f6985aa326d899fdb03e0f88f)]:
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

### Patch Changes

- Updated dependencies
  [[`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)]:
  - @grundtone/core@1.0.0
