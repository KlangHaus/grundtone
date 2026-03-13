# useFormValidation

Aggregates multiple `useField` instances for form-level validation.

## Usage

```vue
<script setup>
import { useField, useFormValidation } from '@grundtone/vue';
import { required, email, minLength } from '@grundtone/utils';

const nameField = useField({ validators: [required(), minLength(2)] });
const emailField = useField({ validators: [required(), email()] });

const form = useFormValidation({
  name: nameField,
  email: emailField,
});

function onSubmit() {
  if (!form.validateAll()) return;
  // All fields are valid — submit the form
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <GTInput
      v-model="nameField.value.value"
      :error-text="nameField.errorText.value"
      v-on="nameField.handlers"
      label="Name"
      required
    />
    <GTInput
      v-model="emailField.value.value"
      :error-text="emailField.errorText.value"
      v-on="emailField.handlers"
      label="Email"
      type="email"
      required
    />
    <GTButton type="submit" :disabled="!form.isValid.value">
      Submit
    </GTButton>
  </form>
</template>
```

In Nuxt, `useFormValidation` is auto-imported.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `fields` | `Record<string, UseFieldReturn>` | Named map of field instances from `useField` |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `isValid` | `ComputedRef<boolean>` | Whether all fields currently pass validation |
| `validateAll()` | `() => boolean` | Validate all fields, mark as touched, return overall validity |
| `resetAll()` | `() => void` | Reset all fields to initial state |

## Notes

- `validateAll()` marks all fields as `touched`, so error messages become visible.
- `isValid` is reactive and updates as individual fields change.
- Fields can still be validated independently via their own `validate()` method.
