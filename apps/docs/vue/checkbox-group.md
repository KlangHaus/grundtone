# Checkbox Group

Lets the user select one or more options from a visible list.

## Demo

<CheckboxGroupDemo />

## Installation

```vue
<script setup>
import { GTCheckboxGroup } from '@grundtone/vue';
</script>
```

In Nuxt, `GTCheckboxGroup` is auto-imported.

## When to use

Use checkboxes when the user can select multiple values. Use when they need an overview of all choices and the list fits on mobile.

Do not use when only one value can be selected (use radio). Do not use when there are too many options (use select with multi-select).

## Usage

### Basic

```vue
<GTCheckboxGroup
  v-model="nationalities"
  label="Nationalitet"
  help-text="Angiv alle der gælder"
  :options="[
    { value: 'dk', label: 'Dansk' },
    { value: 'se', label: 'Svensk' },
    { value: 'other', label: 'Anden nationalitet' },
  ]"
/>
```

### With option hints

```vue
<GTCheckboxGroup
  v-model="prefs"
  label="Præferencer"
  :options="[
    { value: 'news', label: 'Nyhedsbrev', hint: 'Maks én email om ugen' },
    { value: 'push', label: 'Push', hint: 'Vigtige opdateringer' },
  ]"
/>
```

### Error state

```vue
<GTCheckboxGroup
  label="Nationalitet"
  error-text="Angiv mindst én nationalitet"
  :options="[...]"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string[]` | `[]` | Selected values (v-model) |
| `options` | `CheckboxOption[]` | — | Available options (required) |
| `name` | `string` | auto | HTML name attribute |
| `label` | `string` | — | Group legend |
| `helpText` | `string` | — | Group help text |
| `errorText` | `string` | — | Group error message |
| `required` | `boolean` | `false` | At least one must be selected |
| `disabled` | `boolean` | `false` | Disable all options |
| `id` | `string` | auto | ID prefix |

### CheckboxOption

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | Option value |
| `label` | `string` | Display label |
| `hint` | `string` | Help text for this option |
| `disabled` | `boolean` | Disable this option |
| `content` | `boolean` | Has collapsible content (slot `#content-{value}`) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string[]` | Emitted on change |

## Accessibility

- Native `<input type="checkbox">` (visually hidden) with custom indicator
- `<fieldset>` + `<legend>` for group labeling
- Space key toggles (native browser behavior)
- Label click toggles the option

See [Checkbox (Design System)](/web/c-checkbox) for full CSS reference.
