# Usage Guide

Learn how to use Grundtone design tokens in your projects with SCSS, TypeScript, CSS variables, and
Vue 3 composables.

## Quick Start

The most common way to use design tokens is through SCSS functions and mixins:

```scss
@use '@grundtone/design-tokens' as tokens;

.button {
  // Colors
  background-color: tokens.getColor('primary');
  color: tokens.getColor('white');

  // Spacing
  padding: tokens.spacing('sm') tokens.spacing('md');

  // Typography
  font-size: tokens.font-size('base');
  font-weight: tokens.font-weight('medium');

  // Border radius
  border-radius: tokens.radius('md');

  // Transitions
  transition: all tokens.transition-duration('normal') tokens.transition-timing('ease');

  &:hover {
    background-color: tokens.getColor('primary', 600);
  }
}
```

## SCSS Usage

### Importing Tokens

Import tokens at the top of your SCSS file:

```scss
@use '@grundtone/design-tokens' as tokens;
```

You can also use a custom namespace:

```scss
@use '@grundtone/design-tokens' as dt;

.element {
  color: dt.getColor('primary');
}
```

### Color Functions

```scss
// Get a color from the palette
color: tokens.getColor('blue', 500); // #0059b3

// Get a semantic color
background: tokens.getColor('primary'); // #0059b3

// Get all shades of a color
$blue-shades: tokens.getColorPalette('blue');
```

### Spacing Functions

```scss
// Get spacing value
padding: tokens.spacing('md'); // 1rem

// Use in calculations
margin: calc(#{tokens.spacing('md')} * 2); // 2rem
```

### Typography Functions

```scss
// Font size
font-size: tokens.font-size('lg'); // 1.125rem

// Font weight
font-weight: tokens.font-weight('bold'); // 700

// Line height
line-height: tokens.line-height('normal'); // 1.5
```

### Mixins

```scss
// Typography mixin
.heading {
  @include tokens.heading(1); // Applies h1 styles
}

// Responsive mixin
.container {
  @include tokens.respond-to('md') {
    max-width: 768px;
  }
}

// Font base mixin
.text {
  @include tokens.font-base(); // Applies base font styles
}
```

## TypeScript Usage

### Importing Tokens

```typescript
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  RADIUS,
  TRANSITIONS,
  BREAKPOINTS,
} from '@grundtone/design-tokens';
```

### Using Color Tokens

```typescript
// Get a specific color
const primaryColor = COLORS.primary; // '#0059b3'

// Get a color shade
const blue500 = COLORS.blue[500]; // '#0059b3'

// Use in styles
const styles = {
  backgroundColor: COLORS.primary,
  color: COLORS.white,
};
```

### Using Spacing Tokens

```typescript
// Get spacing value
const mediumSpacing = SPACING.md; // '1rem'

// Use in calculations
const doubleSpacing = `calc(${SPACING.md} * 2)`;

// Use in component props
<Box padding={SPACING.md} margin={SPACING.lg} />
```

### Using Typography Tokens

```typescript
// Font families
const baseFont = TYPOGRAPHY.fontFamily.base;
// "IBM Plex Sans", system-ui, sans-serif

// Font sizes
const largeFontSize = TYPOGRAPHY.fontSize.lg; // '1.125rem'

// Font weights
const boldWeight = TYPOGRAPHY.fontWeight.bold; // 700

// Line heights
const normalLineHeight = TYPOGRAPHY.lineHeight.normal; // 1.5
```

### Type Safety

All tokens have TypeScript definitions:

```typescript
import type { ColorName, SpacingSize } from '@grundtone/design-tokens';

function getButtonStyle(color: ColorName, padding: SpacingSize) {
  return {
    backgroundColor: COLORS[color],
    padding: SPACING[padding],
  };
}

// TypeScript will ensure valid values
getButtonStyle('primary', 'md'); // ✓ Valid
getButtonStyle('invalid', 'wrong'); // ✗ Type error
```

## CSS Variables Usage

Design tokens are available as CSS custom properties with the `--grundtone-` prefix:

### Colors

```css
.button {
  /* Color palette */
  background-color: var(--grundtone-color-blue-500);

  /* Semantic colors */
  background-color: var(--grundtone-color-primary);
  color: var(--grundtone-color-text-primary);
  border-color: var(--grundtone-color-border);
}
```

### Spacing

```css
.container {
  padding: var(--grundtone-spacing-md);
  margin: var(--grundtone-spacing-lg);
  gap: var(--grundtone-spacing-sm);
}
```

### Typography

```css
.text {
  font-family: var(--grundtone-font-family-base);
  font-size: var(--grundtone-font-size-base);
  font-weight: var(--grundtone-font-weight-normal);
  line-height: var(--grundtone-line-height-normal);
}
```

### Other Tokens

