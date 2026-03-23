# Summary List

Key-value pair display with optional actions. Uses `<dl>` semantics.

## Demo

<SummaryListDemo />

---

## Props — GTSummaryList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'borderless' \| 'card'` | `'default'` | Visual variant |
| `title` | `string` | — | Card title (only with `variant="card"`) |
| `titleTag` | `'h2' \| 'h3' \| 'h4'` | `'h2'` | Heading level for card title |

### Slots — GTSummaryList

| Slot | Description |
|------|-------------|
| `default` | GTSummaryItem components |
| `actions` | Card-level actions (only with `variant="card"`) |

---

## Props — GTSummaryItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Key/label text (required) |
| `action` | `string` | — | Action button text |
| `actionLabel` | `string` | — | Visually hidden action context (e.g. "name") |

### Events — GTSummaryItem

| Event | Payload | Description |
|-------|---------|-------------|
| `action` | — | Action button clicked |

### Slots — GTSummaryItem

| Slot | Description |
|------|-------------|
| `default` | Value content |
| `actions` | Custom action content (overrides `action` prop) |

---

## Usage

### Basic with actions

```vue
<script setup>
import { GTSummaryList, GTSummaryItem } from '@grundtone/vue';
</script>

<template>
  <GTSummaryList>
    <GTSummaryItem label="Navn" action="Redigér" action-label="navn">
      Alice Jensen
    </GTSummaryItem>
    <GTSummaryItem label="Email" action="Redigér" action-label="email">
      alice@example.com
    </GTSummaryItem>
  </GTSummaryList>
</template>
```

### Card variant

```vue
<GTSummaryList variant="card" title="Kontaktoplysninger">
  <GTSummaryItem label="Navn" action="Redigér" action-label="navn">
    Alice Jensen
  </GTSummaryItem>
  <GTSummaryItem label="Telefon">
    +45 12 34 56 78
  </GTSummaryItem>
</GTSummaryList>
```

### Read-only (no actions)

```vue
<GTSummaryList>
  <GTSummaryItem label="CPR">010190-1234</GTSummaryItem>
  <GTSummaryItem label="Nationalitet">Dansk</GTSummaryItem>
</GTSummaryList>
```

---

## CSS classes

See [Design System Summary List reference](/web/c-summary-list) for all available CSS classes.
