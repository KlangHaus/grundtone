---
'@grundtone/design-system': minor
'@grundtone/vue': minor
---

Add Image utilities, Figure, Carousel, Chart, and Error Page components

**Image**: .img-fluid, .img-thumbnail, .img-cover, .img-contain CSS utilities. **Figure**: Semantic
figure/figcaption with .figure CSS classes. **Carousel** (GTCarousel + GTCarouselSlide): Slide/fade
transitions, continuous touch drag with rubber-band resistance, keyboard nav, autoplay with
reduced-motion respect. Vanilla JS behavior included. **Chart** (GTChartContainer + GTChartLegend):
5 semantic color tokens (--chart-1 to --chart-5), chart-lib agnostic container with CSS custom
properties per series. **Error Page** (GTErrorPage): Musical staff-line SVG illustrations per HTTP
status code (404, 403, 500, 503). Auto-resolves title/description.

Also adds vanilla JS behaviors for Tooltip, Toast, Stepper, and SearchField. Replaces manual ESLint
globals with globals.browser package. Switches changeset changelog to @changesets/changelog-git.
