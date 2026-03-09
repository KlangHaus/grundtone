# Containers

Layout containers center content and constrain its width. Included in `@grundtone/design-system` CSS
— see [Installation](/guide/installation) for setup. Examples below have a **Code** / **Preview**
tab.

## How it works

Every container shares the same base: `width: 100%`, centered with `margin-inline: auto`, and fluid
gutters that scale smoothly with the viewport. Unlike Bootstrap's fixed-pixel padding, Grundtone
uses `clamp()` for gutters that adapt from 16px on mobile to 32px on desktop — no breakpoint jumps.

All containers are also **container query contexts** (`container-type: inline-size`), so `cq-sm:`,
`cq-md:`, `cq-lg:` utilities work on children without needing an extra class.

---

## Basic container

The `.container` class steps up `max-width` at each breakpoint. The max-width is computed
automatically: `breakpoint - gutter * 2`, giving breathing room from the viewport edge.

<CodePreview name="ct-basic" />

| Breakpoint | Viewport | max-width (approx) |
| ---------- | -------- | ------------------ |
| < sm       | < 640px  | 100%               |
| sm         | 640px    | ~608px             |
| md         | 768px    | ~704px             |
| lg         | 1024px   | ~960px             |
| xl         | 1280px   | ~1216px            |
| 2xl        | 1536px   | ~1472px            |

> **Note:** Max-widths are approximate because the gutter scales fluidly via
> `clamp(1rem, 4vw, 2rem)`. At wider viewports the gutter reaches its 2rem cap, making the math:
> `breakpoint - 4rem`.

---

## Fluid container

Always 100% width. Same fluid gutters and centering, but no max-width cap:

<CodePreview name="ct-fluid" />

---

## Responsive containers

`.container-{bp}` is 100% until the named breakpoint, then it steps up from there. Use these when
you want full-width on smaller screens but constrained on larger ones.

<CodePreview name="ct-responsive" />

Available: `.container-sm`, `.container-md`, `.container-lg`, `.container-xl`, `.container-2xl`.

---

## Content-width containers

Fixed max-width containers for specific content patterns. All sizes shown side by side:

<CodePreview name="ct-sizes" />

### Narrow and tight

For focused reading and forms:

<CodePreview name="ct-narrow" />

<CodePreview name="ct-tight" />

### Wide

For dashboards and data-heavy layouts:

<CodePreview name="ct-wide" />

---

## Prose container

`.container-prose` constrains width to `65ch` — the typographic standard for optimal line length.
Since `ch` is relative to the font, the width adapts automatically to any typeface:

<CodePreview name="ct-prose" />

---

## CSS custom properties

Every container is driven by two CSS custom properties that you can override at any level:

| Property             | Default                  | Description                |
| -------------------- | ------------------------ | -------------------------- |
| `--container-max`    | `100%` (or computed)     | The `max-width` constraint |
| `--container-gutter` | `clamp(1rem, 4vw, 2rem)` | Inline padding (gutters)   |

### Override max-width

Set `--container-max` inline to make any container a specific width:

<CodePreview name="ct-custom-prop" />

### Override gutters

Set `--container-gutter` to control the internal padding:

<CodePreview name="ct-custom-gutter" />

This composability means you rarely need custom CSS. Just override the variable on the element.

---

## Breakout

`.breakout` lets a child element break out of its container to span the full viewport width. Useful
for hero images, full-width banners, or edge-to-edge sections inside a narrow container:

<CodePreview name="ct-breakout" />

```html
<div class="container">
  <p>Normal content, constrained by the container.</p>

  <div class="breakout">Full viewport width — breaks out of the container.</div>

  <p>Back to container width.</p>
</div>
```

> **Note:** `.breakout` uses `width: 100vw` which includes the scrollbar width on some browsers. Add
> `overflow-x: hidden` on `<html>` or `<body>` if you see a horizontal scrollbar.

---

## Container queries

Every layout container automatically sets `container-type: inline-size`, making it a container query context. Children can use `cq-` prefixed utility classes that respond to the **container's** width instead of the viewport.

This is the key difference from viewport breakpoints (`sm:`, `md:`): a sidebar card at 300px should show single-column layout even on a 1440px screen. Viewport classes can't do that — container queries can.

### CQ vs viewport

Same markup, same `cq-md:grid-cols-2` class — the narrow container stays single-column while the wide one switches to two columns:

<CodePreview name="ct-cq-vs-viewport" />

### CQ breakpoints

| Prefix | Min-width | Pixels |
|---|---|---|
| `cq-sm:` | 24rem | 384px |
| `cq-md:` | 32rem | 512px |
| `cq-lg:` | 48rem | 768px |
| `cq-xl:` | 64rem | 1024px |
| `cq-2xl:` | 80rem | 1280px |

### Grid columns

`cq-sm:grid-cols-2`, `cq-lg:grid-cols-4` — same classes as the [grid utilities](/web/grid-utility), just container-relative:

<CodePreview name="ct-cq-grid" />

### Flex direction

Stack vertically in narrow containers, go horizontal when there's room:

<CodePreview name="ct-cq-flex" />

### Show/hide elements

