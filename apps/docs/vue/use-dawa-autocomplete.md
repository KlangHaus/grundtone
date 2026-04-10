# useDawaAutocomplete

Danish address autocomplete powered by the [DAWA API](https://dawa.aws.dk/) (Danmarks Adresseregister). Handles debouncing, request cancellation, and error states.

The higher-level `GTAddressInput` component wraps this composable — reach for `useDawaAutocomplete` when you need custom UI or behaviour.

## Usage

```vue
<script setup>
import { watch } from 'vue';
import { useDawaAutocomplete, GTAutocomplete } from '@grundtone/vue';

const { query, results, loading } = useDawaAutocomplete({
  type: 'adresse',
  minChars: 3,
});

const suggestions = computed(() =>
  results.value.map(r => r.forslagstekst),
);
</script>

<template>
  <GTAutocomplete
    v-model="query"
    :suggestions="suggestions"
    :loading="loading"
    label="Adresse"
    placeholder="Søg efter adresse..."
  />
</template>
```

In Nuxt, `useDawaAutocomplete` is auto-imported.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'adresse' \| 'adgangsadresse' \| 'vejnavn' \| 'postnummer'` | `'adresse'` | DAWA result type |
| `minChars` | `number` | `2` | Minimum characters before the API is called |
| `debounce` | `number` | `250` | Debounce delay in ms between keystroke and request |
| `maxResults` | `number` | `10` | Maximum results returned per query |

### Result types

| Type | Returns | Example |
|------|---------|---------|
| `adresse` | Full addresses (street + number + floor + zip + city) | `Eksempelvej 12, 1. tv, 6000 Kolding` |
| `adgangsadresse` | Access addresses (building-level, no floor/door) | `Eksempelvej 12, 6000 Kolding` |
| `vejnavn` | Street names only | `Eksempelvej` |
| `postnummer` | Postal codes with city | `6000 Kolding` |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `query` | `Ref<string>` | The current query — bind with `v-model` to trigger searches |
| `results` | `Ref<DawaResult[]>` | Current suggestions from DAWA |
| `loading` | `Ref<boolean>` | `true` while a request is in flight |
| `error` | `Ref<string \| null>` | Error message from the last failed request |
| `search(q)` | `(q: string) => void` | Imperatively set the query |
| `clear()` | `() => void` | Reset query, results, loading and error |

## DawaResult shape

```ts
interface DawaResult {
  text: string;           // item.tekst — display text
  forslagstekst: string;  // formatted suggestion text
  type: string;           // 'adresse' | 'vejnavn' | ...
  data: Record<string, unknown>; // raw DAWA data (id, coordinates, zip, etc.)
}
```

The `data` field contains the full DAWA response for the item — useful when you need the address `id`, coordinates (`x`/`y`), zip code, municipality, etc.

## Behaviour

- **Debouncing** — Rapid keystrokes don't fire an API call until the user pauses for `debounce` ms.
- **Cancellation** — Each new request aborts the previous one via `AbortController`, so you always get results for the latest query.
- **Min chars** — Below `minChars`, results are cleared without hitting the API.
- **Error handling** — Network / HTTP errors set `error` and clear `results`. `AbortError` (from cancellation) is ignored.

## Patterns

### With GTAddressInput directly

For standard address fields, use the component — it's a one-liner:

```vue
<GTAddressInput v-model="address" label="Adresse" type="adresse" />
```

### Accessing the full DAWA data

```ts
const { query, results } = useDawaAutocomplete({ type: 'adgangsadresse' });

function onSelect(forslagstekst: string) {
  const match = results.value.find(r => r.forslagstekst === forslagstekst);
  if (match) {
    const { id, x, y } = match.data as { id: string; x: number; y: number };
    // store id + coordinates for map display
  }
}
```

### Searching postcodes

```ts
const { query, results } = useDawaAutocomplete({
  type: 'postnummer',
  minChars: 2,
  maxResults: 5,
});
```

## See also

- [`GTAddressInput`](/vue/address-input) — Ready-made address input built on top of this composable
- [DAWA API docs](https://dawa.aws.dk/dok/api/autocomplete) — Official documentation
