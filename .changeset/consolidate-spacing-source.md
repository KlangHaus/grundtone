---
'@grundtone/core': minor
'@grundtone/design-tokens': minor
---

refactor: consolidate spacing system with single source of truth

Core:

- Spacing values in `theme-preset.ts` are now the single source of truth for the 8px base unit
  system
- Added documentation comments to `defaultSpacing` for cross-platform use (web rem / RN numbers)
- Changed `4xl` spacing from `5rem` (80px) to `6rem` (96px) to follow 8px grid multiples
- Removed `ThemeConfig` type (replaced by the full `Theme` type from theme system)
- Removed `DEFAULT_THEME` constant (replaced by `defaultTheme` / `createTheme`)
- Removed `style.css`, `breakpoints.ts`, and `.d.ts` declaration files
- Removed constants barrel re-export from package entry

Design tokens:

- Simplified `_spacing.scss`: removed granular `$spacers` numeric map and `:root` block
- Replaced with semantic `$spacing-xs` through `$spacing-4xl` variables aligned with core
- Removed duplicate `$space-*` variables from `_variables.scss`
- Added `$spacing-4xl: 6rem` (96px) to match core
