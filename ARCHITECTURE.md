# Haspen UI - Architecture Documentation

## 🏗️ System Architecture Overview

### Design Philosophy

Haspen UI is built on four core principles:

1. **Atomic Design Methodology**: Components are organized from atoms to pages
2. **Design Token-Driven Development**: All styling decisions derive from centralized tokens
3. **DKFDS Compliance**: Full implementation of Danish government design standards
4. **Developer Experience**: Modern tooling with TypeScript, Vue 3, and automated workflows

### System Boundaries

```mermaid
graph TB
    subgraph "External Dependencies"
        Vue[Vue 3.5+]
        TS[TypeScript 5.8+]
        Vite[Vite 6.3+]
        Node[Node.js 20+]
    end

    subgraph "Haspen UI Ecosystem"
        subgraph "Core Layer"
            Core[core - Base styles]
            Tokens[design-tokens - DKFDS system]
            Shared[shared - Utilities]
        end

        subgraph "Component Layer"
            UI[ui - Vue components]
            Composables[composables - Vue hooks]
        end

        subgraph "Framework Layer"
            Nuxt[nuxt - Nuxt module]
            Playground[playground - Demo app]
        end

        subgraph "Tooling Layer"
            Storybook[Storybook - Documentation]
            Tests[Vitest - Testing]
            Build[Turbo - Build system]
        end
    end

    subgraph "Consumer Applications"
        VueApp[Vue 3 Applications]
        NuxtApp[Nuxt 3 Applications]
        SSG[Static Site Generators]
    end

    Core --> UI
    Tokens --> UI
    Shared --> UI
    Shared --> Composables
    UI --> Nuxt
    Composables --> Nuxt
    UI --> Playground
    Composables --> Playground

    UI --> VueApp
    Nuxt --> NuxtApp
    UI --> SSG
```

## 📦 Package Architecture

### Core Packages

#### `@haspen/core`

**Purpose**: Foundation layer with CSS reset and base styles **Dependencies**: None **Exports**:

```typescript
// CSS normalization and base styles
import '@haspen/core/dist/index.css';
```

#### `@haspen/design-tokens`

**Purpose**: Complete DKFDS implementation with tokens, functions, and utilities **Dependencies**:
None **Architecture**:

```
src/
├── core/              # Design token definitions
│   ├── _colors.scss   # Color palette (100+ colors)
│   ├── _typography.scss # Font system (IBM Plex Sans)
│   ├── _spacing.scss  # 8px-based spacing scale
│   ├── _shadows.scss  # Elevation system
│   ├── _radius.scss   # Border radius tokens
│   └── _z-index.scss  # Z-index scale
├── functions/         # SCSS functions
│   └── _index.scss    # color(), font-size(), units(), etc.
├── mixins/           # Reusable mixins
│   └── _index.scss   # Typography, layout, component mixins
└── utilities/        # CSS utility classes
    ├── _spacing.scss     # Margin/padding utilities
    ├── _display.scss     # Display utilities
    ├── _flexbox.scss     # Flexbox utilities
    ├── _width.scss       # Width utilities
    ├── _background.scss  # Background utilities
    └── _position.scss    # Position utilities
```

#### `@haspen/shared`

**Purpose**: Framework-agnostic utilities and helpers **Dependencies**: `@haspen/core` **Exports**:

```typescript
// Danish-specific utilities
export { isValidCPR, formatDanishPhone } from './utils/validation';
export { formatCurrency, formatDanishDate } from './utils/format';

// General utilities
export { debounce, throttle } from './helpers';
export type { BaseComponent, ComponentSize } from './types';
```

### Component Layer

#### `@haspen/ui`

**Purpose**: Vue 3 component library following atomic design **Dependencies**: `@haspen/core`,
`@haspen/shared` **Architecture**:

```
src/
├── atoms/           # Basic building blocks
│   ├── Button/
│   ├── Input/
│   ├── Icon/
│   └── Label/
├── molecules/       # Component combinations
│   ├── FormField/
│   ├── Card/
│   └── SearchBox/
├── organisms/       # Complex components
│   ├── Header/
│   ├── Navigation/
│   └── DataTable/
├── templates/       # Page layouts
│   ├── DefaultLayout/
│   └── DashboardLayout/
└── pages/          # Complete pages
    ├── LoginPage/
    └── DashboardPage/
```

**Component Structure**:

```
ComponentName/
├── ComponentName.vue        # Vue SFC with Composition API
├── ComponentName.stories.ts # Storybook documentation
├── ComponentName.test.ts    # Vitest unit tests
├── ComponentName.scss       # Component-specific styles
├── types.ts                # TypeScript interfaces
├── index.ts                # Named exports
└── README.md               # Component documentation
```

#### `@haspen/composables`

**Purpose**: Vue 3 composables for shared logic **Dependencies**: `@haspen/core`, `@haspen/shared`
**Exports**:

