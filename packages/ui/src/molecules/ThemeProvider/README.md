# ThemeProvider

A Vue 3 component that initializes and provides theme context throughout the application using Vue's
provide/inject pattern.

## Features

- **Multi-mode Support**: Light, Dark, and Auto (system preference) themes
- **CSS Custom Properties**: Global theme variables applied to document root
- **Persistence**: Optional localStorage persistence of theme preferences
- **System Integration**: Automatic detection and response to system theme changes
- **Smooth Transitions**: Configurable theme transition animations
- **SSR Compatible**: Provides fallback styles for server-side rendering
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Custom Themes**: Support for theme customization and overrides

## Usage

### Basic Setup

```vue
<template>
  <ThemeProvider mode="light">
    <App />
  </ThemeProvider>
</template>

<script setup lang="ts">
  import { ThemeProvider } from '@grundtone/ui';
</script>
```

### Using Theme Context in Child Components

```vue
<template>
  <div
    :style="{
      backgroundColor: 'var(--grundtone-color-background)',
      color: 'var(--grundtone-color-text)',
    }"
  >
    <h1>Current theme: {{ mode }}</h1>
    <button @click="toggleMode">Switch to {{ isDark ? 'Light' : 'Dark' }} Mode</button>
  </div>
</template>

<script setup lang="ts">
  import { useTheme } from '@grundtone/composables';

  const { mode, isDark, toggleMode, setMode } = useTheme();
</script>
```

### Advanced Configuration

```vue
<template>
  <ThemeProvider
    mode="auto"
    :enable-transitions="true"
    :persist-mode="true"
    storage-key="my-app-theme"
    :theme="customTheme"
  >
    <App />
  </ThemeProvider>
</template>

<script setup lang="ts">
  import { ThemeProvider } from '@grundtone/ui';

  const customTheme = {
    colors: {
      primary: '#e91e63',
      secondary: '#9c27b0',
    },
    spacing: {
      xs: '0.125rem',
      sm: '0.25rem',
    },
  };
</script>
```

## Props

| Prop              | Type                          | Default                  | Description                              |
| ----------------- | ----------------------------- | ------------------------ | ---------------------------------------- |
| mode              | `'light' \| 'dark' \| 'auto'` | `'auto'`                 | Initial theme mode                       |
| theme             | `Partial<Theme>`              | `undefined`              | Custom theme overrides                   |
| enableTransitions | `boolean`                     | `true`                   | Enable smooth transitions between themes |
| persistMode       | `boolean`                     | `true`                   | Persist theme mode in localStorage       |
| storageKey        | `string`                      | `'grundtone-theme-mode'` | localStorage key for persistence         |

## Theme Context API

The `useTheme` composable provides access to:

### Properties

| Property | Type                       | Description                    |
| -------- | -------------------------- | ------------------------------ |
| theme    | `Readonly<Ref<Theme>>`     | Current theme object           |
| mode     | `Readonly<Ref<ThemeMode>>` | Current theme mode             |
| isDark   | `Readonly<Ref<boolean>>`   | Whether current theme is dark  |
| isLight  | `Readonly<Ref<boolean>>`   | Whether current theme is light |

### Methods

| Method     | Signature                   | Description                         |
| ---------- | --------------------------- | ----------------------------------- |
| setMode    | `(mode: ThemeMode) => void` | Set specific theme mode             |
| toggleMode | `() => void`                | Toggle between light and dark modes |
| applyTheme | `() => void`                | Manually apply theme to DOM         |

## CSS Custom Properties

The ThemeProvider generates CSS custom properties that can be used throughout your application:

### Colors

- `--grundtone-color-primary`
- `--grundtone-color-secondary`
- `--grundtone-color-background`
- `--grundtone-color-surface`
- `--grundtone-color-text`
- And many more...

### Spacing

- `--grundtone-spacing-xs` through `--grundtone-spacing-4xl`

### Typography

- `--grundtone-font-family-base`, `-heading`, `-mono`
- `--grundtone-font-size-xs` through `--grundtone-font-size-5xl`
- `--grundtone-font-weight-thin` through `--grundtone-font-weight-extrabold`

### Shadows, Radius, Transitions

- `--grundtone-shadow-*`, `--grundtone-radius-*`, `--grundtone-transition-*`

## Theme Structure

```typescript
interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  radius: ThemeRadius;
  transitions: ThemeTransitions;
}
```

## Auto Mode Behavior

When set to `auto` mode:

- Detects system color scheme preference
- Automatically updates when system preference changes
- Respects user's OS-level dark/light mode settings
- Falls back to light theme if system preference cannot be determined

## SSR Considerations

- Provides fallback CSS custom properties in `:root` for initial render
- Handles client-side hydration gracefully
- Prevents flash of unstyled content (FOUC)
- Compatible with Nuxt 3 and other SSR frameworks

## Examples

### Theme Toggle Button

```vue
<template>
  <button @click="toggleMode" :style="buttonStyles">
    {{ isDark ? '🌙' : '☀️' }}
    {{ isDark ? 'Dark' : 'Light' }} Mode
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTheme } from '@grundtone/composables';

  const { isDark, toggleMode } = useTheme();

  const buttonStyles = computed(() => ({
    backgroundColor: 'var(--grundtone-color-primary)',
    color: '#ffffff',
    padding: 'var(--grundtone-spacing-sm) var(--grundtone-spacing-md)',
    border: 'none',
    borderRadius: 'var(--grundtone-radius-md)',
    cursor: 'pointer',
    transition:
      'all var(--grundtone-transition-duration-fast) var(--grundtone-transition-timing-ease)',
  }));
</script>
```

### Theme-aware Component

```vue
<template>
  <div class="themed-card">
    <h2>Themed Card</h2>
    <p>This card adapts to the current theme automatically.</p>
  </div>
</template>

<style scoped>
  .themed-card {
    background: var(--grundtone-color-surface);
    color: var(--grundtone-color-text);
    padding: var(--grundtone-spacing-lg);
    border-radius: var(--grundtone-radius-lg);
    box-shadow: var(--grundtone-shadow-md);
    border: 1px solid var(--grundtone-color-border);
    transition: all var(--grundtone-transition-duration-base)
      var(--grundtone-transition-timing-ease);
  }
</style>
```

## Accessibility

- Respects user's system color scheme preference
- Provides sufficient color contrast in both themes
- Maintains focus indicators across theme changes
- Compatible with screen readers and assistive technologies
