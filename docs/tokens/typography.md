<script setup>
const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
};

const fontWeights = {
  thin: '100',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

const lineHeights = {
  none: '1',
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.75',
  loose: '2',
};

const fontFamilies = {
  sans: 'Inter, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, monospace',
};
</script>

# Typography

Typography tokens define the font families, sizes, weights, and line heights used throughout the
design system.

## Font Families

<div style="margin-top: 1.5rem;">
  <div style="margin-bottom: 2rem;">
    <div style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
      <div style="margin-bottom: 0.5rem; font-weight: 600; color: #666; font-size: 0.875rem;">Sans-serif (Default)</div>
      <div :style="{ fontFamily: fontFamilies.sans, fontSize: '1.5rem' }">
        The quick brown fox jumps over the lazy dog
      </div>
      <div style="margin-top: 0.5rem; font-family: monospace; color: #666; font-size: 0.875rem;">
        {{ fontFamilies.sans }}
      </div>
    </div>
  </div>

  <div>
    <div style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
      <div style="margin-bottom: 0.5rem; font-weight: 600; color: #666; font-size: 0.875rem;">Monospace</div>
      <div :style="{ fontFamily: fontFamilies.mono, fontSize: '1.5rem' }">
        The quick brown fox jumps over the lazy dog
      </div>
      <div style="margin-top: 0.5rem; font-family: monospace; color: #666; font-size: 0.875rem;">
        {{ fontFamilies.mono }}
      </div>
    </div>
  </div>
</div>

## Font Sizes

Typography scale from extra small to extra large.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(size, name) in fontSizes"
    :key="name"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="min-width: 80px;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ name }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ size }}</div>
    </div>
    <div :style="{ fontSize: size, flex: 1 }">
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
</div>

## Font Weights

Available font weights for emphasis and hierarchy.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(weight, name) in fontWeights"
    :key="name"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="min-width: 120px;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ name }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ weight }}</div>
    </div>
    <div :style="{ fontWeight: weight, fontSize: '1.25rem', flex: 1 }">
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
</div>

## Line Heights

Line height tokens for controlling text spacing.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(height, name) in lineHeights"
    :key="name"
    style="padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="margin-bottom: 0.5rem;">
      <strong>{{ name }}</strong>
      <span style="margin-left: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #666;">{{ height }}</span>
    </div>
    <div :style="{ lineHeight: height, fontSize: '1rem' }">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </div>
  </div>
</div>

## Typography Scale Preview

Complete typography scale with different combinations.

<div style="margin-top: 1.5rem; padding: 2rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.25;">
    Heading 1
  </h1>
  <p style="color: #666; margin-bottom: 2rem;">Font size: 5xl (3rem) · Weight: bold (700) · Line height: tight (1.25)</p>

  <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.25;">
    Heading 2
  </h2>
  <p style="color: #666; margin-bottom: 2rem;">Font size: 4xl (2.25rem) · Weight: bold (700) · Line height: tight (1.25)</p>

  <h3 style="font-size: 1.875rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.25;">
    Heading 3
  </h3>
  <p style="color: #666; margin-bottom: 2rem;">Font size: 3xl (1.875rem) · Weight: semibold (600) · Line height: tight (1.25)</p>

  <h4 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.5;">
    Heading 4
  </h4>
  <p style="color: #666; margin-bottom: 2rem;">Font size: 2xl (1.5rem) · Weight: semibold (600) · Line height: normal (1.5)</p>

  <p style="font-size: 1rem; line-height: 1.5; margin-bottom: 1rem;">
    Body text: This is standard body text using the base font size with normal line height. It's designed for optimal readability across different devices and screen sizes.
  </p>
  <p style="color: #666; margin-bottom: 2rem;">Font size: base (1rem) · Weight: normal (400) · Line height: normal (1.5)</p>

  <p style="font-size: 0.875rem; color: #666; line-height: 1.5;">
    Small text: This is smaller text typically used for captions, labels, or supplementary information.
  </p>
  <p style="color: #999; margin-bottom: 2rem; font-size: 0.75rem;">Font size: sm (0.875rem) · Weight: normal (400) · Line height: normal (1.5)</p>
</div>

## Usage

### TypeScript

```typescript
import { typography } from '@ipeeon/design-tokens';

// Font families
const baseFont = typography.fontFamily.sans;
// ['Inter', 'system-ui', '-apple-system', 'sans-serif']

// Font sizes
const largeFontSize = typography.fontSize.lg; // '1.125rem'

// Font weights
const boldWeight = typography.fontWeight.bold; // '700'

// Line heights
const normalLineHeight = typography.lineHeight.normal; // 1.5
```

### SCSS

```scss
@use '@ipeeon/design-tokens' as tokens;

.heading {
  font-size: tokens.font-size('2xl');
  font-weight: tokens.font-weight('bold');
  line-height: tokens.line-height('tight');
}
```

### CSS Variables

```css
.heading {
  font-family: var(--haspen-font-family-base);
  font-size: var(--haspen-font-size-2xl);
  font-weight: var(--haspen-font-weight-bold);
  line-height: var(--haspen-line-height-tight);
}
```

## Best Practices

::: tip Do

- Use the typography scale consistently across your application
- Choose line heights based on text length (tight for headings, relaxed for body text)
- Use font weights to create hierarchy (bold for headings, normal for body)
- Pair font sizes with appropriate line heights :::

::: warning Don't

- Mix too many font sizes in a single view
- Use very small font sizes (< 14px) for body text
- Forget to consider line height when changing font size
- Use font weights that aren't part of the scale :::
