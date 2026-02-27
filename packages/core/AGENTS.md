# @ipeeon/core

Foundation package for Ipeeon design system. Provides TypeScript types, theme constants, CSS custom
properties, and Vue 3 theme injection utilities.

## Install

```bash
pnpm add @ipeeon/core
```

Peer dependency: `vue >= 3.5.13`

## Package Exports

```typescript
import {
  // Types
  type ComponentProps,
  type Size,
  type Variant,
  type ThemeMode,
  type ThemeConfig,
  type Theme,
  type ThemeColors,
  type ThemeSpacing,
  type ThemeTypography,
  type ThemeShadows,
  type ThemeRadius,
  type ThemeTransitions,
  type ThemeProviderContext,
  type ThemeProviderProps,

  // Constants
  DEFAULT_THEME,
  THEME_INJECTION_KEY,
} from '@ipeeon/core';
```

Importing the package also loads `style.css` which defines global CSS custom properties.

## Types

### Component Base Types

```typescript
// Base props shared by all components
interface ComponentProps {
  class?: string;
  style?: string | Record<string, string>;
}

// Size variants used across components
type Size = 'sm' | 'md' | 'lg';

// Visual variants for buttons, badges, alerts etc.
type Variant = 'primary' | 'secondary' | 'tertiary';
```

### Theme Types

```typescript
type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  neutral: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  divider: string;
}

interface ThemeSpacing {
  xs: string; // 0.25rem (4px)
  sm: string; // 0.5rem (8px)
  md: string; // 1rem (16px)
  lg: string; // 1.5rem (24px)
  xl: string; // 2rem (32px)
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

interface ThemeTypography {
  fontFamily: { base: string; heading: string; mono: string };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeight: {
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
}

interface ThemeShadows {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

interface ThemeRadius {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

interface ThemeTransitions {
  duration: { fast: string; base: string; slow: string };
  timing: { ease: string; easeIn: string; easeOut: string; easeInOut: string; linear: string };
}

// Complete theme object combining all above
interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  radius: ThemeRadius;
  transitions: ThemeTransitions;
}
```

### Theme Provider Types (Vue 3)

```typescript
interface ThemeProviderContext {
  theme: Readonly<Ref<Theme>>;
  mode: Readonly<Ref<ThemeMode>>;
  isDark: Readonly<Ref<boolean>>;
  isLight: Readonly<Ref<boolean>>;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  applyTheme: () => void;
}

interface ThemeProviderProps {
  mode?: ThemeMode; // Default: 'auto'
  theme?: Partial<Theme>; // Override default theme values
  enableTransitions?: boolean; // CSS transitions on theme change
  persistMode?: boolean; // Save mode to localStorage
  storageKey?: string; // localStorage key name
}
```

## Constants

### DEFAULT_THEME

```typescript
const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: '#0066CC',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, monospace',
    },
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
};
```

### THEME_INJECTION_KEY

Vue 3 injection key for theme context. Use with `provide`/`inject`:

```typescript
import { THEME_INJECTION_KEY } from '@ipeeon/core';

// In parent component
provide(THEME_INJECTION_KEY, themeContext);

// In child component
const theme = inject(THEME_INJECTION_KEY);
```

## CSS Custom Properties

Importing `@ipeeon/core` adds these CSS variables to `:root`:

### Colors

```css
--haspen-color-primary: #007aff;
--haspen-color-secondary: #5856d6;
--haspen-color-success: #34c759;
--haspen-color-warning: #ff9500;
--haspen-color-danger: #ff3b30;
--haspen-color-info: #5ac8fa;
```

### Typography

```css
--haspen-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--haspen-font-size-base: 16px;
--haspen-line-height-base: 1.5;
```

### Spacing (8px base unit)

```css
--haspen-spacing-xs: 4px;
--haspen-spacing-sm: 8px;
--haspen-spacing-md: 16px;
--haspen-spacing-lg: 24px;
--haspen-spacing-xl: 32px;
```

### Border Radius

```css
--haspen-border-radius-sm: 4px;
--haspen-border-radius-md: 8px;
--haspen-border-radius-lg: 12px;
--haspen-border-radius-full: 9999px;
```

### Transitions

```css
--haspen-transition-duration: 0.2s;
--haspen-transition-timing: ease-in-out;
```

## Usage in a Web Project

### Basic Setup

```typescript
// main.ts
import '@ipeeon/core'; // loads CSS custom properties
```

### Using CSS Variables

```css
.card {
  background: var(--haspen-color-primary);
  padding: var(--haspen-spacing-md);
  border-radius: var(--haspen-border-radius-md);
  font-family: var(--haspen-font-family);
  transition: all var(--haspen-transition-duration) var(--haspen-transition-timing);
}
```

### Using Types in Components

```vue
<script setup lang="ts">
  import type { Size, Variant, ComponentProps } from '@ipeeon/core';

  interface ButtonProps extends ComponentProps {
    size?: Size;
    variant?: Variant;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    size: 'md',
    variant: 'primary',
    disabled: false,
  });
</script>
```

### Theme Provider Pattern

```vue
<script setup lang="ts">
  import { provide, ref, computed } from 'vue';
  import {
    THEME_INJECTION_KEY,
    DEFAULT_THEME,
    type ThemeMode,
    type ThemeProviderContext,
  } from '@ipeeon/core';

  const mode = ref<ThemeMode>('auto');
  const isDark = computed(() => mode.value === 'dark');

  const context: ThemeProviderContext = {
    theme: computed(() => ({ ...DEFAULT_THEME, mode: mode.value })),
    mode: readonly(mode),
    isDark,
    isLight: computed(() => !isDark.value),
    setMode: (m: ThemeMode) => {
      mode.value = m;
    },
    toggleMode: () => {
      mode.value = mode.value === 'dark' ? 'light' : 'dark';
    },
    applyTheme: () => {
      /* apply CSS variables to DOM */
    },
  };

  provide(THEME_INJECTION_KEY, context);
</script>
```

## Related Packages

- `@ipeeon/design-tokens` - SCSS variables, utility CSS classes, 12-column grid system
- `@ipeeon/shared` - Validation (CPR, phone), formatters (currency, dates), Danish locale utilities
- `@ipeeon/ui` - Vue 3 components (Button, Icon, ThemeToggle, etc.)
- `@ipeeon/composables` - Vue 3 composables (useToggle, etc.)
- `@ipeeon/nuxt` - Nuxt 3 module that auto-imports everything
