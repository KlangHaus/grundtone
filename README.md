# Grundtone

A design token-driven design system for Vue 3, Nuxt 3, and React Native. Self-hosted, open source,
and built for teams that need full control over their UI foundation.

[![npm version](https://img.shields.io/npm/v/@grundtone/core?label=%40grundtone%2Fcore&color=1a1a1a)](https://www.npmjs.com/package/@grundtone/core)
[![license](https://img.shields.io/npm/l/@grundtone/core?color=1a1a1a)](./LICENSE)

**[Documentation](https://grundtone.com)** | **[npm](https://www.npmjs.com/org/grundtone)**

---

## Packages

| Package                                                | Description                                                    |
| ------------------------------------------------------ | -------------------------------------------------------------- |
| [`@grundtone/core`](./packages/core)                   | Theme system, config, types, branding, icon registry           |
| [`@grundtone/design-system`](./packages/design-system) | SCSS tokens, utilities, components, CSS + vanilla JS behaviors |
| [`@grundtone/utils`](./packages/utils)                 | Validation, formatting, ID generation                          |
| [`@grundtone/icons`](./packages/icons)                 | SVG icon registry (auto-generated)                             |
| [`@grundtone/vue`](./packages/vue)                     | Vue 3 component library (17 components, 5 composables)         |
| [`@grundtone/nuxt`](./packages/nuxt)                   | Nuxt 3 module with auto-imports                                |
| [`@grundtone/react-native`](./packages/react-native)   | React Native theme provider and hooks                          |

### Apps

| App                                                        | Description                               |
| ---------------------------------------------------------- | ----------------------------------------- |
| [`apps/docs`](./apps/docs)                                 | VitePress documentation site              |
| [`apps/playground/vue`](./apps/playground/vue)             | Vue 3 playground (blog, shop, components) |
| [`apps/playground/nuxt`](./apps/playground/nuxt)           | Nuxt 3 playground                         |
| [`apps/playground/html-test`](./apps/playground/html-test) | Plain HTML playground (no framework)      |
| [`apps/playground/expo`](./apps/playground/expo)           | React Native / Expo playground            |

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
pnpm build           # Build all packages + apps
pnpm test            # Run all tests
```

### Root commands

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `pnpm build`          | Build all packages and apps       |
| `pnpm build:packages` | Build only `packages/*`           |
| `pnpm dev`            | Start all dev servers in parallel |
| `pnpm test`           | Run all tests                     |
| `pnpm test:watch`     | Run tests in watch mode           |
| `pnpm test:coverage`  | Run tests with coverage           |
| `pnpm lint`           | Lint all packages                 |
| `pnpm typecheck`      | TypeScript type checking          |
| `pnpm format`         | Format all files with Prettier    |
| `pnpm clean`          | Remove dist, node_modules, .turbo |

### Per-package commands

```bash
# Build a specific package
pnpm --filter @grundtone/vue build
pnpm --filter @grundtone/design-system build
pnpm --filter @grundtone/utils build
pnpm --filter @grundtone/core build
pnpm --filter @grundtone/icons build
pnpm --filter @grundtone/nuxt build
pnpm --filter @grundtone/react-native build

# Run tests
pnpm --filter @grundtone/vue test        # Vue component tests (Vitest)
pnpm --filter @grundtone/utils test      # Validator/utility tests
pnpm --filter @grundtone/nuxt test       # Nuxt module tests

# Watch mode
pnpm --filter @grundtone/vue dev
pnpm --filter @grundtone/design-system dev

# Generate
pnpm --filter @grundtone/icons generate:icons           # Regenerate icon registry
pnpm --filter @grundtone/design-system generate:tokens   # Regenerate SCSS token defaults
```

### Docs

| Command             | Description               |
| ------------------- | ------------------------- |
| `pnpm docs:dev`     | Start docs dev server     |
| `pnpm docs:build`   | Build docs for production |
| `pnpm docs:preview` | Preview docs build        |

### Playground apps

```bash
# Vue playground (Vite SPA — blog, shop, component demos)
pnpm --filter @grundtone/vue-playground dev

# Nuxt playground (auto-imported components)
pnpm --filter @grundtone/nuxt-playground dev

# HTML playground (plain HTML + CSS, no framework)
pnpm --filter @grundtone/html-test dev

# Expo playground (React Native)
pnpm --filter @grundtone/expo-playground dev
```

### Changesets & release

| Command                 | Description                     |
| ----------------------- | ------------------------------- |
| `pnpm changeset`        | Create a new changeset          |
| `pnpm changeset:status` | View pending changesets         |
| `pnpm version-packages` | Apply changesets, bump versions |
| `pnpm release`          | Build + publish to npm          |
| `pnpm release:snapshot` | Publish snapshot release        |

## Contributing

```bash
git clone https://github.com/grundtone/grundtone.git
cd grundtone
pnpm install
pnpm build:packages
pnpm --filter @grundtone/vue-playground dev
```

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## License

MIT
