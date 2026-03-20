# Radio Group

Lets the user select one option from a visible list. Use when the user needs an overview of all choices and can only pick one.

## Demo

<RadioGroupDemo />

## Installation

```vue
<script setup>
import { GTRadioGroup } from '@grundtone/vue';
</script>
```

In Nuxt, `GTRadioGroup` is auto-imported.

## When to use

Use radio buttons when the user must choose exactly one value from 2-5 options. Use when the full list fits on a mobile viewport.

Do not use when the user can select multiple values (use checkbox). Do not use when there are too many options for mobile (use select/dropdown).

## Usage

### Basic

```vue
<GTRadioGroup
  v-model="subject"
  label="Sagen handler om"
  :options="[
    { value: 'insurance', label: 'Ulykkesforsikring' },
    { value: 'liability', label: 'Erstatningsansvar' },
    { value: 'company', label: 'Forsikringsselskab' },
  ]"
  required
/>
```

### With option hints

```vue
<GTRadioGroup
  v-model="size"
  label="Størrelse"
  help-text="Vælg den størrelse der passer bedst"
  :options="[
    { value: 'sm', label: 'Small', hint: 'Til 1-2 brugere' },
    { value: 'md', label: 'Medium', hint: 'Til 3-10 brugere' },
    { value: 'lg', label: 'Large', hint: 'Til 10+ brugere' },
  ]"
/>
```

### With collapse content

Show extra fields when a specific option is selected:

```vue
<GTRadioGroup
  v-model="contact"
  label="Kontaktmetode"
  :options="[
    { value: 'email', label: 'Email', content: true },
    { value: 'phone', label: 'Telefon', content: true },
    { value: 'none', label: 'Ingen kontakt' },
  ]"
>
  <template #content-email>
    <GTInput label="Email" type="email" />
  </template>
  <template #content-phone>
    <GTInput label="Telefon" type="tel" />
  </template>
</GTRadioGroup>
```

### Error state

```vue
<GTRadioGroup
  label="Kategori"
  error-text="Du skal vælge en kategori"
  :options="[...]"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Selected value (v-model) |
| `options` | `RadioOption[]` | — | Available options (required) |
| `name` | `string` | auto | HTML name attribute |
| `label` | `string` | — | Group legend |
| `helpText` | `string` | — | Group help text |
| `errorText` | `string` | — | Group error message |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disable all options |
| `id` | `string` | auto | ID prefix |

### RadioOption

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
| `update:modelValue` | `string` | Emitted on selection |

## Accessibility

- Native `<input type="radio">` (visually hidden) with custom indicator
- `role="radiogroup"` on the list container
- `<fieldset>` + `<legend>` for group labeling
- Arrow key navigation (native browser behavior)
- Label click selects the option
- Focus ring on keyboard navigation

See [Radio (Design System)](/web/c-radio) for full CSS reference.
