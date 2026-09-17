---
'@grundtone/design-system': minor
---

**IBM Plex is now loaded.** The typography tokens have always named `IBM Plex Sans` and
`IBM Plex Mono` first, but nothing loaded them, so every consumer without a local Plex install
rendered the fallback fonts. The new entry `@grundtone/design-system/fonts.css` declares
`@font-face` for Plex Sans 400/500/600/700 and Plex Mono 400/500/600: Latin-1 subsets,
`font-display: swap`, self-hosted in the package (`src/fonts/ibm-plex`, SIL OFL 1.1). No CDN
request.

It is a separate file, not part of `index.css`, so bundlers that inline assets do not turn the fonts
into base64 inside other CSS. `@grundtone/nuxt` injects it for you. Without Nuxt:
`import '@grundtone/design-system/fonts.css';`

If you compile the SCSS yourself, set where the font files are served from:
`@use '@grundtone/design-system/scss/fonts' with ($font-files-url: '/fonts/ibm-plex/');`

**Hover utilities.** `hover:bg-*` and `hover:text-*` now exist for every background and text colour
utility (e.g. `hover:bg-surface-alt`). Until now a `hover:*` class compiled to nothing.
