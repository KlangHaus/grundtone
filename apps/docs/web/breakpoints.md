# Breakpoints

Breakpoints are customizable widths that determine how your responsive layout behaves across device
or viewport sizes.

## On this page

- [Core concepts](#core-concepts)
- [Available breakpoints](#available-breakpoints)
- [Media queries](#media-queries)
  - [Min-width](#min-width)
  - [Max-width](#max-width)
  - [Single breakpoint](#single-breakpoint)
  - [Between breakpoints](#between-breakpoints)

---

## Core concepts

- **Breakpoints** are the building blocks of responsive design. Use them to control when your layout
  adapts at a particular viewport or device size.
- **Media queries** let you conditionally apply styles based on browser and viewport parameters. We
  commonly use `min-width` in our media queries.
- **Mobile-first** responsive design is the goal. Apply the minimum styles for the smallest
  breakpoint, then layer on styles for larger devices. This optimizes CSS and improves rendering.

---

## Available breakpoints

Grundtone includes six default breakpoints for building responsively:

| Breakpoint  | Class infix | Dimensions |
| ----------- | ----------- | ---------- |
| Extra small | None        | &lt;640px  |
| Small       | `sm`        | ≥640px     |
| Medium      | `md`        | ≥768px     |
| Large       | `lg`        | ≥1024px    |
| Extra large | `xl`        | ≥1280px    |
| 2X large    | `2xl`       | ≥1536px    |

These breakpoints are customizable via Sass — see
[Theme Configuration](/guide/theme-configuration#custom-breakpoints) for override syntax.

All breakpoint values come from a **single source of truth**
(`src/core/_breakpoints-defaults.scss`). Every other file that needs breakpoints — grid utilities,
container max-widths, `:root` CSS custom properties, and `@property` registrations — derives from
this one map. When you override `$grid-breakpoints`, everything updates automatically.

```scss
@use '@grundtone/design-tokens/scss' with (
  $grid-breakpoints: (
    xs: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px,
    2xl: 1400px,
  )
);
```

---

## Media queries

The design-tokens package provides Sass mixins for responsive layouts. When writing custom SCSS that
imports from the design-tokens source, use the mixins. (If using only the pre-built CSS, use the
utility class prefixes like `md:`, `lg:` instead.)

### Min-width

Apply styles from a breakpoint and up. Use the `media-breakpoint-up` mixin from the design-tokens
breakpoints module:

```scss
@use '@grundtone/design-tokens/scss/breakpoints' as bp;

// No media query for xs – it's effectively min-width: 0
@include bp.media-breakpoint-up(sm) {
  .my-class {
    display: block;
  }
}

@include bp.media-breakpoint-up(md) {
  .my-class {
    padding: 1rem;
  }
}
```

Compiled CSS:

```css
/* Small devices (640px and up) */
@media (min-width: 640px) {
  .my-class {
    display: block;
  }
}

/* Medium devices (768px and up) */
@media (min-width: 768px) {
  .my-class {
    padding: 1rem;
  }
}
```

### Max-width

Apply styles at a breakpoint and down (given screen size or smaller):

```scss
@use '@grundtone/design-tokens/scss/breakpoints' as bp;

@include bp.media-breakpoint-down(sm) {
  /* styles for <640px */
}

@include bp.media-breakpoint-down(md) {
  /* styles for <768px */
}

@include bp.media-breakpoint-down(lg) {
  /* styles for <1024px */
}
```

Compiled CSS (`.02px` is subtracted to avoid overlap at fractional viewport widths):

```css
/* sm and down: less than 640px */
@media (max-width: 639.98px) {
  /* ... */
}

/* md and down: less than 768px */
@media (max-width: 767.98px) {
  /* ... */
}

/* lg and down: less than 1024px */
@media (max-width: 1023.98px) {
  /* ... */
}
```

### Single breakpoint

Target a single range of screen sizes:

```scss
@use '@grundtone/design-tokens/scss/breakpoints' as bp;

@include bp.media-breakpoint-only(md) {
  .my-class {
    /* only between 768px and 1023.98px */
  }
}
```

Compiled:

```css
@media (min-width: 768px) and (max-width: 1023.98px) {
  .my-class {
    /* ... */
  }
}
```

### Between breakpoints

Target a range spanning multiple breakpoints:

```scss
@use '@grundtone/design-tokens/scss/breakpoints' as bp;

@include bp.media-breakpoint-between(md, xl) {
  .my-class {
    /* from 768px up to 1279.98px */
  }
}
```

Compiled:

```css
@media (min-width: 768px) and (max-width: 1279.98px) {
  .my-class {
    /* ... */
  }
}
```

---

## Utility classes

Spacing, display, flexbox, text-align, width, and grid utilities use these breakpoints as prefixes:

- `sm:`, `md:`, `lg:`, `xl:`, `2xl:` for media query variants (e.g. `md:p-4`, `lg:flex`)
- `cq-sm:`, `cq-md:`, `cq-lg:`, `cq-xl:` for container query variants

See [Grid Utility](/web/grid-utility) for grid-specific breakpoint usage and
[Containers](/web/containers) for container-specific breakpoint usage.

---

## Architecture

All breakpoint values flow from one file to avoid duplication:

All files live in `src/` — there is no separate `scss/` directory.

| File                                   | Role                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------- |
| `src/core/_breakpoints-defaults.scss`  | **Single source of truth** — defines `$grid-breakpoints-default` map      |
| `src/core/_breakpoints.scss`           | Mixins (`media-breakpoint-up`, etc.), functions, `:root` CSS var export   |
| `src/breakpoints.scss`                 | Public entry point for `@use '@grundtone/design-tokens/scss/breakpoints'` |
| `src/utilities/_grid.scss`             | Responsive grid classes (`sm:grid-cols-N`, etc.)                          |
| `src/utilities/_containers.scss`       | Layout containers (`.container`, `.container-{bp}`, etc.)                 |
| `src/core/_registered-properties.scss` | `@property --breakpoint-*` declarations (generated from map)              |
| `src/index.scss`                       | Full CSS entry point (compiles to `dist/index.css`)                       |
| `src/lib.scss`                         | SCSS-only API (mixins, functions, variables — no CSS output)              |

Container max-widths are computed dynamically from `$grid-breakpoints` via
`calc(breakpoint - gutter * 2)` — no separate map to maintain. See [Containers](/web/containers) for
details.
