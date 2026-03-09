# Product Card

Clickable card for product listings with hover elevation and focus styles.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.product-card` | Block-level card with hover shadow + translateY |
| `.product-card__body` | Flex-column content area with padding |
| `.product-card__price` | Price container pushed to bottom via `margin-top: auto` |
| `.product-image` | Square aspect-ratio image with cover fit |

## Features

- `surface-raised` background
- Transition on box-shadow and transform
- Focus-visible outline with `--color-focus-ring`
- `prefers-reduced-motion` disables transitions

### Preview

<CodePreview name="c-product-card" />

---

## Usage

```html
<a href="/product" class="product-card shadow-sm">
  <img src="product.jpg" alt="Product" class="product-image" loading="lazy" />
  <div class="product-card__body">
    <h2 class="text-base font-semibold">Product Name</h2>
    <p class="text-sm text-secondary">Short description.</p>
    <div class="product-card__price text-lg font-bold">349 kr</div>
  </div>
</a>
```
