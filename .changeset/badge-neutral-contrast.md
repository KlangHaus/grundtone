---
'@grundtone/vue': patch
'@grundtone/design-system': patch
---

The neutral badge (`GTBadge variant="neutral"` and `.badge--neutral`) now uses `--color-text`
instead of `--color-text-secondary` for its text. The old pair measured 4.15:1 on
`--color-surface-alt` in light mode, below WCAG AA for small text. The grey surface is unchanged.
