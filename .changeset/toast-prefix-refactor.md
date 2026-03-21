---
'@grundtone/vue': patch
'@grundtone/icons': patch
---

Add Toast component, chevron-up icon, and prefix refactor for all new components

- **vue**: Add `GTToast`, `GTToastContainer`, and `useToast` composable (Sonner-style with countdown
  bar, stacking, rich colors, 15 tests). Add chevron-up icon for BackToTop.
- **vue**: Prefix refactor — all new components (Tag, BackLink, BackToTop, Textarea, Checkbox,
  RadioGroup, CheckboxGroup, SearchField, OverflowMenu, Toast, Modal) now use `getClassPrefix()` in
  templates and `<style lang="scss">` blocks with `$prefix` and `tokens.*` namespace, matching the
  existing Badge/Input/Button pattern.
- **icons**: Add `chevron-up` SVG icon to navigation category (13 icons total).
