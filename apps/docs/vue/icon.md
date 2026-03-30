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

Click an icon to copy its name.

<IconGallery />

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

1. Add a 24x24 SVG file to a category folder in `packages/core/src/icons/svg/{category}/`
2. Run `pnpm generate:icons` to regenerate the typed registry
3. Use it immediately: `<GTIcon name="your-icon" />`

Icons are organized by category using subdirectories:

```
packages/core/src/icons/svg/
  action/
    check.svg
    close.svg
    search.svg
  navigation/
    arrow-left.svg
    arrow-right.svg
    menu.svg
  your-category/
    your-icon.svg
```

SVG files placed directly in `svg/` (without a subdirectory) get the `general` category.

SVG conventions:
- ViewBox: `0 0 24 24`
- Stroke-based: `fill="none" stroke="currentColor" stroke-width="1.5"`
- Kebab-case filenames: `my-icon.svg` → `name="my-icon"`

## Using Heroicons

Browse the full set at [heroicons.com](https://heroicons.com), then drop the SVGs you need into the appropriate category folder:

1. Download the outline variant SVG from [heroicons.com](https://heroicons.com)
2. Save it to `packages/core/src/icons/svg/{category}/` (e.g. `action/heart.svg`)
3. Run `pnpm generate:icons`
4. Use it: `<GTIcon name="heart" />`

Heroicons use the same 24x24 grid with `currentColor` strokes, so they work out of the box with no modifications. Only the icons you add are included in your bundle.

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

Classes use the configurable `$prefix` (default `gt`). See [Component Prefix](/guide/prefix) for customization.

| Class | Description |
| --- | --- |
| `.{prefix}-icon` | Base styles |
| `.{prefix}-icon--{size}` | Size modifier |

With the default prefix: `.gt-icon`, `.gt-icon--lg`, etc.

## Design System Tokens Used

| Category | Tokens |
| --- | --- |
| **Icon sizes** | `icon-size('xs')` through `icon-size('2xl')` |
