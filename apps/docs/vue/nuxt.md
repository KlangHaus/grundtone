# Nuxt 3 Installation

Install the Nuxt module — it pulls in `@grundtone/vue`, `@grundtone/design-system`, and all dependencies automatically:

```bash
npm install -D @grundtone/nuxt
```

## Module configuration

```ts
// nuxt.config.ts
import { createTheme } from '@grundtone/core';

export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    theme: createTheme({
      light: {
        colors: { primary: '#996600' },
        typography: {
          fontFamily: {
            base: "'Poppins', sans-serif",
            heading: "'DM Sans', sans-serif",
            mono: "'Libre Baskerville', serif",
          },
        },
        radius: { none: '0', xs: '0', sm: '0', md: '0', lg: '0', xl: '0', '2xl': '0', '3xl': '0', full: '9999px' },
      },
      dark: {
        colors: { primary: '#cc9966' },
      },
    }),
  },
});
```

See [Theme Configuration](/guide/theme-configuration) for the full list of overridable tokens.

The module automatically:
- Auto-imports all components with the configured prefix
- Injects the design-system CSS (custom properties and component styles)
- Configures SCSS tokens for component styles

No manual CSS imports or SCSS config needed.

## Use components

Components are auto-imported with the configured prefix — no import statements needed:

```vue
<template>
  <GTButton variant="primary">Submit</GTButton>
  <GTButton variant="outlined" rounded="full">Cancel</GTButton>
</template>
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `prefix` | `string` | `'GT'` | Component name prefix |
| `components` | `boolean` | `true` | Auto-import components |
| `composables` | `boolean` | `true` | Auto-import composables |
| `theme` | `object` | `undefined` | Theme configuration |

## Remove prefix

Set `prefix: ''` to use component names directly:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    prefix: '',
  },
});
```

```vue
<template>
  <Button variant="primary">Submit</Button>
</template>
```

## SCSS tokens in Nuxt

The Nuxt module automatically injects SCSS token config — the `tokens` namespace is available in
all component `<style lang="scss">` blocks without any manual Vite configuration:

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

## What gets auto-imported

The Nuxt module scans these directories from `@grundtone/vue`:

- `atoms/` — Basic components (Button, etc.)
- `molecules/` — Component combinations
- `organisms/` — Complex components

Only components (PascalCase `.vue` files) are imported. Demo files and utilities are excluded.

Composables from `@grundtone/vue/composables` are also auto-imported when `composables: true`.
