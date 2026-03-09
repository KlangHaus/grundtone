# @grundtone/vue

Vue 3 component library for the [Grundtone](https://grundtone.com) design system.

## Installation

```bash
npm install @grundtone/vue @grundtone/design-system
```

## Usage

```vue
<script setup>
  import { Button, Icon, ThemeProvider } from '@grundtone/vue';
</script>

<template>
  <ThemeProvider>
    <Button variant="primary" size="md">
      <Icon name="check" />
      Confirm
    </Button>
  </ThemeProvider>
</template>
```

## Components

### Button

```vue
<Button variant="primary" size="md">Label</Button>
<Button variant="secondary">Label</Button>
<Button variant="outlined">Label</Button>
```

### Icon

Configurable icon system supporting Heroicons, Lucide, or custom icon sets.

```typescript
import { createHeroiconsConfig, createLucideConfig } from '@grundtone/vue';
```

### ThemeProvider

Provides theme context to child components.

```vue
<ThemeProvider :theme="customTheme">
  <slot />
</ThemeProvider>
```

### ThemeToggle

Toggle between light and dark mode.

```vue
<ThemeToggle />
```

## Nuxt

For Nuxt 3 projects, use [`@grundtone/nuxt`](https://www.npmjs.com/package/@grundtone/nuxt) instead
for automatic component and composable auto-imports.

## Documentation

See [grundtone.com](https://grundtone.com) for full component API, examples, and design guidelines.

## License

MIT
