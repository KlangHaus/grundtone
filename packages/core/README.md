# @haspen/core

Core package for the HäspenUI design system. This package contains the fundamental building blocks,
types, and utilities that form the foundation of the design system.

## Installation

```bash
pnpm add @haspen/core
```

## Usage

```typescript
import { DEFAULT_THEME, type ThemeConfig } from '@haspen/core';

// Use the default theme
const theme: ThemeConfig = DEFAULT_THEME;
```

## Exports

### Types

- `ComponentProps` - Base interface for component props
- `ThemeConfig` - Theme configuration interface
- `Size` - Common size variants ('sm' | 'md' | 'lg')
- `Variant` - Common component variants ('primary' | 'secondary' | 'tertiary')

### Constants

- `DEFAULT_THEME` - Default theme configuration

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
