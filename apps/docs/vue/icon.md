# Icon

SVG icon component with size presets and accessibility support. Renders icons from the `@grundtone/core` icon registry. All styling is driven by `@grundtone/design-system` tokens.

## Demo

<IconDemo />

## Installation

```bash
npm install @grundtone/vue @grundtone/design-system @grundtone/core
```

## Usage

```vue
<script setup>
import { GTIcon } from '@grundtone/vue';
</script>

<template>
  <GTIcon name="check" />
  <GTIcon name="search" size="xl" />
  <GTIcon name="close" size="sm" label="Close dialog" />
</template>
```

## Available Icons

All icons are defined as SVG files in `@grundtone/core` and auto-generated into a typed registry. Add a new SVG to `packages/core/src/icons/svg/` and run `pnpm generate:icons` — it's immediately available in `<GTIcon>`.

| Name | Description |
| --- | --- |
| `arrow-left` | Left arrow |
| `arrow-right` | Right arrow |
| `check` | Checkmark |
| `close` | Close / X |
| `menu` | Hamburger menu |
| `search` | Magnifying glass |

## Sizes

Six size presets using `icon-size()` tokens from the design system. Default is `lg` (24px), matching Heroicons' native grid.

| Size | Dimension |
| --- | --- |
| `xs` | 12px (0.75rem) |
| `sm` | 16px (1rem) |
| `md` | 20px (1.25rem) |
| `lg` | 24px (1.5rem) |
| `xl` | 32px (2rem) |
| `2xl` | 40px (2.5rem) |

```vue
<GTIcon name="check" size="xs" />
<GTIcon name="check" size="sm" />
<GTIcon name="check" size="md" />
<GTIcon name="check" size="lg" />
<GTIcon name="check" size="xl" />
<GTIcon name="check" size="2xl" />
```

## Color inheritance

Icons use `currentColor`, so they inherit the parent's text color:

```vue
<span style="color: var(--color-primary)">
  <GTIcon name="check" />
</span>
<span style="color: var(--color-error)">
  <GTIcon name="close" />
</span>
```

## With buttons

Icons work naturally inside `<GTButton>`:

```vue
<GTButton variant="primary">
  <GTIcon name="check" size="sm" /> Confirm
</GTButton>
<GTButton variant="negative">
  <GTIcon name="close" size="sm" /> Delete
</GTButton>
```

## Adding custom icons

1. Add a 24x24 SVG file to `packages/core/src/icons/svg/` using `currentColor` for stroke/fill
2. Run `pnpm generate:icons` to regenerate the typed registry
3. Use it immediately: `<GTIcon name="your-icon" />`

SVG conventions:
- ViewBox: `0 0 24 24`
- Stroke-based: `fill="none" stroke="currentColor" stroke-width="1.5"`
- Kebab-case filenames: `my-icon.svg` → `name="my-icon"`

## Heroicons (planned)

Heroicons integration is planned as a fallback. Custom icon names always take priority. When available, any Heroicon name will work as a fallback in `<GTIcon>`.

For now, browse the full Heroicons set at [heroicons.com](https://heroicons.com).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Icon name from the registry |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Size preset |
| `label` | `string` | `undefined` | Accessible label |

## Accessibility

- When no `label` is provided: `aria-hidden="true"` — icon is decorative
- When `label` is provided: `role="img"` and `aria-label` are set for screen readers
- Always use `label` when the icon conveys meaning without surrounding text

## CSS Classes

All classes are prefixed with `gt-icon` to avoid collisions:

| Class | Description |
| --- | --- |
| `.gt-icon` | Base styles |
| `.gt-icon--{size}` | Size modifier |

## Design System Tokens Used

| Category | Tokens |
| --- | --- |
| **Icon sizes** | `icon-size('xs')` through `icon-size('2xl')` |
