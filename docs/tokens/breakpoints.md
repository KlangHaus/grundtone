<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

const deviceTypes = {
  xs: { name: 'Mobile (Portrait)', icon: '📱', description: 'Small phones' },
  sm: { name: 'Mobile (Landscape)', icon: '📱', description: 'Large phones, small tablets' },
  md: { name: 'Tablet', icon: '📱', description: 'Tablets, small laptops' },
  lg: { name: 'Desktop', icon: '💻', description: 'Laptops, desktops' },
  xl: { name: 'Large Desktop', icon: '🖥️', description: 'Large monitors' },
  '2xl': { name: 'Extra Large', icon: '🖥️', description: 'Ultra-wide displays' },
};

// Current viewport info
const currentWidth = ref(0);
const currentBreakpoint = ref('');

function updateViewport() {
  currentWidth.value = window.innerWidth;

  if (currentWidth.value >= 1536) currentBreakpoint.value = '2xl';
  else if (currentWidth.value >= 1280) currentBreakpoint.value = 'xl';
  else if (currentWidth.value >= 1024) currentBreakpoint.value = 'lg';
  else if (currentWidth.value >= 768) currentBreakpoint.value = 'md';
  else if (currentWidth.value >= 640) currentBreakpoint.value = 'sm';
  else currentBreakpoint.value = 'xs';
}

onMounted(() => {
  updateViewport();
  window.addEventListener('resize', updateViewport);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateViewport);
});
</script>

# Breakpoints

Breakpoints define the screen widths at which your layout should adapt. The breakpoint system
enables responsive design that works seamlessly across all device sizes.

## Current Viewport

<div style="margin-top: 1.5rem; padding: 2rem; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 12px; color: white; text-align: center;">
  <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;">{{ currentWidth }}px</div>
  <div style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; text-transform: uppercase;">{{ currentBreakpoint }}</div>
  <div style="opacity: 0.9;">Resize your browser window to see this change</div>
</div>

## Breakpoint Scale

<div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
  <div
    v-for="(width, name) in breakpoints"
    :key="name"
    :style="{
      padding: '1.5rem',
      background: currentBreakpoint === name ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'white',
      color: currentBreakpoint === name ? 'white' : 'inherit',
      border: currentBreakpoint === name ? 'none' : '1px solid #e5e7eb',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      position: 'relative'
    }"
  >
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="font-size: 2rem;">{{ deviceTypes[name].icon }}</div>
        <div>
          <div style="font-weight: 700; font-size: 1.25rem; margin-bottom: 0.25rem;">{{ name }}</div>
          <div :style="{ opacity: currentBreakpoint === name ? 0.9 : 0.6, fontSize: '0.875rem' }">
            {{ deviceTypes[name].name }}
          </div>
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-family: monospace; font-weight: 600; font-size: 1.125rem;">{{ width }}</div>
        <div :style="{ opacity: currentBreakpoint === name ? 0.9 : 0.6, fontSize: '0.875rem' }">
          {{ deviceTypes[name].description }}
        </div>
      </div>
    </div>
    <div
      v-if="currentBreakpoint === name"
      style="margin-top: 1rem; padding: 0.75rem; background: rgba(255, 255, 255, 0.2); border-radius: 4px; font-weight: 600; text-align: center;"
    >
      Active Breakpoint
    </div>
  </div>
</div>

## Breakpoint Visualization

Visual representation of how breakpoints map to screen sizes.

<div style="margin-top: 2rem; padding: 2rem; background: #f9fafb; border-radius: 8px;">
  <div style="position: relative; height: 300px;">
    <div
      v-for="(width, name, index) in breakpoints"
      :key="name"
      :style="{
        position: 'absolute',
        left: '0',
        bottom: `${index * 45}px`,
        width: `${(parseInt(width) / 1536) * 100}%`,
        minWidth: name === 'xs' ? '10%' : 'auto',
        height: '40px',
        background: currentBreakpoint === name ? 'linear-gradient(90deg, #3b82f6, #2563eb)' : `linear-gradient(90deg, #93c5fd, #60a5fa)`,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
        color: 'white',
        fontWeight: 600,
        fontSize: '0.875rem',
        transition: 'all 0.3s ease',
        boxShadow: currentBreakpoint === name ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none'
      }"
    >
      {{ name }} ({{ width }})
    </div>
  </div>
</div>

## Responsive Layout Examples

### Grid Columns

How grid layouts adapt across breakpoints.

<div style="margin-top: 1.5rem; padding: 2rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
  <div style="margin-bottom: 1rem; font-weight: 600;">Responsive Grid (1 → 2 → 3 → 4 columns)</div>
  <div
    style="display: grid; gap: 1rem;"
    :style="{
      gridTemplateColumns: currentBreakpoint === 'xs' ? '1fr' :
                          currentBreakpoint === 'sm' ? 'repeat(2, 1fr)' :
                          currentBreakpoint === 'md' ? 'repeat(3, 1fr)' :
                          'repeat(4, 1fr)'
    }"
  >
    <div
      v-for="i in 8"
      :key="i"
      style="aspect-ratio: 1; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.5rem;"
    >
      {{ i }}
    </div>
  </div>
</div>

### Text Sizing

Typography scaling across devices.

