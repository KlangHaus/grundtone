# Grid Utility

CSS Grid layout classes included in `@grundtone/design-tokens`. Import the design-tokens CSS to use
them – see [Installation](/guide/installation) for setup. Examples below have a **Code** /
**Preview** tab.

---

## Basic Usage

### 1. Create a grid container

Add `grid` to enable grid layout. Without `grid-cols-N`, items stack vertically:

<CodePreview name="container" />

### 2. Set number of columns

Use `grid-cols-N` (1–12):

<CodePreview name="basic" />

### 3. Add gap between items

Use `gap-N` for both row and column gap:

<CodePreview name="gap" />

The gap scale is shared by `gap-N`, `gap-x-N` (column only), and `gap-y-N` (row only):

| Suffix | Value    | Suffix | Value   | Suffix | Value   |
| ------ | -------- | ------ | ------- | ------ | ------- |
| `0`    | 0        | `4`    | 1rem    | `11`   | 2.75rem |
| `px`   | 1px      | `5`    | 1.25rem | `12`   | 3rem    |
| `0-5`  | 0.125rem | `6`    | 1.5rem  | `14`   | 3.5rem  |
| `1`    | 0.25rem  | `7`    | 1.75rem | `16`   | 4rem    |
| `1-5`  | 0.375rem | `8`    | 2rem    | `20`   | 5rem    |
| `2`    | 0.5rem   | `9`    | 2.25rem | `24`   | 6rem    |
| `2-5`  | 0.625rem | `10`   | 2.5rem  |        |         |
| `3`    | 0.75rem  |        |         |        |         |
| `3-5`  | 0.875rem |        |         |        |         |

---

## Columns and rows

Columns and rows are **independent axes** – columns run horizontally, rows run vertically. There is
no dependency between them.

- **Columns** – You typically set `grid-cols-N` to define the layout. Rows are created implicitly as
  items flow in (left-to-right, top-to-bottom).
- **Rows** – Use `grid-rows-N` only when you need explicit row control (e.g. fixed header + flexible
  main area). Otherwise rows are auto-sized.
- **col-span** vs **row-span** – `col-span-N` spans columns (horizontal). `row-span-N` spans rows
  (vertical). You can use both on the same item.

**Row span** – one item spans multiple rows (in its column). Here, A fills two rows in the first
column:

<CodePreview name="row-span" />

**Col + row span** – same item spans columns and rows:

<CodePreview name="col-row-span" />

---

## Column Span

Make an item span multiple columns with `col-span-N`:

<CodePreview name="col-span" />

Full width with `col-span-full`:

<CodePreview name="col-span-full" />

---

## Column Start / End

Place items at specific column lines with `col-start-N` and `col-end-N` (1–13):

<CodePreview name="col-start-end" />

---

## Auto Flow

Control how items are placed in the grid. Default is row flow (left-to-right, top-to-bottom). Use
`grid-flow-col` to flow by column instead:

<CodePreview name="flow-col" />

Add `grid-flow-dense` to fill gaps when items have varying spans.

---

## Centering

`grid-center` places all items at the center of their cell:

<CodePreview name="grid-center" />

---

## Responsive Grid

Add a breakpoint prefix before any grid class to apply it only at that viewport width and up.
Format: `{breakpoint}:` + class, e.g. `md:grid-cols-3` or `lg:col-span-6`.

**Breakpoints** (min-width): sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.

