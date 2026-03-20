---
'@grundtone/design-system': minor
'@grundtone/vue': minor
'@grundtone/utils': minor
---

Add DateInput component for day/month/year date entry

- **design-system**: Add `_date-input.scss` with flex layout, field widths
  (`box-sizing: content-box` for correct sizing across all input sizes), and sub-labels
- **vue**: Add `GTDateInput` component with auto-advance, numeric filtering, accessible markup
  (`role="group"`, `aria-labelledby`, per-field labels, `inputmode="numeric"`)
- **vue**: Add `useDateField` composable — reactive date validation with `UseFieldReturn`-compatible
  interface for `useFormValidation` integration
- **utils**: Add `isValidDate`, `isDateInPast`, `isDateInFuture` validation functions and `date()`,
  `datePast()`, `dateFuture()` validators
