---
'@grundtone/core': minor
'@grundtone/vue': minor
---

feat(theme): support separate light and dark theme config in ThemeProvider

- Add `ThemeConfig` type: `Partial<Theme>` or `{ light?: Partial<Theme>; dark?: Partial<Theme> }`
- ThemeProvider now applies mode-specific overrides when theme has `light`/`dark` keys
- Backward compatible: single theme object still applies to both modes
- Update docs: theme-configuration, installation, ThemeProvider README
