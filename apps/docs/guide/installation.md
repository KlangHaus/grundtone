# Installation

Get started with Grundtone design tokens by installing the package and configuring your build tools.

## Package Installation

Install `@grundtone/design-tokens` using your preferred package manager:

### npm

```bash
npm install @grundtone/design-tokens
```

### pnpm (Recommended)

```bash
pnpm add @grundtone/design-tokens
```

### yarn

```bash
yarn add @grundtone/design-tokens
```

## Requirements

### Minimum Versions

- **Node.js**: ≥ 20.0.0
- **Sass/SCSS**: ≥ 1.50.0 (if using SCSS features)
- **TypeScript**: ≥ 5.0.0 (if using TypeScript)

### Peer Dependencies

The design tokens package has no required peer dependencies. However, if you want to use the Vue 3
composables, you'll also need:

```bash
pnpm add @grundtone/composables vue@^3.5.0
```

## SCSS Setup

To use design tokens in SCSS files, configure your build tool to resolve the package:

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@grundtone/design-tokens' as tokens;`,
        // Silence Sass deprecation warnings
        silenceDeprecations: ['if-function'],
      },
    },
  },
});
```

### Webpack

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@use '@grundtone/design-tokens' as tokens;`,
            },
          },
        ],
      },
    ],
  },
};
```

### Nuxt 3

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@grundtone/design-tokens' as tokens;`,
          silenceDeprecations: ['if-function'],
        },
      },
    },
  },
});
```

### Next.js

```javascript
// next.config.js
module.exports = {
  sassOptions: {
    additionalData: `@use '@grundtone/design-tokens' as tokens;`,
  },
};
```

## TypeScript Setup

The package includes TypeScript definitions out of the box. No additional configuration is needed!

```typescript
// TypeScript imports work automatically
import { COLORS, SPACING, TYPOGRAPHY } from '@grundtone/design-tokens';
```

### Path Aliases (Optional)

For cleaner imports, you can configure TypeScript path aliases:

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@tokens/*": ["node_modules/@grundtone/design-tokens/*"]
    }
  }
}
```

Then use:

```typescript
import { COLORS } from '@tokens';
```

## CSS Variables Setup

Design tokens automatically generate CSS custom properties. To use them, import the CSS file in your
entry point:

### JavaScript/TypeScript Entry

```typescript
// main.ts or index.ts
import '@grundtone/design-tokens/dist/index.css';
```

### HTML Entry

```html
<!-- index.html -->
<link rel="stylesheet" href="node_modules/@grundtone/design-tokens/dist/index.css" />
```

### Vue 3

```typescript
// main.ts
import { createApp } from 'vue';
import '@grundtone/design-tokens/dist/index.css';
import App from './App.vue';

createApp(App).mount('#app');
```

### Nuxt 3

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@grundtone/design-tokens/dist/index.css'],
});
```

## Registering CSS Properties (Optional)

For enhanced performance with CSS animations and transitions, register CSS custom properties:

```typescript
import { registerCSSProperties } from '@grundtone/design-tokens';

// Register all properties
registerCSSProperties();

// Or register specific properties
registerCSSProperties({
  COLOR_PRIMARY: {
    syntax: '<color>',
    inherits: true,
    initialValue: '#0059b3',
  },
});
```

::: tip Note CSS property registration is only supported in Chromium-based browsers (Chrome, Edge,
Opera). It gracefully degrades in other browsers. :::

## Vue 3 Integration

If you're using Vue 3, install the composables package for reactive theme management:

```bash
pnpm add @grundtone/composables
```

Then use the theme provider:

```vue
<template>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</template>

<script setup>
  import { ThemeProvider } from '@grundtone/composables';
</script>
```

## Nuxt 3 Module

For Nuxt 3 projects, use the official Nuxt module for automatic setup:

```bash
pnpm add @grundtone/nuxt
```

Add to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@grundtone/nuxt'],
});
```

The module automatically:

- Imports design tokens globally
- Sets up SCSS configuration
- Registers CSS custom properties
- Provides auto-imports for composables

## Verification

Verify the installation by importing and using a token:

### SCSS

```scss
@use '@grundtone/design-tokens' as tokens;

.button {
  background-color: tokens.getColor('primary');
  padding: tokens.spacing('md');
}
```

### TypeScript

```typescript
import { COLORS, SPACING } from '@grundtone/design-tokens';

console.log(COLORS.primary); // '#0059b3'
console.log(SPACING.md); // '1rem'
```

### CSS Variables

```css
.button {
  background-color: var(--grundtone-color-primary);
  padding: var(--grundtone-spacing-md);
}
```

## Troubleshooting

### SCSS Import Errors

**Error**: `Can't find stylesheet to import`

**Solution**: Ensure your build tool is configured to resolve node_modules. Add to your SCSS loader
configuration:

```javascript
{
  includePaths: ['node_modules'];
}
```

### TypeScript Errors

**Error**: `Cannot find module '@grundtone/design-tokens'`

**Solution**: Ensure TypeScript can resolve the package:

1. Check that `node_modules/@grundtone/design-tokens` exists
2. Run `pnpm install` to reinstall dependencies
3. Restart your TypeScript server

### CSS Variables Not Working

**Error**: CSS custom properties show `undefined` values

**Solution**: Import the CSS file in your entry point:

```typescript
import '@grundtone/design-tokens/dist/index.css';
```

### Sass Deprecation Warnings

**Warning**: `if() function deprecation warnings`

**Solution**: Add silence flag to Sass configuration:

```typescript
{
  silenceDeprecations: ['if-function'];
}
```

## Next Steps

Now that you've installed the package, learn how to use it:

- **[Basic Usage](/guide/usage)** - Learn how to use tokens in your code
- **[Color Tokens](/tokens/colors)** - Explore the color palette
- **[Typography](/tokens/typography)** - Discover typography tokens

## Need Help?

If you encounter any issues during installation:

- Check the [GitHub Issues](https://github.com/allanasp/grundtone/issues) for known problems
- Search [GitHub Discussions](https://github.com/allanasp/grundtone/discussions) for solutions
- Open a new issue if you've found a bug
