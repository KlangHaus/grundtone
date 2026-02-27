# @grundtone/design-tokens

[![npm version](https://img.shields.io/npm/v/@grundtone/design-tokens.svg?style=flat)](https://www.npmjs.com/package/@grundtone/design-tokens)
[![npm downloads](https://img.shields.io/npm/dm/@grundtone/design-tokens.svg?style=flat)](https://www.npmjs.com/package/@grundtone/design-tokens)

Platform-agnostic design tokens and utility classes for building consistent user interfaces.

## Installation

```bash
npm install @grundtone/design-tokens
# or
pnpm add @grundtone/design-tokens
# or
yarn add @grundtone/design-tokens
```

## Overview

The `@grundtone/design-tokens` package provides:

- **Design Tokens**: Platform-agnostic design values (colors, typography, spacing, etc.)
- **HTML Utilities**: CSS utility classes for rapid HTML/CSS development
- **SCSS Functions & Mixins**: Programmatic access to design tokens

## What's Included

### Design Tokens

Platform-agnostic design values that work across Web, iOS, Android, and React Native:

- **Colors**: Primary, secondary, neutrals, semantic colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (0-6)
- **Shadows**: Elevation levels
- **Border Radius**: Rounding values
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Stacking context values

[View Design Tokens Documentation →](/tokens/colors)

### HTML Utilities

CSS utility classes for HTML development:

- **Layout**: Containers, Grid, Flexbox, Display, Position, Width
- **Styling**: Background, Spacing, Text Align
- **Accessibility**: Screen reader utilities

[View HTML Utilities Documentation →](/utilities/containers)

## Usage

### Import Everything

```scss
@use '@grundtone/design-tokens';
```

### Import Design Tokens Only

```scss
@use '@grundtone/design-tokens/core';
```

### Import HTML Utilities Only

```scss
@use '@grundtone/design-tokens/utilities';
```

### Using Design Tokens in SCSS

```scss
@use '@grundtone/design-tokens' as tokens;

.card {
  background-color: tokens.$color-primary;
  padding: tokens.spacing(4);
  border-radius: tokens.$border-radius-md;
  box-shadow: tokens.$shadow-md;
}

// Responsive
.container {
  padding: tokens.spacing(3);

  @include tokens.media-breakpoint-up('lg') {
    padding: tokens.spacing(6);
  }
}
```

### Using HTML Utilities in HTML

```html
<!-- Container with grid layout -->
<div class="container py-6">
  <div class="grid grid-cols-3 gap-4">
    <div class="p-4 bg-light">Column 1</div>
    <div class="p-4 bg-light">Column 2</div>
    <div class="p-4 bg-light">Column 3</div>
  </div>
</div>

<!-- Flexbox layout with spacing -->
<div class="d-flex justify-content-between align-items-center mb-4">
  <h1>Title</h1>
  <button>Action</button>
</div>
```

## Platform Usage

### Web (HTML/CSS)

```html
<!-- Import compiled CSS -->
<link rel="stylesheet" href="@grundtone/design-tokens/dist/index.css" />

<!-- Use utility classes -->
<div class="container">
  <div class="grid grid-cols-2 gap-4">
    <div>Content</div>
  </div>
</div>
```

### Vue 3 / Nuxt

```vue
<script setup lang="ts">
  // TypeScript types for tokens
  import type { ColorToken, SpacingToken } from '@grundtone/design-tokens';
</script>

<style lang="scss">
  @use '@grundtone/design-tokens' as tokens;

  .component {
    color: tokens.$color-primary;
    padding: tokens.spacing(4);
  }
</style>
```

### iOS (Swift/UIKit)

```swift
// Use design tokens in Swift
let primaryColor = UIColor(named: "primary")
let spacing4 = CGFloat(16) // 1rem = 16px
```

### Android (Kotlin/Jetpack Compose)

```kotlin
// Use design tokens in Compose
@Composable
fun MyComponent() {
    Column(
        modifier = Modifier.padding(16.dp) // spacing(4)
    ) {
        Text(
            text = "Hello",
            color = Color(0xFF0060E6) // primary color
        )
    }
}
```

### React Native

```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16, // spacing(4)
    backgroundColor: '#0060E6', // primary color
  },
});
```

## Package Contents

```
@grundtone/design-tokens/
├── core/              # Design tokens (SCSS variables, functions)
│   ├── _colors.scss
│   ├── _typography.scss
│   ├── _spacing.scss
│   ├── _shadows.scss
│   ├── _border-radius.scss
│   ├── _breakpoints.scss
│   └── _z-index.scss
├── utilities/         # HTML utility classes
│   ├── _containers.scss
│   ├── _grid.scss
│   ├── _flexbox.scss
│   ├── _spacing.scss
│   └── ...
└── dist/             # Compiled CSS
    └── index.css     # Full CSS bundle
```

## Documentation

- [Design Tokens →](/tokens/colors)
- [HTML Utilities →](/utilities/containers)
- [Getting Started →](/guide/welcome)

## License

MIT
