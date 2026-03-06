# Product Gallery

Image gallery with main image and thumbnail strip for product detail pages.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.product-gallery` | Grid container (single column) |
| `.product-gallery__main` | Large hero image with 1:1 aspect ratio |
| `.product-gallery__thumbs` | 4-column grid for thumbnail images |
| `.product-gallery__thumb` | Thumbnail with hover/active opacity |
| `.product-gallery__thumb--active` | Active thumbnail with primary border |

### Preview

<CodePreview name="c-product-gallery" />

---

## Usage

```html
<div class="product-gallery">
  <img src="main.jpg" alt="Product" class="product-gallery__main" />
  <div class="product-gallery__thumbs">
    <img src="thumb1.jpg" alt="View 1" class="product-gallery__thumb product-gallery__thumb--active" />
    <img src="thumb2.jpg" alt="View 2" class="product-gallery__thumb" />
    <img src="thumb3.jpg" alt="View 3" class="product-gallery__thumb" />
    <img src="thumb4.jpg" alt="View 4" class="product-gallery__thumb" />
  </div>
</div>
```
