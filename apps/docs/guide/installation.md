# Installation by Platform

Grundtone is platform-agnostic. Install the packages for your stack and configure your theme.

## Requirements

- **Node.js**: ≥ 20.0.0
- **Vue 3**: ≥ 3.5.0 (for Vue/Nuxt)
- **React Native**: ≥ 0.72.0 (for React Native)

---

## Vue 3

Use Vue components (Button, Icon, ThemeToggle) and design tokens on web.

### 1. Install packages

```bash
pnpm add @grundtone/vue @grundtone/design-tokens @grundtone/core
# or
npm install @grundtone/vue @grundtone/design-tokens @grundtone/core
```

### 2. Configure Vite (SCSS)

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@grundtone/design-tokens' as tokens;`,
        silenceDeprecations: ['if-function'],
      },
    },
  },
});
```

### 3. Wrap app with ThemeProvider

```vue
<!-- App.vue -->
<template>
  <ThemeProvider :theme="theme">
    <router-view />
  </ThemeProvider>
</template>

<script setup lang="ts">
  import { ThemeProvider } from '@grundtone/vue';
  import { createTheme } from '@grundtone/core';

  const { light } = createTheme({
    light: { primary: '#your-brand' },
  });
  const theme = light;
</script>
```

### 4. Import styles

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import '@grundtone/vue/dist/style.css';

createApp(App).mount('#app');
```

### 5. Use components

```vue
<template>
  <GrundtoneButton variant="primary">Click me</GrundtoneButton>
</template>
```

Components are imported manually, or use
[auto-import](https://unplugin-vue-components.netlify.app/).

---

## Nuxt 3

Automatic setup: components, composables, theme, and SCSS.

### 1. Install the module

```bash
pnpm add @grundtone/nuxt
# or
npm install @grundtone/nuxt
```

### 2. Add module and theme to config

```typescript
// nuxt.config.ts
import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    theme: createTheme({
      light: {
        primary: '#0059b3',
        primaryHover: '#004a96',
        primaryActive: '#003a7a',
      },
      dark: {
        primary: '#4dabf7',
        primaryHover: '#74c0fc',
        primaryActive: '#339af0',
      },
    }),
    components: true,
    composables: true,
    prefix: 'Grundtone',
  },
});
```

### 3. Use components

All Grundtone Vue components are auto-imported with the `Grundtone` prefix:

```vue
<template>
  <GrundtoneButton variant="primary">Click me</GrundtoneButton>
  <GrundtoneThemeToggle />
</template>
```

---

## React Native

Theme provider and hook. No SCSS or CSS – use the theme object in StyleSheet.

### 1. Install packages

```bash
pnpm add @grundtone/react-native @grundtone/core
# or
npm install @grundtone/react-native @grundtone/core
```

::: info No design-tokens for RN You do **not** need `@grundtone/design-tokens` for React Native. It
is web-only (SCSS/CSS). :::

### 2. Wrap app with GrundtoneThemeProvider

```tsx
// App.tsx
import { GrundtoneThemeProvider } from '@grundtone/react-native';
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  light: { primary: '#007aff' },
  dark: { primary: '#0a84ff' },
});

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <RootNavigator />
    </GrundtoneThemeProvider>
  );
}
```

### 3. Use the theme in components

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { useGrundtoneTheme } from '@grundtone/react-native';

function MyScreen() {
  const { theme } = useGrundtoneTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
      <View style={[styles.button, { backgroundColor: theme.colors.primary }]}>
        <Text style={{ color: theme.colors.onPrimary }}>Submit</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { padding: 12, borderRadius: 8 },
});
```

### Metro config (optional)

If you see errors about `@grundtone/core` importing `.css`, add to `metro.config.js`:

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.blockList = [/\.css$/];
module.exports = config;
```

---

## Plain Web (no framework)

Use design tokens only – SCSS and CSS. No Vue components.

### 1. Install packages

```bash
pnpm add @grundtone/design-tokens @grundtone/core
```

### 2. Import CSS

```typescript
// main.ts or entry
import '@grundtone/design-tokens/dist/index.css';
```

### 3. Use in SCSS

```scss
@use '@grundtone/design-tokens' as tokens;

.button {
  background-color: tokens.color('primary');
  padding: tokens.space('md');
}
```

### 4. Or use CSS variables

```css
.button {
  background-color: var(--grundtone-color-primary);
  padding: var(--grundtone-space-md);
}
```

For theming (light/dark), use ThemeProvider from `@grundtone/vue` or apply theme programmatically.
See [theme configuration](/guide/theme-configuration).

---

## Verification

### Vue / Nuxt

Use a component and check the DOM for `--grundtone-color-primary`:

```vue
<GrundtoneButton variant="primary">Test</GrundtoneButton>
```

### React Native

```tsx
const { theme } = useGrundtoneTheme();
console.log(theme.colors.primary); // Your configured color
```

### Plain Web

```css
.test {
  color: var(--grundtone-color-text);
}
```

---

## Next Steps

- **[Theme configuration](/guide/theme-configuration)** – Customize colors
- **[Package architecture](/guide/package-architecture)** – Understand package roles
- **[Usage](/guide/usage)** – SCSS, TypeScript, CSS usage (web)
