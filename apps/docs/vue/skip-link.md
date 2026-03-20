# Skip Link

Accessible skip-to-content link, hidden offscreen until focused via keyboard. Allows keyboard users to skip repetitive navigation and jump directly to main content.

## Demo

<SkipLinkDemo />

## Installation

```vue
<script setup>
import { GTSkipLink } from '@grundtone/vue';
</script>
```

In Nuxt, `GTSkipLink` is auto-imported.

## When to use

Use skip links on **every page**. Place them as the first focusable element in the document, before any navigation.

Do not use skip links for general in-page navigation — use [Anchor Links](/vue/anchor-links) instead.

## Usage

### Basic

```vue
<GTSkipLink>Spring til indhold</GTSkipLink>
```

The default target is `#main`. The user's first Tab press reveals the link. Enter/click sets focus on the target element.

### Multiple skip links

```vue
<GTSkipLink>Spring til indhold</GTSkipLink>
<GTSkipLink href="#search">Spring til søgning</GTSkipLink>
<GTSkipLink href="#nav">Spring til navigation</GTSkipLink>
```

### Full page example

```vue
<template>
  <GTSkipLink>Spring til indhold</GTSkipLink>

  <header>
    <nav>...</nav>
  </header>

  <main id="main">
    <!-- Content -->
  </main>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `'#main'` | CSS selector for the target element |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Link text (e.g. "Spring til indhold") |

## Behavior

- Hidden offscreen by default (`position: absolute; left: -9999px`)
- Visible when focused via keyboard (`:focus` moves it to `left: 1rem`)
- On click/enter: finds target via `document.querySelector(href)`, sets `tabindex="-1"` if needed, and calls `.focus()`
- Inverted colors (`--color-text` on `--color-background`) for guaranteed contrast

## Accessibility

- Must be the first focusable element on the page
- Target element receives `tabindex="-1"` automatically if it doesn't already have a `tabindex`
- Use descriptive link text: "Spring til indhold", not "Skip"
- At minimum, every page needs a skip link to `<main>`

## CSS Classes

| Class | Description |
|-------|-------------|
| `skip-link` | Base class — offscreen, visible on `:focus` |

See [Skip Link (Design System)](/web/c-skip-link) for full CSS reference.
