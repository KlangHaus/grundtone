# 🛠 Development Guide

This guide provides detailed information for developing the Grundtone Design System.

## 📦 Monorepo Architecture

### Package Structure

```
grundtone/
├── packages/              # Core packages
│   ├── ui/               # Vue components
│   ├── core/             # Types and constants
│   ├── shared/           # Utilities and helpers
│   ├── composables/      # Vue composables
│   ├── design-tokens/    # Design tokens
│   └── nuxt/             # Nuxt module
├── apps/                 # Demo applications
├── apps/docs/            # VitePress documentation
└── docs/                 # Additional documentation
```

### Package Dependencies

```mermaid
graph TD
    UI[ui] --> CORE[core]
    UI --> SHARED[shared]
    UI --> TOKENS[design-tokens]
    COMPOSABLES[composables] --> CORE
    NUXT[nuxt] --> UI
    NUXT --> COMPOSABLES
    PLAYGROUND[playground] --> UI
    PLAYGROUND --> COMPOSABLES
```

## 🎨 Component Development

### Atomic Design Structure

Components follow atomic design principles:

- **Atoms** - Basic building blocks (Button, Input, Icon)
- **Molecules** - Simple component groups (FormField, Card)
- **Organisms** - Complex components (Header, Form)
- **Templates** - Page-level layouts
- **Pages** - Complete page examples

### Creating a Component

#### 1. Component File Structure

```
packages/vue/src/atoms/ComponentName/
├── ComponentName.vue        # Component implementation
├── ComponentName.test.ts    # Unit tests
├── ComponentName.scss       # Styles (optional)
├── types.ts                # TypeScript types
└── index.ts                # Export file
```

#### 2. Component Template

```vue
<!-- ComponentName.vue -->
<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { ComponentNameProps } from './types';

  const props = withDefaults(defineProps<ComponentNameProps>(), {
    variant: 'primary',
    size: 'md',
  });

  const classes = computed(() => [
    'grundtone-component-name',
    `grundtone-component-name--${props.variant}`,
    `grundtone-component-name--${props.size}`,
  ]);
</script>

<style lang="scss" scoped>
  @import './ComponentName.scss';
</style>
```

#### 3. Types Definition

```typescript
// types.ts
export interface ComponentNameProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
```

#### 4. Unit Tests

```typescript
// ComponentName.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ComponentName from './ComponentName.vue';

describe('ComponentName', () => {
  it('renders properly', () => {
    const wrapper = mount(ComponentName, {
      props: {
        variant: 'primary',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for specific package
pnpm test --filter=@grundtone/vue
```

### Test Structure

- Unit tests: Test individual components in isolation
- Integration tests: Test component interactions
- Visual documentation: VitePress for design system docs

## 📏 Code Standards

### TypeScript

- Strict mode enabled
- Use explicit types (avoid `any`)
- Export types from `types.ts` files
- Use `interface` for object types

### Vue 3

- Use Composition API with `<script setup>`
- Props should have TypeScript interfaces
- Use `computed` for reactive derived state
- Emit events with proper TypeScript types

### Styling

- Use SCSS for component styles
- Follow BEM naming convention
- Scope styles with `scoped` attribute
- Use design tokens from `@grundtone/design-tokens`

### Git Workflow

1. Create feature branch from `develop`
2. Make changes and commit with conventional commits
3. Push and create PR to `develop`
4. After review, merge to `develop`
5. Periodically merge `develop` to `main` for releases

### Commit Convention

```
feat: add new button variant
fix: resolve click handler issue
docs: update component documentation
style: format code
refactor: simplify button logic
test: add unit tests for button
chore: update dependencies
```

## 🚀 Build & Release

### Building Packages

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build --filter=@grundtone/vue

# Build in watch mode
pnpm dev
```

### Release Process

1. Ensure all tests pass
2. Update version in package.json
3. Update CHANGELOG.md
4. Create git tag
5. Push to main branch
6. GitHub Actions will publish to npm

## 🔧 Tooling

### VS Code Extensions

- Volar (Vue Language Features)
- TypeScript Vue Plugin
- ESLint
- Prettier
- SCSS IntelliSense

### Useful Commands

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Type check
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### PR Guidelines

- Include tests for new features
- Update documentation
- Follow code standards
- Ensure CI passes

## 🐛 Debugging

### Common Issues

**Issue**: TypeScript errors

- Run `pnpm typecheck`
- Check for missing types
- Ensure proper imports

**Issue**: Build failures

- Clean node_modules: `pnpm clean && pnpm install`
- Check for circular dependencies
- Verify package.json exports

## 📈 Performance

### Best Practices

- Use dynamic imports for large components
- Implement proper tree-shaking
- Minimize bundle size
- Use CSS custom properties for theming
- Lazy load heavy dependencies

### Monitoring

- Check bundle sizes with `pnpm build`
- Monitor component render times
- Use Vue DevTools for debugging
