# useField

Reactive field state with validation, designed for use with `GTInput`.

## Usage

```tsx
import { useField } from '@grundtone/react-native';
import { required, email } from '@grundtone/react-native';

function EmailForm() {
  const field = useField({
    validators: [required(), email()],
    validateOn: 'blur',
  });

  return (
    <GTInput
      {...field.fieldProps}
      errorText={field.errorText}
      label="Email"
      type="email"
    />
  );
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `validators` | `Validator[]` | `[]` | Array of validator functions from `@grundtone/utils` |
| `validateOn` | `'input' \| 'blur' \| 'submit'` | `'blur'` | When to run validation |
| `initialValue` | `string` | `''` | Starting value |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | The current field value |
| `setValue` | `(v: string) => void` | Update the value |
| `errorText` | `string \| undefined` | Error message (shown only after touched) |
| `touched` | `boolean` | Whether the field has been interacted with |
| `isValid` | `boolean` | Whether the current value passes all validators |
| `validate()` | `() => ValidationResult` | Manually trigger validation |
| `reset()` | `() => void` | Reset to initial state |
| `fieldProps` | `object` | Props to spread on GTInput (`value`, `onChangeText`, `onBlur`) |

## Validation modes

- **`blur`** (default) — Validates when the field loses focus.
- **`input`** — Validates on every keystroke.
- **`submit`** — Only validates when `validate()` is called manually.

## Available validators

Import from `@grundtone/react-native` (or `@grundtone/utils`):

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
import type { Validator } from '@grundtone/react-native';

const noSpaces: Validator = (value) =>
  value.includes(' ')
    ? { isValid: false, message: 'No spaces allowed' }
    : { isValid: true };

const field = useField({ validators: [required(), noSpaces] });
```
