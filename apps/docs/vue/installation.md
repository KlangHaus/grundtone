# Vue 3 Installation

Install the Vue component library:

```bash
npm install @grundtone/vue
```

That's it. `@grundtone/vue` includes everything — components, design tokens, icons, and utilities.

## Use components

Import components and use them. CSS follows automatically — no manual CSS imports needed.

```vue
<script setup>
import { GTButton, GTCard, GTInput } from '@grundtone/vue';
</script>

<template>
  <GTButton variant="primary">Submit</GTButton>
  <GTButton variant="outlined" rounded="full">Cancel</GTButton>
</template>
```

Unused components are tree-shaken from both JS and CSS.

## Theme

Apply your brand tokens at app startup:

```ts
// main.ts
import { createApp } from 'vue';
import { applyThemeToDOM, createTheme } from '@grundtone/vue';
import App from './App.vue';

const theme = createTheme({
  light: {
    colors: { primary: '#7c9082' },
    typography: {
      fontFamily: {
        base: "'Inter', sans-serif",
        heading: "'Cormorant Garamond', serif",
      },
    },
  },
});

applyThemeToDOM(theme.light);

createApp(App).mount('#app');
```

See [Theme Configuration](/guide/theme-configuration) for all available tokens.

## Icons

Provide the icon registry at app root so `GTIcon`, `GTCard` (nav arrows), and other components can render icons:

```ts
// main.ts
import { GT_ICON_REGISTRY_KEY, iconRegistry } from '@grundtone/vue';

const app = createApp(App);
app.provide(GT_ICON_REGISTRY_KEY, iconRegistry);
app.mount('#app');
```

## Utility classes (optional)

If you want to use Grundtone utility classes in your templates (`.flex`, `.grid-cols-3`, `.m-4`, etc.), import the utilities bundle explicitly:

```ts
// main.ts
import '@grundtone/vue/css/utilities';
```

This adds ~251 KB of utility classes. Skip it if you don't use utility classes.

## SCSS tokens in your own styles (optional)

If you write custom SCSS and want access to design tokens (`tokens.color('primary')`, `tokens.space('md')`, etc.), configure Vite:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@grundtone/vue/scss/lib" as tokens;`,
      },
    },
  },
});
```

Then use tokens in any `<style lang="scss">` block:

```vue
<style lang="scss">
.my-card {
  background: tokens.color('surface');
  padding: tokens.space('md');
  border-radius: tokens.radius('lg');
}
</style>
```

## CDN

For use without a bundler (prototyping, CodePen, static HTML):

```html
<link rel="stylesheet" href="https://unpkg.com/@grundtone/vue@2.23.0/dist/index.css">
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/@grundtone/vue@2.23.0/dist/index.umd.cjs"></script>
```

The CDN build includes all components and the full CSS bundle. No tree-shaking — use the npm package for production.