```css
.card {
  /* Shadows */
  box-shadow: var(--grundtone-shadow-md);

  /* Border radius */
  border-radius: var(--grundtone-radius-md);

  /* Transitions */
  transition: all var(--grundtone-transition-duration-normal)
    var(--grundtone-transition-timing-ease);
}
```

## Vue 3 Composables

For Vue 3 projects, use composables for reactive theme management:

### useTheme

```vue
<script setup>
  import { useTheme } from '@grundtone/composables';

  const { theme, mode, isDark, isLight, setMode, toggleMode } = useTheme();
</script>

<template>
  <div>
    <p>Current mode: {{ mode }}</p>
    <p>Is dark: {{ isDark }}</p>

    <button @click="toggleMode">Toggle theme</button>
    <button @click="setMode('dark')">Dark mode</button>
    <button @click="setMode('light')">Light mode</button>

    <!-- Access theme values -->
    <div :style="{ color: theme.colors.primary }">Primary color text</div>
  </div>
</template>
```

### useRegisteredProperties

```vue
<script setup>
  import { useRegisteredProperties } from '@grundtone/composables';

  const { isSupported, isRegistered, register, getProperty, setProperty } =
    useRegisteredProperties();

  // Check support
  console.log('CSS.registerProperty supported:', isSupported.value);

  // Get property value
  const primaryColor = getProperty('COLOR_PRIMARY');

  // Set custom value
  setProperty('COLOR_PRIMARY', '#ff0000');
</script>
```

## Common Patterns

### Theming Components

```scss
.button {
  // Default theme
  background-color: tokens.getColor('primary');
  color: tokens.getColor('white');

  // Variants
  &--secondary {
    background-color: tokens.getColor('secondary');
  }

  &--success {
    background-color: tokens.getColor('success');
  }

  // Sizes
  &--sm {
    padding: tokens.spacing('xs') tokens.spacing('sm');
    font-size: tokens.font-size('sm');
  }

  &--lg {
    padding: tokens.spacing('md') tokens.spacing('lg');
    font-size: tokens.font-size('lg');
  }
}
```

### Responsive Design

```scss
.container {
  padding: tokens.spacing('sm');

  @include tokens.respond-to('md') {
    padding: tokens.spacing('md');
  }

  @include tokens.respond-to('lg') {
    padding: tokens.spacing('lg');
  }
}
```

### Dark Mode

```css
/* Light mode (default) */
.card {
  background-color: var(--grundtone-color-surface);
  color: var(--grundtone-color-text-primary);
}

/* Dark mode */
[data-theme='dark'] .card {
  background-color: var(--grundtone-color-surface-dark);
  color: var(--grundtone-color-text-primary-dark);
}
```

### Consistent Shadows

```scss
.card {
  box-shadow: tokens.shadow('sm');

  &:hover {
    box-shadow: tokens.shadow('md');
  }

  &--elevated {
    box-shadow: tokens.shadow('lg');
  }
}
```

## Best Practices

### Do

- Use semantic color names (`primary`, `success`) instead of color names (`blue`, `green`)
- Use spacing tokens for all margins, padding, and gaps
- Use typography tokens for consistent font sizing
- Leverage SCSS functions for programmatic token access
- Use TypeScript for type-safe token usage

### Don't

- Hard-code color values (`#0059b3`)
- Use arbitrary spacing values (`23px`)
- Mix token systems (e.g., using both tokens and hard-coded values)
- Override token values without good reason
- Use tokens from other categories inappropriately

## Performance Tips

### Tree Shaking

Only import the tokens you need:

```typescript
// ✓ Import specific tokens
import { COLORS } from '@grundtone/design-tokens';

// ✗ Import everything
import * as tokens from '@grundtone/design-tokens';
```

### CSS Custom Properties

For dynamic theming, use CSS custom properties:

```scss
// Define once
:root {
  --button-bg: #{tokens.getColor('primary')};
}

// Use everywhere
.button {
  background-color: var(--button-bg);
}

// Easy to override
[data-theme='dark'] {
  --button-bg: #{tokens.getColor('primary', 300)};
}
```

### Registered Properties

For better performance with transitions:

```typescript
import { registerCSSProperties } from '@grundtone/design-tokens';

// Register animated properties
registerCSSProperties({
  COLOR_PRIMARY: {
    syntax: '<color>',
    inherits: true,
    initialValue: '#0059b3',
  },
});
```

## Next Steps

- **[Explore Colors](/tokens/colors)** - Browse the color palette
- **[Typography Tokens](/tokens/typography)** - Discover typography options
- **[Spacing System](/tokens/spacing)** - Learn the spacing scale

## Need Help?

- **[GitHub Issues](https://github.com/allanasp/grundtone/issues)** - Report bugs
- **[GitHub Discussions](https://github.com/allanasp/grundtone/discussions)** - Ask questions
