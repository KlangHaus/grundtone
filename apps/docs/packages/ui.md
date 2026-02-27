# @grundtone/ui

[![npm version](https://img.shields.io/npm/v/@grundtone/ui.svg?style=flat)](https://www.npmjs.com/package/@grundtone/ui)

Vue 3 component library for Grundtone following atomic design principles.

## Coming Soon

Documentation for `@grundtone/ui` is coming soon.

## Purpose & Intent

The `@grundtone/ui` package is the **component implementation layer** of Grundtone. Its purpose is
to provide production-ready, accessible, and tested Vue 3 components that implement the design
system defined by `@grundtone/design-tokens`.

### Key Principles

**Atomic Design Architecture**

Components are organized hierarchically following atomic design methodology:

- **Atoms**: Basic UI building blocks (Button, Input, Icon, Label)
- **Molecules**: Simple component combinations (FormField, Card, Alert)
- **Organisms**: Complex, feature-rich components (Header, DataTable, Modal)
- **Templates**: Page layouts with placeholder content
- **Pages**: Complete page implementations with real data

**Component Philosophy**

- **Composable**: Components work together seamlessly
- **Accessible**: WCAG 2.1 AA compliance built-in
- **Tested**: Unit and accessibility tests for all components
- **Type-safe**: Full TypeScript support with exported types
- **Framework-agnostic data**: Works with any state management solution

## Installation

```bash
npm install @grundtone/ui vue
# or
pnpm add @grundtone/ui vue
# or
yarn add @grundtone/ui vue
```

## Architecture

### Dependencies

```
@grundtone/ui
├── @grundtone/core (base styles)
├── @grundtone/shared (utilities)
└── Vue 3 (peer dependency)
```

The UI package **depends on** design tokens and core styles but remains **independent** of any
specific state management or routing solution.

### Component Structure

Each component follows a consistent structure:

```
ComponentName/
├── ComponentName.vue        # Implementation with <script setup>
├── ComponentName.test.ts    # Vitest unit tests
├── ComponentName.scss       # Component-specific styles (optional)
├── types.ts                # TypeScript interfaces
├── index.ts                # Named exports
└── README.md               # Component documentation
```

## Quick Usage

```vue
<script setup lang="ts">
  import { Button, Input, Card } from '@grundtone/ui';
</script>

<template>
  <Card>
    <h2>Login</h2>
    <Input v-model="email" type="email" label="Email" />
    <Input v-model="password" type="password" label="Password" />
    <Button @click="handleLogin">Sign In</Button>
  </Card>
</template>
```

## Design Intent

### Why This Package Exists

`@grundtone/ui` bridges the gap between **design tokens** (abstract values) and **application UI**
(concrete components). It provides:

1. **Consistency**: All components use the same design tokens
2. **Accessibility**: Built-in ARIA support and keyboard navigation
3. **Developer Experience**: TypeScript types, props validation, slot documentation
4. **Testing**: Pre-tested components reduce QA burden
5. **Atomic Composition**: Build complex UIs from simple building blocks

### What Problem It Solves

Without a component library, every team/developer implements buttons, forms, and modals differently,
leading to:

- Inconsistent UX across the application
- Duplicated component code
- Accessibility gaps
- High maintenance cost

`@grundtone/ui` solves this by providing **one canonical implementation** of each component pattern.

## Component Categories

### Atoms (Basic Elements)

Single-purpose, indivisible components:

- Button, Input, Checkbox, Radio, Select
- Icon, Avatar, Badge, Spinner
- Link, Text, Heading

### Molecules (Simple Combinations)

Components combining multiple atoms:

- FormField (Label + Input + Error)
- Card (Container with optional header/footer)
- Alert (Icon + Message + Close button)
- Breadcrumb, Pagination, Tag

### Organisms (Complex Components)

Feature-rich, self-contained components:

- Header (Navigation + Logo + Actions)
- DataTable (Sorting + Filtering + Pagination)
- Modal (Overlay + Dialog + Actions)
- Form (Validation + Submission + Error handling)

### Templates (Page Layouts)

Structural layouts for pages:

- DashboardLayout (Sidebar + Header + Content)
- AuthLayout (Centered form with branding)
- ContentLayout (Article-style content)

## Integration with Design System

```vue
<script setup lang="ts">
  import { Button } from '@grundtone/ui';
  import type { ColorToken } from '@grundtone/design-tokens';

  // Components use design tokens internally
  // No need to manually apply token values
</script>

<template>
  <!-- Button automatically uses $color-primary from design tokens -->
  <Button variant="primary">Primary Action</Button>

  <!-- Spacing utilities from design tokens work with components -->
  <Button class="mt-4">Button with margin</Button>
</template>
```

## Development Workflow

1. **Design tokens** define values (colors, spacing, etc.)
2. **Core package** provides base styles and reset
3. **UI components** implement the visual design
4. **Applications** compose components into features
5. **Nuxt module** simplifies Vue/Nuxt integration

## Documentation

Full component documentation coming soon, including:

- Component API (props, events, slots)
- Usage examples for each component
- Accessibility features
- Customization options
- Interactive demos in documentation

In the meantime, explore the source code:

- [View on GitHub](https://github.com/allanasp/grundtone/tree/main/packages/ui)
- [View on npm](https://www.npmjs.com/package/@grundtone/ui)

## License

MIT
