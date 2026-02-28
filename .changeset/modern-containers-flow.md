---
'@grundtone/design-tokens': minor
'@grundtone/composables': patch
---

feat(design-tokens): modern container system replacing Bootstrap-style containers

New features:

- Fluid gutters via `clamp(1rem, 4vw, 2rem)` — smooth scaling, no breakpoint jumps
- CSS custom properties `--container-max` and `--container-gutter` for runtime configuration
- Logical properties (`padding-inline`, `margin-inline`) for automatic RTL support
- All layout containers are container query contexts (`container-type: inline-size`)
- `.container-prose` — optimal reading width (65ch)
- `.breakout` — full-viewport-width children inside containers
- Computed max-widths from `$grid-breakpoints` — no separate `$container-max-widths` map

Breaking changes:

- Container query type classes renamed: `.container` → `.cq-contain`, `.container-normal` →
  `.cq-normal`, `.container-size` → `.cq-size`, `.container-{name}` → `.cq-{name}`
- Removed `$container-max-widths` SCSS variable (max-widths are now computed)
