# Installation

## Vue 3

```bash
npm install @grundtone/vue
```

Import components — CSS follows automatically:

```vue
<script setup>
import { GTButton } from '@grundtone/vue';
</script>

<template>
  <GTButton variant="primary">Click me</GTButton>
</template>
```

Apply your theme at startup:

```ts
// main.ts
import { createApp } from 'vue';
import { applyThemeToDOM, createTheme } from '@grundtone/vue';
import App from './App.vue';

applyThemeToDOM(createTheme({
  light: { colors: { primary: '#0059b3' } },
}).light);

createApp(App).mount('#app');
```

See the full [Vue 3 guide](/vue/installation) for icons, SCSS tokens, and utility classes.

---

## Nuxt

```bash
npm install @grundtone/nuxt
```

```ts
// nuxt.config.ts
import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    theme: createTheme({
      light: { colors: { primary: '#0059b3' } },
    }),
  },
});
```

Components and composables are auto-imported. CSS follows automatically.

```vue
<template>
  <GTButton variant="primary">Click me</GTButton>
</template>
```

See the full [Nuxt guide](/vue/nuxt) for utility classes and SCSS tokens.

---

## CDN

For use without a bundler:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@grundtone/vue/dist/index.css">

<!-- Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Grundtone -->
<script src="https://unpkg.com/@grundtone/vue/dist/index.umd.cjs"></script>
```

```html
<div id="app">
  <gt-button variant="primary">Click me</gt-button>
</div>

<script>
const { createApp } = Vue;
const { GTButton } = GrundtoneUI;

createApp({
  components: { 'gt-button': GTButton }
}).mount('#app');
</script>
```

The CDN build includes all components and the full CSS bundle (~335 KB). For production, use the npm package — it tree-shakes automatically.

Also available on **jsdelivr**:

```
https://cdn.jsdelivr.net/npm/@grundtone/vue/dist/index.css
https://cdn.jsdelivr.net/npm/@grundtone/vue/dist/index.umd.cjs
```

---

## React Native

```bash
npm install @grundtone/react-native @grundtone/core
```

```tsx
import { GrundtoneThemeProvider } from '@grundtone/react-native';
import { createTheme } from '@grundtone/core';

const theme = createTheme({
  light: { colors: { primary: '#007aff' } },
  dark: { colors: { primary: '#0a84ff' } },
});

export default function App() {
  return (
    <GrundtoneThemeProvider light={theme.light} dark={theme.dark}>
      <RootNavigator />
    </GrundtoneThemeProvider>
  );
}
```

---

## Plain HTML + CSS

For using design tokens without a framework:

```bash
npm install @grundtone/design-system
```

```html
<link rel="stylesheet" href="node_modules/@grundtone/design-system/dist/index.css">
```

Or via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/@grundtone/design-system/dist/index.css">
```

Use CSS custom properties directly:

```css
.button {
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}
```

---

## Summary

| Framework | Package | CSS | Theme |
|-----------|---------|-----|-------|
| Vue 3 | `@grundtone/vue` | Automatic (per component) | `applyThemeToDOM(createTheme(...))` |
| Nuxt | `@grundtone/nuxt` | Automatic (per component) | `grundtone.theme` in nuxt.config.ts |
| React Native | `@grundtone/react-native` + `@grundtone/core` | N/A | `GrundtoneThemeProvider` |
| Plain HTML | `@grundtone/design-system` | Manual `<link>` | CSS custom properties |
| CDN | — | `unpkg.com/@grundtone/vue/dist/index.css` | — |
