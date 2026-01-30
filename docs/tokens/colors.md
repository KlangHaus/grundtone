<script setup>
import { ref } from 'vue';

const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

function getLuminance(hex) {
  const rgb = hex.replace('#', '');
  const r = parseInt(rgb.substring(0, 2), 16) / 255;
  const g = parseInt(rgb.substring(2, 4), 16) / 255;
  const b = parseInt(rgb.substring(4, 6), 16) / 255;

  const [rs, gs, bs] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getWCAGLevel(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'Fail';
}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

const primaryShades = Object.entries(colors.primary).map(([shade, hex]) => {
  const contrastRatio = getContrastRatio(hex, '#ffffff');
  return {
    shade,
    hex,
    rgb: hexToRgb(hex),
    contrast: contrastRatio.toFixed(2),
    wcag: getWCAGLevel(contrastRatio),
  };
});

const grayShades = Object.entries(colors.gray).map(([shade, hex]) => {
  const contrastRatio = getContrastRatio(hex, '#ffffff');
  return {
    shade,
    hex,
    rgb: hexToRgb(hex),
    contrast: contrastRatio.toFixed(2),
    wcag: getWCAGLevel(contrastRatio),
  };
});

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

// Contrast checker
const foreground = ref('#2563eb');
const background = ref('#ffffff');

const contrastRatio = ref(0);
const contrastLevel = ref('AA');

function updateContrast() {
  const ratio = getContrastRatio(foreground.value, background.value);
  contrastRatio.value = ratio.toFixed(2);
  contrastLevel.value = getWCAGLevel(ratio);
}

updateContrast();
</script>

# Colors

Haspen UI provides a comprehensive color system with multiple color families, each containing 9
shades (50-900). The color palette is designed to work harmoniously together and meets WCAG 2.1
accessibility standards.

## Color Families

### Primary (Blue)

The primary color is used for main brand identity, primary actions, links, and emphasis.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="color in primaryShades"
    :key="color.shade"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div
      :style="{
        width: '80px',
        height: '80px',
        backgroundColor: color.hex,
        borderRadius: '8px',
        flexShrink: 0,
        cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.1)'
      }"
      :title="'Click to copy: ' + color.hex"
      @click="copyToClipboard(color.hex)"
    />

    <div style="flex: 1;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
        <strong style="font-size: 1rem;">{{ color.shade }}</strong>
        <span
          :style="{
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor: color.wcag === 'AAA' ? '#dcfce7' : color.wcag === 'AA' ? '#fef3c7' : '#fee2e2',
            color: color.wcag === 'AAA' ? '#166534' : color.wcag === 'AA' ? '#92400e' : '#991b1b'
          }"
        >
          {{ color.wcag }}
        </span>
      </div>
      <div style="font-family: monospace; color: #666; font-size: 0.875rem;">
        <div>{{ color.hex }}</div>
        <div>RGB: {{ color.rgb }}</div>
        <div style="margin-top: 0.25rem;">Contrast vs white: {{ color.contrast }}:1</div>
      </div>
    </div>

  </div>
</div>

::: tip Usage Examples

- **50-200**: Backgrounds, subtle highlights
- **400-500**: Icons, secondary text
- **600-700**: Primary buttons, links (recommended)
- **800-900**: Dark mode, high contrast text :::

### Gray (Neutral)

Gray colors are used for text, backgrounds, borders, and neutral UI elements.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="color in grayShades"
    :key="color.shade"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div
      :style="{
        width: '80px',
        height: '80px',
        backgroundColor: color.hex,
        borderRadius: '8px',
        flexShrink: 0,
        cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.1)'
      }"
      :title="'Click to copy: ' + color.hex"
      @click="copyToClipboard(color.hex)"
    />

    <div style="flex: 1;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
        <strong style="font-size: 1rem;">{{ color.shade }}</strong>
        <span
          :style="{
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor: color.wcag === 'AAA' ? '#dcfce7' : color.wcag === 'AA' ? '#fef3c7' : '#fee2e2',
            color: color.wcag === 'AAA' ? '#166534' : color.wcag === 'AA' ? '#92400e' : '#991b1b'
          }"
        >
          {{ color.wcag }}
        </span>
      </div>
      <div style="font-family: monospace; color: #666; font-size: 0.875rem;">
        <div>{{ color.hex }}</div>
        <div>RGB: {{ color.rgb }}</div>
        <div style="margin-top: 0.25rem;">Contrast vs white: {{ color.contrast }}:1</div>
      </div>
    </div>

  </div>
