import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Getting Started/Installation',
  parameters: {
    docs: {
      description: {
        component: `
# Installation Guide

Complete guide to installing and using HäspenUI Design System in your projects.

## Table of Contents

- [Vue 3 Projects](#vue-3-projects)
- [Nuxt 3 Projects](#nuxt-3-projects)
- [Using Design Tokens Only](#design-tokens-only)
- [Verification](#verification)

---

## Vue 3 Projects

### Step 1: Install Packages

\`\`\`bash
# Using pnpm (recommended)
pnpm add @ipeeon/ui @ipeeon/design-tokens

# Using npm
npm install @ipeeon/ui @ipeeon/design-tokens

# Using yarn
yarn add @ipeeon/ui @ipeeon/design-tokens
\`\`\`

### Step 2: Import Styles and Components

#### Option A: Global Registration (Recommended)

\`\`\`typescript
// main.ts
import { createApp } from 'vue';
import HaspenUI from '@ipeeon/ui';
import '@ipeeon/design-tokens/dist/index.css';
import '@ipeeon/ui/dist/index.css';
import App from './App.vue';

const app = createApp(App);
app.use(HaspenUI);
app.mount('#app');
\`\`\`

#### Option B: Individual Component Imports

\`\`\`vue
<template>
  <ThemeProvider>
    <Button variant="primary">Click me</Button>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { Button, ThemeProvider } from '@ipeeon/ui';
import '@ipeeon/design-tokens/dist/index.css';
import '@ipeeon/ui/dist/index.css';
</script>
\`\`\`

### Step 3: Add TypeScript Support (Optional)

\`\`\`typescript
// vite-env.d.ts or env.d.ts
/// <reference types="@ipeeon/ui/types" />
\`\`\`

### Step 4: Configure Vite (if needed)

\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`@use "@ipeeon/design-tokens" as tokens;\`
      }
    }
  }
});
\`\`\`

---

## Nuxt 3 Projects

### Step 1: Install Nuxt Module

\`\`\`bash
# Using pnpm (recommended)
pnpm add @ipeeon/nuxt

# Using npm
npm install @ipeeon/nuxt

# Using yarn
yarn add @ipeeon/nuxt
\`\`\`

### Step 2: Add Module to Nuxt Config

\`\`\`typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@ipeeon/nuxt'],

  haspen: {
    // Auto-import components (default: true)
    components: true,

    // Auto-import composables (default: true)
    composables: true,

    // Component name prefix (default: 'Haspen')
    prefix: 'Haspen',
  },

  // Optional: Add custom SCSS variables
  css: ['@ipeeon/design-tokens/dist/index.css'],
});
\`\`\`

### Step 3: Use Components Without Imports

\`\`\`vue
<template>
  <div>
    <!-- Components are auto-imported -->
    <HaspenButton variant="primary">Click me</HaspenButton>
    <HaspenThemeProvider>
      <HaspenCard>Content here</HaspenCard>
    </HaspenThemeProvider>
  </div>
</template>

<script setup lang="ts">
// No imports needed! Components are auto-registered
// Composables are also auto-imported
const theme = useTheme();
</script>
\`\`\`

---

## Design Tokens Only

If you only need design tokens (colors, spacing, typography) without components:

### Step 1: Install Design Tokens

\`\`\`bash
pnpm add @ipeeon/design-tokens
\`\`\`

### Step 2: Import CSS Variables

\`\`\`typescript
// main.ts or app.ts
import '@ipeeon/design-tokens/dist/index.css';
\`\`\`

### Step 3: Use in SCSS

\`\`\`scss
@use '@ipeeon/design-tokens' as tokens;

.my-component {
  // Colors
  background-color: tokens.color('blue', 500);
  color: tokens.text('primary');

  // Spacing
  padding: tokens.spacing('md');
  margin: tokens.spacing('lg');

  // Typography
  font-family: tokens.font-family('base');
  font-size: tokens.font-size('lg');

  // Shadows & Radius
  box-shadow: tokens.shadow('md');
  border-radius: tokens.radius('md');
}
\`\`\`

### Step 4: Use CSS Custom Properties

\`\`\`css
.my-component {
  /* Colors */
  background-color: var(--haspen-color-blue-500);
  color: var(--haspen-text-primary);

  /* Spacing */
  padding: var(--haspen-spacing-md);
  margin: var(--haspen-spacing-lg);

  /* Typography */
  font-family: var(--haspen-font-family-base);
  font-size: var(--haspen-font-size-lg);

  /* Shadows & Radius */
  box-shadow: var(--haspen-shadow-md);
  border-radius: var(--haspen-radius-md);
}
\`\`\`

---

## Verification

After installation, verify everything works:

### 1. Check CSS Variables

Open browser DevTools Console and run:

\`\`\`javascript
// Check if CSS variables are loaded
const styles = getComputedStyle(document.documentElement);
console.log('Primary color:', styles.getPropertyValue('--haspen-color-blue-500'));
console.log('Spacing MD:', styles.getPropertyValue('--haspen-spacing-md'));
\`\`\`

### 2. Test a Component

\`\`\`vue
<template>
  <ThemeProvider>
    <div style="padding: 2rem;">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <ThemeToggle />
    </div>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { Button, ThemeProvider, ThemeToggle } from '@ipeeon/ui';
</script>
\`\`\`

### 3. Check Theme Functionality

\`\`\`vue
<script setup lang="ts">
import { useTheme } from '@ipeeon/composables';

const { theme, mode, isDark, toggleMode } = useTheme();

// Log current theme
console.log('Current theme:', theme.value);
console.log('Current mode:', mode.value);
console.log('Is dark mode:', isDark.value);

// Toggle theme
toggleMode();
</script>
\`\`\`

---

## Next Steps

- 📖 [Customization Guide](/docs/getting-started-customization--docs) - Learn how to customize colors, fonts, and spacing
- 🎨 [Design Tokens](/docs/design-tokens-overview--docs) - Explore the complete token system
- 🧩 [Components](/docs/components-button--docs) - Browse available components
- 🎯 [TypeScript API](/docs/design-tokens-typescript-api--docs) - Use tokens in TypeScript/JavaScript

---

## Troubleshooting

### CSS Variables Not Loading

**Problem**: CSS custom properties return empty values

**Solution**: Ensure you import the CSS file:
\`\`\`typescript
import '@ipeeon/design-tokens/dist/index.css';
\`\`\`

### Components Not Rendering

**Problem**: Components show as undefined or don't render

**Solution**:
1. Check that you've imported components correctly
2. Wrap components in \`<ThemeProvider>\`
3. Verify Vue 3 peer dependency (^3.5.0)

### TypeScript Errors

**Problem**: Type errors when using components

**Solution**: Add type reference:
\`\`\`typescript
/// <reference types="@ipeeon/ui" />
\`\`\`

### Build Errors with Vite

**Problem**: Vite fails to resolve \`@ipeeon\` packages

**Solution**: Add to \`vite.config.ts\`:
\`\`\`typescript
export default defineConfig({
  resolve: {
    dedupe: ['vue']
  }
});
\`\`\`

---

## Peer Dependencies

Make sure you have the required peer dependencies installed:

\`\`\`json
{
  "vue": "^3.5.0"
}
\`\`\`

For Nuxt projects:
\`\`\`json
{
  "nuxt": "^3.0.0",
  "vue": "^3.5.0"
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Installation Guide</h1>
        <p style="font-size: 1.25rem; color: #666; margin-bottom: 2rem;">
          Get started with HäspenUI Design System in minutes
        </p>

        <div style="background: #f5f5f5; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
          <h2 style="margin-top: 0;">Quick Start</h2>
          <p>Choose your framework:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 0.5rem;">
              <strong>Vue 3:</strong> <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px;">pnpm add @ipeeon/ui @ipeeon/design-tokens</code>
            </li>
            <li style="margin-bottom: 0.5rem;">
              <strong>Nuxt 3:</strong> <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px;">pnpm add @ipeeon/nuxt</code>
            </li>
            <li>
              <strong>Design Tokens Only:</strong> <code style="background: white; padding: 0.25rem 0.5rem; border-radius: 4px;">pnpm add @ipeeon/design-tokens</code>
            </li>
          </ul>
        </div>

        <p>See the <strong>Docs</strong> tab above for complete installation instructions.</p>
      </div>
    `,
  }),
};
