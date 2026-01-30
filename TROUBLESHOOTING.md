# Troubleshooting Guide

This guide covers common issues you might encounter when working with Haspen UI and their solutions.

## 🚨 Build Issues

### Package Resolution Errors

**Problem**: `Failed to resolve entry for package "@haspen/ui"`

**Causes**:

- Incorrect package.json exports configuration
- Missing build output files
- Dependency order issues in monorepo

**Solutions**:

1. **Check package.json exports**:

```json
{
  "main": "./dist/index.umd.cjs",
  "module": "./dist/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.umd.cjs"
    }
  }
}
```

2. **Build packages in correct order**:

```bash
pnpm build:packages  # Uses Turbo's dependency-aware building
```

3. **Clear Turbo cache if needed**:

```bash
turbo run build --force  # Force rebuild without cache
```

### TypeScript Compilation Errors

**Problem**: `Cannot find module '@haspen/design-tokens'`

**Causes**:

- Packages not built in dependency order
- TypeScript path mapping issues
- Missing type declarations

**Solutions**:

1. **Build dependencies first**:

```bash
# Build foundation packages first
turbo run build --filter=@haspen/core --filter=@haspen/design-tokens --filter=@haspen/shared

# Then build dependent packages
turbo run build --filter=@haspen/ui --filter=@haspen/composables
```

2. **Verify TypeScript path mapping**:

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@haspen/*": ["packages/*/src"]
    }
  }
}
```

3. **Check for circular dependencies**:

```bash
madge --circular --extensions ts,vue packages/
```

## 🧪 Testing Issues

### Vitest Configuration Problems

**Problem**: `Failed to resolve dependency: markdown-to-jsx`

**Causes**:

- Missing test dependencies
- Incorrect vitest configuration
- Port conflicts

**Solutions**:

1. **Install missing dependencies**:

```bash
pnpm add -D markdown-to-jsx jsdom @vue/test-utils
```

2. **Update vitest.config.ts**:

```typescript
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['.storybook/vitest.setup.ts'],
    deps: {
      inline: ['@haspen/*'],
    },
  },
});
```

3. **Fix port conflicts**:

```bash
# Find process using port
lsof -i :63315

# Kill process if needed
kill -9 <PID>
```

### Storybook Test Integration Issues

**Problem**: `TypeError: Failed to fetch dynamically imported module`

**Causes**:

- Missing Storybook addon dependencies
- Incorrect setup files
- Module resolution issues

**Solutions**:

1. **Fix vitest.setup.ts**:

```typescript
import { setProjectAnnotations } from '@storybook/vue3-vite';
import * as projectAnnotations from './preview';

setProjectAnnotations([projectAnnotations]);
```

2. **Verify Storybook addons**:

```typescript
// .storybook/main.ts
addons: [
  '@storybook/addon-docs',
  '@storybook/addon-vitest',
  // Remove problematic addons if needed
];
```

## 📦 Storybook Issues

### Build Failures

**Problem**: `Could not resolve "@storybook/global"` or similar dependency errors

**Causes**:

- Yarn PnP resolution conflicts
- Version mismatches between Storybook packages
- Missing peer dependencies

**Solutions**:

1. **Install missing peer dependencies**:

```bash
pnpm add -w -D @storybook/global filesize strip-ansi
```

2. **Use consistent Storybook versions**:

```bash
# Check current versions
pnpm list @storybook/*

# Update to consistent version
pnpm add -w -D @storybook/addon-docs@^9.1.1
```

3. **Simplify addon configuration**:

```typescript
// .storybook/main.ts - Remove problematic addons
addons: [
  '@storybook/addon-docs',
  '@storybook/addon-vitest',
  // Comment out: '@chromatic-com/storybook',
  // Comment out: '@storybook/addon-a11y',
];
```

4. **Alternative: Use dev server instead of build**:

```bash
pnpm storybook  # Works better than build for development
```

### Component Documentation Issues

**Problem**: Components not appearing in Storybook

**Causes**:

- Incorrect story file paths
- Missing story exports
- Build configuration issues

**Solutions**:

1. **Verify story file patterns**:

```typescript
// .storybook/main.ts
stories: ['../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'];
```

2. **Check story file structure**:

```typescript
// Component.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import Component from './Component.vue';

const meta: Meta<typeof Component> = {
  title: 'Atoms/Component',
  component: Component,
  tags: ['autodocs'],
};

export default meta;
export const Default: StoryObj<typeof meta> = {};
```

## 🔧 ESLint and Linting Issues

### Parser Errors

**Problem**: `Parsing error: Unexpected token {` for TypeScript/Vue files

**Causes**:

- Missing or incorrect ESLint parsers
- Configuration conflicts
- Missing plugin dependencies

**Solutions**:

1. **Install required parsers and plugins**:

```bash
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin vue-eslint-parser eslint-plugin-vue
```

2. **Update ESLint configuration**:

```javascript
// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import vue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
      },
    },
    plugins: { vue, '@typescript-eslint': tseslint },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: { '@typescript-eslint': tseslint },
  },
];
```

3. **Add ignore patterns**:

```javascript
{
  ignores: ['dist/**', 'node_modules/**', '.nuxt/**', 'storybook-static/**', '**/*.d.ts'];
}
```

### Unused Variable Warnings

**Problem**: False positives for Vue composables and props

**Solutions**:

1. **Use underscore prefix for intentionally unused variables**:

```typescript
// Instead of: const { enabled = true } = options;
const { enabled: _enabled = true } = options;

