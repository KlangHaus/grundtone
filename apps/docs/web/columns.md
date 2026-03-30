# Columns & Layout

Alignment, ordering, display, and positioning utilities for flex and grid layouts. Included in
`@grundtone/design-system` CSS — see [Installation](/guide/installation) for setup.

All utilities support responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`. Mobile-first — base
classes apply at all sizes, prefixed classes from that breakpoint up.

---

## Vertical alignment

Use `items-{value}` to align items along the cross axis. Works on both flex and grid containers.

### items-start

<CodePreview name="align-items" />

### items-center

<CodePreview name="align-center" />

### items-end

<CodePreview name="align-end" />

### items-stretch

<CodePreview name="align-stretch" />

---

## Horizontal alignment

Use `justify-{value}` to distribute items along the main axis.

### justify-center

<CodePreview name="justify-center" />

### justify-between

<CodePreview name="justify-between" />

### justify-evenly

<CodePreview name="justify-evenly" />

---

## Individual alignment

Override the container's alignment on a single item with `self-{value}`:

<CodePreview name="align-self" />

---

## Grid alignment

Grid layouts support additional alignment utilities that don't exist in flexbox:

### place-items

`place-items-center` centers items both horizontally and vertically in their grid cells:

<CodePreview name="place-items-center" />

### Mixed alignment in grid

Combine container alignment with individual overrides:

<CodePreview name="grid-align" />

---

## Display utilities

Switch display mode on any element. `.flex` and `.grid` are the most common.

<CodePreview name="display-flex" />

### Responsive visibility

Combine `hidden` with responsive display classes for conditional visibility:

<CodePreview name="display-responsive" />

| Class           | CSS                     |
| --------------- | ----------------------- |
| `.block`        | `display: block`        |
| `.inline-block` | `display: inline-block` |
| `.inline`       | `display: inline`       |
| `.flex`         | `display: flex`         |
| `.inline-flex`  | `display: inline-flex`  |
| `.grid`         | `display: grid`         |
| `.inline-grid`  | `display: inline-grid`  |
| `.contents`     | `display: contents`     |
| `.hidden`       | `display: none`         |

---

## Flex direction

Control the direction of flex items. Stack vertically with `flex-col`, horizontal with `flex-row`
(default):

<CodePreview name="flex-direction" />

### Responsive direction

Switch from stacked to horizontal at a breakpoint:

<CodePreview name="flex-responsive" />

| Class               | CSS                              |
| ------------------- | -------------------------------- |
| `.flex-row`         | `flex-direction: row`            |
| `.flex-col`         | `flex-direction: column`         |
| `.flex-row-reverse` | `flex-direction: row-reverse`    |
| `.flex-col-reverse` | `flex-direction: column-reverse` |

---

## Flex wrap

Allow items to wrap when they exceed the container width:

<CodePreview name="flex-wrap" />

| Class                | CSS                       |
| -------------------- | ------------------------- |
| `.flex-wrap`         | `flex-wrap: wrap`         |
| `.flex-nowrap`       | `flex-wrap: nowrap`       |
| `.flex-wrap-reverse` | `flex-wrap: wrap-reverse` |

---

## Grow & shrink

Control how flex items grow and shrink:

<CodePreview name="flex-grow" />

| Class           | CSS              |
| --------------- | ---------------- |
| `.flex-1`       | `flex: 1 1 0%`   |
| `.flex-auto`    | `flex: 1 1 auto` |
| `.flex-initial` | `flex: 0 1 auto` |
| `.flex-none`    | `flex: none`     |
| `.grow`         | `flex-grow: 1`   |
| `.grow-0`       | `flex-grow: 0`   |
| `.shrink`       | `flex-shrink: 1` |
| `.shrink-0`     | `flex-shrink: 0` |

---

## Order

Reorder flex or grid items without changing HTML order.

### Basic ordering

<CodePreview name="order-basic" />

### First and last

<CodePreview name="order-first-last" />

### Responsive reordering

Show sidebar last on mobile, first on desktop:

<CodePreview name="order-responsive" />

| Class                    | CSS               |
| ------------------------ | ----------------- |
| `.order-first`           | `order: -9999`    |
| `.order-last`            | `order: 9999`     |
| `.order-none`            | `order: 0`        |
| `.order-1` … `.order-12` | `order: 1` … `12` |

---

## Offsetting columns

Bootstrap uses `offset-*` classes. In CSS Grid, offsets aren't needed — use `col-start-*` and
`col-end-*` instead, which are more powerful and flexible.

### Basic offset

Position an item starting at column 4 (effectively an offset of 3):

<CodePreview name="offset-basic" />

### Responsive offset

Full-width on mobile, then progressively offset on larger screens:

<CodePreview name="offset-responsive" />

### Centering with col-start / col-end

<CodePreview name="offset-center" />

### Why col-start replaces offset

| Feature             | Bootstrap `offset-*`    | Grundtone `col-start-*`  |
| ------------------- | ----------------------- | ------------------------ |
| Push from left      | `offset-md-3`           | `md:col-start-4`         |
| Push from right     | Not possible            | `md:col-end-10`          |
| Span + position     | `offset-3` + `col-md-6` | `col-start-4 col-span-6` |
| Exact start + end   | Not possible            | `col-start-4 col-end-10` |
| Works with CSS Grid | No (flexbox only)       | Yes (native grid lines)  |
| Responsive          | `offset-md-3`           | `md:col-start-4`         |

> **Key insight:** `col-start-N` and `col-end-N` can position items at both start AND end of the
> grid. Bootstrap's `offset-*` can only push from the left. With CSS Grid, you get full positional
> control.

---

## Combined layout

A real-world example combining display, direction, alignment, grow/shrink, and order:

<CodePreview name="combined" />

```html
<div class="flex flex-col md:flex-row gap-4 items-stretch">
  <aside class="shrink-0 order-last md:order-first">Sidebar (reordered on desktop)</aside>
  <main class="grow">Main content (fills remaining space)</main>
