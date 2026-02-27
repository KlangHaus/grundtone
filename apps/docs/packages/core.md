# @grundtone/core

[![npm version](https://img.shields.io/npm/v/@grundtone/core.svg?style=flat)](https://www.npmjs.com/package/@grundtone/core)

Base styles and CSS reset for Grundtone.

## Coming Soon

Documentation for `@grundtone/core` is coming soon.

## Purpose & Intent

The `@grundtone/core` package is the **foundation layer** of Grundtone. Its purpose is to provide a
**clean, consistent baseline** for all styles by normalizing browser defaults and establishing
sensible base styles for HTML elements.

### Key Principles

**Reset Philosophy**

- **Modern CSS Reset**: Removes browser inconsistencies without being overly aggressive
- **Sensible Defaults**: Provides practical base styles that work for most cases
- **Minimal Opinions**: Stays neutral to allow design tokens and components to control styling

**Foundation First**

Core styles must be loaded **before** any other Grundtone styles. It establishes:

- Consistent box-sizing (`border-box`)
- Normalized margins and padding
- Base typography and line heights
- Responsive image behavior
- Accessible focus styles

## Installation

```bash
npm install @grundtone/core
# or
pnpm add @grundtone/core
# or
yarn add @grundtone/core
```

## Architecture

### What This Package Does

1. **Normalizes** browser default styles across all browsers
2. **Resets** problematic default styles (margins, paddings)
3. **Establishes** sensible defaults for HTML elements
4. **Prepares** the DOM for design token application

### Load Order

```
1. @grundtone/core         ← Base reset & defaults
2. @grundtone/design-tokens ← Design values & utilities
3. @grundtone/vue           ← Component styles
4. Your app styles      ← Custom overrides
```

## Quick Usage

### Import in SCSS

```scss
// Import core reset first
@use '@grundtone/core';

// Then import design tokens
@use '@grundtone/design-tokens';

// Now your custom styles
.my-component {
  // Your styles here
}
```

### Import in TypeScript/Vue

```typescript
// Import at app entry point
import '@grundtone/core/dist/index.css';
import '@grundtone/design-tokens/dist/index.css';
```

### Import in HTML

```html
<!-- Load in order -->
<link rel="stylesheet" href="node_modules/@grundtone/core/dist/index.css" />
<link rel="stylesheet" href="node_modules/@grundtone/design-tokens/dist/index.css" />
```

## What's Included

### CSS Reset

- **normalize.css** foundation for cross-browser consistency
- **Modern resets** for semantic HTML5 elements
- **Box-sizing** set to `border-box` globally
- **Margin/padding** reset on common elements

### Base Element Styles

- **Typography**: Base font-family, size, line-height
- **Headings**: h1-h6 with consistent sizing
- **Links**: Focus and hover states
- **Lists**: ul, ol default styles
- **Forms**: Input, button, select base styles
- **Tables**: Basic table styling

### Accessibility Defaults

- **Focus styles**: Visible focus indicators
- **Screen reader**: Hidden content utilities
- **Reduced motion**: Respects user preferences
- **High contrast**: Works with system themes

## Design Intent

### Why This Package Exists

**Without a CSS reset**, browsers apply inconsistent default styles:

- Different margins on headings across browsers
- Varying button styles
- Inconsistent form element appearance
- Different default fonts

**With `@grundtone/core`**:

- ✅ Consistent baseline across all browsers
- ✅ Predictable element behavior
- ✅ Easier to apply design tokens
- ✅ Fewer browser-specific bugs

### What Problem It Solves

1. **Browser Inconsistencies**: Eliminates "works in Chrome but not Firefox" issues
2. **Styling Surprises**: No more unexpected margins or paddings
3. **Accessibility Baseline**: Ensures basic accessibility features are present
4. **Clean Slate**: Provides a neutral foundation for design system styles

## Examples

### Before Core (Browser Defaults)

```html
<h1>Title</h1>
<!-- Has different margins in Chrome vs Firefox -->

<button>Click</button>
<!-- Looks completely different across browsers -->
```

### After Core (Normalized)

```html
<h1>Title</h1>
<!-- Consistent margin across all browsers -->

<button>Click</button>
<!-- Same base style in all browsers, ready for design tokens -->
```

## Integration with Design System

```
@grundtone/core                  ← Establishes baseline
    ↓
@grundtone/design-tokens         ← Applies design values
    ↓
@grundtone/vue                    ← Builds components
    ↓
Your Application              ← Uses components
```

Core provides the **foundation**, design tokens provide the **values**, and components provide the
**implementation**.

## Best Practices

::: tip Do

- Import `@grundtone/core` **first**, before any other styles
- Import once at the app entry point
- Don't override core styles unless absolutely necessary
- Use design tokens for styling instead of fighting core defaults

:::

::: warning Don't

- Don't skip core - it's essential for consistency
- Don't import core multiple times
- Don't heavily customize core - use design tokens instead
- Don't load core after other Grundtone packages

:::

## Documentation

Full documentation coming soon. In the meantime, explore the source code:

- [View on GitHub](https://github.com/allanasp/grundtone/tree/main/packages/core)
- [View on npm](https://www.npmjs.com/package/@grundtone/core)

## License

MIT
