# Back to Top

Sticky button that scrolls to the top of the page. Appears after scrolling 2 viewport heights. Icon + text on desktop, icon only on mobile.

## Demo

<BackToTopDemo />

## Installation

```vue
<script setup>
import { GTBackToTop } from '@grundtone/vue';
</script>
```

In Nuxt, `GTBackToTop` is auto-imported.

## When to use

Use on long pages (4+ screen heights). Do not use on short pages or for other navigation.

## Usage

```vue
<GTBackToTop label="Til toppen" />
<GTBackToTop label="Back to top" />
<GTBackToTop label="Nach oben" :threshold="1000" />
```

Place as the last element in your page template. It's fixed-position so it doesn't affect layout.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `'Til toppen'` | Button text (hidden on mobile) |
| `threshold` | `number` | `0` (auto = 2× viewport) | Scroll pixels before visible |
| `smooth` | `boolean` | `true` | Smooth scroll animation |

## Accessibility

- `aria-label` set to the label text
- Icon is `aria-hidden`
- Focus ring on keyboard navigation
- Respects `prefers-reduced-motion`

See [Back to Top (Design System)](/web/c-back-to-top) for full CSS reference.
