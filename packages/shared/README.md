# @haspen/shared

Shared utilities package for the HäspenUI design system. This package contains common helper
functions, formatters, and validators used across the design system.

## Installation

```bash
pnpm add @haspen/shared
```

## Usage

```typescript
import { formatCurrency, isValidEmail } from '@haspen/shared';

// Format currency
const price = formatCurrency(199.99); // "199,99 kr."

// Validate email
const isValid = isValidEmail('test@example.com'); // true
```

## Available Utilities

### Formatting

- `formatCurrency(amount: number, currency?: string)` - Format number as currency
- `formatDate(date: Date | string)` - Format date in Danish locale
- `formatPhoneNumber(phone: string)` - Format phone number in Danish format

### Validation

- `isValidCPR(cpr: string)` - Validate Danish CPR number
- `isValidEmail(email: string)` - Validate email address
- `isValidPhoneNumber(phone: string)` - Validate Danish phone number

## Dependencies

- `@haspen/core` - Core package with types and constants
- `vue` - Vue.js framework

## Development

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

3. Build package:

```bash
pnpm build
```

4. Run tests:

```bash
pnpm test
```

## Contributing

Please refer to the main project README for contribution guidelines.

## TypeScript-konfiguration

Denne pakke bruger en specifik `tsconfig.json`, som udvider rodens `tsconfig.build.json`.
Konfigurationen sikrer at kildekoden i `src/` og types i `types/` bliver korrekt transpileret og at
types genereres i `dist/types`.

- outDir: `dist`
- rootDir: `src`
- Types genereres automatisk ved build

Byg pakken med:

```sh
pnpm build
```
