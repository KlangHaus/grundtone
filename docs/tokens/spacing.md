<script setup>
const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// Group spacing into categories
const smallSpacing = Object.fromEntries(Object.entries(spacing).filter(([key]) => parseFloat(key) <= 4));
const mediumSpacing = Object.fromEntries(Object.entries(spacing).filter(([key]) => parseFloat(key) > 4 && parseFloat(key) <= 16));
const largeSpacing = Object.fromEntries(Object.entries(spacing).filter(([key]) => parseFloat(key) > 16));
</script>

# Spacing

The spacing system provides consistent spacing values for margins, padding, gaps, and positioning
throughout the design system.

## Spacing Scale

The spacing scale follows a logical progression, making it easy to create consistent layouts.

### Small Spacing (0-4)

Perfect for tight spacing, component internals, and fine-grained control.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(value, key) in smallSpacing"
    :key="key"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="min-width: 80px;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ key }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ value }}</div>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
      <div
        :style="{
          height: '40px',
          width: value,
          backgroundColor: '#3b82f6',
          borderRadius: '4px',
          minWidth: '1px'
        }"
      />
      <div style="color: #666; font-size: 0.875rem;">
        {{ value === '0' ? 'No spacing' : value }}
      </div>
    </div>
  </div>
</div>

### Medium Spacing (5-16)

Ideal for component spacing, layout gaps, and general UI spacing.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(value, key) in mediumSpacing"
    :key="key"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="min-width: 80px;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ key }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ value }}</div>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
      <div
        :style="{
          height: '40px',
          width: value,
          backgroundColor: '#3b82f6',
          borderRadius: '4px'
        }"
      />
      <div style="color: #666; font-size: 0.875rem;">
        {{ value }}
      </div>
    </div>
  </div>
</div>

### Large Spacing (20-96)

Best for page sections, major layout divisions, and large-scale spacing.

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(value, key) in largeSpacing"
    :key="key"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="min-width: 80px;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ key }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ value }}</div>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1; overflow-x: auto;">
      <div
        :style="{
          height: '40px',
          width: value,
          backgroundColor: '#3b82f6',
          borderRadius: '4px',
          minWidth: value
        }"
      />
      <div style="color: #666; font-size: 0.875rem; white-space: nowrap;">
        {{ value }}
      </div>
    </div>
  </div>
</div>

## Interactive Examples

### Padding Example

<div style="margin-top: 1.5rem;">
  <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
    <div v-for="(value, key) in { 2: '0.5rem', 4: '1rem', 8: '2rem', 12: '3rem' }" :key="key">
      <div style="margin-bottom: 1rem;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Padding: {{ key }} ({{ value }})</div>
        <div :style="{ padding: value, background: 'white', border: '2px dashed #3b82f6', borderRadius: '8px' }">
          <div style="background: #3b82f6; color: white; padding: 0.5rem; text-align: center; border-radius: '4px'">
            Content
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Margin Example

<div style="margin-top: 1.5rem;">
  <div style="background: #f3f4f6; padding: 2rem; border-radius: 8px;">
    <div v-for="(value, key) in { 2: '0.5rem', 4: '1rem', 8: '2rem' }" :key="key">
      <div style="margin-bottom: 2rem;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Margin: {{ key }} ({{ value }})</div>
        <div style="background: white; padding: 1rem; border-radius: 8px;">
          <div :style="{ margin: value, background: '#3b82f6', color: 'white', padding: '0.5rem', textAlign: 'center', borderRadius: '4px' }">
            Box with margin
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Gap Example (Flexbox/Grid)

