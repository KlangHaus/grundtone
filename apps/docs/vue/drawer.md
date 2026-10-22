# Drawer

A panel that slides in from the left or right edge. Modal by default (scrim, focus trap, scroll lock); non-modal for detail panels that leave the page usable.

---

## Demo

<DrawerDemo />

---

## When to use

- Mobile navigation
- A detail or edit panel next to a list, where the user keeps the context of the page

## When not to use

- A short confirmation or decision — use [Confirm Dialog](/vue/confirm-dialog)
- Content that needs the user's full attention in the centre of the screen — use [Modal](/vue/modal)
- The application's persistent navigation — use [App Shell](/vue/app-shell), which uses a drawer on mobile for you

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Modal navigation drawer

```vue
<script setup>
  import { ref } from 'vue';
  const open = ref(false);
</script>

<template>
  <GTButton @click="open = true">Menu</GTButton>
  <GTDrawer v-model:open="open" aria-label="Navigation">
    <nav>…</nav>
  </GTDrawer>
</template>
```

### Non-modal detail panel

```vue
<template>
  <GTDrawer v-model:open="open" side="right" size="28rem" :modal="false" aria-label="Details">
    <h2>Order 1042</h2>
  </GTDrawer>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **required** | Visibility (`v-model:open`) |
| `side` | `'left' \| 'right'` | `'left'` | Edge the panel slides in from |
| `size` | `string` | `'20rem'` | Panel inline size (any CSS length) |
| `modal` | `boolean` | `true` | Scrim, focus trap and scroll lock. `false` leaves the page interactive |
| `ariaLabel` | `string` | — | Accessible label for the dialog (use when there is no visible heading) |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:open` | `boolean` | Emitted with `false` on Escape or a scrim click |
| `close` | — | Emitted when the drawer closes itself |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Panel content |

---

## Accessibility

- The panel has `role="dialog"`, and `aria-modal="true"` when modal
- Escape closes the drawer; in a modal drawer a click on the scrim does too
- Focus moves into the panel on open and returns to the element that opened it on close
- A modal drawer traps focus and locks page scroll; a non-modal one does neither
