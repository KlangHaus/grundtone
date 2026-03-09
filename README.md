# Grundtone

A design token-driven design system for Vue 3, Nuxt 3, and React Native. Self-hosted, open source,
and built for teams that need full control over their UI foundation.

[![npm version](https://img.shields.io/npm/v/@grundtone/core?label=%40grundtone%2Fcore&color=1a1a1a)](https://www.npmjs.com/package/@grundtone/core)
[![license](https://img.shields.io/npm/l/@grundtone/core?color=1a1a1a)](./LICENSE)

**[Documentation](https://grundtone.com)** | **[npm](https://www.npmjs.com/org/grundtone)**

---

## Packages

| Package                                                | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ |
| [`@grundtone/core`](./packages/core)                   | Theme system, types, and presets                       |
| [`@grundtone/design-system`](./packages/design-system) | SCSS functions, mixins, CSS utilities, and grid system |
| [`@grundtone/utils`](./packages/utils)                 | Formatting and validation utilities                    |
| [`@grundtone/vue`](./packages/vue)                     | Vue 3 component library                                |
| [`@grundtone/nuxt`](./packages/nuxt)                   | Nuxt 3 module with auto-imports                        |
| [`@grundtone/react-native`](./packages/react-native)   | React Native theme provider and hooks                  |

All packages are versioned together and published to npm under the `@grundtone` scope.

## Quick start

### Vue 3

```bash
npm install @grundtone/vue @grundtone/design-system
```

```vue
<script setup>
  import { Button } from '@grundtone/vue';
</script>

<template>
  <Button variant="primary">Submit</Button>
</template>
```

### Nuxt 3

```bash
npm install -D @grundtone/nuxt
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
});
```

Components and composables are auto-imported.

### Design tokens (any framework)

```bash
npm install @grundtone/design-system
```

```scss
@use '@grundtone/design-system/scss' as tokens;

.card {
  color: tokens.color('primary');
  padding: tokens.units(3);
  box-shadow: tokens.shadow('medium');
}
```

### React Native

```bash
npm install @grundtone/react-native @grundtone/core
```

```tsx
import { GrundtoneThemeProvider } from '@grundtone/react-native';
import { createTheme } from '@grundtone/core';

const { light, dark } = createTheme({
  /* ... */
});

export default function App() {
  return (
    <GrundtoneThemeProvider light={light} dark={dark}>
      <RootNavigator />
    </GrundtoneThemeProvider>
  );
}
```

## Architecture

```
core                 Theme types, createTheme(), presets
 ├── design-system   SCSS/CSS layer for web
 ├── shared          Formatting & validation utilities
 ├── react-native    RN theme provider & hooks
 ├── composables     Vue 3 composition hooks
 ├── vue             Vue 3 components
 └── nuxt            Nuxt 3 module (auto-imports vue + composables)
```

## Development

Requires Node.js >= 24 and pnpm 10.

```bash
pnpm install
pnpm build
pnpm test
pnpm docs:dev        # Start docs at localhost
```

## Contributing

```bash
git clone https://github.com/grundtone/grundtone.git
cd grundtone
pnpm install
pnpm dev
```

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## License

MIT