`cq-md:block` with `hidden` — the label only appears when the container is wide enough:

<CodePreview name="ct-cq-display" />

### Available CQ utilities

All CQ utilities mirror their viewport equivalents with a `cq-{bp}:` prefix:

| Category | Classes | Breakpoints |
|---|---|---|
| Display | `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `grid`, `inline-grid`, `hidden` | sm–xl |
| Grid columns | `grid-cols-1`, `grid-cols-2`, `grid-cols-3`, `grid-cols-4`, `grid-cols-6`, `grid-cols-12` | sm–lg |
| Flexbox | `flex-row`, `flex-col`, `flex-wrap`, `flex-nowrap`, `justify-start/center/end/between`, `items-start/center/end` | sm–lg |
| Spacing | `p-0` – `p-12`, `m-0` – `m-12` (scale varies per breakpoint) | sm–lg |
| Text size | `text-xs` – `text-3xl` (scale varies per breakpoint) | sm–lg |

### Named containers

For component-level container queries, use named containers instead of relying on the nearest ancestor:

<CodePreview name="ct-cq-named" />

```html
<div class="cq-card">   <!-- container-name: card -->
  <div class="card-compact card-normal card-spacious">
    Content adapts to the card's own width
  </div>
</div>
```

| Class | container-name |
|---|---|
| `.cq-card` | `card` |
| `.cq-sidebar` | `sidebar` |
| `.cq-main` | `main` |
| `.cq-modal` | `modal` |

### Container type utilities

If you need a CQ context without a layout container, use these:

| Class | container-type |
|---|---|
| `.cq-contain` | `inline-size` |
| `.cq-size` | `size` |
| `.cq-normal` | `normal` (reset) |

### Browser support

Container queries are supported in all modern browsers. For older browsers, a `@supports` fallback hides `cq-*:hidden` elements by default.

---

## Containers + Grid

Containers and grid work together. Put a grid inside a container for a centered, responsive layout:

<CodePreview name="ct-grid-inside" />

```html
<div class="container">
  <div class="grid grid-cols-3 gap-4">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</div>
```

---

## Logical properties and RTL

All containers use CSS logical properties (`padding-inline`, `margin-inline`) instead of physical
`left`/`right`. This means RTL layouts work automatically — no additional configuration needed.

---

## The make-container mixin

When writing custom SCSS, use the `make-container` mixin to create your own container variants:

```scss
@use '@grundtone/design-system/scss/lib' as tokens;

.my-custom-container {
  @include tokens.make-container;
  --container-max: 900px;
}
```

The mixin applies: fluid gutters, `width: 100%`, `max-width: var(--container-max)`,
`margin-inline: auto`, and `container-type: inline-size`.

---

## Class reference

### Layout containers

| Class              | Max-width                     | Description                   |
| ------------------ | ----------------------------- | ----------------------------- |
| `.container`       | Steps up at each breakpoint   | Responsive centered container |
| `.container-fluid` | 100%                          | Full width, no cap            |
| `.container-sm`    | 100% until sm, then steps up  | Responsive from 640px         |
| `.container-md`    | 100% until md, then steps up  | Responsive from 768px         |
| `.container-lg`    | 100% until lg, then steps up  | Responsive from 1024px        |
| `.container-xl`    | 100% until xl, then steps up  | Responsive from 1280px        |
| `.container-2xl`   | 100% until 2xl, then steps up | Responsive from 1536px        |

### Content-width containers

| Class                  | Max-width | Use case                        |
| ---------------------- | --------- | ------------------------------- |
| `.container-tight`     | 640px     | Forms, dialogs, login           |
| `.container-narrow`    | 768px     | Articles, focused reading       |
| `.container-prose`     | 65ch      | Typographic optimal line length |
| `.container-wide`      | 1400px    | Dashboards, data tables         |
| `.container-ultrawide` | 1600px    | Full-featured admin panels      |

### Utilities

| Class       | Description                                  |
| ----------- | -------------------------------------------- |
| `.breakout` | Full viewport width, breaks out of container |

### CSS custom properties

| Property             | Default                  | Description             |
| -------------------- | ------------------------ | ----------------------- |
| `--container-max`    | `100%` or auto-computed  | Controls `max-width`    |
| `--container-gutter` | `clamp(1rem, 4vw, 2rem)` | Controls inline padding |

---

## Comparison with Bootstrap

| Feature                 | Bootstrap 5                                   | Grundtone                               |
| ----------------------- | --------------------------------------------- | --------------------------------------- |
| Gutters                 | Fixed 12px / 16px                             | Fluid `clamp(1rem, 4vw, 2rem)`          |
| Max-widths              | Separate hardcoded map                        | Computed from breakpoints automatically |
| Customization           | SCSS variables only                           | CSS custom properties (runtime) + SCSS  |
| RTL support             | Requires extra config                         | Automatic via logical properties        |
| Container queries       | Not integrated                                | Every container is a CQ context         |
| Reading-width container | Not available                                 | `.container-prose` (65ch)               |
| Breakout utility        | Not available                                 | `.breakout`                             |
| Maps to maintain        | `$container-max-widths` + `$grid-breakpoints` | `$grid-breakpoints` only                |
