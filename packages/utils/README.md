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

## Documentation

See [grundtone.com](https://grundtone.com) for full documentation.

## License

MIT
