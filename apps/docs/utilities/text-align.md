# Text Align

Text alignment utilities for controlling text alignment.

## Alignment Classes

| Class           | Value                 |
| --------------- | --------------------- |
| `.text-left`    | `text-align: left`    |
| `.text-center`  | `text-align: center`  |
| `.text-right`   | `text-align: right`   |
| `.text-justify` | `text-align: justify` |

## Hvordan Bruger Man

### Basic Alignment

```html
<p class="text-left">Left aligned text</p>
<p class="text-center">Center aligned text</p>
<p class="text-right">Right aligned text</p>
```

### Responsive Alignment

```html
<!-- Center on mobile, left on desktop -->
<p class="text-center lg-text-left">Responsive text</p>

<!-- Right align only on large screens -->
<p class="text-left lg-text-right">Contact info</p>
```

### Hero Section

```html
<div class="text-center">
  <h1>Welcome</h1>
  <p>Centered hero text</p>
  <button>Get Started</button>
</div>
```

## Best Practices

::: tip Do

- Use text-center for headlines
- Use responsive variants
- Consider reading direction :::

::: warning Don't

- Use text-justify for short text
- Over-center content :::
