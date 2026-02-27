# Grid System

Modern CSS Grid utility classes for creating flexible, responsive 12-column layouts.

## Grid Container

| Class   | Value           |
| ------- | --------------- |
| `.grid` | `display: grid` |

## Grid Columns

Define the number of columns in your grid (1-12):

| Class           | Value                                       |
| --------------- | ------------------------------------------- |
| `.grid-cols-1`  | `grid-template-columns: repeat(1, 1fr)`     |
| `.grid-cols-2`  | `grid-template-columns: repeat(2, 1fr)`     |
| `.grid-cols-3`  | `grid-template-columns: repeat(3, 1fr)`     |
| `.grid-cols-4`  | `grid-template-columns: repeat(4, 1fr)`     |
| `.grid-cols-6`  | `grid-template-columns: repeat(6, 1fr)`     |
| `.grid-cols-12` | `grid-template-columns: repeat(12, 1fr)`    |
| _...and more_   | _5, 7, 8, 9, 10, 11 columns also available_ |

## Column Spanning

Control how many columns an element spans:

| Class            | Value                      |
| ---------------- | -------------------------- |
| `.col-span-1`    | `grid-column: span 1`      |
| `.col-span-2`    | `grid-column: span 2`      |
| `.col-span-3`    | `grid-column: span 3`      |
| `.col-span-4`    | `grid-column: span 4`      |
| `.col-span-6`    | `grid-column: span 6`      |
| `.col-span-12`   | `grid-column: span 12`     |
| `.col-span-full` | `grid-column: 1 / -1`      |
| _...and more_    | _All spans 1-12 available_ |

## Gap Utilities

Control spacing between grid items:

| Class    | Value          |
| -------- | -------------- |
| `.gap-0` | `gap: 0`       |
| `.gap-1` | `gap: 0.25rem` |
| `.gap-2` | `gap: 0.5rem`  |
| `.gap-3` | `gap: 0.75rem` |
| `.gap-4` | `gap: 1rem`    |
| `.gap-6` | `gap: 1.5rem`  |
| `.gap-8` | `gap: 2rem`    |

### Directional Gaps

| Class      | Value              |
| ---------- | ------------------ |
| `.gap-x-4` | `column-gap: 1rem` |
| `.gap-y-4` | `row-gap: 1rem`    |

## Hvordan Bruger Man

### Basic Grid Layout

```html
<!-- 3 column grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### 12 Column Layout

```html
<!-- Classic 12 column grid -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-4">Sidebar (4 columns)</div>
  <div class="col-span-8">Main content (8 columns)</div>
</div>
```

### Responsive Grid

```html
<!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Responsive Column Spanning

```html
<!-- Full width on mobile, half width on desktop -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 lg:col-span-6">Left</div>
  <div class="col-span-12 lg:col-span-6">Right</div>
</div>
```

## Praktiske Eksempler

### Dashboard Layout

```html
<div class="grid grid-cols-12 gap-6">
  <!-- Sidebar -->
  <aside class="col-span-12 lg:col-span-3">
    <nav>Navigation</nav>
  </aside>

  <!-- Main content -->
  <main class="col-span-12 lg:col-span-9">
    <h1>Dashboard</h1>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="stat-card">Users: 1,234</div>
      <div class="stat-card">Revenue: $56,789</div>
      <div class="stat-card">Orders: 890</div>
    </div>
  </main>
</div>
```

### Product Grid

```html
<!-- Auto-responsive product grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <div class="product-card">Product 1</div>
  <div class="product-card">Product 2</div>
  <div class="product-card">Product 3</div>
  <div class="product-card">Product 4</div>
  <div class="product-card">Product 5</div>
  <div class="product-card">Product 6</div>
</div>
```

### Blog Layout

```html
<div class="grid grid-cols-12 gap-8">
  <!-- Featured post -->
  <article class="col-span-12 lg:col-span-8">
    <img src="featured.jpg" alt="Featured" />
    <h2>Featured Article</h2>
    <p>Article content...</p>
  </article>

  <!-- Sidebar -->
  <aside class="col-span-12 lg:col-span-4">
    <div class="sidebar-widget">Recent Posts</div>
    <div class="sidebar-widget">Categories</div>
  </aside>

  <!-- Secondary articles -->
  <article class="col-span-12 md:col-span-6 lg:col-span-4">
    <h3>Article 2</h3>
  </article>
  <article class="col-span-12 md:col-span-6 lg:col-span-4">
    <h3>Article 3</h3>
  </article>
  <article class="col-span-12 md:col-span-6 lg:col-span-4">
    <h3>Article 4</h3>
  </article>
</div>
```

