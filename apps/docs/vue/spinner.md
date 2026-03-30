# Spinner

Loading indicator for content that takes more than 2 seconds to load. Small for buttons and inline, large for sections. Optional text for long waits.

## Demo

<SpinnerDemo />

## Installation

```vue
<script setup>
import { GTSpinner } from '@grundtone/vue';
</script>
```

In Nuxt, `GTSpinner` is auto-imported.

## When to use

Use a spinner when load times exceed 2 seconds — as a response to user action or initial content load.

Do not use on all pages by default. Do not use for live updates. Do not use to compensate for slow performance.

## Usage

### Small (default)

Inherits font-size from parent. Use in buttons, table cells, inline contexts.

```vue
<GTSpinner />
<GTSpinner variant="light" />
```

### Large

For section-level loading.

```vue
<GTSpinner size="lg" />
```

### With text

For long wait times (>5 seconds). Be specific about what is loading.

```vue
<GTSpinner size="lg" text="Henter data…" />
<GTSpinner text="Gemmer…" />
```

### Backdrop

Overlays existing content with 75% opacity background. Parent must have `position: relative`.

```vue
<div style="position: relative; min-height: 10rem">
  <p>Existing content...</p>
  <GTSpinner size="lg" backdrop text="Indlæser sektion…" />
</div>
```

### Light variant (dark backgrounds)

```vue
<div style="background: var(--color-text); padding: 1rem">
  <GTSpinner variant="light" />
  <GTSpinner size="lg" variant="light" text="Henter…" />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'lg'` | `'sm'` | Size preset |
| `variant` | `'light' \| 'dark'` | `'dark'` | Color variant for background contrast |
| `text` | `string` | — | Optional loading message |
| `backdrop` | `boolean` | `false` | Overlay on parent content |
| `ariaLabel` | `string` | `'Indlæser…'` | Screen reader label (used when no `text`) |

## Accessibility

- `role="status"` with `aria-live="polite"` on the container
- Visually-hidden label text for screen readers when no visible `text`
- Visible `text` is announced by screen readers automatically
- Circle element is `aria-hidden="true"` (decorative)

## CSS Classes

| Class | Description |
|-------|-------------|
| `gt-spinner` | Base container |
| `gt-spinner--sm` | Small size |
| `gt-spinner--lg` | Large size |
| `gt-spinner--dark` | Dark variant |
| `gt-spinner--light` | Light variant |
| `gt-spinner--backdrop` | Backdrop overlay |
| `gt-spinner__circle` | Rotating circle |
| `gt-spinner__text` | Loading message |

See [Spinner (Design System)](/web/c-spinner) for full CSS reference.
