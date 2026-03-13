# useField

Reactive field state with validation, designed for use with `GTInput`.

## Usage

```vue
<script setup>
import { useField } from '@grundtone/vue';
import { required, email } from '@grundtone/utils';

const field = useField({
  validators: [required(), email()],
  validateOn: 'blur',
});
</script>

<template>
  <GTInput
    v-model="field.value.value"
    :error-text="field.errorText.value"
    v-on="field.handlers"
    label="Email"
    type="email"
  />
</template>
```

In Nuxt, `useField` is auto-imported.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `validators` | `Validator[]` | `[]` | Array of validator functions from `@grundtone/utils` |
| `validateOn` | `'input' \| 'blur' \| 'submit'` | `'blur'` | When to run validation |
| `initialValue` | `string` | `''` | Starting value |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `value` | `Ref<string>` | The field value |
| `errorText` | `ComputedRef<string \| undefined>` | Error message (shown only after touched) |
| `touched` | `Ref<boolean>` | Whether the field has been interacted with |
| `isValid` | `ComputedRef<boolean>` | Whether the current value passes all validators |
| `validate()` | `() => ValidationResult` | Manually trigger validation |
| `reset()` | `() => void` | Reset to initial state |
| `handlers` | `object` | Event handlers to bind to GTInput via `v-on` |

## Validation modes

- **`blur`** (default) — Validates when the field loses focus. Best for most forms.
- **`input`** — Validates on every keystroke. Use for real-time feedback.
- **`submit`** — Only validates when `validate()` is called manually. Use with `useFormValidation`.

## Available validators

Import from `@grundtone/utils`:

| Factory | Description |
|---------|-------------|
| `required(msg?)` | Non-empty after trim |
| `email(msg?)` | Valid email format |
| `phone(msg?)` | Danish phone number (8 digits) |
| `cpr(msg?)` | Danish CPR number |
| `cvr(msg?)` | Danish CVR number (modulus 11) |
| `minLength(n, msg?)` | Minimum character length |
| `maxLength(n, msg?)` | Maximum character length |
| `pattern(regex, msg?)` | Custom regex match |
| `url(msg?)` | Valid HTTP(S) URL |
| `composeValidators(...v)` | Compose multiple validators into one |

All validators (except `required`) pass on empty strings, so they're optional by default. Combine with `required()` to make a field mandatory.

## Custom validators

A validator is just a function `(value: string) => ValidationResult`:

```ts
import type { Validator } from '@grundtone/utils';

const noSpaces: Validator = (value) =>
  value.includes(' ')
    ? { isValid: false, message: 'No spaces allowed' }
    : { isValid: true };

const field = useField({ validators: [required(), noSpaces] });
```
