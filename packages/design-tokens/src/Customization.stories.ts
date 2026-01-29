import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta = {
  title: 'Getting Started/Customization',
  parameters: {
    docs: {
      description: {
        component: `
# Customization Guide

Learn how to customize HäspenUI Design System to match your brand and design requirements.

## Table of Contents

- [Customizing Colors](#customizing-colors)
- [Customizing Typography](#customizing-typography)
- [Customizing Spacing](#customizing-spacing)
- [Theme Configuration](#theme-configuration)
- [Component Customization](#component-customization)
- [Advanced Customization](#advanced-customization)

---

## Customizing Colors

### Method 1: CSS Custom Properties (Runtime)

Override CSS variables to change colors at runtime without rebuilding:

\`\`\`css
/* styles/custom-theme.css */
:root {
  /* Override primary color */
  --haspen-color-primary: #ff6b6b;
  --haspen-color-primary-light: #ff8787;
  --haspen-color-primary-dark: #ee5a5a;

  /* Override semantic colors */
  --haspen-semantic-primary: #ff6b6b;
  --haspen-semantic-success: #51cf66;
  --haspen-semantic-error: #ff6b6b;
  --haspen-semantic-warning: #ffd43b;

  /* Override text colors */
  --haspen-text-primary: #1a1a1a;
  --haspen-text-secondary: #666666;

  /* Override surface colors */
  --haspen-surface-background: #ffffff;
  --haspen-surface-surface: #f8f9fa;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --haspen-color-primary: #4dabf7;
  --haspen-text-primary: #e9ecef;
  --haspen-text-secondary: #adb5bd;
  --haspen-surface-background: #1a1a1a;
  --haspen-surface-surface: #2c2c2c;
}
\`\`\`

**Usage:**

\`\`\`typescript
// main.ts
import '@ipeeon/design-tokens/dist/index.css';
import './styles/custom-theme.css'; // Import after design tokens
\`\`\`

### Method 2: SCSS Variables (Build-time)

Create custom SCSS with design token functions:

\`\`\`scss
// styles/_custom-colors.scss
@use '@ipeeon/design-tokens' as tokens;

// Define your custom color palette
$brand-primary: #ff6b6b;
$brand-secondary: #4dabf7;
$brand-success: #51cf66;

// Use throughout your app
.my-button {
  background-color: $brand-primary;

  &:hover {
    background-color: tokens.darker('red', 500, 1);
  }
}

// Or use token functions directly
.my-card {
  background-color: tokens.color('blue', 50);
  border: 1px solid tokens.color('blue', 200);
  color: tokens.text('primary');
}
\`\`\`

### Method 3: Complete Color Palette Override

Replace the entire color system:

\`\`\`css
:root {
  /* Blue palette - your brand colors */
  --haspen-color-blue-50: #e3f2fd;
  --haspen-color-blue-100: #bbdefb;
  --haspen-color-blue-200: #90caf9;
  --haspen-color-blue-300: #64b5f6;
  --haspen-color-blue-400: #42a5f5;
  --haspen-color-blue-500: #2196f3; /* Your brand primary */
  --haspen-color-blue-600: #1e88e5;
  --haspen-color-blue-700: #1976d2;
  --haspen-color-blue-800: #1565c0;
  --haspen-color-blue-900: #0d47a1;

  /* Map semantic colors to your palette */
  --haspen-semantic-primary: var(--haspen-color-blue-500);
  --haspen-semantic-primary-light: var(--haspen-color-blue-300);
  --haspen-semantic-primary-dark: var(--haspen-color-blue-700);
}
\`\`\`

### Method 4: JavaScript/TypeScript

Dynamically change colors at runtime:

\`\`\`typescript
// utils/theme.ts
export function setCustomColors(colors: {
  primary?: string;
  secondary?: string;
  success?: string;
  error?: string;
  warning?: string;
}) {
  const root = document.documentElement;

  if (colors.primary) {
    root.style.setProperty('--haspen-semantic-primary', colors.primary);
  }
  if (colors.secondary) {
    root.style.setProperty('--haspen-semantic-secondary', colors.secondary);
  }
  if (colors.success) {
    root.style.setProperty('--haspen-semantic-success', colors.success);
  }
  if (colors.error) {
    root.style.setProperty('--haspen-semantic-error', colors.error);
  }
  if (colors.warning) {
    root.style.setProperty('--haspen-semantic-warning', colors.warning);
  }
}

// Usage
setCustomColors({
  primary: '#ff6b6b',
  secondary: '#4dabf7',
  success: '#51cf66',
});
\`\`\`

---

## Customizing Typography

### Method 1: Override Font Families

\`\`\`css
:root {
  /* Change base font */
  --haspen-font-family-base: 'Inter', 'Helvetica Neue', Arial, sans-serif;

  /* Change monospace font */
  --haspen-font-family-mono: 'Fira Code', 'Consolas', monospace;
}
\`\`\`

### Method 2: Custom Font Sizes

\`\`\`css
:root {
  /* Adjust font size scale */
  --haspen-font-size-xs: 0.8rem;    /* 12.8px */
  --haspen-font-size-sm: 0.9rem;    /* 14.4px */
  --haspen-font-size-base: 1rem;    /* 16px */
  --haspen-font-size-lg: 1.15rem;   /* 18.4px */
  --haspen-font-size-xl: 1.35rem;   /* 21.6px */
  --haspen-font-size-2xl: 1.6rem;   /* 25.6px */
  --haspen-font-size-3xl: 2rem;     /* 32px */
}
\`\`\`

### Method 3: Load Custom Fonts

\`\`\`html
<!-- index.html -->
<head>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
</head>
\`\`\`

\`\`\`css
/* styles/typography.css */
:root {
  --haspen-font-family-base: 'Inter', system-ui, sans-serif;
}
\`\`\`

### Method 4: SCSS Typography Customization

\`\`\`scss
@use '@ipeeon/design-tokens' as tokens;

// Custom typography scale
.heading-1 {
  font-family: tokens.font-family('base');
  font-size: tokens.font-size('3xl');
  font-weight: tokens.font-weight('bold');
  line-height: tokens.line-height('tight');
}

.heading-2 {
  font-family: tokens.font-family('base');
  font-size: tokens.font-size('2xl');
  font-weight: tokens.font-weight('bold');
  line-height: tokens.line-height('tight');
}

.body-large {
  font-family: tokens.font-family('base');
  font-size: tokens.font-size('lg');
  line-height: tokens.line-height('normal');
}
\`\`\`

---

## Customizing Spacing

### Method 1: Override Spacing Scale

\`\`\`css
:root {
  /* Customize spacing scale (8px base) */
  --haspen-spacing-xs: 0.25rem;  /* 4px */
  --haspen-spacing-sm: 0.5rem;   /* 8px */
  --haspen-spacing-md: 1rem;     /* 16px */
  --haspen-spacing-lg: 1.5rem;   /* 24px */
  --haspen-spacing-xl: 2rem;     /* 32px */
  --haspen-spacing-2xl: 3rem;    /* 48px */
  --haspen-spacing-3xl: 4rem;    /* 64px */
}
\`\`\`

### Method 2: Use Different Base Unit

Switch from 8px to 4px or 12px base:

\`\`\`css
:root {
  /* 4px base */
  --haspen-spacing-xs: 0.25rem;  /* 4px */
  --haspen-spacing-sm: 0.5rem;   /* 8px */
  --haspen-spacing-md: 0.75rem;  /* 12px */
  --haspen-spacing-lg: 1rem;     /* 16px */
  --haspen-spacing-xl: 1.5rem;   /* 24px */
}
\`\`\`

---

## Theme Configuration

### Complete Theme Object

Use Vue composable to configure theme:

\`\`\`vue
<template>
  <ThemeProvider :theme="customTheme">
    <YourApp />
  </ThemeProvider>
</template>

<script setup lang="ts">
import { ThemeProvider } from '@ipeeon/ui';
import type { Theme } from '@ipeeon/core';

const customTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#ff6b6b',
    secondary: '#4dabf7',
    success: '#51cf66',
    warning: '#ffd43b',
    error: '#fa5252',
    info: '#339af0',
    background: '#ffffff',
    surface: '#f8f9fa',
    'text-primary': '#212529',
    'text-secondary': '#868e96',
    border: '#dee2e6',
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
      base: '"Inter", system-ui, sans-serif',
      mono: '"Fira Code", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  radius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
};
</script>
\`\`\`

### Partial Theme Overrides

Merge with default theme:

\`\`\`vue
<script setup lang="ts">
import { ThemeProvider } from '@ipeeon/ui';
import { DEFAULT_THEME } from '@ipeeon/core';

const customTheme = {
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    primary: '#ff6b6b',
    secondary: '#4dabf7',
  },
};
</script>
\`\`\`

---

## Component Customization

### Method 1: CSS Custom Properties Per Component

\`\`\`css
/* Override button styles */
.haspen-button {
  --button-padding: 0.75rem 1.5rem;
  --button-border-radius: 0.5rem;
  --button-font-weight: 600;
}

/* Override card styles */
.haspen-card {
  --card-padding: 1.5rem;
  --card-border-radius: 0.75rem;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
\`\`\`

### Method 2: Global Component Styles

\`\`\`scss
@use '@ipeeon/design-tokens' as tokens;

// Customize all buttons
.haspen-button {
  border-radius: tokens.radius('lg');
  font-weight: tokens.font-weight('bold');
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &--primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}

// Customize all cards
.haspen-card {
  border-radius: tokens.radius('xl');
  box-shadow: tokens.shadow('lg');
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}
\`\`\`

---

## Advanced Customization

### Multi-Brand Theming

Support multiple brands in one application:

\`\`\`css
/* Brand A */
[data-brand="brandA"] {
  --haspen-semantic-primary: #ff6b6b;
  --haspen-semantic-secondary: #4dabf7;
  --haspen-font-family-base: 'Inter', sans-serif;
}

/* Brand B */
[data-brand="brandB"] {
  --haspen-semantic-primary: #51cf66;
  --haspen-semantic-secondary: #ffd43b;
  --haspen-font-family-base: 'Roboto', sans-serif;
}
\`\`\`

\`\`\`typescript
// Switch brands dynamically
function setBrand(brand: 'brandA' | 'brandB') {
  document.documentElement.setAttribute('data-brand', brand);
}
\`\`\`

### Responsive Typography

\`\`\`css
:root {
  --haspen-font-size-base: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --haspen-font-size-base: 1.0625rem; /* 17px */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --haspen-font-size-base: 1.125rem; /* 18px */
  }
}
\`\`\`

### Custom Design Tokens

Add your own design tokens:

\`\`\`css
:root {
  /* Custom tokens */
  --my-brand-accent: #ff6b6b;
  --my-brand-highlight: #ffd43b;
  --my-custom-spacing-huge: 8rem;
  --my-custom-shadow-glow: 0 0 20px rgba(255, 107, 107, 0.5);
}
\`\`\`

\`\`\`scss
@use '@ipeeon/design-tokens' as tokens;

.my-special-card {
  background: var(--my-brand-accent);
  padding: var(--my-custom-spacing-huge);
  box-shadow: var(--my-custom-shadow-glow);

  // Mix with existing tokens
  border-radius: tokens.radius('lg');
  color: tokens.text('inverse');
}
\`\`\`

---

## Best Practices

### 1. Use CSS Custom Properties for Runtime Changes

✅ **Good** - Easy to change, no rebuild needed:
\`\`\`css
:root {
  --haspen-semantic-primary: #ff6b6b;
}
\`\`\`

❌ **Avoid** - Requires rebuild:
\`\`\`scss
$primary-color: #ff6b6b;
\`\`\`

### 2. Maintain Consistency

Keep your customizations aligned with the design system:
- Use the same spacing scale
- Maintain color contrast ratios (WCAG AA)
- Follow naming conventions

### 3. Document Customizations

Create a theme documentation file:

\`\`\`typescript
// config/theme.ts
/**
 * Custom theme configuration for [Your Brand]
 *
 * Primary Color: #ff6b6b (Brand Red)
 * Secondary Color: #4dabf7 (Brand Blue)
 * Font: Inter
 */

export const THEME_CONFIG = {
  colors: {
    primary: '#ff6b6b',
    secondary: '#4dabf7',
  },
  // ... rest of config
};
\`\`\`

### 4. Test Dark Mode

Always test customizations in both light and dark modes:

\`\`\`css
:root {
  --haspen-semantic-primary: #ff6b6b;
}

[data-theme="dark"] {
  --haspen-semantic-primary: #ff8787; /* Lighter for dark mode */
}
\`\`\`

---

## Next Steps

- 📖 [Design Tokens](/docs/design-tokens-overview--docs) - Explore all available tokens
- 🎨 [Color System](/docs/design-tokens-colors--docs) - Complete color customization
- 🔤 [Typography](/docs/design-tokens-typography--docs) - Font and text customization
- 📏 [Spacing](/docs/design-tokens-spacing--docs) - Spacing system customization
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorCustomization: Story = {
  render: () => ({
    template: `
      <div style="padding: 2rem;">
        <h2>Color Customization Example</h2>
        <p>Change primary color using CSS custom properties:</p>

        <div style="display: flex; gap: 1rem; margin: 2rem 0; flex-wrap: wrap;">
          <button @click="setColor('#ff6b6b')" style="padding: 0.75rem 1.5rem; border: none; background: #ff6b6b; color: white; border-radius: 0.5rem; cursor: pointer;">
            Red Theme
          </button>
          <button @click="setColor('#4dabf7')" style="padding: 0.75rem 1.5rem; border: none; background: #4dabf7; color: white; border-radius: 0.5rem; cursor: pointer;">
            Blue Theme
          </button>
          <button @click="setColor('#51cf66')" style="padding: 0.75rem 1.5rem; border: none; background: #51cf66; color: white; border-radius: 0.5rem; cursor: pointer;">
            Green Theme
          </button>
          <button @click="setColor('#ffd43b')" style="padding: 0.75rem 1.5rem; border: none; background: #ffd43b; color: black; border-radius: 0.5rem; cursor: pointer;">
            Yellow Theme
          </button>
        </div>

        <div style="background: var(--haspen-semantic-primary, #2563eb); color: white; padding: 2rem; border-radius: 0.5rem;">
          <h3 style="margin: 0 0 1rem 0;">Current Primary Color</h3>
          <p style="margin: 0;">This box uses <code style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.5rem; border-radius: 4px;">var(--haspen-semantic-primary)</code></p>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Click the buttons above to see the color change in real-time!</p>
        </div>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f5f5; border-radius: 0.5rem;">
          <h3>Code Example:</h3>
          <pre style="background: white; padding: 1rem; border-radius: 0.5rem; overflow-x: auto;"><code>document.documentElement.style.setProperty(
  '--haspen-semantic-primary',
  '#ff6b6b'
);</code></pre>
        </div>
      </div>
    `,
    methods: {
      setColor(color: string) {
        document.documentElement.style.setProperty(
          '--haspen-semantic-primary',
          color,
        );
      },
    },
  }),
};

export const TypographyCustomization: Story = {
  render: () => ({
    template: `
      <div style="padding: 2rem;">
        <h2>Typography Customization Example</h2>
        <p>Change font family and size:</p>

        <div style="display: flex; gap: 1rem; margin: 2rem 0; flex-wrap: wrap;">
          <button @click="setFont('Inter')" style="padding: 0.75rem 1.5rem; border: 1px solid #ddd; background: white; border-radius: 0.5rem; cursor: pointer; font-family: Inter, sans-serif;">
            Inter
          </button>
          <button @click="setFont('Georgia')" style="padding: 0.75rem 1.5rem; border: 1px solid #ddd; background: white; border-radius: 0.5rem; cursor: pointer; font-family: Georgia, serif;">
            Georgia
          </button>
          <button @click="setFont('Courier New')" style="padding: 0.75rem 1.5rem; border: 1px solid #ddd; background: white; border-radius: 0.5rem; cursor: pointer; font-family: 'Courier New', monospace;">
            Courier New
          </button>
        </div>

        <div style="margin-top: 2rem;">
          <div style="font-family: var(--haspen-font-family-base, 'IBM Plex Sans'); padding: 2rem; background: #f8f9fa; border-radius: 0.5rem;">
            <h1 style="margin: 0 0 1rem 0; font-size: 2.5rem;">Heading 1</h1>
            <h2 style="margin: 0 0 1rem 0; font-size: 2rem;">Heading 2</h2>
            <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem;">Heading 3</h3>
            <p style="margin: 0; font-size: 1rem; line-height: 1.6;">
              This is body text using <code>var(--haspen-font-family-base)</code>.
              Notice how the entire typography changes when you select different fonts above.
            </p>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f5f5; border-radius: 0.5rem;">
          <h3>Code Example:</h3>
          <pre style="background: white; padding: 1rem; border-radius: 0.5rem; overflow-x: auto;"><code>:root {
  --haspen-font-family-base: 'Inter', sans-serif;
}</code></pre>
        </div>
      </div>
    `,
    methods: {
      setFont(font: string) {
        const fontFamily =
          font === 'Inter'
            ? '"Inter", system-ui, sans-serif'
            : font === 'Georgia'
              ? 'Georgia, serif'
              : '"Courier New", monospace';

        document.documentElement.style.setProperty(
          '--haspen-font-family-base',
          fontFamily,
        );
      },
    },
  }),
};

export const SpacingCustomization: Story = {
  render: () => ({
    template: `
      <div style="padding: 2rem;">
        <h2>Spacing Customization Example</h2>
        <p>Adjust spacing scale:</p>

        <div style="display: flex; gap: 1rem; margin: 2rem 0; flex-wrap: wrap;">
          <button @click="setSpacingBase(4)" style="padding: 0.75rem 1.5rem; border: 1px solid #ddd; background: white; border-radius: 0.5rem; cursor: pointer;">
            4px Base (Compact)
          </button>
          <button @click="setSpacingBase(8)" style="padding: 0.75rem 1.5rem; border: 1px solid #ddd; background: white; border-radius: 0.5rem; cursor: pointer;">
            8px Base (Default)
          </button>
          <button @click="setSpacingBase(12)" style="padding: 0.75rem 1.5rem; border: 1px solid #ddd; background: white; border-radius: 0.5rem; cursor: pointer;">
            12px Base (Spacious)
          </button>
        </div>

        <div style="background: #f8f9fa; padding: 2rem; border-radius: 0.5rem;">
          <div style="display: flex; flex-direction: column; gap: var(--haspen-spacing-md, 1rem);">
            <div style="background: white; padding: var(--haspen-spacing-md, 1rem); border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              Card with <code>padding: var(--haspen-spacing-md)</code>
            </div>
            <div style="background: white; padding: var(--haspen-spacing-md, 1rem); border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              Gap between cards: <code>gap: var(--haspen-spacing-md)</code>
            </div>
            <div style="background: white; padding: var(--haspen-spacing-md, 1rem); border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              All spacing updates automatically!
            </div>
          </div>
        </div>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f5f5; border-radius: 0.5rem;">
          <h3>Code Example:</h3>
          <pre style="background: white; padding: 1rem; border-radius: 0.5rem; overflow-x: auto;"><code>:root {
  --haspen-spacing-xs: 0.25rem;  /* 4px */
  --haspen-spacing-sm: 0.5rem;   /* 8px */
  --haspen-spacing-md: 1rem;     /* 16px */
  --haspen-spacing-lg: 1.5rem;   /* 24px */
  --haspen-spacing-xl: 2rem;     /* 32px */
}</code></pre>
        </div>
      </div>
    `,
    methods: {
      setSpacingBase(base: number) {
        const root = document.documentElement;
        const multiplier = base / 8; // Default is 8px

        root.style.setProperty(
          '--haspen-spacing-xs',
          `${0.25 * multiplier}rem`,
        );
        root.style.setProperty('--haspen-spacing-sm', `${0.5 * multiplier}rem`);
        root.style.setProperty('--haspen-spacing-md', `${1 * multiplier}rem`);
        root.style.setProperty('--haspen-spacing-lg', `${1.5 * multiplier}rem`);
        root.style.setProperty('--haspen-spacing-xl', `${2 * multiplier}rem`);
      },
    },
  }),
};
