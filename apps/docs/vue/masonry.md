# Masonry

Vue component for responsive masonry grid layouts. Items are distributed across columns that auto-fill based on container width. For guidelines and design rationale, see the [Design System — Masonry](/web/c-masonry) reference.

---

## Demo

<MasonryDemo />

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<script setup>
  const items = [
    { title: 'First', body: 'Content here' },
    { title: 'Second', body: 'More content' },
    { title: 'Third', body: 'Even more content with extra text' },
  ];
</script>

<template>
  <GTMasonry :items="items">
    <template #default="{ item }">
      <GTCard :title="item.title">
        <p>{{ item.body }}</p>
      </GTCard>
    </template>
  </GTMasonry>
</template>
```

### Custom column width and gap

```vue
<template>
  <GTMasonry :items="items" :gap="16" :column-width="400">
    <template #default="{ item }">
      <GTCard :title="item.title">
        <p>{{ item.body }}</p>
      </GTCard>
    </template>
  </GTMasonry>
</template>
```

### With images (variable height)

Masonry is ideal when items have different heights — such as cards with and without images.

```vue
<template>
  <GTMasonry :items="posts" :gap="24" :column-width="300">
    <template #default="{ item }">
      <GTCard
        :title="item.title"
        :image="item.coverImage"
        :image-alt="item.title"
        variant="bordered"
      >
        <p>{{ item.excerpt }}</p>
      </GTCard>
    </template>
  </GTMasonry>
</template>
```

### SSR columns

Set `ssrColumns` to control the initial column count before client-side layout kicks in. This prevents layout shift on hydration.

```vue
<template>
  <GTMasonry :items="items" :ssr-columns="2">
    <template #default="{ item }">
      <div>{{ item.title }}</div>
    </template>
  </GTMasonry>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `unknown[]` | **required** | Array of items to render |
| `gap` | `number` | `24` | Gap between items in pixels |
| `columnWidth` | `number` | `300` | Minimum column width in pixels |
| `ssrColumns` | `number` | `3` | Number of columns during SSR |
| `ariaLabel` | `string` | `'Masonry-gitter'` | Accessible label for the grid |

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `default` | `{ item: T, index: number }` | Template for each item. Receives the item and its original index. |

---

## Accessibility

- Root element has `role="list"` with `aria-label`
- Each item wrapper has `role="listitem"`
- Keyboard navigation follows natural tab order
- Items maintain their logical order (left-to-right, top-to-bottom) for screen readers

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-masonry` | Root container (flex row) |
| `.gt-masonry__column` | Individual column (flex column) |
| `.gt-masonry__item` | Item wrapper |

---

## How it works

GTMasonry uses a column-based distribution approach:

1. Calculates the number of columns based on container width and `columnWidth`
2. Distributes items across columns using round-robin
3. Uses `ResizeObserver` to recalculate on container resize
4. Falls back to `ssrColumns` during SSR

This produces a true masonry layout without any external dependencies.

---

## Design system

For guidelines, best practices, and references, see the [Design System — Masonry](/web/c-masonry) documentation.