```typescript
// DOM utilities
export { useClickOutside } from './clickOutside';
export { useLocalStorage } from './localStorage';

// Form utilities
export { useFormValidation } from './formValidation';
export { useDanishValidation } from './danishValidation';

// UI utilities
export { useBreakpoints } from './breakpoints';
export { useTheme } from './theme';
```

### Integration Layer

#### `@haspen/nuxt`

**Purpose**: Nuxt 3 module for seamless integration **Dependencies**: `@haspen/ui`,
`@haspen/composables` **Features**:

- Auto-imports for components and composables
- SCSS preprocessing configuration
- Build optimizations
- SSR compatibility

#### `@haspen/playground`

**Purpose**: Development and demonstration application **Dependencies**: All packages **Features**:

- Component showcase
- Interactive examples
- Development testing
- Integration examples

## 🎨 Design System Architecture

### Design Token Hierarchy

```mermaid
graph TD
    A[Global Tokens] --> B[Semantic Tokens]
    B --> C[Component Tokens]
    C --> D[Component Variants]

    subgraph "Global Tokens"
        A1[Colors: Primary, Secondary, etc.]
        A2[Typography: Font families, sizes]
        A3[Spacing: 8px base scale]
        A4[Shadows: Elevation levels]
    end

    subgraph "Semantic Tokens"
        B1[Text: text-primary, text-muted]
        B2[Background: bg-surface, bg-overlay]
        B3[Border: border-default, border-focus]
        B4[Interactive: interactive-primary]
    end

    subgraph "Component Tokens"
        C1[Button: button-primary-bg]
        C2[Input: input-border-color]
        C3[Card: card-shadow]
        C4[Header: header-height]
    end
```

### SCSS Function System

**Token Access Functions**:

```scss
// Color tokens
.my-component {
  color: color('primary'); // #747474
  background: color('success'); // #358438
  border-color: color('error'); // #CC2936
}

// Typography tokens
.my-text {
  font-size: font-size('lg'); // 1.8rem (18px)
  line-height: line-height('normal'); // 1.5
  font-family: font-family('primary'); // IBM Plex Sans
}

// Spacing tokens
.my-container {
  padding: units(4); // 32px (4 * 8px)
  margin: spacing('md'); // 1.6rem
  gap: spacing('sm'); // 0.8rem
}

// Shadow tokens
.my-card {
  box-shadow: shadow('medium'); // 0 4px 8px rgba(0,0,0,0.12)...
  border-radius: radius('md'); // 0.5rem
  z-index: z-index('modal'); // 1000
}
```

### Mixin System

**Typography Mixins**:

```scss
.heading-large {
  @include h1-typography;
  // font-family: IBM Plex Sans
  // font-size: 3.2rem (mobile) → 4.8rem (desktop)
  // font-weight: 600
  // line-height: 1.2
}

.body-text {
  @include body-copy-text;
  // font-family: IBM Plex Sans
  // font-size: 1.6rem
  // line-height: 1.5
}
```

**Layout Mixins**:

```scss
.page-container {
  @include container; // Max-width with responsive padding
  @include grid-row; // CSS Grid row setup
}

.content-section {
  @include grid-col(12, 8, 6); // 12 cols mobile, 8 tablet, 6 desktop
}
```

**Component Mixins**:

```scss
.primary-button {
  @include button-primary;
  // All primary button styles
  // Hover, focus, active states
  // Accessibility features
}

.form-input {
  @include form-input;
  // Standard form input styles
  // Focus states, validation styles
}
```

## 🔧 Build System Architecture

### Turborepo Pipeline

```mermaid
graph TB
    subgraph "Build Pipeline"
        A[Level 1: Foundation]
        B[Level 2: Components]
        C[Level 3: Integration]
        D[Level 4: Applications]

        A --> B
        B --> C
        C --> D
    end

    subgraph "Level 1: Foundation"
        A1[core]
        A2[design-tokens]
        A3[shared]
    end

    subgraph "Level 2: Components"
        B1[ui]
        B2[composables]
    end

    subgraph "Level 3: Integration"
        C1[nuxt]
    end

    subgraph "Level 4: Applications"
        D1[playground]
        D2[*-test apps]
    end
```

### Build Tools Configuration

**Package Building (tsup)**:

```typescript
// tsup.config.ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['vue'],
  esbuildOptions(options) {
    options.banner = {
      js: '/* Haspen UI Component Library */',
    };
  },
});
```

