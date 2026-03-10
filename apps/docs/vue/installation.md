# Vue 3 Installation

Install the Vue component library and design system:

```bash
npm install @grundtone/vue @grundtone/design-system @grundtone/core
```

## Vite configuration

Configure SCSS token injection so design-system tokens are available in all components:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@grundtone/design-system/scss/lib" as tokens;`,
      },
    },
  },
});
```

## Import CSS

Import the design system CSS in your app entry point to load all CSS custom properties:

```ts
// main.ts
import '@grundtone/design-system/dist/index.css';
```

## Use components

All components are named exports from `@grundtone/vue`:

```vue
<script setup>
import { GTButton } from '@grundtone/vue';
</script>

<template>
  <GTButton variant="primary">Submit</GTButton>
  <GTButton variant="outlined" rounded="full">Cancel</GTButton>
</template>
```

## Use tokens in your own SCSS

With the Vite configuration above, design-system tokens are available in any component:

```vue
<style lang="scss">
.my-card {
  background: tokens.color('surface');
  padding: tokens.space('md');
  border-radius: tokens.radius('lg');
  box-shadow: tokens.shadow('sm');
}
</style>
```