</div>
```

---

## Alignment class reference

### Container alignment

| Class              | Property        | Values                                                       |
| ------------------ | --------------- | ------------------------------------------------------------ |
| `.justify-*`       | justify-content | start, end, center, between, around, evenly, normal, stretch |
| `.justify-items-*` | justify-items   | start, end, center, stretch                                  |
| `.items-*`         | align-items     | start, end, center, baseline, stretch                        |
| `.content-*`       | align-content   | start, end, center, between, around, evenly, stretch, normal |

### Item alignment

| Class             | Property     | Values                                      |
| ----------------- | ------------ | ------------------------------------------- |
| `.justify-self-*` | justify-self | auto, start, end, center, stretch           |
| `.self-*`         | align-self   | auto, start, end, center, baseline, stretch |

### Shorthand alignment (grid)

| Class              | Property      | Values                                               |
| ------------------ | ------------- | ---------------------------------------------------- |
| `.place-content-*` | place-content | start, end, center, between, around, evenly, stretch |
| `.place-items-*`   | place-items   | start, end, center, stretch                          |
| `.place-self-*`    | place-self    | auto, start, end, center, stretch                    |

---

## Responsive prefix

All utilities on this page support `{breakpoint}:` prefixes:

```html
<!-- Stack on mobile, row from md, centered from lg -->
<div class="flex flex-col md:flex-row lg:items-center gap-4">...</div>

<!-- Hidden on mobile, visible from md -->
<div class="hidden md:block">Desktop only</div>

<!-- Last on mobile, first from md -->
<div class="order-last md:order-first">Sidebar</div>
```

**Breakpoints** (min-width): sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.

---

## Comparison with Bootstrap

| Feature               | Bootstrap 5                             | Grundtone                                     |
| --------------------- | --------------------------------------- | --------------------------------------------- |
| Naming                | `.justify-content-md-center` (26 chars) | `.md:justify-center` (19 chars)               |
| `!important`          | On every utility                        | None — clean cascade                          |
| Flex + Grid alignment | Separate utility sets                   | Unified — same classes work on both           |
| Column offsets        | `offset-*` (left only)                  | `col-start-*` / `col-end-*` (both directions) |
| Place utilities       | Not available                           | place-items, place-content, place-self        |
| Justify-self          | Not available                           | `.justify-self-*`                             |
| Responsive visibility | `.d-md-none` / `.d-md-block`            | `.hidden` / `.md:block`                       |
| Display switching     | `.d-flex`, `.d-grid`                    | `.flex`, `.grid`                              |
