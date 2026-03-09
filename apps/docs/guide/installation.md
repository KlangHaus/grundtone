# Installation

Step-by-step setup for each framework.

---

## Vue 3

### Step 1: Install packages

```bash
pnpm add @grundtone/vue @grundtone/core
# or
npm install @grundtone/vue @grundtone/core
```

### Step 2: Import CSS

In your app entry (e.g. `main.ts`):

```ts
import '@grundtone/vue/dist/style.css';
```

### Step 3: Configure Vite for SCSS (optional)

If you use design tokens in your own SCSS, add to `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@grundtone/design-tokens' as tokens;`,
      },
    },
  },
});
```

### Step 4: Wrap app with ThemeProvider

Add theme customization via the `theme` prop. Configure both light and dark themes – see
[Theme Configuration](/guide/theme-configuration#vue-3).

```vue
<!-- App.vue -->
<template>
  <ThemeProvider :theme="themeConfig" mode="auto">
    <RouterView />
  </ThemeProvider>
</template>

<script setup lang="ts">
  import { ThemeProvider } from '@grundtone/vue';
  import { createTheme } from '@grundtone/core';

  const { light, dark } = createTheme({
    light: { primary: '#0059b3', primaryLight: '#3381cc', onPrimary: '#ffffff' },
    dark: { primary: '#4dabf7', primaryLight: '#74c0fc', onPrimary: '#121212' },
  });

  const themeConfig = {
    light: { colors: light.colors },
    dark: { colors: dark.colors },
  };
</script>
```

### Step 5: Use components and utilities

```vue
<template>
  <GrundtoneButton>Click me</GrundtoneButton>
</template>
```

Grid and other utilities are available – see [Grid Utility](/web/grid-utility).

Or import explicitly:

```vue
<script setup lang="ts">
  import { Button } from '@grundtone/vue';
</script>

<template>
  <Button>Click me</Button>
</template>
```

---

## Nuxt 3

### Step 1: Install the module

```bash
pnpm add -D @grundtone/nuxt
# or
npm install -D @grundtone/nuxt
```

### Step 2: Add module to Nuxt config

Configure your brand colors with `createTheme()` – see
[Theme Configuration](/guide/theme-configuration#nuxt-3) for all options.

```ts
// nuxt.config.ts
import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    theme: createTheme({
      light: {
        primary: '#0059b3',
        primaryLight: '#3381cc',
        primaryDark: '#003a7a',
      },
      dark: {
        primary: '#4dabf7',
        primaryLight: '#74c0fc',
        primaryDark: '#339af0',
      },
    }),
    components: true,
    composables: true,
    prefix: 'Grundtone',
  },
});
```

### Step 3: Use components and utilities

Components and composables are auto-imported. Grid utilities are included – see
[Grid Utility](/web/grid-utility).

```vue
<template>
  <GrundtoneButton>Click me</GrundtoneButton>
</template>
```

---

## React Native

### Step 1: Install packages

```bash
pnpm add @grundtone/react-native @grundtone/core
# or
npm install @grundtone/react-native @grundtone/core
```

### Step 2: Create theme

Use `createTheme()` to set your brand colors – see
[Theme Configuration](/guide/theme-configuration#react-native) for all semantic color keys.

```tsx
// theme.ts
import { createTheme } from '@grundtone/core';

export const { light, dark } = createTheme({
  light: {
    primary: '#007aff',
    background: '#ffffff',
    text: '#1c1c1e',
    // Override only what you need
  },
  dark: {
    primary: '#0a84ff',
    background: '#000000',
    text: '#ffffff',
  },
});
```

### Step 3: Wrap app with GrundtoneThemeProvider

```tsx
// App.tsx
import { GrundtoneThemeProvider } from '@grundtone/react-native';
import { light, dark } from './theme';

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <RootNavigator />
    </GrundtoneThemeProvider>
  );
}
```

### Step 4: Use theme in components

```tsx
import { StyleSheet, View, Text } from 'react-native';
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

---

## Plain Web (no framework)

Use design tokens only: CSS variables and SCSS. No Vue or React components.

### Step 1: Install

```bash
pnpm add @grundtone/design-tokens @grundtone/core
# or
npm install @grundtone/design-tokens @grundtone/core
```

### Step 2: Import CSS

```html
<link rel="stylesheet" href="node_modules/@grundtone/design-tokens/dist/index.css" />
```

Or with a bundler (Vite, webpack):

```ts
import '@grundtone/design-tokens/dist/index.css';
```

### Step 3: Use CSS variables

Override colors in `:root` to match your brand – see
[Theme Configuration](/guide/theme-configuration#plain-web-no-framework).

```css
.button {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}
```

### Step 4: Use SCSS and grid (optional)

```scss
@use '@grundtone/design-tokens' as tokens;

.card {
  padding: tokens.space('md');
  background-color: tokens.color('surface');
  box-shadow: tokens.shadow('md');
}
```

For grid layouts, use the utility classes – see [Grid Utility](/web/grid-utility).

---

## Next Step

After installing, see [Theme Configuration](/guide/theme-configuration) to customize colors for your
brand.

## Summary

| Framework    | Packages            | Theme setup                          |
| ------------ | ------------------- | ------------------------------------ |
| Vue 3        | vue, core           | ThemeProvider in App.vue             |
| Nuxt 3       | nuxt (dev)          | grundtone.theme in nuxt.config.ts    |
| React Native | react-native, core  | GrundtoneThemeProvider + createTheme |
| Plain Web    | design-tokens, core | Import CSS, use CSS vars or SCSS     |
