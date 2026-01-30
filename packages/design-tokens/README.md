# Haspen UI Design Tokens

Modern SASS-based design token system following 2025 best practices with comprehensive color
palette, semantic naming, and powerful helper functions.

## Features

- **9-shade Color Palette**: Each color family includes 9 carefully crafted shades (50-900)
- **Semantic Color Mapping**: Meaningful names like `primary`, `success`, `error` for design intent
- **SASS Helper Functions**: Powerful functions for color access and manipulation
- **CSS Custom Properties**: Automatic generation of CSS variables for runtime theming
- **Accessibility First**: WCAG AA compliant color combinations
- **TypeScript Support**: Full type definitions for all design tokens

## Installation

```bash
# Already included in the monorepo
import '@haspen/design-tokens';
```

## Color System

### Color Families

Each color family includes 9 shades following modern design system conventions:

- **Gray** (50-900): Neutral colors for text, backgrounds, and borders
- **Blue** (50-900): Primary brand colors
- **Green** (50-900): Success states and positive actions
- **Red** (50-900): Error states and destructive actions
- **Yellow** (50-900): Warning states and cautionary content
- **Indigo** (50-900): Alternative primary colors

### Semantic Colors

Pre-defined semantic colors for common use cases:

- `primary`, `primary-light`, `primary-dark`
- `secondary`, `secondary-light`, `secondary-dark`
- `success`, `success-light`, `success-dark`
- `warning`, `warning-light`, `warning-dark`
- `error`, `error-light`, `error-dark`
- `info`, `info-light`, `info-dark`

## Usage

### SASS Functions

#### Basic Color Access

```scss
@use '@haspen/design-tokens' as tokens;

.button {
  // Access specific color shades
  background-color: tokens.color('blue', 500); // #3b82f6
  border: 1px solid tokens.color('blue', 600); // #2563eb

  // Use semantic colors
  background-color: tokens.semantic('primary'); // #2563eb
  color: tokens.text('inverse'); // #ffffff
}
```

#### Color Variations

```scss
.button {
  // Create lighter variants (move up the scale)
  background-color: tokens.lighter('blue', 500, 2); // blue-300

  // Create darker variants (move down the scale)
  &:hover {
    background-color: tokens.darker('blue', 500, 1); // blue-600
  }

  // Alpha variants
  &.disabled {
    background-color: tokens.alpha('blue', 500, 0.5); // 50% opacity
  }
}
```

#### Surface and Text Colors

```scss
.card {
  background-color: tokens.surface('background'); // #ffffff
  color: tokens.text('primary'); // #171717
  border: 1px solid tokens.border('light'); // #e5e5e5
}

.alert {
  background-color: tokens.surface('surface-alt'); // #f5f5f5
  color: tokens.text('secondary'); // #404040
}
```

### CSS Custom Properties

All colors are automatically available as CSS custom properties:

```css
.component {
  /* Direct color palette access */
  background-color: var(--color-blue-500);
  border-color: var(--color-gray-300);

  /* Semantic colors */
  color: var(--semantic-primary);

  /* Surface colors */
  background: var(--surface-background);

  /* Text colors */
  color: var(--text-primary);

  /* Border colors */
  border-color: var(--border-medium);
}
```

### Helper Functions for CSS Variables

```scss
.component {
  background-color: tokens.css-color('blue', 500); // var(--color-blue-500)
  color: tokens.css-semantic('primary'); // var(--semantic-primary)
  border-color: tokens.css-border('light'); // var(--border-light)
}
```

### Utility Mixins

#### Color Schemes

```scss
.card {
  // Apply consistent color scheme
  @include tokens.color-scheme('surface', 'primary');

  // Add focus styles
  @include tokens.focus-styles('primary');
}
```

#### Interactive States

```scss
.button {
  // Hover state with different shade
  @include tokens.hover-color('blue', 500, 600);

  // Focus styles
  @include tokens.focus-styles('primary');
}
```

## Advanced Usage

### Custom Color Combinations

```scss
.custom-alert {
  // Combine different color functions
  background-color: tokens.lighter('red', 500, 4); // red-100
  color: tokens.darker('red', 500, 2); // red-700
  border: 1px solid tokens.color('red', 300);

  // Add subtle background with alpha
  &::before {
    background: tokens.alpha('red', 100, 0.5);
  }
}
```

### Theme-aware Components

```scss
.theme-card {
  @include tokens.color-scheme('surface', 'primary');

  // Responsive to CSS custom property changes
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &.emphasized {
    @include tokens.color-scheme('primary', 'white');
  }
}
```

### Error Handling

All functions include comprehensive error handling:

```scss
// This will show a helpful error message
.invalid {
  color: tokens.color('invalid-family', 500);
  // Error: Color family "invalid-family" not found.
  // Available families: gray, blue, green, red, yellow, indigo
}
```

## Available Functions

### Color Access Functions

- `color($family, $shade)` - Get color from palette
- `semantic($name)` - Get semantic color
- `surface($name)` - Get surface color
- `text($name)` - Get text color
- `border($name)` - Get border color

### Color Manipulation Functions

- `lighter($family, $shade, $steps)` - Get lighter shade
- `darker($family, $shade, $steps)` - Get darker shade
- `alpha($family, $shade, $alpha)` - Add transparency

