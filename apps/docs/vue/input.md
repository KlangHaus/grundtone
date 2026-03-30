# Input

Text input for short-form data entry — letters, numbers, or a combination. Includes label, help text, error state, prefix/suffix, and configurable field widths.

## Demo

<InputDemo />

## Installation

```vue
<script setup>
import { GTInput } from '@grundtone/vue';
</script>
```

In Nuxt, `GTInput` is auto-imported.

## When to use

Use input fields when the user needs to type information that cannot be selected from predefined values, or when copy-paste is needed.

Do not use input fields when the user must choose from a fixed set of values, or when strict data consistency is required without client-side validation.

## Usage

### Basic

```vue
<GTInput v-model="name" placeholder="Enter your name" />
```

### With label and help text

Labels are always placed **above** the input — never inside or beside it. This allows faster scanning and keeps the label visible while typing.

Help text is placed **between the label and the input** so it stays visible during input. Never place help text below the field or inside the field as a placeholder.

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

Error messages appear between the label and the input, replacing help text. The field border turns red. Only show errors after the user has entered an invalid value — not before interaction.

Error messages must be meaningful and help the user correct the problem.

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

Disabled fields lack sufficient contrast, cannot receive focus, and are difficult to discover with screen readers. Consider omitting the field from the form entirely instead of disabling it.

```vue
<GTInput disabled model-value="Cannot edit" />
<GTInput readonly model-value="Read only" />
```

### Optional and required fields

Avoid optional fields where possible. If a field is optional, consider whether it is necessary at all.

When most fields in a form are **required**, mark only the optional ones:

```vue
<GTInput label="Name" required />
<GTInput label="Phone" optional-label="(valgfrit)" type="tel" />
```

When most fields are **optional**, mark the required ones instead:

```vue
<GTInput label="CPR" required />
<GTInput label="Notes" />
```

If an optional field has a significant positive effect (e.g. shortens processing time), explain this in the help text.

### Prefix and suffix

Use prefix/suffix to clarify expected input format — currency, units, etc. A suffix is `aria-hidden` and not read by screen readers, so always also describe the format in the label or help text.

```vue
<GTInput label="Amount" prefix="kr." placeholder="0,00"
  help-text="Enter amount in DKK" />
<GTInput label="Weight" suffix="kg" placeholder="0" type="number" />
```

### Field widths

Match field width to the expected input length so the user gets a sense of what to enter. A postal code field should fit ~4 characters, while a street name needs ~27. Do not use field width for validation — use validation rules instead.

The field must be wide enough for the user to see all characters during input.

#### By character count

```vue
<GTInput label="Postal code" :char-width="4" placeholder="8000" />
<GTInput label="Phone" :char-width="8" placeholder="12345678" />
<GTInput label="Street" :char-width="27" placeholder="Vestergade" />
```

#### By rem-based preset

```vue
<GTInput label="Short" width="xxs" />  <!-- 8rem -->
<GTInput label="Small" width="xs" />   <!-- 16rem -->
<GTInput label="Medium" width="m" />   <!-- 32rem -->
<GTInput label="Large" width="l" />    <!-- 40rem -->
<GTInput label="XL" width="xl" />      <!-- 48rem -->
```

### Autocomplete

Use `autocomplete` on inputs for personal information to speed up form completion and improve accessibility (WCAG 2.1 SC 1.3.5).

```vue
<GTInput label="Name" autocomplete="name" />
<GTInput label="Email" type="email" autocomplete="email" />
<GTInput label="Phone" type="tel" autocomplete="tel" />
<GTInput label="Postal code" autocomplete="postal-code" :char-width="4" />
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
| `helpText` | `string` | — | Help text between label and input |
| `errorText` | `string` | — | Error message between label and input (replaces helpText) |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Required field |
| `optionalLabel` | `string` | — | Text for optional fields, e.g. `"(valgfrit)"` |
| `block` | `boolean` | `false` | Full-width input |
| `width` | `InputWidth` | — | Fixed width: xxs (8rem), xs (16rem), s (24rem), m (32rem), l (40rem), xl (48rem) |
| `charWidth` | `InputCharWidth` | — | Width by character count: 4, 8, 11, or 27 |
| `prefix` | `string` | — | Prefix text (aria-hidden) |
| `suffix` | `string` | — | Suffix text (aria-hidden) |
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

- Label associated with input via `for`/`id`
- `aria-required` set when `required` is true
- `aria-invalid` set when `errorText` is present
- `aria-describedby` links input to help or error text
- Error text uses `role="alert"` for screen reader announcement
- Help and error text placed between label and input, not below
- Prefix/suffix use `aria-hidden="true"` — describe format in label or help text
- Use `autocomplete` for personal data fields

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
| `gt-input-label__optional` | Optional field indicator text |
| `gt-input-hint` | Help text |
| `gt-input-error` | Error text |
| `gt-input-wrapper` | Prefix/suffix container |
| `gt-input-wrapper--prefix` | With prefix modifier |
| `gt-input-wrapper--suffix` | With suffix modifier |
| `gt-input-prefix` | Prefix element |
| `gt-input-suffix` | Suffix element |
| `gt-input-width-{xxs,xs,s,m,l,xl}` | Rem-based width presets |
| `gt-input-char-{4,8,11,27}` | Character-based width presets |