<div style="margin-top: 1.5rem;">
  <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
    <div v-for="(value, key) in { 2: '0.5rem', 4: '1rem', 8: '2rem' }" :key="key">
      <div style="margin-bottom: 1.5rem;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Gap: {{ key }} ({{ value }})</div>
        <div :style="{ display: 'flex', gap: value, background: 'white', padding: '1rem', borderRadius: '8px' }">
          <div v-for="i in 3" :key="i" style="flex: 1; background: #3b82f6; color: white; padding: 1rem; text-align: center; border-radius: 4px;">
            Item {{ i }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Hvordan Bruger Man Spacing

### Layout Patterns

**Container Spacing**

```scss
@use '@ipeeon/design-tokens' as tokens;

// Page container
.page-container {
  padding: tokens.spacing(4); // Mobile: 1rem

  @include tokens.respond-to('md') {
    padding: tokens.spacing(8); // Tablet: 2rem
  }

  @include tokens.respond-to('lg') {
    padding: tokens.spacing(12); // Desktop: 3rem
  }
}

// Section spacing
.section {
  margin-bottom: tokens.spacing(12); // 3rem between sections

  @include tokens.respond-to('lg') {
    margin-bottom: tokens.spacing(20); // 5rem on large screens
  }
}
```

**Component Spacing**

```scss
// Card internal spacing
.card {
  padding: tokens.spacing(6); // 1.5rem internal padding

  // Spacing between card elements
  & > * + * {
    margin-top: tokens.spacing(4); // 1rem between children
  }
}

// Button spacing
.button {
  padding: tokens.spacing(3) tokens.spacing(6); // Vertical: 0.75rem, Horizontal: 1.5rem

  &.button-sm {
    padding: tokens.spacing(2) tokens.spacing(4); // Small: 0.5rem 1rem
  }

  &.button-lg {
    padding: tokens.spacing(4) tokens.spacing(8); // Large: 1rem 2rem
  }
}

// Icon med text
.icon-with-text {
  display: flex;
  align-items: center;
  gap: tokens.spacing(2); // 0.5rem between icon and text
}
```

**Form Spacing**

```scss
// Form field spacing
.form-field {
  margin-bottom: tokens.spacing(6); // 1.5rem between fields

  &:last-child {
    margin-bottom: 0;
  }
}

// Label spacing
.form-label {
  margin-bottom: tokens.spacing(2); // 0.5rem under label
}

// Input spacing
.form-input {
  padding: tokens.spacing(3); // 0.75rem internal padding

  // With icon
  &.has-icon {
    padding-left: tokens.spacing(10); // 2.5rem for icon space
  }
}

// Form group spacing
.form-group {
  & > * + * {
    margin-top: tokens.spacing(2); // 0.5rem between elements
  }
}

// Error message spacing
.form-error {
  margin-top: tokens.spacing(1); // 0.25rem after input
}
```

**Grid & Flexbox Spacing**

```scss
// Grid layout
.grid {
  display: grid;
  gap: tokens.spacing(4); // 1rem gap
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  @include tokens.respond-to('md') {
    gap: tokens.spacing(6); // 1.5rem on tablet
  }

  @include tokens.respond-to('lg') {
    gap: tokens.spacing(8); // 2rem on desktop
  }
}

// Flex layout
.flex-container {
  display: flex;
  gap: tokens.spacing(4); // 1rem between items

  &.flex-tight {
    gap: tokens.spacing(2); // 0.5rem for tight spacing
  }

  &.flex-loose {
    gap: tokens.spacing(8); // 2rem for loose spacing
  }
}
```

**List Spacing**

```scss
// Vertical list
.list {
  & > li + li {
    margin-top: tokens.spacing(3); // 0.75rem between items
  }

  &.list-tight > li + li {
    margin-top: tokens.spacing(2); // 0.5rem for tight lists
  }

  &.list-loose > li + li {
    margin-top: tokens.spacing(6); // 1.5rem for loose lists
  }
}

// Horizontal list (menu/navigation)
.nav-list {
  display: flex;
  gap: tokens.spacing(6); // 1.5rem between nav items

  @include tokens.respond-to('lg') {
    gap: tokens.spacing(8); // 2rem on desktop
  }
}
```

### Stack Pattern (Lobotomized Owl)

```scss
// Automatic spacing between sibling elements
.stack > * + * {
  margin-top: tokens.spacing(4); // 1rem default
}

.stack-sm > * + * {
  margin-top: tokens.spacing(2); // 0.5rem tight
}

.stack-lg > * + * {
  margin-top: tokens.spacing(8); // 2rem loose
}

// Eksempel brug
.article {
  @extend .stack;

  .article-header {
    // No extra margin needed
  }

  .article-body {
    // Automatically gets margin-top
  }

  .article-footer {
    // Automatically gets margin-top
  }
}
```

### Responsive Spacing Patterns

```scss
// Mobile first approach
.hero-section {
  padding: tokens.spacing(8) tokens.spacing(4); // Mobile: 2rem vertical, 1rem horizontal

  @include tokens.respond-to('md') {
    padding: tokens.spacing(16) tokens.spacing(8); // Tablet: 4rem, 2rem
  }

  @include tokens.respond-to('lg') {
    padding: tokens.spacing(24) tokens.spacing(12); // Desktop: 6rem, 3rem
  }
}

// Asymmetric spacing
.section-with-gap {
  padding-top: tokens.spacing(12); // 3rem top
  padding-bottom: tokens.spacing(20); // 5rem bottom (more breathing room)
}
```

### Praktiske Komponenter

**Modal Dialog**

```scss
.modal {
  padding: tokens.spacing(8); // 2rem outer padding

  .modal-header {
    padding-bottom: tokens.spacing(4);
    border-bottom: 1px solid tokens.getColor('gray', 200);
    margin-bottom: tokens.spacing(6);
  }

  .modal-body {
    // Content spacing
    & > * + * {
      margin-top: tokens.spacing(4);
    }
  }

  .modal-footer {
    padding-top: tokens.spacing(6);
    margin-top: tokens.spacing(8);
    border-top: 1px solid tokens.getColor('gray', 200);

    // Button spacing
    display: flex;
    gap: tokens.spacing(3);
    justify-content: flex-end;
  }
}
```

**Navigation Bar**

```scss
.navbar {
  padding: tokens.spacing(4) tokens.spacing(6); // 1rem vertical, 1.5rem horizontal
  display: flex;
  align-items: center;
  gap: tokens.spacing(8); // 2rem between logo and nav

  .nav-links {
    display: flex;
    gap: tokens.spacing(6); // 1.5rem between links
  }

  .nav-actions {
    margin-left: auto;
    display: flex;
    gap: tokens.spacing(3); // 0.75rem between action buttons
  }
}
```

**Data Table**

```scss
.table {
  th,
  td {
    padding: tokens.spacing(3) tokens.spacing(4); // 0.75rem vertical, 1rem horizontal
  }

  tbody tr + tr {
    border-top: 1px solid tokens.getColor('gray', 200);
  }

  &.table-compact {
    th,
    td {
      padding: tokens.spacing(2) tokens.spacing(3); // Compact version
    }
  }
}
```

### Vue/React Component Eksempel

**Vue 3 med Composable**

```vue
<script setup lang="ts">
  import { computed } from 'vue';
  import { spacing } from '@ipeeon/design-tokens';

  const props = defineProps<{
    size?: 'sm' | 'md' | 'lg';
  }>();

  const cardPadding = computed(() => {
    switch (props.size) {
      case 'sm':
        return spacing[4]; // 1rem
      case 'lg':
        return spacing[8]; // 2rem
      default:
        return spacing[6]; // 1.5rem
    }
  });

  const itemGap = computed(() => {
    switch (props.size) {
      case 'sm':
        return spacing[2]; // 0.5rem
      case 'lg':
        return spacing[6]; // 1.5rem
      default:
        return spacing[4]; // 1rem
    }
  });
</script>

<template>
  <div
    class="card"
    :style="{
      padding: cardPadding,
      display: 'flex',
      flexDirection: 'column',
      gap: itemGap,
    }"
  >
    <slot />
  </div>
</template>
```

## Grundlæggende Usage

### TypeScript

```typescript
import { spacing } from '@ipeeon/design-tokens';

// Get spacing value
const mediumSpacing = spacing[4]; // '1rem'
const largeSpacing = spacing[8]; // '2rem'

// Use in styles
const styles = {
  padding: spacing[4],
  margin: spacing[8],
};
```

### SCSS

```scss
@use '@ipeeon/design-tokens' as tokens;

.card {
  padding: tokens.spacing(4); // 1rem
  margin-bottom: tokens.spacing(8); // 2rem
}

.container {
  gap: tokens.spacing(6); // 1.5rem
}
```

### CSS Variables

```css
.card {
  padding: var(--haspen-spacing-4);
  margin: var(--haspen-spacing-8);
  gap: var(--haspen-spacing-6);
}
```

## Common Use Cases

::: tip Recommended Spacing

- **Component internal spacing**: 2, 3, 4 (0.5rem - 1rem)
- **Component spacing**: 4, 6, 8 (1rem - 2rem)
- **Section spacing**: 12, 16, 20 (3rem - 5rem)
- **Page margins**: 16, 20, 24 (4rem - 6rem) :::

## Best Practices

::: tip Do

- Use the spacing scale consistently throughout your application
- Prefer spacing tokens over arbitrary values
- Use smaller spacing for component internals
- Use larger spacing for major layout sections
- Consider responsive spacing adjustments :::

::: warning Don't

- Use arbitrary spacing values like `17px` or `23px`
- Mix spacing systems (tokens + hard-coded values)
- Use extremely large spacing values without purpose
- Forget to adjust spacing for mobile screens :::
