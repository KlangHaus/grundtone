# Nuxt 3 Installation

Install the Nuxt module — it pulls in `@grundtone/vue` and its dependencies automatically:

```bash
npm install -D @grundtone/nuxt
```

## Module configuration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    prefix: 'GT',        // Component name prefix (default)
    components: true,     // Auto-import components (default)
    composables: true,    // Auto-import composables (default)
  },
});
```

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

To use design-system tokens in your own SCSS, configure Vite in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@grundtone/design-system/scss/lib" as tokens;`,
        },
      },
    },
  },
});
```

Then use tokens in any component:

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
