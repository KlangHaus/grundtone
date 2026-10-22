# Confirm Dialog

A small modal that asks the user to confirm or cancel an action. Built on [Modal](/vue/modal).

---

## Demo

<ConfirmDialogDemo />

---

## When to use

- Before a destructive or irreversible action (delete, revoke, publish)
- When the consequence of an action needs to be stated before it happens

## When not to use

- Routine actions that are easy to undo — act, then offer undo in a [Toast](/vue/toast)
- Forms or longer content — use [Modal](/vue/modal)

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Destructive action with async confirm

Confirm does **not** close the dialog. The parent closes it when the action is done, and binds `loading` while it runs.

```vue
<script setup>
  import { ref } from 'vue';
  const open = ref(false);
  const busy = ref(false);

  async function remove() {
    busy.value = true;
    await deleteProject();
    busy.value = false;
    open.value = false;
  }
</script>

<template>
  <GTButton variant="negative" @click="open = true">Delete project</GTButton>
  <GTConfirmDialog
    v-model:open="open"
    title="Delete project?"
    message="The project and all its versions are deleted. This cannot be undone."
    confirm-label="Delete"
    destructive
    :loading="busy"
    @confirm="remove"
  />
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | **required** | Visibility (`v-model:open`) |
| `title` | `string` | **required** | Dialog title / question |
| `message` | `string` | — | Supporting text below the title (or use the default slot) |
| `confirmLabel` | `string` | `'Bekræft'` | Confirm button label |
| `cancelLabel` | `string` | `'Annuller'` | Cancel button label |
| `destructive` | `boolean` | `false` | Render the confirm button in the negative variant |
| `loading` | `boolean` | `false` | Spinner on confirm; cancel is disabled while it runs |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `confirm` | — | Confirm was clicked. The dialog stays open |
| `cancel` | — | Cancel, Escape or close was used. The dialog closes |
| `update:open` | `boolean` | Visibility changed |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Extra content below `message` |

---

## Accessibility

- Inherits [Modal](/vue/modal)'s dialog semantics, focus trap and Escape handling
- State the consequence in `title` or `message`, and name the action on the button ("Delete", not "OK")