**Mobile-first:** Base classes apply to all sizes. Prefixed classes apply from that breakpoint and
up. Example: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` = 1 column by default, 2 from 768px, 3 from
1024px.

> **Note:** `sm:` supports `grid-cols-1`–`grid-cols-6`, `col-span-1`–`col-span-6`, and
> `col-start/end-1`–`col-start/end-7`. The `md:`, `lg:`, `xl:`, and `2xl:` breakpoints support the
> full 1–12/13 range. Gap, grid-flow, and auto-cols/rows also have responsive variants at all
> breakpoints.

<CodePreview name="responsive" />

**Responsive column span** – full width on mobile, then 8 cols, then 6:

<CodePreview name="responsive-col-span" />

---

## Preset Layouts

Preset layouts use spacing variables (`--space-md`, `--space-lg`, `--space-xl`) for their built-in
gap. Override these in `:root` to adjust spacing globally.

### Auto-fit (responsive columns)

Columns grow/shrink with viewport. Min column width is configurable via `--grid-auto-fit-min`
(default 250px).

<CodePreview name="auto-fit" />

`grid-auto-fill` works the same way but uses `auto-fill` instead of `auto-fit` — empty tracks are
preserved rather than collapsed:

<CodePreview name="auto-fill" />

### Card grid

Predefined auto-fit for cards. Style the card children yourself — the grid only controls column
width and gap.

| Class           | Min column width | Gap          |
| --------------- | ---------------- | ------------ |
| `grid-cards-sm` | 200px            | `--space-md` |
| `grid-cards`    | 280px            | `--space-lg` |
| `grid-cards-lg` | 360px            | `--space-xl` |

<CodePreview name="cards" />

### Sidebar left

<CodePreview name="sidebar-left" />

### Sidebar right

<CodePreview name="sidebar-right" />

### Holy grail layout

Header, nav, main, aside, footer. Uses named grid areas (`grid-header`, `grid-nav`, `grid-main`,
`grid-aside`, `grid-footer`):

<CodePreview name="holy-grail" />

---

## Class Reference

### Container

| Class                          | Description         |
| ------------------------------ | ------------------- |
| `grid`                         | `display: grid`     |
| `grid-cols-1` … `grid-cols-12` | Column count        |
| `grid-cols-none`               | No explicit columns |
| `grid-cols-subgrid`            | Subgrid columns     |
| `grid-rows-1` … `grid-rows-6`  | Row count           |
| `grid-rows-none`               | No explicit rows    |
| `grid-rows-subgrid`            | Subgrid rows        |

### Gap

| Class              | Description        |
| ------------------ | ------------------ |
| `gap-0` … `gap-24` | Row and column gap |
| `gap-x-N`          | Column gap only    |
| `gap-y-N`          | Row gap only       |

See [gap scale](#_3-add-gap-between-items) for all available values.

### Column span

| Class                        | Description         |
| ---------------------------- | ------------------- |
| `col-span-1` … `col-span-12` | Span N columns      |
| `col-span-full`              | Full width (1 / -1) |
| `col-auto`                   | Auto placement      |

### Column start / end

| Class                          | Description            |
| ------------------------------ | ---------------------- |
| `col-start-1` … `col-start-13` | Start at column line N |
| `col-start-auto`               | Auto start             |
| `col-end-1` … `col-end-13`     | End at column line N   |
| `col-end-auto`                 | Auto end               |

### Row span

| Class                       | Description    |
| --------------------------- | -------------- |
| `row-span-1` … `row-span-6` | Span N rows    |
| `row-span-full`             | Full height    |
| `row-auto`                  | Auto placement |

### Row start / end

| Class                         | Description         |
| ----------------------------- | ------------------- |
| `row-start-1` … `row-start-7` | Start at row line N |
| `row-start-auto`              | Auto start          |
| `row-end-1` … `row-end-7`     | End at row line N   |
| `row-end-auto`                | Auto end            |

### Auto flow

| Class                 | Description                    |
| --------------------- | ------------------------------ |
| `grid-flow-row`       | Flow items by row (default)    |
| `grid-flow-col`       | Flow items by column           |
| `grid-flow-dense`     | Dense packing                  |
| `grid-flow-row-dense` | Row flow with dense packing    |
| `grid-flow-col-dense` | Column flow with dense packing |

### Auto columns / rows

| Class            | Description                         |
| ---------------- | ----------------------------------- |
| `auto-cols-auto` | `grid-auto-columns: auto`           |
| `auto-cols-min`  | `grid-auto-columns: min-content`    |
| `auto-cols-max`  | `grid-auto-columns: max-content`    |
| `auto-cols-fr`   | `grid-auto-columns: minmax(0, 1fr)` |
| `auto-rows-auto` | `grid-auto-rows: auto`              |
| `auto-rows-min`  | `grid-auto-rows: min-content`       |
| `auto-rows-max`  | `grid-auto-rows: max-content`       |
| `auto-rows-fr`   | `grid-auto-rows: minmax(0, 1fr)`    |

### Preset layouts

| Class                | Description                                 |
| -------------------- | ------------------------------------------- |
| `grid-auto-fit`      | Responsive columns (auto-fit, min 250px)    |
| `grid-auto-fill`     | Same as auto-fit but preserves empty tracks |
| `grid-cards-sm`      | Card grid, min 200px                        |
| `grid-cards`         | Card grid, min 280px                        |
| `grid-cards-lg`      | Card grid, min 360px                        |
| `grid-sidebar-left`  | Sidebar (auto) + main (1fr)                 |
| `grid-sidebar-right` | Main (1fr) + sidebar (auto)                 |
| `grid-holy-grail`    | Header, nav, main, aside, footer            |
| `grid-center`        | `place-items: center`                       |
| `grid-stretch`       | `place-items: stretch`                      |

### Responsive prefix

Prepend `{breakpoint}:` to any class to apply it from that viewport width up. Works with grid-cols,
col-span, col-start/end, row-span/start/end, gap, and grid-flow. `sm:` supports 1–6 columns/spans;
`md:` and above support 1–12. See [Responsive Grid](#responsive-grid) for details.

For alignment, ordering, and display utilities, see [Columns & Layout](/web/columns).

---

## Custom breakpoints

The default breakpoints can be overridden via CSS variables. See
[Theme Configuration](/guide/theme-configuration#custom-breakpoints) for details.

---

## Custom min width (auto-fit)

Override the default 250px globally in `:root` or inline per element:

<CodePreview name="auto-fit-custom" />
