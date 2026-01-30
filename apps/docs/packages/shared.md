# @haspen/shared

[![npm version](https://img.shields.io/npm/v/@haspen/shared.svg?style=flat)](https://www.npmjs.com/package/@haspen/shared)

Shared utilities, formatters, and validation functions for Haspen UI.

## Coming Soon

Documentation for `@haspen/shared` is coming soon.

## Purpose & Intent

The `@haspen/shared` package is the **utility layer** of Haspen UI. Its purpose is to provide
**framework-agnostic helper functions** for common tasks like formatting, validation, and data
manipulation - with a special focus on **Danish localization**.

### Key Principles

**Pure Functions**

- No side effects
- No framework dependencies
- No DOM manipulation
- Testable and predictable

**Danish-First Approach**

While supporting international use cases, `@haspen/shared` prioritizes Danish-specific needs:

- CPR number validation
- Danish phone formatting
- Danish currency (kr.)
- Danish date formats

**Developer Ergonomics**

- Clear, descriptive function names
- TypeScript types for all functions
- Comprehensive JSDoc documentation
- Tree-shakeable exports

## Installation

```bash
npm install @haspen/shared
# or
pnpm add @haspen/shared
# or
yarn add @haspen/shared
```

## Overview

The `@haspen/shared` package provides:

- **Danish Utilities**: CPR validation, phone number formatting
- **Formatters**: Currency, date, number formatting
- **Validators**: Email, URL, input validation
- **Type Guards**: Runtime type checking utilities
- **String Utilities**: Case conversion, truncation, slugify

## Quick Usage

```typescript
import { formatCurrency, isValidCPR, formatPhoneNumber } from '@haspen/shared';

// Format Danish currency
formatCurrency(1234.56); // "1.234,56 kr."

// Validate CPR number
isValidCPR('123456-7890'); // true/false

// Format Danish phone number
formatPhoneNumber('12345678'); // "+45 12 34 56 78"
```

## Features

### Danish-Specific

- CPR number validation
- Danish phone number formatting
- Danish currency formatting (kr.)
- Danish date formatting

### General Utilities

- Number formatting with locale support
- String manipulation (camelCase, kebab-case, etc.)
- Email and URL validation
- Type guards for runtime checks

## Documentation

Full documentation coming soon. In the meantime, explore the source code:

- [View on GitHub](https://github.com/allanasp/haspen-ui/tree/main/packages/shared)
- [View on npm](https://www.npmjs.com/package/@haspen/shared)

## License

MIT
