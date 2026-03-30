# Search Field

Combined search input and submit button with optional autocomplete suggestions.

## Demo

<SearchFieldDemo />

## Installation

```vue
<script setup>
import { GTSearchField } from '@grundtone/vue';
</script>
```

In Nuxt, `GTSearchField` is auto-imported.

## When to use

Use when users need to search for content by keyword. Minimum 27 characters wide.

Do not use on single-page sites or where search is unnecessary.

## Usage

### Basic

```vue
<GTSearchField v-model="query" @submit="search" />
```

### Large

```vue
<GTSearchField v-model="query" size="lg" placeholder="Søg i dokumentation..." />
```

### With suggestions

```vue
<GTSearchField
  v-model="query"
  :suggestions="filteredResults"
  @submit="search"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Search query (v-model) |
| `placeholder` | `string` | `'Søg...'` | Placeholder text |
| `label` | `string` | `'Søg'` | Accessible label (sr-only) |
| `buttonLabel` | `string` | `'Søg'` | Submit button label |
| `size` | `'md' \| 'lg'` | `'md'` | Size preset |
| `disabled` | `boolean` | `false` | Disabled state |
| `id` | `string` | auto | HTML id |
| `suggestions` | `SearchSuggestion[]` | — | Autocomplete suggestions |
| `loading` | `boolean` | `false` | Loading state |
| `minChars` | `number` | `2` | Min chars before suggestions |
| `noResultsText` | `string` | `'Ingen resultater'` | Empty state text |

### SearchSuggestion

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | Submitted value |
| `label` | `string` | Display text |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Input change |
| `submit` | `string` | Search submitted (enter or button click) |

## Accessibility

- `<form role="search">` wrapper
- Visually hidden label
- `type="search"` + `inputmode="search"`
- Arrow keys navigate suggestions
- Enter selects highlighted suggestion or submits
- Escape closes suggestions

See [Search Field (Design System)](/web/c-search-field) for full CSS reference.
