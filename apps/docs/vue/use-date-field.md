# useDateField

Reactive date field state with validation, designed for use with `GTDateInput`. Wraps `useField` semantics but holds a `DateInputValue` internally and derives a `"DD-MM-YYYY"` string for validator compatibility.

Returns a `UseFieldReturn`-compatible interface, so it works with `useFormValidation`.

## Usage

```vue
<script setup>
import {
  GTDateInput,
  useDateField, useFormValidation,
  required, date, datePast,
} from '@grundtone/vue';

const birthDate = useDateField({
  validators: [
    required('Fødselsdato er påkrævet'),
    date('Ugyldig dato'),
    datePast('Datoen skal være i fortiden'),
  ],
  validateOn: 'blur',
});

const form = useFormValidation({ birthDate });

function onSubmit() {
  if (!form.validateAll()) return;
  console.log('Valid:', birthDate.dateValue.value);
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <GTDateInput
      v-model="birthDate.dateValue.value"
      :error-text="birthDate.errorText.value"
      v-on="birthDate.handlers"
      label="Fødselsdato"
      help-text="For eksempel: 27 03 1990"
      autocomplete="bday"
      required
    />
    <button type="submit">Submit</button>
  </form>
</template>
```

In Nuxt, `useDateField` is auto-imported.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `validators` | `Validator[]` | `[]` | Array of validator functions |
| `validateOn` | `'input' \| 'blur' \| 'submit'` | `'blur'` | When to run validation |
| `initialValue` | `DateInputValue` | `{ day: '', month: '', year: '' }` | Starting value |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `dateValue` | `Ref<DateInputValue>` | The reactive date object — bind with `v-model` on GTDateInput |
| `value` | `Ref<string>` | Derived `"DD-MM-YYYY"` string (or `""` if all fields empty) |
| `errorText` | `ComputedRef<string \| undefined>` | Error message (shown only after touched) |
| `touched` | `Ref<boolean>` | Whether the field has been interacted with |
| `isValid` | `ComputedRef<boolean>` | Whether the current value passes all validators |
| `validate()` | `() => ValidationResult` | Manually trigger validation |
| `reset()` | `() => void` | Reset to initial state |
| `handlers` | `object` | Event handlers to bind via `v-on` |

## With useFormValidation

`useDateField` returns a `UseFieldReturn`-compatible interface, so it works directly with `useFormValidation` alongside regular `useField` instances:

```vue
<script setup>
import {
  GTInput, GTDateInput,
  useField, useDateField, useFormValidation,
  required, email, date, datePast,
} from '@grundtone/vue';

const nameField = useField({
  validators: [required('Name is required')],
});

const birthDate = useDateField({
  validators: [required(), date(), datePast()],
});

const form = useFormValidation({ name: nameField, birthDate });
</script>
```

## Date validators

| Validator | Description |
|-----------|-------------|
| `date(msg?)` | Validates that the date exists (e.g. rejects 31 February) |
| `datePast(msg?)` | Validates that the date is before today |
| `dateFuture(msg?)` | Validates that the date is after today |

These validators expect a `"DD-MM-YYYY"` format string. `useDateField` handles the conversion automatically — you do not need to build the string manually.

## When to use

Use `useDateField` instead of `useField` when working with `GTDateInput`. It provides:

- A `dateValue` ref that matches `GTDateInput`'s `v-model` type (`DateInputValue`)
- Automatic conversion to the validator string format
- The same validation modes, touch tracking, and form integration as `useField`

For regular text inputs, use [useField](/vue/use-field) instead.
