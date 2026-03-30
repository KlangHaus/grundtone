# Address Input

Danish address autocomplete powered by [DAWA](https://dawadocs.dataforsyningen.dk/) (Danmarks Adressers Web API). Wraps GTAutocomplete with built-in DAWA integration.

---

## Demo

<AddressInputDemo />

---

## When to use

- User needs to enter a Danish address
- Address validation is required (only real addresses can be selected)
- You need structured address data (vejnavn, postnr, kommune, coordinates)

## When not to use

- Non-Danish addresses — DAWA only covers Denmark
- Free-text address fields where validation is not needed
- International address forms

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<script setup>
  import { ref } from 'vue';

  const address = ref('');

  function onSelect(result) {
    console.log(result.data.vejnavn, result.data.postnr, result.data.postnrnavn);
  }
</script>

<template>
  <GTAddressInput
    v-model="address"
    label="Adresse"
    required
    @select="onSelect"
  />
</template>
```

### Road name only

```vue
<template>
  <GTAddressInput type="vejnavn" label="Vejnavn" placeholder="Søg vejnavn..." />
</template>
```

### Postal code

```vue
<template>
  <GTAddressInput type="postnummer" label="Postnummer" placeholder="Søg postnummer..." />
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | Input text (v-model) |
| `type` | `'adresse' \| 'adgangsadresse' \| 'vejnavn' \| 'postnummer'` | `'adresse'` | DAWA search type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `label` | `string` | — | Visible label |
| `helpText` | `string` | — | Help text |
| `errorText` | `string` | — | Error message |
| `placeholder` | `string` | `'Indtast adresse...'` | Placeholder |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `minChars` | `number` | `2` | Min chars before searching |
| `debounce` | `number` | `250` | Debounce delay (ms) |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `string` | Input text changed |
| `select` | `DawaResult` | Full DAWA data object for selected address |

### DawaResult

```ts
interface DawaResult {
  text: string;           // Raw display text
  forslagstekst: string;  // Formatted suggestion text
  type: string;           // Result type
  data: {                 // Full DAWA data
    id: string;
    vejnavn: string;
    husnr: string;
    postnr: string;
    postnrnavn: string;
    kommunekode: string;
    x: number;            // Longitude
    y: number;            // Latitude
    // ... more fields
  };
}
```

---

## Composable: `useDawaAutocomplete`

For custom integrations, use the composable directly:

```vue
<script setup>
  import { useDawaAutocomplete } from '@grundtone/vue';

  const { query, results, loading, search, clear } = useDawaAutocomplete({
    type: 'adresse',
    minChars: 2,
    debounce: 250,
  });
</script>
```

---

## React Native

Available as `GTAddressInput` from `@grundtone/react-native` with the same DAWA integration. Uses `TextInput` + `FlatList` for the suggestion dropdown.

```tsx
import { GTAddressInput } from '@grundtone/react-native';

<GTAddressInput
  label="Adresse"
  placeholder="Indtast adresse..."
  onSelect={(result) => console.log(result)}
/>
```

---

## Accessibility

Inherits all accessibility features from GTAutocomplete (ARIA combobox pattern).