</div>

::: tip Usage Examples

- **50-100**: Page backgrounds, subtle containers
- **200-300**: Borders, dividers
- **400-500**: Placeholder text, disabled state
- **600-700**: Secondary text, labels
- **800-900**: Primary text, headings :::

## WCAG Contrast Checker

Test color combinations for accessibility compliance.

<div style="display: grid; gap: 2rem; margin-top: 1.5rem;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Foreground Color</label>
      <input
        type="color"
        v-model="foreground"
        @input="updateContrast"
        style="width: 100%; height: 60px; border-radius: 8px; border: 1px solid #e5e7eb; cursor: pointer;"
      />
      <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #666;">
        {{ foreground }}
      </div>
    </div>

    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Background Color</label>
      <input
        type="color"
        v-model="background"
        @input="updateContrast"
        style="width: 100%; height: 60px; border-radius: 8px; border: 1px solid #e5e7eb; cursor: pointer;"
      />
      <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #666;">
        {{ background }}
      </div>
    </div>

  </div>

  <div style="padding: 2rem; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
    <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;">{{ contrastRatio }}:1</div>
    <div
      :style="{
        display: 'inline-block',
        padding: '0.5rem 1.5rem',
        borderRadius: '8px',
        fontSize: '1.25rem',
        fontWeight: 700,
        backgroundColor: contrastLevel === 'AAA' ? '#dcfce7' : contrastLevel === 'AA' ? '#fef3c7' : '#fee2e2',
        color: contrastLevel === 'AAA' ? '#166534' : contrastLevel === 'AA' ? '#92400e' : '#991b1b'
      }"
    >
      WCAG {{ contrastLevel }}
    </div>
  </div>

  <div :style="{ padding: '2rem', backgroundColor: background, borderRadius: '8px', border: '1px solid #e5e7eb' }">
    <h3 :style="{ color: foreground, marginBottom: '1rem' }">Preview Heading</h3>
    <p :style="{ color: foreground, fontSize: '1.125rem', marginBottom: '1rem' }">
      This is how your text will look with these colors. The contrast ratio should be at least 4.5:1 for normal text (WCAG AA) or 7:1 for enhanced contrast (WCAG AAA).
    </p>
    <p :style="{ color: foreground, fontSize: '0.875rem' }">
      Small text (under 18px) requires higher contrast ratios for readability.
    </p>
  </div>
</div>

::: info WCAG 2.1 Guidelines

- **AAA** (7:1): Enhanced contrast for maximum accessibility
- **AA** (4.5:1): Minimum contrast for normal text
- **AA Large** (3:1): Minimum for text ≥18px or ≥14px bold
- **Fail** (<4.5:1): Does not meet WCAG standards :::

## Hvordan Bruger Man Farver

### Valg af Rigtig Shade

Hver farve har 9 shades (50-900). Her er hvordan du vælger den rigtige:

**Baggrunde og Containers (50-200)**

```scss
@use '@ipeeon/design-tokens' as tokens;

.page-background {
  background-color: tokens.getColor('gray', 50); // Meget lys baggrund
}

.card-subtle {
  background-color: tokens.getColor('primary', 50); // Subtle colored background
}

.hover-background {
  &:hover {
    background-color: tokens.getColor('gray', 100); // Hover state
  }
}
```

**Borders og Dividers (200-300)**

```scss
.card {
  border: 1px solid tokens.getColor('gray', 200); // Default border
}

.input {
  border: 1px solid tokens.getColor('gray', 300); // Input border

  &:focus {
    border-color: tokens.getColor('primary', 500); // Focus state
  }
}
```

**Interaktive Elementer (500-700)**

