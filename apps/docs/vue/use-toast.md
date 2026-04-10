# useToast

Imperative API for showing toast notifications. Pairs with `GTToastContainer`.

## Setup

Add a single `GTToastContainer` once at the app root — it renders all toasts via Vue Teleport and listens to the shared toast state.

```vue
<!-- App.vue -->
<script setup>
import { GTToastContainer } from '@grundtone/vue';
</script>

<template>
  <RouterView />
  <GTToastContainer position="bottom-right" />
</template>
```

## Usage

```vue
<script setup>
import { useToast, GTButton } from '@grundtone/vue';

const toast = useToast();

function save() {
  try {
    // ...save logic
    toast.success('Gemt!', { description: 'Dine ændringer er gemt' });
  } catch (err) {
    toast.error('Kunne ikke gemme', { icon: 'alert-circle', duration: 0 });
  }
}
</script>

<template>
  <GTButton @click="save">Gem</GTButton>
</template>
```

In Nuxt, `useToast` is auto-imported.

## API

`useToast()` returns a callable function with variant methods and dismiss helpers.

```ts
const toast = useToast();

toast('Besked');                 // default variant
toast.success('Gemt!');          // success variant
toast.warning('Vær opmærksom');  // warning variant
toast.error('Fejl');             // error variant
toast.info('Info');              // info variant

toast.dismiss(id);               // remove a specific toast
toast.dismissAll();              // clear all toasts
```

### Signature

```ts
(message: string, options?: ToastOptions) => string
```

Each call returns the toast `id`, which can be passed to `dismiss()`.

## ToastOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `description` | `string` | — | Secondary line shown below the message |
| `icon` | `string` | — | Icon name from the registry (e.g. `'check-circle'`) |
| `duration` | `number` | `5000` | Auto-dismiss after N ms. Set to `0` to disable auto-dismiss |
| `dismissible` | `boolean` | `true` | Whether the close button is shown |

## Variants

| Variant | ARIA | Use case |
|---------|------|----------|
| `default` | `role="status"`, `aria-live="polite"` | Generic notifications |
| `success` | `role="status"`, `aria-live="polite"` | Successful action |
| `info` | `role="status"`, `aria-live="polite"` | Informational |
| `warning` | `role="status"`, `aria-live="polite"` | Non-blocking warning |
| `error` | `role="alert"`, `aria-live="assertive"` | Errors — announced immediately |

## Shared state

All `useToast()` calls share the same reactive queue. Calling it from different components/composables still dispatches to the single `GTToastContainer` — there's no need to pass anything via props or provide/inject.

```ts
// Component A
const toast = useToast();
toast.success('From A');

// Component B
const toast = useToast();
toast.dismissAll(); // clears A's toast too
```

## Patterns

### Persistent error with manual dismiss

```ts
const id = toast.error('Netværksfejl', {
  duration: 0,
  description: 'Tjek din forbindelse og prøv igen',
});

// Later, e.g. when connection is restored:
toast.dismiss(id);
```

### Fire-and-forget success

```ts
toast.success('Kopieret til udklipsholder', { duration: 2000 });
```

### Toasts from a composable

```ts
// composables/useSaveProfile.ts
import { useToast } from '@grundtone/vue';

export function useSaveProfile() {
  const toast = useToast();

  async function save(profile) {
    try {
      await api.saveProfile(profile);
      toast.success('Profil gemt');
    } catch {
      toast.error('Kunne ikke gemme profil');
    }
  }

  return { save };
}
```

## See also

- [`GTToastContainer`](/vue/toast) — The container component that renders the toasts
