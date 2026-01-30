# Display

Display utilities control the display property of elements. All utilities support responsive
breakpoints.

## Display Values

| Class             | Value                   |
| ----------------- | ----------------------- |
| `.d-none`         | `display: none`         |
| `.d-inline`       | `display: inline`       |
| `.d-inline-block` | `display: inline-block` |
| `.d-block`        | `display: block`        |
| `.d-flex`         | `display: flex`         |
| `.d-inline-flex`  | `display: inline-flex`  |
| `.d-table`        | `display: table`        |
| `.d-table-row`    | `display: table-row`    |
| `.d-table-cell`   | `display: table-cell`   |

## Hvordan Bruger Man

### Hide/Show Elements

```html
<!-- Hide element -->
<div class="d-none">Hidden</div>

<!-- Show as block -->
<div class="d-block">Visible</div>

<!-- Responsive: hide on mobile, show on tablet+ -->
<div class="d-none md-d-block">Hidden on mobile</div>

<!-- Responsive: show on mobile, hide on desktop -->
<div class="d-block lg-d-none">Only on mobile</div>
```

### Inline vs Block

```html
<!-- Inline elements -->
<span class="d-inline">Inline</span>
<span class="d-inline">Inline</span>

<!-- Block elements -->
<div class="d-block">Block</div>
<div class="d-block">Block</div>

<!-- Inline-block -->
<div class="d-inline-block">Inline block</div>
<div class="d-inline-block">Inline block</div>
```

### Flexbox

```html
<!-- Flex container -->
<div class="d-flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Inline flex -->
<div class="d-inline-flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Praktiske Eksempler

### Responsive Navigation

```html
<nav>
  <!-- Mobile menu button -->
  <button class="d-block lg-d-none">Menu</button>

  <!-- Desktop navigation -->
  <div class="d-none lg-d-flex">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>
```

### Responsive Card Layout

```html
<!-- Stack on mobile, side-by-side on tablet+ -->
<div class="card d-block md-d-flex">
  <img src="image.jpg" alt="Image" />
  <div class="content">
    <h3>Title</h3>
    <p>Description</p>
  </div>
</div>
```

### Loading State

```html
<div>
  <!-- Show content -->
  <div class="content" :class="{ 'd-none': loading }">Content here</div>

  <!-- Show spinner -->
  <div class="spinner" :class="{ 'd-none': !loading }">Loading...</div>
</div>
```

## Print Utilities

Control visibility when printing:

```html
<!-- Hide when printing -->
<div class="d-print-none">Don't print this</div>

<!-- Only show when printing -->
<div class="d-none d-print-block">Print only</div>
```

## Responsive Breakpoints

```html
<!-- Hide on mobile -->
<div class="d-none d-md-block">...</div>

<!-- Show only on large screens -->
<div class="d-none d-lg-block">...</div>

<!-- Complex responsive display -->
<div class="d-block d-md-inline-block d-lg-flex">...</div>
```

## Best Practices

::: tip Do

- Use d-none for hiding elements
- Combine with responsive breakpoints
- Use d-flex for flexible layouts
- Consider accessibility when hiding content :::

::: warning Don't

- Hide important content from screen readers
- Use display utilities for animations
- Overuse responsive display changes :::
