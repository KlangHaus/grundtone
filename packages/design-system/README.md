# @grundtone/design-system

Design tokens, SCSS functions, mixins, and CSS utilities for the [Grundtone](https://grundtone.com)
design system. This is the web styling layer - for React Native, use `@grundtone/react-native`
instead.

## Installation

```bash
npm install @grundtone/design-system
```

## SCSS usage

```scss
@use '@grundtone/design-system/scss' as tokens;

.button {
  background-color: tokens.color('primary');
  font-size: tokens.font-size('md');
  padding: tokens.units(2) tokens.units(3);
  box-shadow: tokens.shadow('small');
  border-radius: tokens.radius('md');
}
```

### Color functions

```scss
// Palette colors (9 shades per family: 50-900)
color: tokens.color('blue', 500);

// Semantic colors
background: tokens.semantic('primary');
color: tokens.text('primary');
border-color: tokens.border('light');
background: tokens.surface('background');

// Manipulation
background: tokens.lighter('blue', 500, 2); // 2 steps lighter
background: tokens.darker('blue', 500, 1); // 1 step darker
background: tokens.alpha('blue', 500, 0.5); // 50% opacity
```

### CSS custom properties

All tokens are also available as CSS variables:

```css
.component {
  background-color: var(--color-blue-500);
  color: var(--text-primary);
  border-color: var(--border-medium);
}
```

### Mixins

```scss
@include tokens.color-scheme('surface', 'primary');
@include tokens.hover-color('blue', 500, 600);
@include tokens.focus-styles('primary');
```

## Entry points

| Import                                      | Contents                  |
| ------------------------------------------- | ------------------------- |
| `@grundtone/design-system/scss`             | Full token library        |
| `@grundtone/design-system/scss/lib`         | Functions and mixins only |
| `@grundtone/design-system/scss/colors`      | Color variables           |
| `@grundtone/design-system/scss/breakpoints` | Responsive breakpoints    |

## TypeScript usage

```typescript
import { colors, spacing, typography } from '@grundtone/design-system';

const primary = colors.primary[500];
const padding = spacing[4];
```

## What's included

- 9-shade color palette (gray, blue, green, red, yellow, indigo)
- Semantic color mapping (primary, success, error, warning, info)
- IBM Plex Sans typography system
- 8px-based spacing scale
- Responsive breakpoints and 12-column grid
- Shadow, radius, and z-index tokens
- WCAG 2.1 AA accessibility functions
- Utility CSS classes

## Documentation

See [grundtone.com](https://grundtone.com) for the full token reference, interactive examples, and
SCSS API docs.

## License

MIT