### CSS Variable Functions

- `css-color($family, $shade)` - CSS variable for color
- `css-semantic($name)` - CSS variable for semantic color
- `css-surface($name)` - CSS variable for surface color
- `css-text($name)` - CSS variable for text color
- `css-border($name)` - CSS variable for border color

### Utility Mixins

- `color-scheme($bg, $text, $border)` - Apply color scheme
- `hover-color($family, $base, $hover)` - Hover state colors
- `focus-styles($color)` - Consistent focus styles

## Color Reference

### Gray Scale

- `50`: #fafafa (lightest)
- `100`: #f5f5f5
- `200`: #e5e5e5
- `300`: #d4d4d4
- `400`: #a3a3a3
- `500`: #737373 (middle)
- `600`: #525252
- `700`: #404040
- `800`: #262626
- `900`: #171717 (darkest)

### Blue (Primary)

- `50`: #eff6ff → `900`: #1e3a8a

### Green (Success)

- `50`: #f0fdf4 → `900`: #14532d

### Red (Error)

- `50`: #fef2f2 → `900`: #7f1d1d

### Yellow (Warning)

- `50`: #fefce8 → `900`: #78350f

### Indigo (Alternative)

- `50`: #eef2ff → `900`: #312e81

## Migration from Old System

### Before (Old DKFDS)

```scss
.button {
  background-color: $color-blue-info; // Fixed color
  border: 1px solid $color-gray-400; // Limited palette
}
```

### After (New System)

```scss
.button {
  background-color: tokens.semantic('primary'); // Semantic naming
  border: 1px solid tokens.border('medium'); // Systematic approach

  &:hover {
    background-color: tokens.darker('blue', 500, 1); // Easy variations
  }
}
```

## Browser Support

- All modern browsers (Chrome 60+, Firefox 55+, Safari 11+)
- CSS Custom Properties with fallbacks
- No JavaScript runtime dependencies

## Contributing

When adding new colors:

1. Follow the 9-shade naming convention (50-900)
2. Ensure WCAG AA compliance for text/background combinations
3. Add semantic aliases for common use cases
4. Update documentation and Storybook examples
5. Add appropriate helper functions if needed

## Documentation

All design tokens are fully documented in Storybook with interactive examples:

### Core Token Documentation

- **Color System** - Complete color palette with light-dark() support
- **Semantic Colors** - Intent-based color mapping (primary, success, error, etc.)
- **Typography** - Font families, sizes, weights, and line heights
- **Spacing** - 8px-based spacing scale with responsive support
- **Breakpoints & Grid** - Responsive breakpoints and 12-column grid
- **Visual Effects** - Shadows, border radius, and z-index layering

### Advanced Features

- **Mixins** - SCSS mixins for typography, buttons, layout, and utilities
- **Accessibility** - WCAG 2.1 compliant color calculations and validation
- **TypeScript API** - Full type-safe access to tokens in TS/JS
- **CSS Variables** - Complete reference of all CSS custom properties
- **Functions** - Helper functions for color, spacing, and more

### Quick Links

- [View Storybook Documentation](https://storybook.haspenui.dev)
- [Accessibility Functions](./src/core/_accessibility.scss)
- [SCSS Mixins](./src/mixins/_index.scss)
- [TypeScript Exports](./src/index.ts)

## TypeScript/JavaScript Usage

Import and use design tokens directly in TypeScript/JavaScript:

```typescript
import { colors, spacing, typography } from '@haspen/design-tokens';

// Access color values
const primaryBlue = colors.primary[500]; // '#3b82f6'
const lightGray = colors.gray[100]; // '#f3f4f6'

// Use spacing
const cardPadding = spacing[4]; // '1rem'

// Typography
const baseFont = typography.fontFamily.sans; // ['Inter', 'system-ui', ...]
const fontSize = typography.fontSize.base; // '1rem'
```

See [TypeScript API documentation](./src/TypeScriptAPI.stories.ts) for complete examples.

## Accessibility Features

Built-in WCAG 2.1 accessibility functions:

```scss
@use '@haspen/design-tokens/core/accessibility' as a11y;

// Calculate contrast ratios
$ratio: a11y.contrast-ratio(#333333, #ffffff); // 12.63:1

// Check WCAG compliance
$is-aa: a11y.is-wcag-aa-compliant(#767676, #ffffff); // true

// Automatically choose text color
.badge {
  background-color: $bg-color;
  color: a11y.auto-text-color($bg-color); // White or black
}

// Ensure minimum contrast
.text {
  color: a11y.ensure-contrast(
    #999999,
    // Desired color
    #ffffff,
    // Background
    4.5,
    // Min ratio (WCAG AA)
    'darker' // Adjustment direction
  );
}
```

See [Accessibility documentation](./src/core/Accessibility.stories.ts) for complete reference.

## Changelog

### v1.0.0

- Initial release with modern SASS color system
- 9-shade palette for 6 color families
- Comprehensive SASS helper functions
- CSS custom property generation
- Semantic color mapping
- Full TypeScript support
- WCAG 2.1 accessibility functions
- Complete Storybook documentation
- SCSS mixins library
- CSS variables reference
