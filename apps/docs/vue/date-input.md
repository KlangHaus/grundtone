# Date Input

Three separate fields for day, month, and year. Use for dates the user knows from memory (birth date, passport issue date). Includes label, help text, error state, auto-advance, and accessible markup.

## Demo

<DateInputDemo />

## Installation

```vue
<script setup>
import { GTDateInput } from '@grundtone/vue';
</script>
```

In Nuxt, `GTDateInput` is auto-imported.

## When to use

Use date input when you need a specific, known date — such as a birth date, document issue date, or historical event. Three separate fields are easier and faster than a single date picker for memorised dates.

Do not use date input for scheduling, booking, or selecting dates from a range. Do not use on mobile native (React Native) — use the platform's native date picker instead.

## Usage

### Basic

```vue
<GTDateInput
  v-model="birthDate"
  label="Fødselsdato"
  help-text="For eksempel: 27 03 1990"
  autocomplete="bday"
  required
/>
```

### With pre-filled value

```vue
<script setup>
import { ref } from 'vue';
const passportDate = ref({ day: '05', month: '12', year: '2018' });
</script>

<template>
  <GTDateInput
    v-model="passportDate"
    label="Hvornår blev dit pas udstedt?"
    help-text="For eksempel: 05 12 2018"
  />
</template>
```

### Error state

Error messages appear between the label and the fields, replacing help text. All field borders turn red. Only show errors after the user has interacted.

```vue
<GTDateInput
  v-model="date"
  label="Startdato"
  error-text="Datoen kan ikke være i fremtiden"
/>
```

### Sizes

```vue
<GTDateInput v-model="date" label="Small" size="sm" />
<GTDateInput v-model="date" label="Medium" size="md" />
<GTDateInput v-model="date" label="Large" size="lg" />
```

### Custom field labels

Default labels are "Dag", "Måned", "År". Override for other languages:

```vue
<GTDateInput
  v-model="date"
  label="Date of birth"
  day-label="Day"
  month-label="Month"
  year-label="Year"
/>
```

### Disabled

```vue
<GTDateInput
  :model-value="{ day: '01', month: '01', year: '2020' }"
  label="Oprettelsesdato"
  disabled
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `DateInputValue` | `{ day: '', month: '', year: '' }` | Bound value (v-model) |
| `size` | `DateInputSize` | `'md'` | Size preset: sm, md, lg |
| `label` | `string` | — | Visible label above the date group |
| `helpText` | `string` | — | Help text between label and fields |
| `errorText` | `string` | — | Error message (replaces helpText) |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `id` | `string` | auto | ID prefix for sub-fields |
| `dayLabel` | `string` | `'Dag'` | Label for day field |
| `monthLabel` | `string` | `'Måned'` | Label for month field |
| `yearLabel` | `string` | `'År'` | Label for year field |
| `autocomplete` | `string` | — | Autocomplete prefix (e.g. `"bday"` → `bday-day`, `bday-month`, `bday-year`) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `DateInputValue` | Emitted on input in any field |

## Behaviors

- **Auto-advance:** When the user types 2 digits in day, focus moves to month. When 2 digits in month, focus moves to year.
- **Numeric filtering:** Non-digit characters are stripped automatically.
- **Maxlength:** Day/month limited to 2 digits, year to 4.

## Accessibility

- `role="group"` on the date wrapper with `aria-labelledby`
- Each field has its own `<label>` (Dag, Måned, År)
- `aria-required` set on all fields when `required` is true
- `aria-invalid` set on all fields when `errorText` is present
- `aria-describedby` links the group to help or error text
- `inputmode="numeric"` for numeric keyboard on mobile
- `pattern="[0-9]*"` for iOS numeric keyboard
- `autocomplete` attributes for autofill
- Error text uses `role="alert"` for screen reader announcement

## Validation with useDateField

Use the `useDateField` composable for reactive validation. It holds a `DateInputValue` internally and derives a `"DD-MM-YYYY"` string for validators. It returns a `UseFieldReturn`-compatible interface, so it works with `useFormValidation`.

```vue
<script setup>
import {
  GTDateInput, GTButton,
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
    <GTButton type="submit" variant="primary">Submit</GTButton>
  </form>
</template>
```

See [useDateField](/vue/use-date-field) for full composable documentation.

### Available date validators

| Validator | Description |
|-----------|-------------|
| `date(message?)` | Validates that the date exists (e.g. not 31 February) |
| `datePast(message?)` | Validates that the date is in the past |
| `dateFuture(message?)` | Validates that the date is in the future |

Validators expect a `"DD-MM-YYYY"` format string (hyphen-separated). `useDateField` handles this conversion automatically.

## CSS Classes

| Class | Description |
|-------|-------------|
| `date-input` | Flex container for the three fields |
| `date-input__field` | Wrapper for a single field |
| `date-input__label` | Small label for each field |
| `date-input__input--day` | Day input width constraint |
| `date-input__input--month` | Month input width constraint |
| `date-input__input--year` | Year input width constraint |
| `gt-input` | Base input class (reused) |
| `gt-input--sm/md/lg` | Size variants (reused) |
| `gt-input--error` | Error state (reused) |
| `gt-input-field` | Outer wrapper (reused) |
| `gt-input-label` | Group label (reused) |
| `gt-input-hint` | Help text (reused) |
| `gt-input-error` | Error text (reused) |

See [Date Input (Design System)](/web/c-date-input) for full CSS reference.
