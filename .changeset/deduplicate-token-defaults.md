---
'@grundtone/core': minor
'@grundtone/design-tokens': minor
---

Remove duplicated token values from design-tokens SCSS — single source of truth is now
@grundtone/core theme-preset.ts.

- Export defaultSpacing, defaultRadius, defaultShadows, defaultTransitions, defaultTypography from
  core
- Add defaultZIndex and ThemeZIndex interface to core
- Unified codegen script (generate-token-defaults.ts) generates all \*-defaults.scss from core TS
- Delete \_spacing.scss, \_z-index.scss, \_variables.scss (pure duplicates)
- Refactor \_radius.scss, \_shadows.scss, \_typography.scss to import generated defaults
- Remove 62.5% rem trick from typography, align all values with core TS
- Replace hardcoded :root values in index.scss with loops over generated SCSS maps