```scss
.button-primary {
  background-color: tokens.getColor('primary', 600); // Primary button
  color: white;

  &:hover {
    background-color: tokens.getColor('primary', 700); // Darker on hover
  }

  &:active {
    background-color: tokens.getColor('primary', 800); // Even darker when pressed
  }

  &:disabled {
    background-color: tokens.getColor('gray', 300); // Disabled state
    color: tokens.getColor('gray', 500);
  }
}

.link {
  color: tokens.getColor('primary', 600); // Link color

  &:hover {
    color: tokens.getColor('primary', 700);
    text-decoration: underline;
  }
}
```

**Tekst (600-900)**

```scss
.heading {
  color: tokens.getColor('gray', 900); // Primary heading
}

.body-text {
  color: tokens.getColor('gray', 700); // Body text
}

.secondary-text {
  color: tokens.getColor('gray', 600); // Secondary/meta text
}

.muted-text {
  color: tokens.getColor('gray', 500); // Placeholder/disabled text
}
```

### Praktiske Komponent Eksempler

**Button Komponenter**

```scss
// Primary button
.btn-primary {
  background-color: tokens.getColor('primary', 600);
  color: white;
  border: none;
  padding: tokens.spacing(3) tokens.spacing(6);
  border-radius: tokens.radius('default');

  &:hover:not(:disabled) {
    background-color: tokens.getColor('primary', 700);
  }

  &:active {
    background-color: tokens.getColor('primary', 800);
  }
}

// Secondary button
.btn-secondary {
  background-color: transparent;
  color: tokens.getColor('primary', 600);
  border: 1px solid tokens.getColor('primary', 600);
  padding: tokens.spacing(3) tokens.spacing(6);

  &:hover {
    background-color: tokens.getColor('primary', 50);
    border-color: tokens.getColor('primary', 700);
    color: tokens.getColor('primary', 700);
  }
}

// Danger button
.btn-danger {
  background-color: tokens.getColor('red', 600);
  color: white;

  &:hover {
    background-color: tokens.getColor('red', 700);
  }
}
```

**Card Komponenter**

```scss
.card {
  background-color: white;
  border: 1px solid tokens.getColor('gray', 200);
  border-radius: tokens.radius('lg');
  padding: tokens.spacing(6);
  box-shadow: tokens.shadow('light');

  &:hover {
    border-color: tokens.getColor('gray', 300);
    box-shadow: tokens.shadow('medium');
  }
}

.card-header {
  color: tokens.getColor('gray', 900);
  font-weight: 700;
  margin-bottom: tokens.spacing(4);
}

.card-body {
  color: tokens.getColor('gray', 700);
  line-height: 1.6;
}

.card-footer {
  color: tokens.getColor('gray', 600);
  font-size: 0.875rem;
  margin-top: tokens.spacing(4);
  padding-top: tokens.spacing(4);
  border-top: 1px solid tokens.getColor('gray', 200);
}
```

**Form Elementer**

```scss
.form-input {
  background-color: white;
  border: 1px solid tokens.getColor('gray', 300);
  color: tokens.getColor('gray', 900);
  padding: tokens.spacing(2) tokens.spacing(3);
  border-radius: tokens.radius('default');

  &::placeholder {
    color: tokens.getColor('gray', 400);
  }

  &:focus {
    outline: none;
    border-color: tokens.getColor('primary', 500);
    box-shadow: 0 0 0 3px tokens.getColor('primary', 100);
  }

  &:disabled {
    background-color: tokens.getColor('gray', 50);
    color: tokens.getColor('gray', 500);
    cursor: not-allowed;
  }

  &.error {
    border-color: tokens.getColor('red', 500);

    &:focus {
      box-shadow: 0 0 0 3px tokens.getColor('red', 100);
    }
  }
}

.form-label {
  color: tokens.getColor('gray', 700);
  font-weight: 600;
  margin-bottom: tokens.spacing(2);
}

.form-error {
  color: tokens.getColor('red', 600);
  font-size: 0.875rem;
  margin-top: tokens.spacing(1);
}

.form-hint {
  color: tokens.getColor('gray', 600);
  font-size: 0.875rem;
}
```

**Alert/Notification Komponenter**

