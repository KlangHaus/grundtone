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

| Size | Value     | Pixels |
| ---- | --------- | ------ |
| `0`  | `0`       | 0px    |
| `1`  | `0.25rem` | 4px    |
| `2`  | `0.5rem`  | 8px    |
| `3`  | `0.75rem` | 12px   |
| `4`  | `1rem`    | 16px   |
| `5`  | `1.25rem` | 20px   |
| `6`  | `1.5rem`  | 24px   |

### Complete Reference

```html
<!-- Margin (m) -->
.m-0, .m-1, .m-2, .m-3, .m-4, .m-5, .m-6 .mt-0, .mt-1, .mt-2, .mt-3, .mt-4, .mt-5, .mt-6
<!-- top -->
.mr-0, .mr-1, .mr-2, .mr-3, .mr-4, .mr-5, .mr-6
<!-- right -->
.mb-0, .mb-1, .mb-2, .mb-3, .mb-4, .mb-5, .mb-6
<!-- bottom -->
.ml-0, .ml-1, .ml-2, .ml-3, .ml-4, .ml-5, .ml-6
<!-- left -->
.mx-0, .mx-1, .mx-2, .mx-3, .mx-4, .mx-5, .mx-6
<!-- horizontal -->
.my-0, .my-1, .my-2, .my-3, .my-4, .my-5, .my-6
<!-- vertical -->

<!-- Padding (p) -->
.p-0, .p-1, .p-2, .p-3, .p-4, .p-5, .p-6 .pt-0, .pt-1, .pt-2, .pt-3, .pt-4, .pt-5, .pt-6
<!-- top -->
.pr-0, .pr-1, .pr-2, .pr-3, .pr-4, .pr-5, .pr-6
<!-- right -->
.pb-0, .pb-1, .pb-2, .pb-3, .pb-4, .pb-5, .pb-6
<!-- bottom -->
.pl-0, .pl-1, .pl-2, .pl-3, .pl-4, .pl-5, .pl-6
<!-- left -->
.px-0, .px-1, .px-2, .px-3, .px-4, .px-5, .px-6
<!-- horizontal -->
.py-0, .py-1, .py-2, .py-3, .py-4, .py-5, .py-6
<!-- vertical -->

<!-- Auto margin (only for margin, not padding) -->
.m-auto, .mt-auto, .mr-auto, .mb-auto, .ml-auto .mx-auto
<!-- horizontal centering -->
.my-auto
<!-- vertical centering -->
```

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

### Card Component

```html
<div class="p-6">
  <h3 class="mb-2">Card Title</h3>
  <p class="mb-3">Card description text goes here.</p>
  <button class="mt-4">Action Button</button>
</div>
```

### Page Container

```html
<div class="px-4 py-6 md:px-6">
  <h1 class="mb-4">Page Title</h1>
  <p class="mb-3">Introduction paragraph</p>
  <div class="mt-6">
    <button>Get Started</button>
  </div>
</div>
```

### Stack Layout

```html
<div class="d-flex flex-column">
  <div class="mb-3">Item 1</div>
  <div class="mb-3">Item 2</div>
  <div class="mb-3">Item 3</div>
  <div>Item 4 (no margin)</div>
</div>
```

### Form Spacing

```html
<form>
  <div class="mb-4">
    <label class="mb-2">Email</label>
    <input type="email" />
  </div>

  <div class="mb-4">
    <label class="mb-2">Password</label>
    <input type="password" />
  </div>

  <button class="mt-6">Submit</button>
</form>
```

### Button Group

```html
<div class="d-flex">
  <button class="mr-2">Cancel</button>
  <button class="mr-2">Save Draft</button>
  <button>Publish</button>
</div>
```

### Centered Content

```html
<!-- Horizontally centered -->
<div class="mx-auto" style="max-width: 800px;">
  <h1 class="mb-4">Centered Content</h1>
  <p>This content is centered with max-width</p>
</div>
```

### Section Spacing

```html
<section class="py-6">
  <div class="container">
    <h2 class="mb-4">Section Title</h2>
    <div class="grid grid-cols-3 gap-4">
      <div class="p-4">Column 1</div>
      <div class="p-4">Column 2</div>
      <div class="p-4">Column 3</div>
    </div>
  </div>
</section>
```

### List with Spacing

```html
<ul class="list-none p-0">
  <li class="py-3 px-4 mb-2">List item 1</li>
  <li class="py-3 px-4 mb-2">List item 2</li>
  <li class="py-3 px-4 mb-2">List item 3</li>
  <li class="py-3 px-4">List item 4</li>
</ul>
```

## Spacing Guide

### When to Use Each Size

| Size       | Use Case         | Examples                       |
| ---------- | ---------------- | ------------------------------ |
| `0`        | Reset spacing    | Remove default margins/padding |
| `1` (4px)  | Minimal spacing  | Icon gaps, tight elements      |
| `2` (8px)  | Small spacing    | Labels, small gaps             |
| `3` (12px) | Default spacing  | Between related elements       |
| `4` (16px) | Standard spacing | Card padding, button spacing   |
| `5` (20px) | Medium spacing   | Section internal spacing       |
| `6` (24px) | Large spacing    | Card padding, section spacing  |

### Common Patterns

```html
<!-- Tight spacing (1-2) -->
<div class="d-flex">
  <span class="mr-1">📧</span>
  <span>Email</span>
</div>

<!-- Default spacing (3-4) -->
<div class="mb-3">
  <label>Input Label</label>
  <input type="text" />
</div>

<!-- Generous spacing (5-6) -->
<section class="py-6">
  <h2 class="mb-5">Section Title</h2>
  <div>Content</div>
</section>
```

## Responsive Spacing

All spacing utilities support responsive breakpoints:

```html
<!-- Small padding on mobile, larger on desktop -->
<div class="p-3 md:p-5 lg:p-6">Responsive padding</div>

<!-- Responsive margins -->
<div class="mb-3 md:mb-4 lg:mb-6">Responsive bottom margin</div>

<!-- Responsive horizontal centering -->
<div class="mx-auto px-4 md:px-6" style="max-width: 1200px;">Responsive container</div>
```

## SCSS Usage

```scss
@use '@haspen/design-tokens' as tokens;

// Use spacing function
.card {
  padding: tokens.spacing(4); // 1rem (16px)
  margin-bottom: tokens.spacing(6); // 1.5rem (24px)
}

// Responsive spacing
.container {
  padding: tokens.spacing(3);

  @include tokens.respond-to('md') {
    padding: tokens.spacing(5);
  }

  @include tokens.respond-to('lg') {
    padding: tokens.spacing(6);
  }
}
```

## Best Practices

::: tip Do

- Use spacing scale consistently (0-6)
- Start with smaller spacing and increase as needed
- Use `mx-auto` for horizontal centering
- Use responsive variants for different screen sizes
- Use `0` to reset unwanted spacing
- Use `3` or `4` as your default spacing :::

::: warning Don't

- Use arbitrary spacing values (e.g., `margin: 13px`)
- Mix utilities with custom spacing
- Use padding when margin is appropriate (and vice versa)
- Forget to reset browser default spacing with `m-0` or `p-0`
- Use too large spacing between related elements :::
