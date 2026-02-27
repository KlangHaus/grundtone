# Grid Utility

The grid utility provides CSS classes for layout with CSS Grid. Use these classes in HTML when using
`@grundtone/design-tokens` or `@grundtone/vue`. The grid is included in the design-tokens CSS
output.

The grid utility is included when you import the design-tokens CSS – see
[Installation](/guide/installation) for setup. Examples below have a **Code** / **Preview** tab.

---

## Basic Usage

### 1. Create a grid container

Add `grid` to enable grid layout:

```html
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### 2. Set number of columns

Use `grid-cols-N` (1–12):

<CodePreview name="basic" />

### 3. Add gap between items

Use `gap-N` for both row and column gap:

```html
<div class="grid grid-cols-2 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

**Both axes (row + column)** – `gap-N`:

- `gap-0` (0)
- `gap-px` (1px)
- `gap-0-5` (0.125rem)
- `gap-1` (0.25rem)
- `gap-1-5` (0.375rem)
- `gap-2` (0.5rem)
- `gap-2-5` (0.625rem)
- `gap-3` (0.75rem)
- `gap-3-5` (0.875rem)
- `gap-4` (1rem)
- `gap-5` (1.25rem)
- `gap-6` (1.5rem)
- `gap-7` (1.75rem)
- `gap-8` (2rem)
- `gap-9` (2.25rem)
- `gap-10` (2.5rem)
- `gap-11` (2.75rem)
- `gap-12` (3rem)
- `gap-14` (3.5rem)
- `gap-16` (4rem)
- `gap-20` (5rem)
- `gap-24` (6rem)

**X-axis (column only)** – `gap-x-N`:

- `gap-x-0`, `gap-x-px`, `gap-x-0-5`, `gap-x-1`, `gap-x-1-5`, `gap-x-2`, `gap-x-2-5`, `gap-x-3`,
  `gap-x-3-5`, `gap-x-4`, `gap-x-5`, `gap-x-6`, `gap-x-7`, `gap-x-8`, `gap-x-9`, `gap-x-10`,
  `gap-x-11`, `gap-x-12`, `gap-x-14`, `gap-x-16`, `gap-x-20`, `gap-x-24`

**Y-axis (row only)** – `gap-y-N`:

- `gap-y-0`, `gap-y-px`, `gap-y-0-5`, `gap-y-1`, `gap-y-1-5`, `gap-y-2`, `gap-y-2-5`, `gap-y-3`,
  `gap-y-3-5`, `gap-y-4`, `gap-y-5`, `gap-y-6`, `gap-y-7`, `gap-y-8`, `gap-y-9`, `gap-y-10`,
  `gap-y-11`, `gap-y-12`, `gap-y-14`, `gap-y-16`, `gap-y-20`, `gap-y-24`

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

Full width: `col-span-full` (spans all columns).

---

## Responsive Grid

Add a breakpoint prefix before any grid class to apply it only at that viewport width and up.
Format: `{breakpoint}:` + class, e.g. `md:grid-cols-3` or `lg:col-span-6`.

**Breakpoints** (min-width): sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.

**Mobile-first:** Base classes apply to all sizes. Prefixed classes apply from that breakpoint and
up. Example: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` = 1 column by default, 2 from 768px, 3 from
1024px.

<CodePreview name="responsive" />

**Responsive column span** – full width on mobile, then 8 cols, then 6:

<CodePreview name="responsive-col-span" />

---

## Preset Layouts

### Auto-fit (responsive columns)

Columns grow/shrink with viewport. Min column width is configurable via `--grid-auto-fit-min`
(default 250px).

<CodePreview name="auto-fit" />

### Card grid

Predefined auto-fit for cards:

| Class           | Min column width |
| --------------- | ---------------- |
| `grid-cards-sm` | 200px            |
| `grid-cards`    | 280px            |
| `grid-cards-lg` | 360px            |

<CodePreview name="cards" />

### Sidebar left

<CodePreview name="sidebar-left" />

### Sidebar right

<CodePreview name="sidebar-right" />

### Holy grail layout

Header, nav, main, aside, footer:

<CodePreview name="holy-grail" />

---

## Class Reference

### Container

| Class                          | Description         |
| ------------------------------ | ------------------- |
| `grid`                         | `display: grid`     |
| `grid-cols-1` … `grid-cols-12` | Column count        |
| `grid-rows-1` … `grid-rows-6`  | Row count           |
| `grid-cols-none`               | No explicit columns |
| `grid-cols-subgrid`            | Subgrid columns     |

### Gap

| Class              | Description        |
| ------------------ | ------------------ |
| `gap-0` … `gap-24` | Row and column gap |
| `gap-x-N`          | Column gap only    |
| `gap-y-N`          | Row gap only       |

### Column span

| Class                        | Description         |
| ---------------------------- | ------------------- |
| `col-span-1` … `col-span-12` | Span N columns      |
| `col-span-full`              | Full width (1 / -1) |
| `col-auto`                   | Auto placement      |

### Row span

| Class                       | Description    |
| --------------------------- | -------------- |
| `row-span-1` … `row-span-6` | Span N rows    |
| `row-span-full`             | Full height    |
| `row-auto`                  | Auto placement |

### Responsive prefix

Prepend `{breakpoint}:` to any class to apply it from that viewport width up. Works with grid-cols,
col-span, gap, etc. See [Responsive Grid](#responsive-grid) for examples.

---

## Custom breakpoints

Override breakpoints via CSS variables in `:root` (after importing design-tokens):

```css
:root {
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-2xl: 1400px;
}
```

This affects responsive grid utilities (`sm:`, `md:`, `lg:`, etc.). Defaults: sm 640px, md 768px, lg
1024px, xl 1280px, 2xl 1536px.

---

## Custom min width (auto-fit)

Override the default 250px:

```css
:root {
  --grid-auto-fit-min: 300px;
}
```

Or inline:

```html
<div class="grid-auto-fit" style="--grid-auto-fit-min: 200px">...</div>
```