// Or rename parameters:
export default defineConfig(_options => { ... });
```

2. **Configure TypeScript ESLint rules**:

```javascript
rules: {
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_' }
  ],
}
```

## 🎨 SCSS and Styling Issues

### Design Token Import Errors

**Problem**: `@use '@haspen/design-tokens' as tokens;` not resolving

**Causes**:

- Package not built
- Incorrect SCSS import paths
- Missing SCSS configuration

**Solutions**:

1. **Build design-tokens package first**:

```bash
turbo run build --filter=@haspen/design-tokens
```

2. **Verify SCSS import in Vite config**:

```typescript
// vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@haspen/design-tokens' as tokens;`,
      },
    },
  },
});
```

3. **Check package.json exports for SCSS**:

```json
{
  "exports": {
    "./scss": "./src/index.scss",
    "./dist/style.css": "./dist/index.css"
  }
}
```

### BEM Naming Conflicts

**Problem**: CSS class name conflicts between components

**Solutions**:

1. **Follow strict BEM naming**:

```scss
.haspen-component-name {
  &__element {
    // Element styles
  }

  &--modifier {
    // Modifier styles
  }
}
```

2. **Use scoped styles in Vue components**:

```vue
<style lang="scss" scoped>
  // Automatically scopes CSS to component
</style>
```

## 🚀 Performance Issues

### Slow Build Times

**Problem**: Builds taking too long in development

**Solutions**:

1. **Use Turbo's incremental builds**:

```bash
# Only rebuild changed packages
pnpm build

# Use filters for specific packages
turbo run build --filter=@haspen/ui
```

2. **Enable Turbo cache**:

```bash
# Check cache status
turbo run build --dry-run

# Clear cache if corrupted
rm -rf .turbo
```

3. **Use development builds**:

```bash
pnpm dev  # Faster than full builds
```

### Bundle Size Issues

**Problem**: Large bundle sizes affecting performance

**Solutions**:

1. **Analyze bundle composition**:

```bash
pnpm add -D vite-bundle-analyzer
npx vite-bundle-analyzer packages/ui/dist
```

2. **Enable tree-shaking**:

```json
// package.json
{
  "sideEffects": false
}
```

3. **Use proper exports structure**:

```json
{
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.umd.cjs"
    }
  }
}
```

## 🔍 Debugging Tips

### General Debugging Workflow

1. **Check build order**:

```bash
turbo run build --graph  # Visualize build dependencies
```

2. **Clear all caches**:

```bash
pnpm clean          # Clean all packages
rm -rf node_modules .turbo
pnpm install
```

3. **Check for version conflicts**:

```bash
pnpm list --depth=0  # Check top-level dependencies
pnpm why package-name  # Check why package is installed
```

4. **Enable verbose logging**:

```bash
pnpm build --verbose
turbo run build --verbosity=2
```

### Environment-Specific Issues

**macOS/Linux**:

- Check file permissions: `chmod +x scripts/*`
- Verify case-sensitivity in file names

**Windows**:

- Use PowerShell or WSL2 for best compatibility
- Check path length limitations
- Ensure line endings are LF (not CRLF)

**Node.js Versions**:

- Use Node.js 20+ (check with `node --version`)
- Consider using `volta` for version management

## 🆘 Getting Help

If you're still having issues after trying these solutions:

1. **Check existing issues**: [GitHub Issues](https://github.com/your-org/haspen-ui/issues)
2. **Search discussions**: [GitHub Discussions](https://github.com/your-org/haspen-ui/discussions)
3. **Create a new issue**: Include:
   - Error messages (full stack traces)
   - Environment details (OS, Node.js version, etc.)
   - Steps to reproduce
   - What you've already tried

## 📚 Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Vitest Documentation](https://vitest.dev/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [DKFDS Documentation](https://designsystem.dk/)

---

**Still need help?** Don't hesitate to ask! The Danish development community is here to support each
other. 🇩🇰
