# Flexbox

Flexbox utility classes provide quick and responsive flex layouts without writing custom CSS.

## Flex Direction

Control the direction of flex items.

| Class                  | Value                            |
| ---------------------- | -------------------------------- |
| `.flex-row`            | `flex-direction: row`            |
| `.flex-column`         | `flex-direction: column`         |
| `.flex-row-reverse`    | `flex-direction: row-reverse`    |
| `.flex-column-reverse` | `flex-direction: column-reverse` |

### Eksempel

```html
<!-- Horizontal layout -->
<div class="d-flex flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Vertical layout -->
<div class="d-flex flex-column">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Responsive: column on mobile, row on tablet+ -->
<div class="d-flex flex-column md-flex-row">
  <div>Sidebar</div>
  <div>Main content</div>
</div>
```

## Flex Wrap

Control how flex items wrap.

| Class                | Value                     |
| -------------------- | ------------------------- |
| `.flex-wrap`         | `flex-wrap: wrap`         |
| `.flex-nowrap`       | `flex-wrap: nowrap`       |
| `.flex-wrap-reverse` | `flex-wrap: wrap-reverse` |

```html
<!-- Wrap items -->
<div class="d-flex flex-wrap">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

## Justify Content

Align items along the main axis.

| Class                      | Value                            |
| -------------------------- | -------------------------------- |
| `.justify-content-start`   | `justify-content: flex-start`    |
| `.justify-content-end`     | `justify-content: flex-end`      |
| `.justify-content-center`  | `justify-content: center`        |
| `.justify-content-between` | `justify-content: space-between` |
| `.justify-content-around`  | `justify-content: space-around`  |

```html
<!-- Center items -->
<div class="d-flex justify-content-center">
  <button>Button</button>
</div>

<!-- Space between items -->
<div class="d-flex justify-content-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

## Align Items

Align items along the cross axis.

| Class                   | Value                     |
| ----------------------- | ------------------------- |
| `.align-items-start`    | `align-items: flex-start` |
| `.align-items-end`      | `align-items: flex-end`   |
| `.align-items-center`   | `align-items: center`     |
| `.align-items-baseline` | `align-items: baseline`   |
| `.align-items-stretch`  | `align-items: stretch`    |

```html
<!-- Vertically center -->
<div class="d-flex align-items-center" style="height: 200px">
  <div>Centered</div>
</div>

<!-- Center both axes -->
<div class="d-flex justify-content-center align-items-center" style="height: 200px">
  <div>Perfect center</div>
</div>
```

## Align Self

Override align-items for individual flex items.

| Class                  | Value                    |
| ---------------------- | ------------------------ |
| `.align-self-auto`     | `align-self: auto`       |
| `.align-self-start`    | `align-self: flex-start` |
| `.align-self-end`      | `align-self: flex-end`   |
| `.align-self-center`   | `align-self: center`     |
| `.align-self-baseline` | `align-self: baseline`   |
| `.align-self-stretch`  | `align-self: stretch`    |

```html
<div class="d-flex">
  <div>Normal</div>
  <div class="align-self-end">Aligned to bottom</div>
  <div>Normal</div>
</div>
```

## Praktiske Eksempler

### Navigation Bar

```html
<nav class="d-flex justify-content-between align-items-center" style="padding: 1rem">
  <div class="logo">Logo</div>
  <div class="d-flex" style="gap: 1rem">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>
```

### Card Layout

```html
<div class="d-flex flex-column" style="height: 100%">
  <div class="card-header">Header</div>
  <div class="card-body" style="flex: 1">Content grows</div>
  <div class="card-footer">Footer</div>
</div>
```

### Responsive Grid

```html
<div class="d-flex flex-wrap" style="gap: 1rem">
  <div style="flex: 1 1 300px">Item 1</div>
  <div style="flex: 1 1 300px">Item 2</div>
  <div style="flex: 1 1 300px">Item 3</div>
</div>
```

### Center Modal

```html
<div class="d-flex justify-content-center align-items-center" style="min-height: 100vh">
  <div class="modal">Modal content</div>
</div>
```

## Responsive Variants

All flexbox utilities support responsive breakpoints:

```html
<!-- Column on mobile, row on md+ -->
<div class="d-flex flex-column md-flex-row"></div>

<!-- Center on mobile, space-between on lg+ -->
<div class="d-flex justify-content-center lg-justify-content-between"></div>
```

## Best Practices

::: tip Do

- Combine with gap utilities for spacing
- Use responsive variants for mobile-first design
- Combine justify and align for centering
- Use flex-wrap for responsive layouts :::

::: warning Don't

- Overuse flexbox where grid is better
- Forget to set display: flex
- Use too many nested flex containers :::
