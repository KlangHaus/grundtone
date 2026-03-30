# Vue Icon Component

SVG icon component with size presets and accessibility support. Works with any icon library that follows the `IconDefinition` contract.

## Demo

<IconDemo />

## Setup

### 1. Provide the icon registry

Register your icon library once at app startup:

::: code-group
```ts [Vue 3]
import { createApp } from 'vue';
import { GT_ICON_REGISTRY_KEY } from '@grundtone/vue';
import { iconRegistry } from '@grundtone/icons';

const app = createApp(App);
app.provide(GT_ICON_REGISTRY_KEY, iconRegistry);
app.mount('#app');
```
```ts [Nuxt 3 (plugin)]
// plugins/icons.ts
import { iconRegistry } from '@grundtone/icons';
import { GT_ICON_REGISTRY_KEY } from '@grundtone/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(GT_ICON_REGISTRY_KEY, iconRegistry);
});
```
:::

### 2. Use the component

```vue
<script setup>
import { GTIcon } from '@grundtone/vue';
</script>

<template>
  <!-- By name (from provided registry) -->
  <GTIcon name="check" />
  <GTIcon name="search" size="xl" />

  <!-- Direct icon definition (no registry needed) -->
  <GTIcon :icon="{ body: '<path d=\"M5 13l4 4L19 7\"/>', viewBox: '0 0 24 24' }" />
</template>
```

In Nuxt, `GTIcon` is auto-imported — no explicit import needed.

## Sizes

```vue
<GTIcon name="check" size="xs" />
<GTIcon name="check" size="sm" />
<GTIcon name="check" size="md" />
<GTIcon name="check" size="lg" />
<GTIcon name="check" size="xl" />
<GTIcon name="check" size="2xl" />
```

## Color

Icons inherit `currentColor` by default:

```vue
<span style="color: var(--color-primary)">
  <GTIcon name="check" />
</span>
```

Or override explicitly:

```vue
<GTIcon name="check" color="#10b981" />
```

## With Buttons

```vue
<GTButton variant="primary">
  <GTIcon name="check" size="sm" /> Confirm
</GTButton>
<GTButton variant="negative">
  <GTIcon name="close" size="sm" /> Delete
</GTButton>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `IconDefinition` | — | Direct icon data (takes precedence over `name`) |
| `name` | `string` | — | Icon name from the provided registry |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Size preset |
| `label` | `string` | `undefined` | Accessible label |
| `color` | `string` | `undefined` | Override icon color |

## Accessibility

- No `label`: `aria-hidden="true"` — icon is decorative
- With `label`: `role="img"` and `aria-label` are set for screen readers
- Always use `label` when the icon conveys meaning without surrounding text

## CSS Classes

Classes use the configurable `$prefix` (default `gt`). See [Component Prefix](/guide/prefix) for customization.

| Class | Description |
| --- | --- |
| `.{prefix}-icon` | Base styles |
| `.{prefix}-icon--{size}` | Size modifier |
