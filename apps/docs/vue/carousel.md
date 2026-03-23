# Carousel

Slideshow component with slide/fade transitions, controls, indicators, and touch support.

## Demo

<CarouselDemo />

---

## Props — GTCarousel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `0` | Active slide index (v-model) |
| `autoplay` | `boolean` | `false` | Auto-advance slides |
| `interval` | `number` | `5000` | Autoplay interval in ms |
| `loop` | `boolean` | `true` | Wrap around at ends |
| `fade` | `boolean` | `false` | Fade transition instead of slide |
| `showControls` | `boolean` | `true` | Show prev/next buttons |
| `showIndicators` | `boolean` | `true` | Show dot indicators |
| `pauseOnHover` | `boolean` | `true` | Pause autoplay on hover |
| `ariaLabel` | `string` | `'Karrusel'` | Accessible label |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number` | Active slide changed |

## Slots — GTCarousel

| Slot | Description |
|------|-------------|
| `default` | GTCarouselSlide children |
| `prev` | Custom prev button content |
| `next` | Custom next button content |

## Props — GTCarouselSlide

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | — | Accessible label for slide |

---

## Usage

### Basic

```vue
<script setup>
import { GTCarousel, GTCarouselSlide } from '@grundtone/vue';
</script>

<template>
  <GTCarousel>
    <GTCarouselSlide>
      <img src="/slide-1.jpg" alt="First slide" class="img-fluid" />
    </GTCarouselSlide>
    <GTCarouselSlide>
      <img src="/slide-2.jpg" alt="Second slide" class="img-fluid" />
    </GTCarouselSlide>
  </GTCarousel>
</template>
```

### Fade with autoplay

```vue
<GTCarousel fade autoplay :interval="4000">
  <GTCarouselSlide v-for="img in images" :key="img.src">
    <img :src="img.src" :alt="img.alt" class="img-fluid" />
  </GTCarouselSlide>
</GTCarousel>
```

---

## CSS classes

See [Design System Carousel reference](/web/c-carousel) for all available CSS classes.
