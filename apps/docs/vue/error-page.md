# Error Page

Full-page error display with musical illustrations. Auto-resolves title and description from HTTP status code.

## Demo

<ErrorPageDemo />

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `number` | `404` | HTTP status code |
| `title` | `string` | auto | Error title (auto-generated from code) |
| `description` | `string` | auto | Error description (auto-generated) |
| `showHomeLink` | `boolean` | `true` | Show home button |
| `homeHref` | `string` | `'/'` | Home link URL |
| `homeLabel` | `string` | `'Gå til forsiden'` | Home button text |
| `debug` | `object` | — | Debug info (`{ url, statusCode, message, stack }`) |

## Slots

| Slot | Description |
|------|-------------|
| `illustration` | Custom illustration (replaces default SVG) |
| `actions` | Custom action buttons (replaces home link) |
| `default` | Extra content below actions |

---

## Usage

### Basic (Nuxt error.vue)

```vue
<script setup>
import { GTErrorPage } from '@grundtone/vue';

const props = defineProps({ error: Object });
const isDev = import.meta.dev;
</script>

<template>
  <GTErrorPage
    :code="error?.statusCode ?? 500"
    :debug="isDev ? error : undefined"
  />
</template>
```

### Custom title and actions

```vue
<GTErrorPage
  :code="403"
  title="Ingen adgang"
  description="Du skal logge ind for at se denne side."
>
  <template #actions>
    <a href="/login" class="gt-btn gt-btn--primary gt-btn--md">Log ind</a>
    <a href="/" class="gt-btn gt-btn--outlined gt-btn--md">Forsiden</a>
  </template>
</GTErrorPage>
```

### Custom illustration

```vue
<GTErrorPage :code="404">
  <template #illustration>
    <img src="/custom-404.svg" alt="Not found" />
  </template>
</GTErrorPage>
```

---

## Supported codes

| Code | Title | Illustration |
|------|-------|-------------|
| 400 | Forkert takt | Missing note |
| 403 | Øverummet er lukket | Lock on staff |
| 404 | Denne side spiller ikke | Missing note with ? |
| 500 | Noget gik galt i orkestret | Broken staff lines |
| 502 | Dirigenten svarer ikke | Broken staff lines |
| 503 | Vi stemmer instrumenterne | Pause symbol |

Unknown codes fall back to "En uventet fejl" with the missing-note illustration.

---

## CSS classes

See [Design System Error Page reference](/web/c-error-page) for all available CSS classes.
