# Input

Text input component with built-in label, help text, error state, and full accessibility support.

## Demo

<InputDemo />

## Installation

```vue
<script setup>
import { GTInput } from '@grundtone/vue';
</script>
```

In Nuxt, `GTInput` is auto-imported.

## Usage

### Basic

```vue
<GTInput v-model="name" placeholder="Enter your name" />
```

### With label and help text

```vue
<GTInput
  v-model="email"
  type="email"
  label="Email"
  placeholder="john@example.com"
  help-text="We'll never share your email."
  required
/>
```

### Error state

```vue
<GTInput
  v-model="value"
  label="Username"
  error-text="Username is already taken"
/>
```

### Sizes

```vue
<GTInput size="sm" placeholder="Small" />
<GTInput size="md" placeholder="Medium" />
<GTInput size="lg" placeholder="Large" />
```

### Disabled and readonly

```vue
<GTInput disabled model-value="Cannot edit" />
<GTInput readonly model-value="Read only" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Bound value (v-model) |
| `type` | `InputType` | `'text'` | Input type: text, email, password, number, tel, url, search |
| `size` | `InputSize` | `'md'` | Size preset: sm, md, lg |
| `rounded` | `InputRadius` | — | Border radius: none, sm, md, lg, full |
| `placeholder` | `string` | — | Placeholder text |
| `label` | `string` | — | Visible label above input |
| `helpText` | `string` | — | Help text below input |
| `errorText` | `string` | — | Error message (replaces helpText) |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Required field |
| `block` | `boolean` | `false` | Full-width input |
| `name` | `string` | — | HTML name attribute |
| `id` | `string` | auto | HTML id (auto-generated for label association) |
| `autocomplete` | `string` | — | Autocomplete attribute |
| `maxlength` | `number` | — | Maximum character length |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on input (v-model) |
| `focus` | `FocusEvent` | Emitted on focus |
| `blur` | `FocusEvent` | Emitted on blur |

## Accessibility

- Label is associated with input via `for`/`id`
- `aria-required` set when `required` is true
- `aria-invalid` set when `errorText` is present
- `aria-describedby` points to help/error text
- Error text uses `role="alert"` for screen reader announcement

## Validation with useField

Connect validators to GTInput using the `useField` composable:

```vue
<script setup>
import {
  GTInput, useField, useFormValidation,
  required, email, minLength,
} from '@grundtone/vue';

const nameField = useField({
  validators: [required('Name is required'), minLength(2, 'Too short')],
});

const emailField = useField({
  validators: [required(), email()],
  validateOn: 'blur',
});

const form = useFormValidation({ name: nameField, email: emailField });

function onSubmit() {
  if (!form.validateAll()) return;
  console.log('Valid!', nameField.value.value, emailField.value.value);
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
    <button type="submit">Submit</button>
  </form>
</template>
```

See [Composables](/vue/composables) for full documentation.

## CSS Classes

| Class | Description |
|-------|-------------|
| `gt-input` | Base input class |
| `gt-input--sm` | Small size |
| `gt-input--md` | Medium size |
| `gt-input--lg` | Large size |
| `gt-input--error` | Error state |
| `gt-input--disabled` | Disabled state |
| `gt-input--readonly` | Readonly state |
| `gt-input-field` | Wrapper for label + input + help/error |
| `gt-input-field--block` | Full-width wrapper |
| `gt-input-label` | Label text |
| `gt-input-label__required` | Required asterisk |
| `gt-input-help` | Help text |
| `gt-input-error` | Error text |
