# @grundtone/core

Foundation package for the [Grundtone](https://grundtone.com) design system. Provides the theme
system, TypeScript types, and presets that all other packages build on.

## Installation

```bash
npm install @grundtone/core
```

## Usage

```typescript
import { createTheme, type ThemeConfig } from '@grundtone/core';

const { light, dark } = createTheme({
  light: {
    colors: {
      primary: '#2563eb',
      background: '#ffffff',
    },
  },
  dark: {
    colors: {
      primary: '#3b82f6',
      background: '#0a0a0a',
    },
  },
});
```

## Exports

### Theme

- `createTheme()` - Create light/dark theme configurations
- `DEFAULT_THEME` - Default theme configuration
- Theme presets

### Types

- `ThemeConfig` - Theme configuration interface
- `ThemeMode` - Light/dark mode type
- `ComponentProps` - Base component props interface
- `Size` - Size variants (`'sm' | 'md' | 'lg'`)
- `Variant` - Component variants (`'primary' | 'secondary' | 'tertiary'`)

### Branding

- Branding configuration and utilities

## Documentation

See [grundtone.com](https://grundtone.com) for full documentation.

## License

MIT
