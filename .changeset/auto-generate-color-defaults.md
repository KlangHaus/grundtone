---
'@grundtone/design-tokens': minor
---

Auto-generate `_color-defaults.scss` from `@grundtone/core` theme-preset.

- Add `generate:colors` script that converts core color presets to SCSS maps
- Prepend generation to `build` so values always stay in sync
- Replace hardcoded color tables in docs with `<ColorTokens>` Vue component
- Color tables now render from core at VitePress build time — no manual hex duplication
