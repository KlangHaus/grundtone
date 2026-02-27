# @grundtone/nuxt

[![npm version](https://img.shields.io/npm/v/@grundtone/nuxt.svg?style=flat)](https://www.npmjs.com/package/@grundtone/nuxt)

Nuxt 3 module for seamless Grundtone integration.

## Coming Soon

Documentation for `@grundtone/nuxt` is coming soon.

## Purpose & Intent

The `@grundtone/nuxt` package is a **Nuxt 3 module** that simplifies the integration of Grundtone
into Nuxt applications. Its purpose is to provide **zero-config setup** with automatic component
registration, style importing, and composable availability.

### Key Principles

**Developer Experience First**

- **Auto-import**: Components and composables available without manual imports
- **Type Safety**: Full TypeScript support with auto-generated types
- **SSR Ready**: Server-side rendering support out of the box
- **Zero Config**: Works immediately after installation

**Nuxt Integration Philosophy**

- Follows Nuxt module best practices
- Leverages Nuxt's auto-import system
- Integrates with Nuxt's build pipeline
- Respects Nuxt's configuration conventions

## Installation

```bash
npx nuxi module add @grundtone/nuxt
# or
npm install @grundtone/nuxt
# or
pnpm add @grundtone/nuxt
# or
yarn add @grundtone/nuxt
```

## Architecture

### What This Module Does

1. **Auto-registers** all `@grundtone/vue` components globally
2. **Auto-imports** all `@grundtone/composables` composables
3. **Injects** design token styles automatically
4. **Provides** TypeScript types for Nuxt auto-completion
5. **Configures** SSR-safe component hydration

### Dependencies

```
@grundtone/nuxt
├── @grundtone/vue (Vue 3 components)
├── @grundtone/composables (Vue 3 composables)
└── Nuxt 3 (peer dependency)
```

## Quick Setup

### 1. Install the module

```bash
npx nuxi module add @grundtone/nuxt
```

### 2. Add to nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
});
```

### 3. Use components immediately

```vue
<template>
  <div>
    <!-- No import needed - auto-registered -->
    <Button @click="toggle">Toggle</Button>

    <Modal v-if="isOpen">
      <h2>Modal Content</h2>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  // No import needed - auto-imported
  const [isOpen, toggle] = useToggle(false);
</script>
```

## Design Intent

### Why This Package Exists

**Without this module**, using Grundtone in Nuxt requires:

1. Manual component imports in every file
2. Manual composable imports
3. Manual CSS imports
4. Plugin configuration for global registration
5. TypeScript type declarations

**With this module**:

1. ✅ Zero configuration
2. ✅ Everything auto-imported
3. ✅ Types automatically available
4. ✅ SSR works out of the box

### What Problem It Solves

**Eliminates boilerplate**: No more repetitive imports and configuration across your Nuxt app.

**Improves DX**: Write less code, focus on features instead of setup.

**Ensures consistency**: All developers use the same import strategy.

**Optimizes builds**: Nuxt's auto-import is tree-shakeable and build-optimized.

## Features

### Auto-Import Components

All `@grundtone/vue` components are globally available:

```vue
<template>
  <!-- All these work without imports -->
  <Button variant="primary">Click Me</Button>
  <Card>Card Content</Card>
  <Input v-model="value" label="Name" />
  <Modal v-if="open">Modal Content</Modal>
</template>
```

### Auto-Import Composables

All `@grundtone/composables` composables are available:

```vue
<script setup lang="ts">
  // No imports needed
  const [isOpen, toggle] = useToggle(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { data, loading } = useFetch('/api/users');
</script>
```

### TypeScript Support

Full type inference and auto-completion:

```vue
<script setup lang="ts">
  // TypeScript knows about all components and composables
  const [value, setValue] = useToggle(false);
  //     ^? boolean
</script>

<template>
  <!-- Props are type-checked -->
  <Button variant="primary" size="md" />
  <!--         ^? 'primary' | 'secondary' | 'ghost' -->
</template>
```

### SSR Support

All components are SSR-safe:

- Client-only components marked with `<ClientOnly>`
- Proper hydration handling
- No flash of unstyled content

## Module Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],

  grundtone: {
    // Optional configuration
    prefix: 'Grundtone', // Component prefix (default: none)
    composables: true, // Auto-import composables (default: true)
    styles: true, // Auto-import styles (default: true)
  },
});
```

## Integration with Nuxt Ecosystem

Works seamlessly with:

- **Nuxt Content**: Use Grundtone components in markdown
- **Nuxt I18n**: Components support internationalization
- **Pinia**: State management integration via composables
- **VueUse**: Composables compatible with VueUse patterns

## Development Workflow

1. Install module in Nuxt app
2. Components and composables immediately available
3. Build and deploy - SSR works automatically
4. TypeScript types auto-generated

## Comparison: With vs Without Module

### Without Module

```vue
<script setup lang="ts">
  // Manual imports
  import { Button, Card, Input } from '@grundtone/vue';
  import { useToggle, useMediaQuery } from '@grundtone/composables';

  // Import styles
  import '@grundtone/design-tokens/dist/index.css';

  const [isOpen, toggle] = useToggle(false);
</script>

<template>
  <Button @click="toggle">Toggle</Button>
</template>
```

### With Module

```vue
<script setup lang="ts">
  // No imports needed
  const [isOpen, toggle] = useToggle(false);
</script>

<template>
  <Button @click="toggle">Toggle</Button>
</template>
```

## Documentation

Full documentation coming soon, including:

- Configuration options
- Custom component prefix
- Tree-shaking optimization
- Advanced SSR patterns

In the meantime, explore the source code:

- [View on GitHub](https://github.com/allanasp/grundtone/tree/main/packages/nuxt)
- [View on npm](https://www.npmjs.com/package/@grundtone/nuxt)

## License

MIT
