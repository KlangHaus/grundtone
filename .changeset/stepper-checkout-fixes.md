---
'@grundtone/design-system': minor
'@grundtone/vue': minor
'@grundtone/react-native': minor
---

Add Stepper component, checkout flow, and fixes

- **design-system**: Add `_stepper.scss` (horizontal dots, checkmarks, connecting lines,
  error/simple variants)
- **vue**: Add `GTStepper` molecule (14 tests) with v-model:activeStep, allClickable, simple
  variant. Fix Input charWidth with padding compensation. Fix Breadcrumb li margin override. Add
  checkout flow to Vue playground (4-step: Cart → Delivery → Payment → Confirm using GTStepper,
  GTAddressInput, GTCard, GTRadioGroup, GTCheckbox, useField, useToast).
- **react-native**: Add `GTStepper` with Pressable steps and dot/check/error indicators
