---
'@grundtone/vue': patch
---

Emit type re-exports as bare specifiers, so consumers can resolve them.

The published declarations re-exported through `'../../utils/src'` and `'../../core/src'`. Neither
`@grundtone/utils` nor `@grundtone/core` publishes `src`, so the target existed in no consumer
install. Measured on a real install of 3.2.0: with `skipLibCheck: false` tsc reports 13 × TS2307;
with `skipLibCheck: true` — what most consumers run — it reports nothing, and `required`,
`getSystemThemeMode`, `Validator`, `ValidationResult`, `IconDefinition` and `IconRegistry` are
silently `any`.

The declaration build now runs with a tsconfig that does not remap the `@grundtone` scope onto
sibling sources, so the emitter writes the specifier the author typed.
