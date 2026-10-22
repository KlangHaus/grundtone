---
'@grundtone/vue': patch
'@grundtone/design-system': patch
---

Tinted badges (info, success, warning, error) now use the neutral text colour on their status tint
instead of the status colour itself, so their text meets WCAG AA (≥ 4.5:1) in light and dark mode.
Before, light mode measured 1.51–3.78:1. The tint and the dot still carry the status colour, as in
`GTAlert`. This applies to both `.gt-badge--*` and `.badge--*`.
