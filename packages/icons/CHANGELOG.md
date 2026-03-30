# @grundtone/icons

## 2.2.0 - 2026-03-22

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

## 2.1.2 - 2026-03-21

### Patch Changes

- [`009ab18`](https://github.com/grundtone/grundtone/commit/009ab18cbff1652f5b42665bfcc7bc37a4e310b7)
  Thanks [@allanasp](https://github.com/allanasp)! - Add Toast component, chevron-up icon, and
  prefix refactor for all new components

  - **vue**: Add `GTToast`, `GTToastContainer`, and `useToast` composable (Sonner-style with
    countdown bar, stacking, rich colors, 15 tests). Add chevron-up icon for BackToTop.
  - **vue**: Prefix refactor — all new components (Tag, BackLink, BackToTop, Textarea, Checkbox,
    RadioGroup, CheckboxGroup, SearchField, OverflowMenu, Toast, Modal) now use `getClassPrefix()`
    in templates and `<style lang="scss">` blocks with `$prefix` and `tokens.*` namespace, matching
    the existing Badge/Input/Button pattern.
  - **icons**: Add `chevron-up` SVG icon to navigation category (13 icons total).

## 2.1.1 - 2026-03-21

### Patch Changes

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

## 2.1.0 - 2026-03-21

### Minor Changes

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
