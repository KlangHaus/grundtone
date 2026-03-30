# Card

Vue component for content grouping and navigation cards. For guidelines, best practices, and design rationale, see the [Design System — Card](/web/c-card) reference.

---

## Demo

<CardDemo />

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<template>
  <GTCard title="Design Tokens">
    <p>Learn how design tokens power the system.</p>
  </GTCard>
</template>
```

### With image

```vue
<template>
  <GTCard
    title="Getting Started"
    subheading="Guide"
    image="/hero.jpg"
    image-alt="Hero image"
  >
    <p>Set up Grundtone in under 5 minutes.</p>
  </GTCard>
</template>
```

### Navigation card

```vue
<template>
  <GTCard nav href="/docs" title="Documentation" subheading="Docs">
    <p>Browse the full documentation.</p>
  </GTCard>
</template>
```

### Horizontal

```vue
<template>
  <GTCard horizontal title="Feature" image="/side.jpg" image-alt="Side image">
    <p>Image on the left, content on the right.</p>
  </GTCard>
</template>
```

### Bordered

```vue
<template>
  <GTCard variant="bordered" title="Bordered">
    <p>Subtle border instead of elevation.</p>
  </GTCard>
</template>
```

### With footer

```vue
<template>
  <GTCard title="Card with Footer">
    <p>Footer content is pushed to the bottom.</p>
    <template #footer>
      <a href="#">Read more</a>
    </template>
  </GTCard>
</template>
```

### Sizing

A card has no intrinsic width — it fills its container. Control width through the layout: a grid, a flex parent, or a max-width wrapper.

```vue
<!-- Grid controls the width -->
<template>
  <div class="grid grid-cols-3 gap-md">
    <GTCard title="One">...</GTCard>
    <GTCard title="Two">...</GTCard>
    <GTCard title="Three">...</GTCard>
  </div>
</template>

<!-- Standalone — constrain with a wrapper -->
<template>
  <div class="max-w-sm">
    <GTCard title="Constrained">...</GTCard>
  </div>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | **required** | Card title |
| `variant` | `'raised' \| 'bordered' \| 'flat'` | `'raised'` | Visual style variant |
| `nav` | `boolean` | `false` | Render as navigation card (`<a>`) |
| `href` | `string` | — | URL for navigation cards |
| `external` | `boolean` | `false` | Opens in new tab (nav cards) |
| `horizontal` | `boolean` | `false` | Horizontal layout |
| `subheading` | `string` | — | Subheading text above the title |
| `image` | `string` | — | Image URL |
| `imageAlt` | `string` | — | Image alt text |
| `imageAspect` | `string` | — | Image aspect ratio CSS value |
| `ariaLabel` | `string` | — | Accessible label |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Body content (text, rich content) |
| `media` | Custom media content (overrides `image` prop) |
| `footer` | Footer with links/buttons, pushed to bottom via flex |

---

## Accessibility

- Standard cards render as `<article>` elements
- Navigation cards render as `<a>` with `href`
- External links include `target="_blank"` and `rel="noopener noreferrer"`
- Focus-visible ring on nav cards (3px solid, 2px offset)
- `prefers-reduced-motion` disables hover transform
- Icons in nav cards are decorative (`aria-hidden="true"`)

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-card` | Root container |
| `.gt-card--raised` | Raised variant (default) |
| `.gt-card--bordered` | Bordered variant |
| `.gt-card--flat` | Flat variant |
| `.gt-card--nav` | Navigation card |
| `.gt-card--horizontal` | Horizontal layout |
| `.gt-card__media` | Image/media wrapper |
| `.gt-card__content` | Content container |
| `.gt-card__subheading` | Subheading text |
| `.gt-card__title` | Title |
| `.gt-card__body` | Body content |
| `.gt-card__footer` | Footer |
| `.gt-card__arrow` | Navigation arrow icon |

---

## Design system

For guidelines, best practices, and references, see the [Design System — Card](/web/c-card) documentation.
