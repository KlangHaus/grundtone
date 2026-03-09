# @grundtone/nuxt

Nuxt 3 module for the [Grundtone](https://grundtone.com) design system. Auto-imports components from
`@grundtone/vue`, including components and composables.

## Installation

```bash
npm install -D @grundtone/nuxt
```

## Setup

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
  grundtone: {
    prefix: 'Grundtone', // component prefix (default)
  },
});
```

Components and composables are available globally without imports:

```vue
<template>
  <GrundtoneButton variant="primary">Submit</GrundtoneButton>
</template>

<script setup>
  const { theme, isDark } = useTheme();
</script>
```

## Options

| Option        | Type      | Default       | Description             |
| ------------- | --------- | ------------- | ----------------------- |
| `components`  | `boolean` | `true`        | Auto-import components  |
| `composables` | `boolean` | `true`        | Auto-import composables |
| `prefix`      | `string`  | `'Grundtone'` | Component name prefix   |

## Documentation

See [grundtone.com](https://grundtone.com) for full setup guide and configuration options.

## License

MIT
