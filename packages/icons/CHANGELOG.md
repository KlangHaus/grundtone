# @grundtone/icons

## 3.2.3 - 2026-09-24

### Patch Changes

- [#233](https://github.com/KlangHaus/grundtone/pull/233)
  [`137bf22`](https://github.com/KlangHaus/grundtone/commit/137bf223f9b49a69c82c04e7e6c43103d7999595)
  Thanks [@dependabot](https://github.com/apps/dependabot)! - Bump development dependencies
  ([#233](https://github.com/KlangHaus/grundtone/issues/233)): `@vitejs/plugin-vue` 6.0.8→6.0.9,
  `eslint` 10.10.0→10.11.0, `tsx` 4.23.13→4.23.15, `@vue/test-utils` 2.5.0→2.5.1 and the rest of the
  dev-remainder group.

  No source file changes. Written because the repo's own gate requires a changeset from every
  published package whose `package.json` is touched, and Dependabot does not write one — not because
  these bumps are known to alter what consumers receive.

  🔴 Whether they DO alter it is unmeasured here. The honest test is whether the packed tarball
  changes byte for byte, which is the instrument this repo already uses for the licence text; it
  does not exist for this question yet. Until it does, a changeset is the conservative answer: a
  version nobody needed costs a patch number, a missing one ships a change with no record.

## 3.2.2 - 2026-09-24

### Patch Changes

- [#231](https://github.com/KlangHaus/grundtone/pull/231)
  [`8930bbe`](https://github.com/KlangHaus/grundtone/commit/8930bbef4f321511d54e2c10de0fc28ec9e23b53)
  Thanks [@allanasp](https://github.com/allanasp)! - Ship the MIT licence text inside the package
  itself.

  Every package already declared `license: MIT`, and npm has served that to everyone installing them
  — but the text existed nowhere in the repository, and the README's licence badge linked to a file
  that answered 404. npm includes `LICENSE` from the package directory only; it does not reach up to
  a monorepo root, so a root-level file would satisfy a human browsing GitHub and nobody who
  installs the package.

  No terms change: this makes the grant that was already published readable in the artefact that
  carries it.

## 3.2.0 - 2026-09-19

### Minor Changes

- [#205](https://github.com/KlangHaus/grundtone/pull/205)
  [`97e4bb9`](https://github.com/KlangHaus/grundtone/commit/97e4bb9b100dbe8ca98a71e52012ee9bc28c3005)
  Thanks [@allanasp](https://github.com/allanasp)! - Seven navigation icons: `home`, `folder`,
  `users`, `list`, `key`, `credit-card`, `settings`, taken from Feather (MIT, see
  `THIRD-PARTY-NOTICES.md`, now included in the package) and drawn like the rest of the set.

## 3.0.0 - 2026-08-23

### Major Changes

- [#155](https://github.com/KlangHaus/grundtone/pull/155)
  [`e4ae9d6`](https://github.com/KlangHaus/grundtone/commit/e4ae9d6947bd21716476c776fdea80b2f51d307c)
  Thanks [@allanasp](https://github.com/allanasp)! - grundtone 3.0.0 — develop becomes the published
  line.

  The 2.x line was cut from main and never flowed back, so develop and npm drifted apart. Rather
  than port main's surface onto develop, this release accepts develop as the source of truth and
  declares what that costs.

  BREAKING: 20 public exports and 4 export-map entry points are removed. Every one is declared in
  .api-removals.json with the reason beside it. Nineteen of the twenty never existed in develop;
  none of our three internal consumers import any of them. External consumers cannot be enumerated,
  which is precisely why this is a major and not a minor.

  Consumers must update their dependency explicitly: `^2.x` does not match 3.0.0.

  @grundtone/react-native is deliberately NOT included — it sits ten minor versions behind npm on
  develop, and publishing it here would ship a regression wrapped in a higher number. Its fate is a
  separate decision.

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