<div style="margin-top: 1.5rem; padding: 2rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h2
    :style="{
      fontSize: currentBreakpoint === 'xs' ? '1.5rem' :
               currentBreakpoint === 'sm' ? '1.875rem' :
               currentBreakpoint === 'md' ? '2.25rem' :
               '3rem',
      fontWeight: 700,
      marginBottom: '1rem',
      transition: 'font-size 0.3s ease'
    }"
  >
    Responsive Heading
  </h2>
  <p
    :style="{
      fontSize: currentBreakpoint === 'xs' ? '0.875rem' :
               currentBreakpoint === 'sm' ? '1rem' :
               '1.125rem',
      color: '#666',
      lineHeight: 1.6,
      transition: 'font-size 0.3s ease'
    }"
  >
    This text scales based on the current breakpoint. On mobile devices (xs), it uses a smaller font size for better readability on small screens. As the viewport grows, the text size increases proportionally.
  </p>
</div>

### Spacing

Padding and margin adjustments.

<div style="margin-top: 1.5rem; background: #f9fafb; border-radius: 8px; overflow: hidden;">
  <div
    :style="{
      padding: currentBreakpoint === 'xs' ? '1rem' :
              currentBreakpoint === 'sm' ? '1.5rem' :
              currentBreakpoint === 'md' ? '2rem' :
              '3rem',
      transition: 'padding 0.3s ease'
    }"
  >
    <div style="background: white; border: 2px dashed #3b82f6; border-radius: 8px; padding: 2rem; text-align: center;">
      <div style="font-weight: 600; margin-bottom: 0.5rem;">Container with Responsive Padding</div>
      <div style="color: #666; font-size: 0.875rem;">
        Current padding:
        {{ currentBreakpoint === 'xs' ? '1rem' :
           currentBreakpoint === 'sm' ? '1.5rem' :
           currentBreakpoint === 'md' ? '2rem' :
           '3rem' }}
      </div>
    </div>
  </div>
</div>

## Breakpoint Ranges

Understanding which devices fall into each breakpoint range.

<div style="margin-top: 1.5rem; overflow-x: auto;">
  <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
    <thead style="background: #f9fafb;">
      <tr>
        <th style="padding: 1rem; text-align: left; border-bottom: 1px solid #e5e7eb;">Breakpoint</th>
        <th style="padding: 1rem; text-align: left; border-bottom: 1px solid #e5e7eb;">Min Width</th>
        <th style="padding: 1rem; text-align: left; border-bottom: 1px solid #e5e7eb;">Max Width</th>
        <th style="padding: 1rem; text-align: left; border-bottom: 1px solid #e5e7eb;">Typical Devices</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-weight: 600;">xs</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">0px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">639px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; color: #666;">Small phones (portrait)</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-weight: 600;">sm</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">640px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">767px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; color: #666;">Large phones (landscape), small tablets</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-weight: 600;">md</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">768px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">1023px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; color: #666;">Tablets, small laptops</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-weight: 600;">lg</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">1024px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">1279px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; color: #666;">Laptops, desktops</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-weight: 600;">xl</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">1280px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; font-family: monospace;">1535px</td>
        <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; color: #666;">Large monitors</td>
      </tr>
      <tr>
        <td style="padding: 1rem; font-weight: 600;">2xl</td>
        <td style="padding: 1rem; font-family: monospace;">1536px</td>
        <td style="padding: 1rem; font-family: monospace;">∞</td>
        <td style="padding: 1rem; color: #666;">Ultra-wide displays, 4K monitors</td>
      </tr>
    </tbody>
  </table>
</div>

## Usage

### SCSS

```scss
@use '@ipeeon/design-tokens' as tokens;

.container {
  padding: 1rem;

  // Tablet and up
  @include tokens.respond-to('md') {
    padding: 2rem;
  }

  // Desktop and up
  @include tokens.respond-to('lg') {
    padding: 3rem;
  }
}

// Custom media queries
@media (min-width: map-get(tokens.$breakpoints, 'lg')) {
  .content {
    max-width: 1024px;
  }
}
```

### CSS

```css
/* Mobile first approach */
.container {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

### TypeScript

```typescript
import { tokens } from '@ipeeon/design-tokens';

// Access breakpoint values
const tabletBreakpoint = tokens.breakpoints.md; // '768px'

// Use in JavaScript media queries
const isMobile = window.matchMedia(`(max-width: ${tokens.breakpoints.sm})`).matches;
const isDesktop = window.matchMedia(`(min-width: ${tokens.breakpoints.lg})`).matches;
```

## Best Practices

::: tip Do

- Use mobile-first approach (start with smallest screen, add breakpoints for larger)
- Test your layouts at each breakpoint
- Use consistent breakpoints across your application
- Consider content, not just devices, when choosing breakpoints
- Use relative units (rem, em) for breakpoints when possible :::

::: warning Don't

- Design for specific devices (breakpoints should be content-driven)
- Add too many breakpoints (3-4 is usually sufficient)
- Use arbitrary breakpoint values
- Forget to test on real devices
- Assume all mobile devices are the same size :::

## Mobile-First vs Desktop-First

### Mobile-First (Recommended)

```scss
// Start with mobile styles
.element {
  font-size: 1rem;
  padding: 1rem;
}

// Add complexity for larger screens
@include tokens.respond-to('md') {
  .element {
    font-size: 1.125rem;
    padding: 2rem;
  }
}
```

### Desktop-First

```scss
// Start with desktop styles
.element {
  font-size: 1.125rem;
  padding: 2rem;
}

// Simplify for smaller screens
@media (max-width: 767px) {
  .element {
    font-size: 1rem;
    padding: 1rem;
  }
}
```
