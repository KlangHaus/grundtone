---
'@grundtone/design-system': minor
---

**IBM Plex is now loaded.** The typography tokens have always named `IBM Plex Sans` and
`IBM Plex Mono` first, but nothing loaded them, so every consumer without a local Plex install
rendered the fallback fonts. `dist/index.css` now declares `@font-face` for Plex Sans
400/500/600/700 and Plex Mono 400/500/600: Latin-1 subsets, `font-display: swap`, self-hosted in the
package (`src/fonts/ibm-plex`, SIL OFL 1.1). No CDN request.

If you compile the SCSS yourself, set where the font files are served from:
`@use '@grundtone/design-system/scss' with ($font-files-url: '/fonts/ibm-plex/');`

**Hover utilities.** `hover:bg-*` and `hover:text-*` now exist for every background and text colour
utility (e.g. `hover:bg-surface-alt`). Until now a `hover:*` class compiled to nothing.
