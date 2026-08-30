---
'@grundtone/react-native': major
---

Brings `@grundtone/react-native` onto the 3.x line with the rest of the family, and stops it pinning
its siblings to an exact version.

**It was never broken against 3.x** — it builds and tests green against the 3.0 core today, and none
of the five APIs it imports (`createTheme`, `iconRegistry`, `resolveThemeMode`, `required`, `email`)
were touched by the 3.0 removals, which were confined to `@grundtone/vue`. The colour palette is
byte-for-byte the same 39 slots in 2.22.0 and 3.0.0.

**What it was, was isolated.** The published 2.22.0 pinned `@grundtone/core` to `2.22.0` exactly, so
a consumer following this package's own README —
`npm install @grundtone/react-native @grundtone/core` — ended up with two copies of core: 3.x at the
top and 2.22.0 nested underneath. It worked only because the two palettes happened to be identical.
The dependencies are now `workspace:^`, which publishes as `^3.0.0` and lets a consumer's own 3.x
satisfy them.
