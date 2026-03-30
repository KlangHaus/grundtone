# Modal

Overlay dialog for confirmations, destructive actions, and critical decisions. Forces user focus while the rest of the page is deactivated.

## Demo

<ModalDemo />

## Installation

```vue
<script setup>
import { GTModal } from '@grundtone/vue';
</script>
```

In Nuxt, `GTModal` is auto-imported.

## When to use

Use a modal when the user must see and respond to specific content before continuing.

Do not use for page content, long text, multi-field forms, or as a default pattern. Keep content short — no scrolling inside the modal.

## Usage

### Standard

```vue
<script setup>
import { ref } from 'vue';
const showModal = ref(false);
</script>

<template>
  <GTButton @click="showModal = true">Åbn modal</GTButton>

  <GTModal v-model:open="showModal" title="Bekræft handling">
    <p>Er du sikker på at du vil fortsætte?</p>
    <template #footer>
      <GTButton variant="outlined" size="sm" @click="showModal = false">Annuller</GTButton>
      <GTButton variant="primary" size="sm" @click="showModal = false">Bekræft</GTButton>
    </template>
  </GTModal>
</template>
```

### Persistent (kræver handling)

Cannot be closed with Escape, backdrop click, or close button. User must click an action button.

```vue
<GTModal v-model:open="showDelete" title="Slet konto?" persistent>
  <p>Denne handling kan ikke fortrydes.</p>
  <template #footer>
    <GTButton variant="outlined" size="sm" @click="showDelete = false">Annuller</GTButton>
    <GTButton variant="negative" size="sm" @click="deleteAccount">Slet konto</GTButton>
  </template>
</GTModal>
```

### Transitions

```vue
<GTModal transition="fade" ... />
<GTModal transition="scale" ... />      <!-- default -->
<GTModal transition="slide-up" ... />   <!-- bottom sheet feel -->
<GTModal transition="slide-down" ... />
<GTModal transition="slide-right" ... />
<GTModal transition="none" ... />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls visibility (v-model:open) |
| `title` | `string` | — | Dialog title (required) |
| `persistent` | `boolean` | `false` | Only closeable via action buttons |
| `transition` | `ModalTransition` | `'scale'` | Enter/exit animation |
| `ariaLabel` | `string` | — | Screen reader label (defaults to title) |

### ModalTransition

`'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-right' | 'none'`

## Slots

| Slot | Description |
|------|-------------|
| `default` | Modal body content |
| `footer` | Action buttons |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `boolean` | v-model binding |
| `close` | — | Emitted when modal closes |

## Behavior

- **Focus trap**: Tab/Shift+Tab cycles within the modal
- **Focus restore**: Focus returns to the trigger element on close
- **Scroll lock**: Body scroll disabled with scrollbar compensation
- **Escape**: Closes the modal (standard variant)
- **Backdrop click**: Closes the modal (standard variant)
- **Teleport**: Rendered in `<body>` for z-index isolation

## Accessibility

- `role="dialog"` with `aria-modal="true"` on the dialog
- `aria-labelledby` points to the title
- Focus trapped inside dialog
- Escape key closes (standard variant)
- Body scroll locked while open

## CSS Classes

| Class | Description |
|-------|-------------|
| `gt-modal` | Fixed backdrop overlay |
| `gt-modal__dialog` | Centered dialog container |
| `gt-modal__header` | Title + close button |
| `gt-modal__title` | Heading text |
| `gt-modal__close` | Close button |
| `gt-modal__body` | Content area |
| `gt-modal__footer` | Action buttons |

See [Modal (Design System)](/web/c-modal) for full CSS reference.
