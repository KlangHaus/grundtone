# Aspect Ratio

Aspect ratio utilities maintain consistent width-to-height proportions for media elements. Uses
modern `aspect-ratio` CSS property with automatic fallback for older browsers.

## Available Ratios

| Class                | Ratio   | Usage                                  |
| -------------------- | ------- | -------------------------------------- |
| `.aspect-square`     | 1:1     | Square images, profile pictures, icons |
| `.aspect-video`      | 16:9    | Video players, YouTube embeds          |
| `.aspect-cinema`     | 21:9    | Cinematic wide video                   |
| `.aspect-photo`      | 4:3     | Traditional photo format               |
| `.aspect-portrait`   | 3:4     | Portrait orientation photos            |
| `.aspect-golden`     | 1.618:1 | Golden ratio for aesthetics            |
| `.aspect-a4`         | 210:297 | A4 paper format                        |
| `.aspect-wide`       | 2:1     | Wide banners                           |
| `.aspect-ultra-wide` | 32:9    | Ultra-wide displays                    |

## Hur

dan Bruger Man

### Video Player

```html
<div class="aspect-video">
  <iframe src="https://www.youtube.com/embed/..." class="w-full h-full"></iframe>
</div>
```

```scss
.video-container {
  @include aspect-ratio-style('video', '16 / 9');

  iframe {
    width: 100%;
    height: 100%;
  }
}
```

### Image Gallery

```html
<!-- Square thumbnails -->
<div class="aspect-square">
  <img src="image.jpg" alt="Thumbnail" class="w-full h-full object-cover" />
</div>

<!-- Photo format -->
<div class="aspect-photo">
  <img src="photo.jpg" alt="Photo" class="w-full h-full object-cover" />
</div>
```

### Card with Image

```html
<div class="card">
  <div class="aspect-video">
    <img src="banner.jpg" alt="Banner" class="w-full h-full object-cover" />
  </div>
  <div class="card-content">
    <h3>Card Title</h3>
    <p>Card description...</p>
  </div>
</div>
```

### Custom Ratio

```html
<div class="aspect-custom" style="--aspect-ratio: 2.5">
  <img src="custom.jpg" alt="Custom" class="w-full h-full object-cover" />
</div>
```

### Responsive Aspect Ratios

```html
<!-- Square on mobile, video on tablet+ -->
<div class="aspect-square md:aspect-video">
  <img src="responsive.jpg" alt="Responsive" class="w-full h-full object-cover" />
</div>
```

## Praktiske Eksempler

### Product Card

```scss
.product-card {
  .product-image {
    @include aspect-ratio-style('square', '1 / 1');
    overflow: hidden;
    border-radius: tokens.radius('lg');

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }
}
```

### Hero Banner

```scss
.hero-banner {
  @include aspect-ratio-style('cinema', '21 / 9');
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }
}
```

### Container Query Support

```scss
// Responsive based on container size, not viewport
.cq-sm\:aspect-video {
  @container (min-width: 24rem) {
    aspect-ratio: 16 / 9;
  }
}
```

## Browser Support

- Modern browsers: Uses native `aspect-ratio` property
- Older browsers: Automatic fallback using padding-top technique
- No JavaScript required

## Best Practices

::: tip Do

- Use aspect ratios for media to prevent layout shift
- Combine with `object-fit: cover` for images
- Use responsive variants for different screen sizes
- Set explicit dimensions on the container :::

::: warning Don't

- Force aspect ratios on text content
- Forget to set width on the container
- Use aspect ratios when natural image ratios are preferred :::
