# Button

Interactive button component with five visual variants, three sizes, and loading/disabled states. All styling is driven by `@grundtone/design-system` tokens.

## Demo

<ButtonDemo />

## Installation

```bash
npm install @grundtone/vue @grundtone/design-system
```

## Usage

```vue
<script setup>
import { GTButton } from '@grundtone/vue';
</script>

<template>
  <GTButton variant="primary" size="md">Submit</GTButton>
</template>
```

## Variants

Five visual styles, each built from design-system semantic color tokens.

### Primary

The default call-to-action. Uses `color('primary')` background with `color('on-primary')` text.

```vue
<GTButton variant="primary">Primary</GTButton>
```

### Secondary

For secondary actions. Uses `color('secondary')` background.

```vue
<GTButton variant="secondary">Secondary</GTButton>
```

### Outlined

Transparent background with a `color('border-medium')` border. Fills on hover with `color('primary')`.

```vue
<GTButton variant="outlined">Outlined</GTButton>
```

### Negative

Destructive actions. Uses `color('error')` background.

```vue
<GTButton variant="negative">Delete</GTButton>
```

### Unstyled

Inherits parent styles. Useful as a base for custom buttons.

```vue
<GTButton variant="unstyled">Custom</GTButton>
```

## Sizes

Three size presets using `space()` and `font-size()` tokens from the design system.

| Size | Font size | Padding |
| ---- | --------- | ------- |
| `sm` | `font-size('sm')` | `space('xs') space('sm')` |
| `md` | `font-size('base')` | `space('sm') space('md')` |
| `lg` | `font-size('lg')` | `space('sm') space('lg')` |

```vue
<GTButton size="sm">Small</GTButton>
<GTButton size="md">Medium</GTButton>
<GTButton size="lg">Large</GTButton>
```

## States

### Disabled

Reduces opacity to 0.5 and sets `cursor: not-allowed`. Sets `aria-disabled` for accessibility.

```vue
<GTButton disabled>Disabled</GTButton>
```

### Loading

Shows a CSS spinner and hides the label. Sets `aria-busy="true"` for screen readers.

```vue
<GTButton loading>Saving...</GTButton>
```

### Block (full width)

Expands to fill the parent container width.

```vue
<GTButton block>Full width</GTButton>
```

## Polymorphic rendering

Render as any HTML element using the `as` prop. Useful for links that look like buttons.

```vue
<GTButton as="a" href="/next-step">Continue</GTButton>
```

## Design System Tokens Used

The Button component uses these `@grundtone/design-system` SCSS tokens:

| Category | Tokens |
| --- | --- |
| **Colors** | `color('primary')`, `color('primary-dark')`, `color('on-primary')`, `color('secondary')`, `color('secondary-dark')`, `color('error')`, `color('error-dark')`, `color('border-medium')`, `color('text')` |
| **Spacing** | `space('xs')`, `space('sm')`, `space('md')`, `space('lg')` |
| **Typography** | `font-size('sm', 'base', 'lg')`, `font-family('base')`, `font-weight('medium')`, `line-height('tight')` |
| **Radius** | `radius('md')`, `radius('full')` |
| **Motion** | `duration('fast')`, `ease('ease-out')` |
| **Focus** | `@include focus` mixin — 3px solid outline with 1px offset |

These tokens are injected globally via Vite's `additionalData` in the Vue package build:

```ts
// packages/vue/vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "path/to/design-system/src/lib.scss" as tokens;`,
    },
  },
},
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'outlined' \| 'negative' \| 'unstyled'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `as` | `string` | `'button'` | HTML element to render |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `block` | `boolean` | `false` | Full-width display |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `click` | `MouseEvent` | Emitted on click (suppressed when disabled or loading) |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Button label content |

## Accessibility

- Native `<button>` element by default — keyboard and screen reader accessible out of the box
- `aria-disabled` set when disabled or loading
- `aria-busy` set during loading state
- `focus-visible` outline uses the design system `focus` mixin
- Click events suppressed when disabled or loading (no `pointer-events: none` hack)

## CSS Classes

All classes are prefixed with `gt-btn` to avoid collisions:

| Class | Description |
| --- | --- |
| `.gt-btn` | Base styles |
| `.gt-btn--{variant}` | Variant modifier |
| `.gt-btn--{size}` | Size modifier |
| `.gt-btn--block` | Full-width |
| `.gt-btn--loading` | Loading state |
| `.gt-btn--disabled` | Disabled state |
| `.gt-btn__content` | Label wrapper |
| `.gt-btn__spinner` | Loading spinner |
