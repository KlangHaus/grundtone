# useFormValidation

Aggregates multiple `useField` instances for form-level validation.

## Usage

```tsx
import { useField, useFormValidation } from '@grundtone/react-native';
import { required, email, minLength } from '@grundtone/react-native';

function ContactForm() {
  const nameField = useField({ validators: [required(), minLength(2)] });
  const emailField = useField({ validators: [required(), email()] });

  const form = useFormValidation({
    name: nameField,
    email: emailField,
  });

  function onSubmit() {
    if (!form.validateAll()) return;
    // All fields are valid
  }

  return (
    <View>
      <GTInput
        {...nameField.fieldProps}
        errorText={nameField.errorText}
        label="Name"
        required
      />
      <GTInput
        {...emailField.fieldProps}
        errorText={emailField.errorText}
        label="Email"
        type="email"
        required
      />
      <GTButton onPress={onSubmit} disabled={!form.isValid}>
        Submit
      </GTButton>
    </View>
  );
}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `fields` | `Record<string, UseFieldReturn>` | Named map of field instances from `useField` |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `isValid` | `boolean` | Whether all fields currently pass validation |
| `validateAll()` | `() => boolean` | Validate all fields and return overall validity |
| `resetAll()` | `() => void` | Reset all fields to initial state |

## Notes

- `validateAll()` triggers validation on all fields so error messages become visible.
- `isValid` updates as individual fields change.
- Fields can still be validated independently via their own `validate()` method.
