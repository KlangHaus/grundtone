# Spacing Utilities

Utility classes for margin and padding based on the spacing scale.

## Spacing Classes

Spacing utilities use the format: `.{property}{sides}-{size}`

### Properties

- `m` - margin
- `p` - padding

### Sides

- `t` - top
- `r` - right
- `b` - bottom
- `l` - left
- `x` - left and right
- `y` - top and bottom
- (none) - all sides

### Sizes

Uses the spacing scale: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24`

## Eksempler

```html
<!-- Margin -->
<div class="m-4">Margin on all sides</div>
<div class="mt-2">Margin top</div>
<div class="mx-auto">Horizontal margin auto (centering)</div>
<div class="my-6">Vertical margin</div>

<!-- Padding -->
<div class="p-4">Padding on all sides</div>
<div class="pt-2 pb-4">Different top and bottom padding</div>
<div class="px-6">Horizontal padding</div>

<!-- Responsive -->
<div class="p-4 md-p-8">More padding on tablet+</div>
```

## Praktiske Eksempler

### Card

```html
<div class="p-6">
  <h3 class="mb-2">Title</h3>
  <p class="mb-4">Description</p>
  <button class="mt-4">Action</button>
</div>
```

### Container

```html
<div class="px-4 py-8 md-px-8 md-py-12">
  <h1 class="mb-6">Page Title</h1>
  <p>Content</p>
</div>
```

### Stack

```html
<div class="d-flex flex-column">
  <div class="mb-4">Item 1</div>
  <div class="mb-4">Item 2</div>
  <div>Item 3</div>
</div>
```

## Best Practices

::: tip Do

- Use spacing utilities for consistent spacing
- Use responsive variants
- Combine with layout utilities :::

::: warning Don't

- Use arbitrary spacing values
- Mix utilities with custom spacing :::