**Application Building (Vite)**:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'HaspenUI',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
```

## 🧪 Testing Architecture

### Testing Strategy

```mermaid
graph TB
    A[Unit Tests] --> D[Integration Tests]
    B[Component Tests] --> D
    C[E2E Tests] --> D
    D --> E[Visual Regression]
    E --> F[Accessibility Tests]

    subgraph "Unit Tests (Vitest)"
        A1[Utils testing]
        A2[Logic testing]
        A3[Function testing]
    end

    subgraph "Component Tests (Vue Test Utils)"
        B1[Props testing]
        B2[Events testing]
        B3[Slots testing]
        B4[Behavior testing]
    end

    subgraph "E2E Tests (Playwright)"
        C1[User flows]
        C2[Cross-browser]
        C3[Performance]
    end

    subgraph "Visual Regression (Storybook)"
        E1[Component screenshots]
        E2[State comparisons]
        E3[Responsive testing]
    end
```

### Test Configuration

**Vitest Setup**:

```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      threshold: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
    },
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

**Component Test Pattern**:

```typescript
// Component.test.ts
describe('ComponentName', () => {
  // Props testing
  it('renders with all prop variants', () => {
    const props = { variant: 'primary', size: 'lg' };
    const wrapper = mount(Component, { props });
    expect(wrapper.classes()).toContain('component--primary');
  });

  // Event testing
  it('emits events on interaction', async () => {
    const wrapper = mount(Component);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  // Slot testing
  it('renders slot content correctly', () => {
    const wrapper = mount(Component, {
      slots: { default: 'Test content' },
    });
    expect(wrapper.text()).toContain('Test content');
  });

  // Accessibility testing
  it('meets accessibility requirements', () => {
    const wrapper = mount(Component);
    expect(wrapper.attributes('aria-label')).toBeDefined();
  });
});
```

## 🔐 Security Architecture

### Input Validation

```typescript
// Danish-specific validation
export const isValidCPR = (cpr: string): boolean => {
  // CPR format: DDMMYY-XXXX or DDMMYYXXXX
  const cleaned = cpr.replace(/\D/g, '');
  if (cleaned.length !== 10) return false;

  // Validate date portion
  const day = parseInt(cleaned.substring(0, 2));
  const month = parseInt(cleaned.substring(2, 4));
  const year = parseInt(cleaned.substring(4, 6));

  // Additional validation logic...
  return true;
};
```

### Content Security Policy

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https:'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      },
    },
  },
});
```

### Sanitization

```typescript
// HTML sanitization for user content
import DOMPurify from 'dompurify';

export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
  });
};
```

## 📊 Performance Architecture

### Bundle Optimization

**Code Splitting Strategy**:

```typescript
// Lazy loading for large components
const DataTable = defineAsyncComponent(() => import('./DataTable.vue'));
const Charts = defineAsyncComponent(() => import('./Charts.vue'));

// Tree-shaking friendly exports
export { Button, Input, Card } from './components';
export type { ButtonProps, InputProps } from './types';
```

**CSS Optimization**:

```scss
// Critical CSS extraction
@use 'sass:meta';

// Only include used utilities
@if meta.global-variable-exists('include-utilities') {
  @if $include-utilities {
    @import 'utilities';
  }
}
```

### Runtime Performance

**Vue 3 Optimizations**:

```vue
<script setup lang="ts">
  // Reactive optimizations
  const props = defineProps<Props>();
  const slots = defineSlots<Slots>();

  // Computed caching
  const computedValue = computed(() => {
    return expensiveCalculation(props.data);
  });

  // Event handler memoization
  const handleClick = useCallback(
    (event: Event) => {
      // Handler logic
    },
    [props.id],
  );
</script>
```

## 🌐 Internationalization Architecture

### Danish Localization Support

```typescript
// Locale-specific formatting
export const formatDanishCurrency = (
  amount: number,
  options?: Intl.NumberFormatOptions,
): string => {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 2,
    ...options,
  }).format(amount);
};

// Danish date formatting
export const formatDanishDate = (
  date: Date,
  format: 'short' | 'medium' | 'long' = 'medium',
): string => {
  const options: Intl.DateTimeFormatOptions = {
    short: { day: 'numeric', month: 'numeric', year: 'numeric' },
    medium: { day: 'numeric', month: 'long', year: 'numeric' },
    long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  }[format];

  return new Intl.DateTimeFormat('da-DK', options).format(date);
};
```

### Multi-language Support Architecture

```typescript
// Extensible i18n structure
interface TranslationKeys {
  common: {
    save: string;
    cancel: string;
    delete: string;
  };
  forms: {
    required: string;
    invalid: string;
    success: string;
  };
  components: {
    button: {
      loading: string;
    };
    datePicker: {
      selectDate: string;
    };
  };
}

// Type-safe translation function
export const useTranslation = (): {
  t: (key: keyof TranslationKeys) => string;
  locale: Ref<string>;
} => {
  // Implementation
};
```

This architecture document provides the foundation for understanding, maintaining, and extending the
Haspen UI design system. Each layer is designed for modularity, scalability, and maintainability
while adhering to Danish design standards and modern web development practices.
