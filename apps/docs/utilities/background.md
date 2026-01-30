# Background

Background utilities for quick background styling.

## Background Classes

| Class             | Description            |
| ----------------- | ---------------------- |
| `.bg-transparent` | Transparent background |
| `.bg-white`       | White background       |
| `.bg-light`       | Light gray background  |
| `.bg-dark`        | Dark background        |

## Hvordan Bruger Man

### Card Backgrounds

```html
<div class="bg-white">White card</div>
<div class="bg-light">Light gray card</div>
```

### Transparent Overlays

```html
<div class="position-relative">
  <img src="image.jpg" alt="Image" />
  <div class="position-absolute bg-transparent" style="inset: 0">
    <div class="overlay-content">Content</div>
  </div>
</div>
```

## SCSS Usage

```scss
@use '@ipeeon/design-tokens' as tokens;

.custom-background {
  background-color: tokens.getColor('primary', 50);
}
```
