# Component Prefix

All Grundtone components use a configurable prefix for their names and CSS classes. The default prefix is **GT**, giving you components like `<GTButton>` and CSS classes like `.gt-btn`.

## Why a prefix?

- Avoids naming collisions with other libraries
- Makes it immediately clear which components belong to your design system
- When self-hosting, you can rebrand the entire component library with one change

## Default behavior

Out of the box, no configuration needed:

```vue
<!-- Vue: import and use with GT prefix -->
<script setup>
import { GTButton } from '@grundtone/vue';
</script>
<template>
  <GTButton variant="primary">Submit</GTButton>
</template>
```

```vue
<!-- Nuxt: auto-imported with GT prefix -->
<template>
  <GTButton variant="primary">Submit</GTButton>
</template>
```

CSS classes use the lowercase prefix:

```html
<button class="gt-btn gt-btn--primary gt-btn--md">Submit</button>
```

## Custom prefix

Use `defineGrundtoneConfig()` from `@grundtone/core` to set your own prefix. Call it once at app startup, before any components are rendered.

### Vue 3

```ts
// main.ts
import { createApp } from 'vue';
import { defineGrundtoneConfig } from '@grundtone/core';
import App from './App.vue';

defineGrundtoneConfig({ prefix: 'KH' });

createApp(App).mount('#app');
```

Components now use your prefix:

```html
<!-- Rendered output -->
<button class="kh-btn kh-btn--primary kh-btn--md">Submit</button>
```

### Nuxt 3

Configure the prefix in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    prefix: 'KH',
  },
});
```

Components are auto-imported with your prefix:

```vue
<template>
  <KHButton variant="primary">Submit</KHButton>
</template>
```

### SCSS prefix

The CSS class prefix defaults to `'gt'`. To change it when self-hosting, override the SCSS variable in your Vite config:

```ts
// vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `
        $prefix: 'kh';
        @use "@grundtone/design-system/scss/lib" as tokens;
      `,
    },
  },
},
```

## Self-hosting example

When you fork Grundtone for your own organization, change the prefix to match your brand:

```ts
// @klanghaus/core (your fork)
import { defineGrundtoneConfig } from '@grundtone/core';

defineGrundtoneConfig({ prefix: 'KH' });
```

Now every component across your entire application uses your branding:

| Default | Self-hosted |
| --- | --- |
| `<GTButton>` | `<KHButton>` |
| `.gt-btn` | `.kh-btn` |
| `.gt-btn--primary` | `.kh-btn--primary` |

The prefix flows from `@grundtone/core` through all packages — one config, consistent everywhere.
