# Width

Width utilities provide percentage-based width classes for responsive layouts.

## Width Classes

| Class     | Value         |
| --------- | ------------- |
| `.w-25`   | `width: 25%`  |
| `.w-50`   | `width: 50%`  |
| `.w-75`   | `width: 75%`  |
| `.w-100`  | `width: 100%` |
| `.w-auto` | `width: auto` |

## Hvordan Bruger Man

### Responsive Columns

```html
<div class="d-flex">
  <div class="w-50">Half width</div>
  <div class="w-50">Half width</div>
</div>

<div class="d-flex">
  <div class="w-25">Quarter</div>
  <div class="w-75">Three quarters</div>
</div>
```

### Responsive Width

```html
<!-- Full width on mobile, half on tablet+ -->
<div class="w-100 md-w-50">Responsive width</div>
```

### Max Width

```scss
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
```

## Best Practices

::: tip Do

- Use for simple column layouts
- Combine with responsive breakpoints
- Set max-width for containers :::

::: warning Don't

- Use for complex layouts (use grid/flex)
- Forget responsive variants :::
