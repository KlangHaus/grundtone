# Toast

Sonner-style toast notifications with countdown bar, stacking, and optional icons.

## Demo

<ToastDemo />

## Installation

```vue
<script setup>
import { GTToastContainer, useToast } from '@grundtone/vue';
</script>
```

In Nuxt, both are auto-imported.

## Usage

### Setup

Add `GTToastContainer` once in your app layout:

```vue
<template>
  <div>
    <RouterView />
    <GTToastContainer position="bottom-center" />
  </div>
</template>
```

### Show toasts

```vue
<script setup>
import { useToast } from '@grundtone/vue';

const toast = useToast();

toast.success('Din ansøgning er afsendt');
toast.error('Der opstod en fejl');
toast.warning('Advarsel', { description: 'Detaljer...' });
toast.info('Ny besked');
toast('Standard besked');
</script>
```

### With icon

```vue
toast.success('Gemt', { icon: 'check' });
toast.error('Fejl', { icon: 'close' });
```

### Persistent (no auto-hide)

```vue
toast.error('Kritisk fejl', { duration: 0 });
```

### Dismiss programmatically

```vue
const id = toast.info('Processing...');
// Later:
toast.dismiss(id);
toast.dismissAll();
```

## useToast API

| Method | Description |
|--------|-------------|
| `toast(message, options?)` | Default toast |
| `toast.success(message, options?)` | Success variant |
| `toast.warning(message, options?)` | Warning variant |
| `toast.error(message, options?)` | Error variant |
| `toast.info(message, options?)` | Info variant |
| `toast.dismiss(id)` | Remove specific toast |
| `toast.dismissAll()` | Remove all toasts |

### ToastOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `description` | `string` | — | Secondary text |
| `icon` | `string` | — | Icon name from registry |
| `duration` | `number` | `5000` | ms (0 = persistent) |
| `dismissible` | `boolean` | `true` | Show close button |

## GTToastContainer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `ToastPosition` | `'bottom-center'` | Screen position |
| `visibleToasts` | `number` | `3` | Max visible before stacking |
| `richColors` | `boolean` | `false` | Filled variant backgrounds |
| `expand` | `boolean` | `false` | Always expanded (no stacking) |

## Features

- **Stacking**: 3D scale effect, expand on hover
- **Countdown bar**: Visual timer, pauses on hover/focus
- **Rich colors**: Optional filled backgrounds per variant
- **WCAG**: Correct aria-live per variant, timing adjustable

See [Toast (Design System)](/web/c-toast) for full CSS reference.
