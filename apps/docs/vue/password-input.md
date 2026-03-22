# Password Input

Password field with show/hide toggle. Allows users to visually verify their password before submitting.

## Demo

<PasswordInputDemo />

## Installation

```vue
<script setup>
import { GTPasswordInput } from '@grundtone/vue';
</script>
```

## Usage

### Login

```vue
<GTPasswordInput v-model="password" label="Adgangskode" autocomplete="current-password" required />
```

### Create password

```vue
<GTPasswordInput v-model="newPassword" label="Ny adgangskode"
  help-text="Mindst 8 tegn" autocomplete="new-password" required />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | v-model |
| `label` | `string` | — | Label |
| `helpText` | `string` | — | Help text |
| `errorText` | `string` | — | Error message |
| `size` | `'sm'\|'md'\|'lg'` | `'md'` | Size |
| `required` | `boolean` | `false` | Required |
| `disabled` | `boolean` | `false` | Disabled |
| `autocomplete` | `string` | `'current-password'` | `new-password` or `current-password` |
| `showLabel` | `string` | `'Vis'` | Show button text |
| `hideLabel` | `string` | `'Skjul'` | Hide button text |

## Security

- `spellcheck="false"` prevents spell-jacking
- `autocapitalize="off"` prevents unwanted casing
- Always allow copy/paste
- Do not use `maxlength` — show errors instead
- Do not reveal which field was wrong on login failure
