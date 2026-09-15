---
'@grundtone/core': patch
---

`createTheme()` accepts the override object form again, next to a bare colour preset:
`{ light: { colors, typography, radius, spacing, transitions } }`, and the same for `dark`.

**What changed in 3.0.0, undeclared until now:** 2.22.0 accepted both forms. 3.0.0 kept only the
colour preset. An override object was spread into the colour map, and every value in it resolved to
the defaults. A theme built from published tokens therefore rendered the default brand, and nothing
reported an error.

This patch restores the 2.22.0 behaviour. The `CreateThemeOverrides` type is exported again and
describes that form. Partial `typography` and `transitions` groups merge with the defaults. Bare
colour presets behave exactly as in 3.0.0.

**Mixed objects are read as overrides, as in 2.22.0.** An object that has any of `colors`,
`typography`, `radius`, `spacing` or `transitions` as a key, even with an `undefined` value, is read
entirely as the override form. Colour keys at its top level are then ignored without an error:
`{ light: { primary: '#ff0000', radius: { md: '4px' } } }` keeps the radius and drops `primary`. Put
colours under `colors` when you combine them with other groups.