```scss
.alert {
  padding: tokens.spacing(4);
  border-radius: tokens.radius('default');
  border-left: 4px solid;

  &-success {
    background-color: tokens.getColor('green', 50);
    border-color: tokens.getColor('green', 600);
    color: tokens.getColor('green', 900);
  }

  &-warning {
    background-color: tokens.getColor('yellow', 50);
    border-color: tokens.getColor('yellow', 600);
    color: tokens.getColor('yellow', 900);
  }

  &-error {
    background-color: tokens.getColor('red', 50);
    border-color: tokens.getColor('red', 600);
    color: tokens.getColor('red', 900);
  }

  &-info {
    background-color: tokens.getColor('primary', 50);
    border-color: tokens.getColor('primary', 600);
    color: tokens.getColor('primary', 900);
  }
}
```

**Badge/Tag Komponenter**

```scss
.badge {
  display: inline-block;
  padding: tokens.spacing(1) tokens.spacing(2);
  border-radius: tokens.radius('full');
  font-size: 0.75rem;
  font-weight: 600;

  &-primary {
    background-color: tokens.getColor('primary', 100);
    color: tokens.getColor('primary', 800);
  }

  &-success {
    background-color: tokens.getColor('green', 100);
    color: tokens.getColor('green', 800);
  }

  &-gray {
    background-color: tokens.getColor('gray', 100);
    color: tokens.getColor('gray', 800);
  }
}
```

### Dark Mode Implementation

```scss
// Light mode (default)
:root {
  --surface: #{tokens.getColor('white')};
  --surface-elevated: #{tokens.getColor('gray', 50)};
  --text-primary: #{tokens.getColor('gray', 900)};
  --text-secondary: #{tokens.getColor('gray', 700)};
  --border: #{tokens.getColor('gray', 200)};
}

// Dark mode
[data-theme='dark'] {
  --surface: #{tokens.getColor('gray', 900)};
  --surface-elevated: #{tokens.getColor('gray', 800)};
  --text-primary: #{tokens.getColor('gray', 50)};
  --text-secondary: #{tokens.getColor('gray', 300)};
  --border: #{tokens.getColor('gray', 700)};
}

// Brug variablerne
.card {
  background-color: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

### TypeScript Integration

**Vue 3 Composable Eksempel**

```typescript
import { computed } from 'vue';
import { colors } from '@ipeeon/design-tokens';

export function useButtonColors(variant: 'primary' | 'secondary' | 'danger') {
  const buttonColors = computed(() => {
    switch (variant) {
      case 'primary':
        return {
          background: colors.primary[600],
          hover: colors.primary[700],
          active: colors.primary[800],
          text: '#ffffff',
        };
      case 'secondary':
        return {
          background: 'transparent',
          hover: colors.primary[50],
          active: colors.primary[100],
          text: colors.primary[600],
          border: colors.primary[600],
        };
      case 'danger':
        return {
          background: colors.red[600],
          hover: colors.red[700],
          active: colors.red[800],
          text: '#ffffff',
        };
    }
  });

  return { buttonColors };
}
```

**React Styling Eksempel**

```typescript
import { colors } from '@ipeeon/design-tokens';

export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary[600],
    color: '#ffffff',
    border: 'none',
    '&:hover': {
      backgroundColor: colors.primary[700],
    },
  },
  secondary: {
    backgroundColor: 'transparent',
    color: colors.primary[600],
    border: `1px solid ${colors.primary[600]}`,
    '&:hover': {
      backgroundColor: colors.primary[50],
    },
  },
};
```

## Grundlæggende Usage

### TypeScript

```typescript
import { colors } from '@ipeeon/design-tokens';

// Access colors
const primaryColor = colors.primary[600]; // '#2563eb'
const grayColor = colors.gray[500]; // '#6b7280'

// Loop through shades
Object.entries(colors.primary).forEach(([shade, hex]) => {
  console.log(`Primary ${shade}: ${hex}`);
});
```

### SCSS

```scss
@use '@ipeeon/design-tokens' as tokens;

.button {
  background-color: tokens.getColor('primary', 600);
}
```

### CSS Variables

```css
.button {
  background-color: var(--haspen-color-blue-600);
  color: var(--haspen-color-text-inverse);
}
```
