# Figure

Semantic container for images with captions. Uses HTML5 `<figure>` and `<figcaption>`.

## When to use

- Images that need a descriptive caption
- Charts, diagrams, or illustrations with explanatory text
- Any visual content that benefits from attribution or context

## When not to use

- Standalone images without captions — just use `<img>` with [Image utilities](/web/c-image)
- Image galleries — use [Carousel](/web/c-carousel) or a grid layout

---

## Default

<CodePreview id="c-figure-default" />

## End-aligned caption

<CodePreview id="c-figure-end" />

---

## CSS classes

| Class | Description |
|-------|-------------|
| `.figure` | Container — `display: inline-flex; flex-direction: column` |
| `.figure__img` | Image — block display, responsive, rounded |
| `.figure__caption` | Caption text — small, tertiary color |
| `.figure--center` | Centers the figure horizontally |
| `.figure--end` | Right-aligns the caption text |

---

## Accessibility

- `<figure>` provides implicit grouping for assistive technology
- `<figcaption>` is automatically associated with the figure
- Still provide `alt` text on the `<img>` — the caption supplements, not replaces
