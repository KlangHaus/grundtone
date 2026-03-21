---
'@grundtone/design-system': minor
'@grundtone/vue': minor
'@grundtone/react-native': minor
'@grundtone/icons': patch
---

Add OverflowMenu, SearchField, Tag, Textarea, BackLink, and BackToTop components

- **design-system**: Add `_overflow-menu.scss` (dropdown with keyboard nav, smart positioning),
  `_search-field.scss` (input + submit with magnifying glass icon, suggestions dropdown),
  `_tag.scss` (interactive metadata: display, dismissible, selectable), `_textarea.scss` (multi-line
  input with character count), redesign `_back-link.scss` (baked-in styling with CSS arrow),
  `_back-to-top.scss` (sticky scroll button, mobile icon-only). Add OverflowMenu and BackToTop
  vanilla JS behaviors.
- **vue**: Add `GTOverflowMenu` (18 tests), `GTSearchField` (17 tests), `GTTag` (15 tests),
  `GTTextarea` (20 tests), `GTBackLink` (5 tests), `GTBackToTop` (8 tests). Move SearchField from
  atoms to molecules.
- **react-native**: Add `GTOverflowMenu` (Modal + FlatList), `GTSearchField` (TextInput + submit),
  `GTTag` (Pressable with selected/dismissible), `GTTextarea` (multiline with count), `GTBackLink`
  (chevron + optional label), `GTBackToTop` (ScrollView ref).
- **icons**: Add missing `external-link` SVG icon to navigation category (fixes Card component
  warning).
