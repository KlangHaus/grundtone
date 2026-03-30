# Tag

Interactive metadata element for categories, filters, and keywords. For static status indicators, use [Badge](/vue/badge) instead.

> **Pill** is a visual style — use GTBadge (already rounded).
> **Chip** is an interactive metadata element — use GTTag.

## Demo

<TagDemo />

## Installation

```vue
<script setup>
import { GTTag } from '@grundtone/vue';
</script>
```

In Nuxt, `GTTag` is auto-imported.

## When to use

Use for secondary metadata: categories, filters, keywords. Do not use for primary actions or navigation.

## Usage

### Display (metadata)

```vue
<GTTag label="Design" />
<GTTag label="Tilgængelighed" />
<GTTag label="Frontend" />
```

### Dismissible

```vue
<GTTag label="Vue 3" value="vue" dismissible @dismiss="removeFilter" />
```

### Selectable (filter)

```vue
<GTTag
  v-for="filter in filters"
  :key="filter.key"
  :label="filter.label"
  :selected="filter.active"
  @update:selected="filter.active = $event"
/>
```

### With icon

```vue
<GTTag label="Verified" icon="check" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Display text (required) |
| `value` | `string` | — | Value emitted on events |
| `icon` | `string` | — | Icon name |
| `dismissible` | `boolean` | `false` | Show × button |
| `selected` | `boolean` | `false` | Selected state (v-model:selected) |
| `size` | `'sm' \| 'md'` | `'md'` | Size preset |
| `disabled` | `boolean` | `false` | Disabled state |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `string \| undefined` | Tag clicked |
| `dismiss` | `string \| undefined` | × button clicked |
| `update:selected` | `boolean` | Selected state toggled |

## Accessibility

- Focusable, keyboard-activatable (Enter/Space)
- `role="option"` + `aria-selected` for selectable tags
- Dismiss button has descriptive `aria-label`

See [Tag (Design System)](/web/c-tag) for full CSS reference.
