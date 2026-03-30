# useTheme

Access the Grundtone theme context from any component within a ThemeProvider.

## Usage

```vue
<script setup>
import { useTheme } from '@grundtone/vue';

const { theme, isDark, toggleMode } = useTheme();
</script>

<template>
  <div :style="{ color: theme.colors.text }">
    <button @click="toggleMode">
      {{ isDark ? 'Light mode' : 'Dark mode' }}
    </button>
  </div>
</template>
```

In Nuxt, `useTheme` is auto-imported.

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `Readonly<Ref<Theme>>` | Current resolved theme object |
| `mode` | `Readonly<Ref<ThemeMode>>` | Current mode: `'light'`, `'dark'`, or `'auto'` |
| `isDark` | `Readonly<Ref<boolean>>` | Whether dark mode is active |
| `isLight` | `Readonly<Ref<boolean>>` | Whether light mode is active |
| `setMode` | `(mode: ThemeMode) => void` | Set the theme mode |
| `toggleMode` | `() => void` | Toggle between light and dark |

## Requirements

Must be used inside a component tree with a Grundtone ThemeProvider. Throws an error if no provider is found.
