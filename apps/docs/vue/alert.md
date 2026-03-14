# Alert

Static status messages for important information, success confirmations, warnings, and errors.

---

## Demo

<AlertDemo />

---

## When to use

- Communicate status after an action (success, error)
- Summarise form validation errors at the top of a form
- Highlight important information or warnings within a page

## When not to use

- Temporary feedback that should auto-dismiss — use a toast/snackbar instead
- Inline field-level validation — use error text on the input
- Promotional banners or marketing content

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<template>
  <GTAlert variant="info">
    <p>This is an informational message.</p>
  </GTAlert>
</template>
```

### With icon

```vue
<template>
  <GTAlert variant="success" icon="check-circle">
    <p>Your changes have been saved.</p>
  </GTAlert>
</template>
```

### With heading

```vue
<template>
  <GTAlert variant="error" icon="alert-circle" heading="Form errors">
    <p>Please fix the following errors before submitting.</p>
  </GTAlert>
</template>
```

### Dismissible

```vue
<script setup>
  import { ref } from 'vue';
  const show = ref(true);
</script>

<template>
  <GTAlert
    v-if="show"
    variant="info"
    icon="info-circle"
    dismissible
    @dismiss="show = false"
  >
    <p>This alert can be dismissed.</p>
  </GTAlert>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | **required** | Visual and semantic variant |
| `heading` | `string` | — | Optional heading above the body |
| `icon` | `string` | — | Icon name from the registry (renders `GTIcon`) |
| `dismissible` | `boolean` | `false` | Show close/dismiss button |
| `ariaLabel` | `string` | — | Accessible label for the alert region |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `dismiss` | — | Emitted when the close button is clicked |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Alert body content — supports rich text, links, lists |
| `footer` | Optional footer content, separated by a line from the body |

---

## Accessibility

- `role="alert"` for `error` variant (assertive — announced immediately)
- `role="status"` for `info`, `success`, and `warning` (polite — announced at next opportunity)
- Close button has `aria-label="Close"`
- Icons are decorative (`aria-hidden="true"`)

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-alert` | Root container |
| `.gt-alert--info` | Info variant |
| `.gt-alert--success` | Success variant |
| `.gt-alert--warning` | Warning variant |
| `.gt-alert--error` | Error variant |
| `.gt-alert__icon` | Icon element |
| `.gt-alert__content` | Content wrapper (contains heading, body, footer) |
| `.gt-alert__heading` | Heading paragraph (sibling of body) |
| `.gt-alert__body` | Body content |
| `.gt-alert__footer` | Footer with top border separator |
| `.gt-alert__close` | Dismiss button |

---

## Design system

The CSS-only version of this component is documented in the [Design System — Alert](/web/c-alert) reference.
