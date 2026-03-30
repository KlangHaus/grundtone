# OTP Input

Single-digit input fields for one-time verification codes (2FA, SMS).

## Demo

<OtpInputDemo />

## Installation

```vue
<script setup>
import { GTOtpInput } from '@grundtone/vue';
</script>
```

## Usage

### 6-digit (default)

```vue
<GTOtpInput v-model="code" label="Bekræftelseskode" help-text="Indtast koden fra din SMS" />
```

### 4-digit PIN

```vue
<GTOtpInput v-model="pin" :length="4" label="PIN" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Combined OTP value (v-model) |
| `length` | `number` | `6` | Number of digits |
| `label` | `string` | — | Label |
| `helpText` | `string` | — | Help text |
| `errorText` | `string` | — | Error message |
| `disabled` | `boolean` | `false` | Disabled |

## Behavior

- **Auto-advance**: typing a digit moves focus to next field
- **Backspace**: deletes digit and moves focus to previous field
- **Paste**: distributes pasted code across all fields
- **Numeric only**: non-digit characters filtered
- `inputmode="numeric"` for numeric keyboard
- `autocomplete="one-time-code"` for SMS autofill
- Filled fields get subtle primary background tint
