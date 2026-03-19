# Select

Native `<select>` dropdown with custom styling. Use when the user must choose one value from 5–15 options on limited space.

---

## Demo

<SelectDemo />

---

## When to use

- User must choose one value from 5–15 mutually exclusive options
- Limited screen space prevents showing all options as radio buttons
- Values are predefined and cannot be freely typed

## When not to use

- Fewer than 5 options — use radio buttons instead
- More than 15 options — use a text input with autocomplete/suggestions
- Multiple selections needed — use checkboxes
- Navigation between pages — use links or tabs
- User knows the value by heart (e.g. birth year) — use a text input

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
  const region = ref('');
  const regions = [
    { value: 'hovedstaden', label: 'Hovedstaden' },
    { value: 'midtjylland', label: 'Midtjylland' },
    { value: 'sjaelland', label: 'Sjælland' },
  ];
</script>

<template>
  <GTSelect v-model="region" label="Region" :options="regions" required />
</template>
```

### Grouped options

```vue
<template>
  <GTSelect
    label="Land"
    :options="[
      {
        label: 'Norden',
        options: [
          { value: 'dk', label: 'Danmark' },
          { value: 'se', label: 'Sverige' },
        ],
      },
      { value: 'de', label: 'Tyskland' },
    ]"
  />
</template>
```

### With error

```vue
<template>
  <GTSelect
    :options="regions"
    label="Region"
    error-text="Du skal vælge en region"
    required
  />
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `(SelectOption \| SelectOptionGroup)[]` | **required** | Flat or grouped options |
| `modelValue` | `string` | — | Bound value (v-model) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset (matches GTInput) |
| `placeholder` | `string` | `'Vælg...'` | Disabled first option text |
| `label` | `string` | — | Visible label above select |
| `helpText` | `string` | — | Help text below label |
| `errorText` | `string` | — | Error message (replaces helpText) |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `optionalLabel` | `string` | — | Label suffix for optional fields |
| `name` | `string` | — | HTML name attribute |
| `id` | `string` | auto | HTML id |

### SelectOption

| Property | Type | Description |
| --- | --- | --- |
| `value` | `string` | Option value |
| `label` | `string` | Display text |
| `disabled` | `boolean` | Greyed out, not selectable |

### SelectOptionGroup

| Property | Type | Description |
| --- | --- | --- |
| `label` | `string` | Group heading |
| `options` | `SelectOption[]` | Options in the group |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `string` | Emitted on selection change |

---

## Accessibility

- Native `<select>` — full keyboard and screen reader support by default
- `<label>` linked to select via `for`/`id`
- `aria-invalid` and `aria-describedby` for error states
- `aria-required` when required
- Disabled options are greyed out, never removed (preserves spatial consistency)
- Placeholder is a disabled `<option>` — not selectable as a value

---

## React Native

GTSelect is **not available on React Native**. Native platforms have their own picker conventions — iOS uses `UIPickerView` (wheel picker), Android uses `Spinner`. A custom dropdown would break platform expectations and deliver worse UX than native controls.

For React Native projects, use [`@react-native-picker/picker`](https://github.com/react-native-picker/picker) directly, which renders the platform-native picker on each OS.

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-select` | Native `<select>` element |
| `.gt-select--sm` | Small size |
| `.gt-select--md` | Medium size |
| `.gt-select--lg` | Large size |
| `.gt-select--error` | Error state |
| `.gt-select--placeholder` | Placeholder visible |

Reuses `.input-field`, `.input-label`, `.input-help`, `.input-error` from the Input component for form layout consistency.

---

## Design system

The CSS-only version of this component is documented in the [Design System — Select](/web/c-select) reference.
