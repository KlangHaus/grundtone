# @grundtone/utils

Formatting and validation utilities for the [Grundtone](https://grundtone.com) design system.

## Installation

```bash
npm install @grundtone/utils
```

## Usage

```typescript
import { formatCurrency, formatDanishDate, isValidCPR } from '@grundtone/utils';

formatCurrency(1234.56); // '1.234,56 kr.'
formatDanishDate(new Date()); // 'DD/MM/YYYY'
isValidCPR('123456-7890'); // true
```

## API

### Formatting

- `formatCurrency(amount, currency?)` - Format as Danish currency
- `formatDanishDate(date)` - Format date in Danish locale
- `formatPhoneNumber(phone)` - Format Danish phone number

### Validation

- `isValidCPR(cpr)` - Validate Danish CPR number
- `isValidEmail(email)` - Validate email address
- `isValidPhoneNumber(phone)` - Validate Danish phone number
- `isValidCVR(cvr)` - Validate Danish CVR number (modulus 11)
- `isValidURL(url)` - Validate HTTP(S) URL
- `isValidDate(day, month, year)` - Validate a date exists (e.g. rejects 31 February)
- `isDateInPast(day, month, year)` - Check if date is before today
- `isDateInFuture(day, month, year)` - Check if date is after today

### Validator factories

Composable validators for use with `useField` / `useDateField`:

```typescript
import { required, email, date, datePast, composeValidators } from '@grundtone/utils';

const v = composeValidators(required('Required'), email('Invalid email'));
v('test@example.com'); // { isValid: true }
```

`required`, `email`, `phone`, `cpr`, `cvr`, `date`, `datePast`, `dateFuture`, `minLength`,
`maxLength`, `pattern`, `url`, `composeValidators`

## Documentation

See [grundtone.com](https://grundtone.com) for full documentation.

## License

MIT
