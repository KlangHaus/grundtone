# Image

Utility classes for responsive images, thumbnails, and object-fit control.

## When to use

- Making images responsive within fluid layouts
- Displaying image thumbnails with borders
- Controlling how images fill their containers

---

## Responsive image

Scales with parent container, never exceeds natural width.

<CodePreview id="c-img-fluid" />

## Thumbnail

Adds padding, border, and rounded corners for a framed look.

<CodePreview id="c-img-thumbnail" />

## Object fit

Control how an image fills its container.

<CodePreview id="c-img-cover" />

---

## CSS classes

| Class | Description |
|-------|-------------|
| `.img-fluid` | `max-width: 100%; height: auto` — responsive scaling |
| `.img-thumbnail` | Bordered thumbnail with padding and radius |
| `.img-cover` | `object-fit: cover` — fills container, crops excess |
| `.img-contain` | `object-fit: contain` — fits inside container, letterboxed |

---

## Accessibility

- Always provide a descriptive `alt` attribute
- Decorative images: use `alt=""` and `aria-hidden="true"`
- Use `<figure>` and `<figcaption>` for images with captions — see [Figure](/web/c-figure)