### Form Layout

```html
<form class="grid grid-cols-12 gap-4">
  <!-- Full width fields -->
  <div class="col-span-12">
    <label>Full Name</label>
    <input type="text" />
  </div>

  <!-- Half width fields -->
  <div class="col-span-12 md:col-span-6">
    <label>Email</label>
    <input type="email" />
  </div>
  <div class="col-span-12 md:col-span-6">
    <label>Phone</label>
    <input type="tel" />
  </div>

  <!-- Address spans full width -->
  <div class="col-span-12">
    <label>Address</label>
    <input type="text" />
  </div>

  <!-- City, State, Zip -->
  <div class="col-span-12 md:col-span-6">
    <label>City</label>
    <input type="text" />
  </div>
  <div class="col-span-12 md:col-span-3">
    <label>State</label>
    <input type="text" />
  </div>
  <div class="col-span-12 md:col-span-3">
    <label>Zip</label>
    <input type="text" />
  </div>

  <!-- Submit button -->
  <div class="col-span-12">
    <button type="submit">Submit</button>
  </div>
</form>
```

### Card Grid with Featured Item

```html
<div class="grid grid-cols-12 gap-4">
  <!-- Featured card spans 2 rows and 2 columns -->
  <div class="col-span-12 md:col-span-6 row-span-2">
    <div class="featured-card">Featured</div>
  </div>

  <!-- Regular cards -->
  <div class="col-span-6 md:col-span-3">Card 1</div>
  <div class="col-span-6 md:col-span-3">Card 2</div>
  <div class="col-span-6 md:col-span-3">Card 3</div>
  <div class="col-span-6 md:col-span-3">Card 4</div>
</div>
```

### Auto-Fit Responsive Grid

```html
<!-- Grid automatically creates columns that fit -->
<div class="grid grid-auto-fit gap-4">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>
```

```scss
// Custom min-width for auto-fit
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

// Or use auto-fill
.grid-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
```

## Advanced Features

### Column Start/End

```html
<!-- Precise column placement -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-start-1 col-end-4">Columns 1-3</div>
  <div class="col-start-5 col-end-13">Columns 5-12</div>
</div>
```

### Row Spanning

```html
<div class="grid grid-cols-3 gap-4">
  <div class="row-span-2">Spans 2 rows</div>
  <div>Normal</div>
  <div>Normal</div>
  <div>Normal</div>
  <div>Normal</div>
</div>
```

### Grid Flow

```html
<!-- Control how auto-placed items flow -->
<div class="grid grid-cols-3 grid-flow-dense gap-4">
  <div class="col-span-2">Wide item</div>
  <div>Item</div>
  <div>Item</div>
  <!-- Dense packing fills gaps -->
</div>
```

## Responsive Breakpoints

All grid utilities support responsive variants:

```html
<!-- Responsive columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
  <div>Item</div>
</div>

<!-- Responsive spanning -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-6 lg:col-span-4">Responsive width</div>
</div>
```

## SCSS Usage

```scss
@use '@grundtone/design-tokens' as tokens;

// Custom grid
.custom-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: tokens.spacing(4);

  @include tokens.respond-to('lg') {
    gap: tokens.spacing(6);
  }
}

// Custom column span
.custom-span {
  grid-column: span 6 / span 6;

  @include tokens.respond-to('lg') {
    grid-column: span 4 / span 4;
  }
}
```

## Best Practices

::: tip Do

- Use 12-column grid for maximum flexibility
- Start with mobile-first (1 column) and scale up
- Use `gap` utilities instead of margin for spacing
- Combine with flexbox for nested layouts
- Use `col-span-full` for full-width elements
- Use auto-fit/auto-fill for responsive card grids :::

::: warning Don't

- Don't nest grids unnecessarily (use flexbox when simpler)
- Don't use negative margins for grid gaps
- Don't forget responsive breakpoints
- Don't mix grid and float-based layouts
- Don't overuse `col-start`/`col-end` (use `col-span` instead) :::

## Grid vs Flexbox

**Use Grid when:**

- You need 2D layout (rows AND columns)
- You have a defined grid structure
- You need precise placement control
- You're building page layouts

**Use Flexbox when:**

- You need 1D layout (single row OR column)
- Content size should determine layout
- You need dynamic wrapping
- You're aligning items within a container

## Browser Support

CSS Grid is supported in all modern browsers:

- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+
- Mobile browsers (iOS Safari 10.3+, Chrome Android)

For older browser support, provide flexbox fallbacks.
