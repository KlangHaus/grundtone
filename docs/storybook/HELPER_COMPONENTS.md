# Storybook Helper Components

This document provides detailed specifications for the helper Vue components used throughout the
Storybook documentation.

## Overview

Helper components are reusable Vue 3 components that provide consistent, interactive documentation
features across all stories. They are located in `.storybook/components/` and should be imported and
used in story files.

## Component List

1. [ColorSwatch](#colorswatch) - Display individual color tokens
2. [ColorPalette](#colorpalette) - Display complete color palettes
3. [TypeScale](#typescale) - Visualize typography scale
4. [SpacingVisualizer](#spacingvisualizer) - Demonstrate spacing tokens
5. [ContrastChecker](#contrastchecker) - Calculate WCAG contrast ratios
6. [CodeBlock](#codeblock) - Display syntax-highlighted code
7. [TokenTable](#tokentable) - Tabular token documentation

---

## ColorSwatch

### Purpose

Display a single color token with its name, hex value, RGB value, and optional contrast information.

### Props

```typescript
interface ColorSwatchProps {
  /** Color name (e.g., 'primary', 'blue-500') */
  name: string;
  /** Hex color value (e.g., '#0059b3') */
  hex: string;
  /** RGB color value (optional, auto-calculated if not provided) */
  rgb?: string;
  /** Show contrast ratio against white background */
  showContrast?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}
```

### Usage

```vue
<template>
  <ColorSwatch name="primary" hex="#0059b3" :showContrast="true" size="md" />
</template>

<script setup lang="ts">
  import ColorSwatch from './.storybook/components/ColorSwatch.vue';
</script>
```

### Visual Design

```
┌────────────────────────┐
│                        │
│     [Color Block]      │  ← Shows the actual color
│                        │
├────────────────────────┤
│ Primary                │  ← Color name
│ #0059b3                │  ← Hex value
│ rgb(0, 89, 179)        │  ← RGB value
│ Contrast: 7.2:1 (AA)   │  ← WCAG contrast (optional)
└────────────────────────┘
```

### Features

- Click to copy hex value to clipboard
- Hover to see RGB values
- Automatic contrast ratio calculation
- WCAG compliance badge (AAA, AA, Fail)
- Responsive sizing

---

## ColorPalette

### Purpose

Display a complete color palette with all shades (e.g., blue-50 through blue-900).

### Props

```typescript
interface ColorPaletteProps {
  /** Palette name (e.g., 'Blue', 'Primary') */
  name: string;
  /** Array of color values with shades */
  colors: Array<{
    shade: string; // e.g., '50', '100', '500'
    hex: string; // e.g., '#e3f2fd'
    name?: string; // Optional custom name
  }>;
  /** Display orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Show labels on each color */
  showLabels?: boolean;
}
```

### Usage

```vue
<template>
  <ColorPalette
    name="Blue Palette"
    :colors="blueShades"
    orientation="vertical"
    :showLabels="true"
  />
</template>

<script setup lang="ts">
  import ColorPalette from './.storybook/components/ColorPalette.vue';
  import { COLORS } from '@ipeeon/design-tokens';

  const blueShades = [
    { shade: '50', hex: COLORS.blue[50] },
    { shade: '100', hex: COLORS.blue[100] },
    // ... more shades
  ];
</script>
```

### Visual Design (Vertical)

```
Blue Palette
┌─────────────────┐
│ 50  │ #e3f2fd   │  ← Lightest
├─────────────────┤
│ 100 │ #bbdefb   │
├─────────────────┤
│ 200 │ #90caf9   │
├─────────────────┤
│ ... │           │
├─────────────────┤
│ 900 │ #0d47a1   │  ← Darkest
└─────────────────┘
```

### Features

- Horizontal or vertical layout
- Hover to see hex values
- Click shade to copy hex value
- Smooth gradient visualization
- Responsive grid layout

---

## TypeScale

### Purpose

Visualize typography scale with font sizes, weights, and line heights.

### Props

```typescript
interface TypeScaleProps {
  /** Typography scale data */
  scale: Array<{
    name: string; // e.g., 'xs', 'sm', 'base'
    fontSize: string; // e.g., '0.75rem'
    fontWeight?: number; // e.g., 400
    lineHeight?: number; // e.g., 1.5
  }>;
  /** Sample text to display */
  sampleText?: string;
  /** Show rulers for sizing */
  showRulers?: boolean;
}
```

### Usage

```vue
<template>
  <TypeScale
    :scale="typographyScale"
    sampleText="The quick brown fox jumps over the lazy dog"
    :showRulers="true"
  />
</template>

<script setup lang="ts">
  import TypeScale from './.storybook/components/TypeScale.vue';
  import { TYPOGRAPHY } from '@ipeeon/design-tokens';

  const typographyScale = [
    { name: 'xs', fontSize: TYPOGRAPHY.fontSize.xs },
    { name: 'sm', fontSize: TYPOGRAPHY.fontSize.sm },
    // ... more sizes
  ];
</script>
```

### Visual Design

```
Typography Scale

xs (0.75rem / 12px)
The quick brown fox jumps over the lazy dog

sm (0.875rem / 14px)
The quick brown fox jumps over the lazy dog

base (1rem / 16px)
The quick brown fox jumps over the lazy dog

lg (1.125rem / 18px)
The quick brown fox jumps over the lazy dog
```

### Features

- Live text rendering at each size
- Size comparison visualization
- Pixel and rem values
- Font weight and line height display
- Copy CSS properties to clipboard

---

## SpacingVisualizer

### Purpose

Demonstrate spacing tokens with visual boxes and measurements.

### Props

```typescript
interface SpacingVisualizerProps {
  /** Spacing tokens to visualize */
  spacing: Array<{
    name: string; // e.g., 'xs', 'sm', 'md'
    value: string; // e.g., '0.25rem', '4px'
  }>;
  /** Visualization mode */
  mode?: 'padding' | 'margin' | 'gap';
  /** Show measurements */
  showMeasurements?: boolean;
}
```

### Usage

```vue
<template>
  <SpacingVisualizer :spacing="spacingTokens" mode="padding" :showMeasurements="true" />
</template>

<script setup lang="ts">
  import SpacingVisualizer from './.storybook/components/SpacingVisualizer.vue';
  import { SPACING } from '@ipeeon/design-tokens';

  const spacingTokens = [
    { name: 'xs', value: SPACING.xs },
    { name: 'sm', value: SPACING.sm },
    // ... more spacing
  ];
</script>
```

### Visual Design

```
Spacing Scale (Padding Mode)

xs (0.25rem / 4px)
┌─────────────────────┐
│ ████ Content ████   │
└─────────────────────┘

sm (0.5rem / 8px)
┌─────────────────────┐
│ ████████ Content ████│
└─────────────────────┘

md (1rem / 16px)
┌─────────────────────┐
│████████████Content██│
└─────────────────────│
```

### Features

- Visual representation of spacing
- Padding, margin, and gap modes
- Measurement labels
- Responsive visualization
- Copy spacing values

---

## ContrastChecker

### Purpose

Calculate and validate WCAG contrast ratios between foreground and background colors.

### Props

```typescript
interface ContrastCheckerProps {
  /** Foreground color (hex) */
  foreground?: string;
  /** Background color (hex) */
  background?: string;
  /** Show color pickers */
  showPickers?: boolean;
  /** Target WCAG level */
  targetLevel?: 'AA' | 'AAA';
}
```

### Usage

```vue
<template>
  <ContrastChecker foreground="#000000" background="#ffffff" :showPickers="true" targetLevel="AA" />
</template>

<script setup lang="ts">
  import ContrastChecker from './.storybook/components/ContrastChecker.vue';
</script>
```

### Visual Design

```
Contrast Checker

Foreground: [#000000] [Color Picker]
Background: [#ffffff] [Color Picker]

┌──────────────────────────┐
│                          │
│   Sample Text (Large)    │  ← Preview with colors
│   Sample Text (Normal)   │
│                          │
└──────────────────────────┘

Contrast Ratio: 21:1

✓ WCAG AA Normal Text (4.5:1)
✓ WCAG AA Large Text (3:1)
✓ WCAG AAA Normal Text (7:1)
✓ WCAG AAA Large Text (4.5:1)
```

### Features

- Interactive color pickers
- Real-time contrast calculation
- WCAG compliance validation
- Visual preview
- Pass/fail indicators
- Copy contrast ratio value

---

## CodeBlock

### Purpose

Display syntax-highlighted code with copy functionality.

### Props

```typescript
interface CodeBlockProps {
  /** Code content */
  code: string;
  /** Programming language */
  language?: 'typescript' | 'javascript' | 'scss' | 'css' | 'html' | 'vue';
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Highlighted lines (1-indexed) */
  highlightLines?: number[];
  /** Code title/filename */
  title?: string;
  /** Show copy button */
  showCopy?: boolean;
}
```

### Usage

```vue
<template>
  <CodeBlock
    :code="scssCode"
    language="scss"
    title="Using color tokens"
    :showLineNumbers="true"
    :highlightLines="[3, 4]"
    :showCopy="true"
  />
</template>

<script setup lang="ts">
  import CodeBlock from './.storybook/components/CodeBlock.vue';

  const scssCode = `
@use '@ipeeon/design-tokens' as tokens;

.my-component {
  color: tokens.getColor('primary');
  background: tokens.getColor('background');
}
`;
</script>
```

### Visual Design

```
Using color tokens                    [Copy]
┌──────────────────────────────────────────┐
│ 1  @use '@ipeeon/design-tokens' as tokens;│
│ 2                                         │
│ 3  .my-component {                        │ ← Highlighted
│ 4    color: tokens.getColor('primary');   │ ← Highlighted
│ 5    background: tokens.getColor('bg');   │
│ 6  }                                      │
└──────────────────────────────────────────┘
```

### Features

- Syntax highlighting (via Prism or Shiki)
- Copy to clipboard
- Line numbers
- Line highlighting
- Multiple language support
- Title bar with filename
- Responsive design

---

## TokenTable

### Purpose

Display design tokens in a structured table format.

### Props

```typescript
interface TokenTableProps {
  /** Table title */
  title?: string;
  /** Token data */
  tokens: Array<{
    name: string;
    value: string;
    description?: string;
    example?: string;
  }>;
  /** Column configuration */
  columns?: Array<{
    key: string;
    label: string;
    width?: string;
  }>;
  /** Allow filtering */
  filterable?: boolean;
  /** Allow sorting */
  sortable?: boolean;
}
```

### Usage

```vue
<template>
  <TokenTable title="Color Tokens" :tokens="colorTokens" :filterable="true" :sortable="true" />
</template>

<script setup lang="ts">
  import TokenTable from './.storybook/components/TokenTable.vue';
  import { COLORS } from '@ipeeon/design-tokens';

  const colorTokens = [
    {
      name: 'primary',
      value: COLORS.primary,
      description: 'Primary brand color',
      example: '●',
    },
    // ... more tokens
  ];
</script>
```

### Visual Design

```
Color Tokens                        [Search: ____]

┌────────────┬────────────┬─────────────────┬─────────┐
│ Name ↓     │ Value      │ Description     │ Preview │
├────────────┼────────────┼─────────────────┼─────────┤
│ primary    │ #0059b3    │ Primary brand   │   ●     │
│ secondary  │ #6c757d    │ Secondary color │   ●     │
│ success    │ #28a745    │ Success state   │   ●     │
│ ...        │ ...        │ ...             │   ...   │
└────────────┴────────────┴─────────────────┴─────────┘
```

### Features

- Sortable columns
- Search/filter functionality
- Responsive table design
- Copy individual values
- Export to CSV (optional)
- Collapsible rows for detailed info

---

## Implementation Guidelines

### General Principles

1. **Consistency** - All components should follow the same design patterns
2. **Accessibility** - WCAG AA compliance minimum
3. **Performance** - Lazy load when possible, optimize renders
4. **Responsive** - Work on mobile, tablet, and desktop
5. **Themeable** - Support light and dark modes

### Vue 3 Patterns

- Use Composition API with `<script setup>`
- Use TypeScript for prop definitions
- Emit events for user interactions
- Provide slots for customization where appropriate

### Styling

- Use SCSS with design tokens from `@ipeeon/design-tokens`
- Follow BEM naming convention
- Use CSS custom properties for theming
- Ensure proper contrast ratios

### Testing

- Write unit tests for all components
- Test with various prop combinations
- Test accessibility with axe
- Visual regression testing with Chromatic

### Example Component Structure

```vue
<!-- ColorSwatch.vue -->
<template>
  <div class="color-swatch" :class="`color-swatch--${size}`">
    <div class="color-swatch__color" :style="{ backgroundColor: hex }" @click="copyToClipboard" />
    <div class="color-swatch__info">
      <span class="color-swatch__name">{{ name }}</span>
      <span class="color-swatch__hex">{{ hex }}</span>
      <span v-if="showContrast" class="color-swatch__contrast">
        {{ contrastRatio }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  interface Props {
    name: string;
    hex: string;
    rgb?: string;
    showContrast?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    showContrast: false,
  });

  const contrastRatio = computed(() => {
    // Calculate contrast ratio
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(props.hex);
  }
</script>

<style lang="scss" scoped>
  @use '@ipeeon/design-tokens' as tokens;

  .color-swatch {
    // Styles here
  }
</style>
```

---

## Next Steps

1. Implement helper components in Phase 1
2. Test components individually
3. Use components in foundation stories
4. Gather feedback and iterate
5. Document any component updates

## Questions?

Contact the design system team for clarification or to suggest new helper components.
