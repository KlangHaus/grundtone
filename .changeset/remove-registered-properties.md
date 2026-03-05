---
'@grundtone/design-tokens': minor
'@grundtone/composables': minor
---

Remove CSS @property registrations — hardcoded initial-values were out of sync with core TS,
inherits: false broke dark mode, and none of the registered properties were used for animation.
Delete registered-properties.ts, useRegisteredProperties composable, and all related exports.
