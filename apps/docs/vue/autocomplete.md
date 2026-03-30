# Autocomplete

Input field with dropdown suggestion list. Follows the ARIA combobox pattern for full keyboard and screen reader support.

---

## Demo

<AutocompleteDemo />

---

## When to use

- User needs to select from a large set of options (more than 15)
- Options can be filtered by typing
- Free text input combined with suggestions (e.g. search, address lookup)

## When not to use

- 5–15 fixed options — use [Select](/vue/select)
- Fewer than 5 options — use radio buttons
- Multiple selections — use checkboxes

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

```vue
<script setup>
  import { ref } from 'vue';
  const query = ref('');
  const suggestions = ref([]);

  function onSearch(q) {
    suggestions.value = myData.filter(item =>
      item.label.toLowerCase().includes(q.toLowerCase())
    );
  }
</script>

<template>
  <GTAutocomplete
    v-model="query"
    :suggestions="suggestions"
    label="Search"
    placeholder="Type to search..."
    @search="onSearch"
    @select="handleSelect"
  />
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | Input text (v-model) |
| `suggestions` | `AutocompleteSuggestion[]` | `[]` | Suggestion list |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `placeholder` | `string` | — | Placeholder text |
| `label` | `string` | — | Visible label |
| `helpText` | `string` | — | Help text |
| `errorText` | `string` | — | Error message |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Show loading indicator |
| `minChars` | `number` | `2` | Min chars before showing suggestions |
| `noResultsText` | `string` | `'Ingen resultater'` | Empty state text |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `string` | Input text changed |
| `search` | `string` | Debounced search query |
| `select` | `AutocompleteSuggestion` | Suggestion selected |

---

## Accessibility

- `role="combobox"` on input with `aria-expanded`, `aria-controls`, `aria-activedescendant`
- `role="listbox"` on dropdown, `role="option"` on each item
- Keyboard: Arrow up/down navigates, Enter selects, Escape closes
- `autocomplete="off"` to prevent browser interference
- Loading and empty states are `role="presentation"`

---

## Design system

The CSS-only version is documented in the [Design System — Autocomplete](/web/c-autocomplete) reference.
