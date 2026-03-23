# Table

Data table component with sorting, selection, and responsive stacking.

## Demo

<TableDemo />

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | — | Column definitions (required) |
| `rows` | `Record<string, unknown>[]` | — | Row data (required) |
| `variant` | `'default' \| 'borderless' \| 'zebra'` | `'default'` | Visual variant |
| `density` | `'normal' \| 'compact' \| 'extra-compact'` | `'normal'` | Row density |
| `responsive` | `boolean` | `false` | Stack rows on mobile |
| `selectable` | `boolean` | `false` | Show checkbox column |
| `modelValue` | `number[]` | `[]` | Selected row indices (v-model) |
| `caption` | `string` | — | Table caption for accessibility |
| `captionVisible` | `boolean` | `false` | Show caption visually |
| `sortBy` | `string` | — | Controlled sort column (v-model:sortBy) |
| `sortDirection` | `'asc' \| 'desc'` | — | Controlled sort direction (v-model:sortDirection) |
| `striped` | `boolean` | `false` | Shorthand for `variant="zebra"` |

### TableColumn

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Data property key |
| `label` | `string` | Column header text |
| `numeric` | `boolean` | Right-align and use tabular-nums |
| `sortable` | `boolean` | Enable sorting on this column |
| `width` | `string` | Fixed CSS width |

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number[]` | Selected row indices changed |
| `update:sortBy` | `string` | Sort column changed |
| `update:sortDirection` | `'asc' \| 'desc'` | Sort direction changed |

---

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `#cell-{key}` | `{ row, value }` | Custom cell content for a column |

### Example: Custom cell with Badge

```vue
<GTTable :columns="columns" :rows="rows">
  <template #cell-status="{ value }">
    <GTBadge :variant="value === 'active' ? 'success' : 'neutral'" size="sm" dot>
      {{ value }}
    </GTBadge>
  </template>
</GTTable>
```

---

## Usage

### Basic

```vue
<script setup>
import { GTTable } from '@grundtone/vue';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'salary', label: 'Salary', numeric: true, sortable: true },
];

const rows = [
  { name: 'Alice', role: 'Designer', salary: 42000 },
  { name: 'Bob', role: 'Developer', salary: 48000 },
];
</script>

<template>
  <GTTable :columns="columns" :rows="rows" caption="Team members" />
</template>
```

### Selectable with v-model

```vue
<script setup>
import { ref } from 'vue';
import { GTTable } from '@grundtone/vue';

const selected = ref<number[]>([]);
</script>

<template>
  <GTTable
    v-model="selected"
    :columns="columns"
    :rows="rows"
    selectable
  />
  <p>{{ selected.length }} selected</p>
</template>
```

---

## CSS classes

See [Design System Table reference](/web/c-table) for all available CSS classes and variants.
