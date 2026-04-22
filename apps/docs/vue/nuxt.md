# Nuxt Installation

Install the Nuxt module:

```bash
npm install @grundtone/nuxt
```

That's it. The module pulls in `@grundtone/vue` and all dependencies automatically.

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
          },
        },
      },
      dark: {
        colors: { primary: '#cc9966' },
      },
    }),
  },
});
```

See [Theme Configuration](/guide/theme-configuration) for all available tokens.

## Use components

Components are auto-imported — no import statements needed:

```vue
<template>
  <GTButton variant="primary">Submit</GTButton>
  <GTCard title="My card" variant="raised">
    <p>Card content</p>
  </GTCard>
</template>
```

## How CSS works

Component CSS is auto-imported via ESM side effects. When Nuxt auto-imports `GTButton`, the button's CSS follows automatically. Unused components are tree-shaken from both JS and CSS.

No manual CSS imports needed for components.

## Utility classes (optional)

If your templates use Grundtone utility classes (`.flex`, `.grid-cols-3`, `.m-4`, etc.), add the utilities bundle to your CSS:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '@grundtone/vue/css/utilities',
    '~/assets/scss/global.scss',
  ],
});
```

## SCSS tokens

The module automatically injects SCSS token config. The `tokens` namespace is available in all `<style lang="scss">` blocks without any manual Vite configuration:

```vue
<style lang="scss">
.my-card {
  background: tokens.color('surface');
  padding: tokens.space('md');
  border-radius: tokens.radius('lg');
}
</style>
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefix` | `string` | `'GT'` | Component name prefix |
| `components` | `boolean` | `true` | Auto-import components |
| `composables` | `boolean` | `true` | Auto-import composables |
| `theme` | `object` | `undefined` | Theme configuration via `createTheme()` |

## What gets auto-imported

**Components:** All atoms, molecules, and organisms from `@grundtone/vue` with the configured prefix.

**Composables:** `useTheme`, `useField`, `useDateField`, `useFormValidation`, `useDawaAutocomplete`, `useToast`.

**Validators:** `required`, `email`, `phone`, `cpr`, `cvr`, `date`, `datePast`, `dateFuture`, `minLength`, `maxLength`, `pattern`, `url`, `composeValidators`.
