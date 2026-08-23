---
'@grundtone/core': major
'@grundtone/utils': major
'@grundtone/icons': major
'@grundtone/design-system': major
'@grundtone/vue': major
'@grundtone/nuxt': major
---

grundtone 3.0.0 — develop becomes the published line.

The 2.x line was cut from main and never flowed back, so develop and npm drifted apart. Rather than
port main's surface onto develop, this release accepts develop as the source of truth and declares
what that costs.

BREAKING: 20 public exports and 4 export-map entry points are removed. Every one is declared in
.api-removals.json with the reason beside it. Nineteen of the twenty never existed in develop; none
of our three internal consumers import any of them. External consumers cannot be enumerated, which
is precisely why this is a major and not a minor.

Consumers must update their dependency explicitly: `^2.x` does not match 3.0.0.

@grundtone/react-native is deliberately NOT included — it sits ten minor versions behind npm on
develop, and publishing it here would ship a regression wrapped in a higher number. Its fate is a
separate decision.
