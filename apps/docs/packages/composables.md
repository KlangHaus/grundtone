# @grundtone/composables

[![npm version](https://img.shields.io/npm/v/@grundtone/composables.svg?style=flat)](https://www.npmjs.com/package/@grundtone/composables)

Vue 3 Composition API utilities and composables for Grundtone.

## Coming Soon

Documentation for `@grundtone/composables` is coming soon.

## Purpose & Intent

The `@grundtone/composables` package is the **stateful logic layer** for Vue 3 applications. Its
purpose is to provide **reusable, reactive utilities** that encapsulate common UI patterns and
behaviors, allowing you to build features faster without writing repetitive state management code.

### Key Principles

**Composition Over Inheritance**

- Small, focused composables that do one thing well
- Composables can be combined for complex behavior
- No rigid component hierarchies

**Reactive by Design**

- Built on Vue 3's Composition API
- Reactive refs and computed values
- Automatic cleanup and lifecycle management

**Framework-Aligned**

- Follows Vue 3 naming conventions (`useSomething`)
- Integrates with Vue's reactivity system
- Works with Nuxt, Vite, and any Vue 3 setup

**Developer Experience**

- TypeScript-first with full type inference
- Clear, self-documenting function signatures
- Minimal configuration required

## Installation

```bash
npm install @grundtone/composables
# or
pnpm add @grundtone/composables
# or
yarn add @grundtone/composables
```

## Overview

The `@grundtone/composables` package provides Vue 3 composables for:

- **UI State**: Loading states, toggles, modals
- **Forms**: Form validation, input handling
- **Media Queries**: Responsive breakpoint detection
- **Event Handling**: Click outside, keyboard shortcuts
- **Data Fetching**: Async data management
- **DOM Utilities**: Element refs, scroll detection

## Quick Usage

```vue
<script setup lang="ts">
  import { useToggle, useMediaQuery, useClickOutside } from '@grundtone/composables';

  // Toggle state
  const [isOpen, toggle] = useToggle(false);

  // Responsive breakpoints
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Click outside detection
  const elementRef = ref<HTMLElement>();
  useClickOutside(elementRef, () => {
    console.log('Clicked outside');
  });
</script>
```

## Features

### State Management

- `useToggle` - Boolean state toggling
- `useLoading` - Loading state management
- `useModal` - Modal open/close state

### Responsive Design

- `useMediaQuery` - CSS media query matching
- `useBreakpoint` - Design system breakpoint detection
- `useWindowSize` - Window dimensions tracking

### DOM & Events

- `useClickOutside` - Detect clicks outside element
- `useKeyPress` - Keyboard shortcut handling
- `useEventListener` - Event listener management
- `useScroll` - Scroll position tracking

### Forms

- `useForm` - Form state and validation
- `useFormField` - Individual field management
- `useValidation` - Custom validation rules

## Documentation

Full documentation coming soon. In the meantime, explore the source code:

- [View on GitHub](https://github.com/allanasp/grundtone/tree/main/packages/composables)
- [View on npm](https://www.npmjs.com/package/@grundtone/composables)

## License

MIT
