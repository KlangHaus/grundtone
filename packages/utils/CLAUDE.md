# @grundtone/utils

Shared validation, formatting, and utility functions for the Grundtone design system. Used by both
`@grundtone/vue` and `@grundtone/react-native`.

## Validation Functions

```typescript
import { isValidCPR, isValidEmail, isValidDate } from '@grundtone/utils';
```

| Function                           | Args                            | Returns                                    |
| ---------------------------------- | ------------------------------- | ------------------------------------------ |
| `isValidCPR(cpr)`                  | string (with or without hyphen) | boolean — Danish CPR with modulus 11 check |
| `isValidEmail(email)`              | string                          | boolean                                    |
| `isValidPhoneNumber(phone)`        | string                          | boolean — Danish 8-digit                   |
| `isValidCVR(cvr)`                  | string                          | boolean — Danish CVR with modulus 11       |
| `isValidURL(url)`                  | string                          | boolean — HTTP(S) only                     |
| `isValidDate(day, month, year)`    | 3 strings                       | boolean — validates date exists            |
| `isDateInPast(day, month, year)`   | 3 strings                       | boolean — before today                     |
| `isDateInFuture(day, month, year)` | 3 strings                       | boolean — after today                      |
| `isRequired(value)`                | string                          | boolean — non-empty after trim             |
| `isMinLength(value, min)`          | string, number                  | boolean                                    |
| `isMaxLength(value, max)`          | string, number                  | boolean                                    |
| `isPattern(value, regex)`          | string, RegExp                  | boolean                                    |

## Validator Factories

For use with `useField` / `useDateField` composables. All return
`(value: string) => { isValid: boolean; message?: string }`.

```typescript
import { required, email, date, composeValidators } from '@grundtone/utils';

const v = composeValidators(required('Required'), email());
v(''); // { isValid: false, message: 'Required' }
v('bad'); // { isValid: false, message: 'Invalid email address' }
v('ok@example.com'); // { isValid: true }
```

| Factory                   | Default Message                 |
| ------------------------- | ------------------------------- |
| `required(msg?)`          | 'This field is required'        |
| `email(msg?)`             | 'Invalid email address'         |
| `phone(msg?)`             | 'Invalid phone number'          |
| `cpr(msg?)`               | 'Invalid CPR number'            |
| `cvr(msg?)`               | 'Invalid CVR number'            |
| `date(msg?)`              | 'Invalid date'                  |
| `datePast(msg?)`          | 'Date must be in the past'      |
| `dateFuture(msg?)`        | 'Date must be in the future'    |
| `minLength(n, msg?)`      | 'Must be at least N characters' |
| `maxLength(n, msg?)`      | 'Must be at most N characters'  |
| `pattern(regex, msg?)`    | 'Invalid format'                |
| `url(msg?)`               | 'Invalid URL'                   |
| `composeValidators(...v)` | First failing message           |

All (except `required`) pass on empty string — they are optional by default.

Date validators expect `"DD-MM-YYYY"` hyphen-separated format.

## Other Utilities

```typescript
import { generateId, getSystemThemeMode } from '@grundtone/utils';

generateId('input'); // → 'input-a1b2c3' (unique)
getSystemThemeMode(); // → 'light' | 'dark' (from prefers-color-scheme)
```

## Formatting

```typescript
import { formatCPR, formatPhoneNumber } from '@grundtone/utils';

formatCPR('0101901234'); // → '010190-1234'
formatPhoneNumber('12345678'); // → '12 34 56 78'
```
