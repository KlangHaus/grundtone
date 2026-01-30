<script setup>
const shadows = {
  none: 'none',
  subtle: '0 1px 3px rgba(0, 0, 0, 0.1)',
  light: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
  large: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
  'extra-large': '0 16px 32px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
};

const componentShadows = {
  card: { shadow: '0 2px 4px rgba(0, 0, 0, 0.1)', description: 'Cards, panels, containers' },
  modal: { shadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)', description: 'Modal dialogs, overlays' },
  dropdown: { shadow: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)', description: 'Dropdown menus, popovers' },
  tooltip: { shadow: '0 2px 4px rgba(0, 0, 0, 0.1)', description: 'Tooltips, hints' },
};
</script>

# Shadows

Shadow tokens provide depth and elevation to UI elements. The shadow system helps establish visual
hierarchy and improve usability by making interactive elements more prominent.

## Shadow Levels

<div style="display: grid; gap: 2rem; margin-top: 1.5rem;">
  <div
    v-for="(shadow, name) in shadows"
    :key="name"
    style="background: white; border-radius: 8px; overflow: hidden;"
  >
    <div style="padding: 1rem; border-bottom: 1px solid #e5e7eb;">
      <div style="font-weight: 600; margin-bottom: 0.25rem; text-transform: capitalize;">{{ name }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ shadow }}</div>
    </div>
    <div style="padding: 2rem; background: #f9fafb; display: flex; justify-content: center; align-items: center; min-height: 200px;">
      <div
        :style="{
          width: '200px',
          height: '120px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          color: '#666'
        }"
      >
        {{ name }}
      </div>
    </div>
  </div>
</div>

## Component-Specific Shadows

Pre-defined shadow combinations optimized for common UI components.

<div style="display: grid; gap: 1.5rem; margin-top: 1.5rem;">
  <div
    v-for="(config, name) in componentShadows"
    :key="name"
    style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;"
  >
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
      <div>
        <div style="font-weight: 600; margin-bottom: 0.25rem; text-transform: capitalize;">{{ name }}</div>
        <div style="color: #666; font-size: 0.875rem;">{{ config.description }}</div>
      </div>
    </div>
    <div style="padding: 2rem; background: #f9fafb; border-radius: 8px; display: flex; justify-content: center; align-items: center;">
      <div
        :style="{
          width: '180px',
          height: '100px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: config.shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          color: '#666'
        }"
      >
        {{ name }}
      </div>
    </div>
    <div style="margin-top: 1rem; font-family: monospace; font-size: 0.875rem; color: #666; padding: 0.75rem; background: #f9fafb; border-radius: 4px; overflow-x: auto;">
      {{ config.shadow }}
    </div>
  </div>
</div>

## Interactive Comparison

Hover over cards to see shadow transitions.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 8px;">
  <div
    v-for="(shadow, name) in { light: shadows.light, medium: shadows.medium, large: shadows.large }"
    :key="name"
    :style="{
      background: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: shadows.light,
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center'
    }"
    @mouseenter="(e) => {
      e.currentTarget.style.boxShadow = shadow;
      e.currentTarget.style.transform = 'translateY(-4px)';
    }"
    @mouseleave="(e) => {
      e.currentTarget.style.boxShadow = shadows.light;
      e.currentTarget.style.transform = 'translateY(0)';
    }"
  >
    <div style="font-weight: 600; margin-bottom: 0.5rem; text-transform: capitalize;">{{ name }}</div>
    <div style="color: #666; font-size: 0.875rem;">Hover me</div>
  </div>
</div>

## Elevation Levels

Visual guide showing how different shadow levels create depth perception.

<div style="margin-top: 1.5rem; padding: 2rem; background: linear-gradient(to bottom, #f9fafb, #e5e7eb); border-radius: 8px;">
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
    <div
      v-for="(shadow, name) in { subtle: shadows.subtle, light: shadows.light, medium: shadows.medium, large: shadows.large, 'extra-large': shadows['extra-large'] }"
      :key="name"
      :style="{
        width: '250px',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: shadow,
        textAlign: 'center',
        transform: name === 'extra-large' ? 'scale(1.05)' : name === 'large' ? 'scale(1.03)' : name === 'medium' ? 'scale(1.02)' : 'scale(1)'
      }"
    >
      <div style="font-weight: 600; margin-bottom: 0.25rem; text-transform: capitalize;">{{ name }}</div>
      <div style="color: #666; font-size: 0.875rem;">Elevation level</div>
    </div>
  </div>
</div>

## Usage Guidelines

### When to Use Each Shadow

::: tip Shadow Selection

- **None**: Flush elements, inline components
- **Subtle**: Slight elevation, hover states on flat elements
- **Light**: Cards, panels, default containers
- **Medium**: Dropdown menus, tooltips, popovers
- **Large**: Modal dialogs, important overlays
- **Extra Large**: High-priority modals, critical alerts
- **Inner**: Pressed/active states, inset elements :::

## Hvordan Bruger Man Shadows

### Praktiske Komponent Eksempler

**Card med Hover Effect**

```scss
@use '@ipeeon/design-tokens' as tokens;

.card {
  background: white;
  border-radius: tokens.radius('lg');
  padding: tokens.spacing(6);
  box-shadow: tokens.shadow('light');
  transition: all 0.3s ease;

  // Hover state
  &:hover {
    box-shadow: tokens.shadow('medium');
    transform: translateY(-2px); // Subtle lift effect
  }

  // Active/pressed state
  &:active {
    box-shadow: tokens.shadow('subtle');
    transform: translateY(0);
  }
}

// Interactive card (clickable)
.card-interactive {
  @extend .card;
  cursor: pointer;

  &:hover {
    box-shadow: tokens.shadow('large');
    border-color: tokens.getColor('primary', 500);
  }
}
```

**Button Shadows**

```scss
.button {
  padding: tokens.spacing(3) tokens.spacing(6);
  border-radius: tokens.radius('default');
  transition: all 0.2s ease;

  // Primary button med shadow
  &.button-primary {
    background-color: tokens.getColor('primary', 600);
    color: white;
    box-shadow: tokens.shadow('subtle');

    &:hover {
      background-color: tokens.getColor('primary', 700);
      box-shadow: tokens.shadow('light');
      transform: translateY(-1px);
    }

    &:active {
      box-shadow: tokens.shadow('inner'); // Inset shadow when pressed
      transform: translateY(0);
    }
  }

  // Flat button (no shadow by default)
  &.button-flat {
    box-shadow: none;

    &:hover {
      box-shadow: tokens.shadow('subtle');
    }
  }

  // Floating action button (FAB)
  &.button-fab {
    border-radius: tokens.radius('round');
    width: 56px;
    height: 56px;
    box-shadow: tokens.shadow('medium');

    &:hover {
      box-shadow: tokens.shadow('large');
    }
  }
}
```

**Modal Dialogs**

```scss
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: tokens.radius('lg');
  padding: tokens.spacing(8);
  box-shadow: tokens.shadow('large');
  max-width: 90vw;
  max-height: 90vh;
  z-index: 1000;

  // Critical/important modal
  &.modal-critical {
    box-shadow: tokens.shadow('extra-large');
    border: 2px solid tokens.getColor('red', 500);
  }
}

// Modal overlay
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
```

**Dropdown Menus**

```scss
.dropdown {
  position: relative;
  display: inline-block;

  .dropdown-trigger {
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: tokens.spacing(2);
    background: white;
    border-radius: tokens.radius('md');
    box-shadow: tokens.shadow('medium');
    min-width: 200px;
    padding: tokens.spacing(2);
    z-index: 100;

    // Animation
    opacity: 0;
    transform: translateY(-8px);
    transition: all 0.2s ease;
    pointer-events: none;

    &.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }
  }

  .dropdown-item {
    padding: tokens.spacing(2) tokens.spacing(3);
    border-radius: tokens.radius('sm');
    cursor: pointer;

    &:hover {
      background-color: tokens.getColor('gray', 100);
    }
  }
}
```

**Navigation Bar**

```scss
.navbar {
  background: white;
  padding: tokens.spacing(4) tokens.spacing(6);
  box-shadow: tokens.shadow('subtle');
  position: sticky;
  top: 0;
  z-index: 100;

  // Elevated navbar (scrolled state)
  &.elevated {
    box-shadow: tokens.shadow('medium');
  }

  // Transparent navbar
  &.transparent {
    background: transparent;
    box-shadow: none;

    &.elevated {
      background: white;
      box-shadow: tokens.shadow('light');
    }
  }
}
```

**Tooltips**

```scss
.tooltip {
  position: absolute;
  background: tokens.getColor('gray', 900);
  color: white;
  padding: tokens.spacing(2) tokens.spacing(3);
  border-radius: tokens.radius('sm');
  box-shadow: tokens.shadow('light');
  font-size: tokens.font-size('sm');
  white-space: nowrap;
  z-index: 1000;

  // Arrow
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid tokens.getColor('gray', 900);
  }
}
```

**Image Cards**

```scss
.image-card {
  position: relative;
  overflow: hidden;
  border-radius: tokens.radius('lg');
  box-shadow: tokens.shadow('light');
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover {
    box-shadow: tokens.shadow('extra-large');

    img {
      transform: scale(1.05); // Subtle zoom
    }
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    padding: tokens.spacing(6);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
```

**Focus States**

```scss
// Focus shadow for accessibility
.input,
.button,
.link {
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px tokens.getColor('primary', 100);
  }

  // Error focus state
  &.error:focus-visible {
    box-shadow: 0 0 0 3px tokens.getColor('red', 100);
  }
}
```

### Layering & Z-Index with Shadows

```scss
// Create depth hierarchy with shadows
.layer-1 {
  box-shadow: tokens.shadow('light');
  z-index: 1;
}

.layer-2 {
  box-shadow: tokens.shadow('medium');
  z-index: 2;
}

.layer-3 {
  box-shadow: tokens.shadow('large');
  z-index: 3;
}

.layer-4 {
  box-shadow: tokens.shadow('extra-large');
  z-index: 4;
}

// Exempel: Stacked cards
.card-stack {
  .card {
    box-shadow: tokens.shadow('light');

    &.active {
      box-shadow: tokens.shadow('large');
      z-index: 2;
    }

    &.hover:not(.active) {
      box-shadow: tokens.shadow('medium');
      z-index: 1;
    }
  }
}
```

### Animations med Shadows

```scss
// Smooth shadow transitions
.card {
  box-shadow: tokens.shadow('light');
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: tokens.shadow('large');
    transform: translateY(-4px);
  }
}

// Pulse effect
@keyframes pulse-shadow {
  0%,
  100% {
    box-shadow: tokens.shadow('medium');
  }
  50% {
    box-shadow: tokens.shadow('large');
  }
}

.pulse {
  animation: pulse-shadow 2s ease-in-out infinite;
}

// Loading skeleton
.skeleton {
  background: linear-gradient(
    90deg,
    tokens.getColor('gray', 100) 25%,
    tokens.getColor('gray', 50) 50%,
    tokens.getColor('gray', 100) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: tokens.radius('default');
  box-shadow: tokens.shadow('subtle');
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

### Dark Mode Shadows

```scss
// Adjust shadows for dark mode
:root {
  --shadow-overlay: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --shadow-overlay: rgba(0, 0, 0, 0.5);

  .card {
    // Stronger shadows in dark mode for better definition
    box-shadow: 0 4px 12px var(--shadow-overlay);
  }

  .modal {
    box-shadow: 0 8px 24px var(--shadow-overlay);
  }
}
```

## Grundlæggende Usage

### SCSS

```scss
@use '@ipeeon/design-tokens' as tokens;

.card {
  box-shadow: tokens.shadow('light');

  &:hover {
    box-shadow: tokens.shadow('medium');
  }
}

// Component-specific shadows
.modal {
  box-shadow: $shadow-modal;
}

.dropdown {
  box-shadow: $shadow-dropdown;
}
```

### CSS Variables

```css
.card {
  box-shadow: var(--shadow-light);
}

.modal {
  box-shadow: var(--shadow-modal);
}

/* Transition shadows smoothly */
.card {
  box-shadow: var(--shadow-light);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-medium);
}
```

### CSS Custom Properties Available

```css
--shadow-none
--shadow-subtle
--shadow-light
--shadow-medium
--shadow-large
--shadow-extra-large
--shadow-inner
--shadow-focus
--shadow-card
--shadow-modal
--shadow-dropdown
--shadow-tooltip
```

## Best Practices

::: tip Do

- Use shadows to indicate interactivity and elevation
- Transition shadows smoothly on hover/active states
- Use lighter shadows for small elements
- Use larger shadows for important, high-priority elements
- Combine shadows with subtle borders for better definition :::

::: warning Don't

- Overuse large shadows - they can be visually heavy
- Use shadows on every element - reserve for elevated content
- Mix shadow styles inconsistently across similar components
- Forget to consider dark mode (shadows may need adjustment)
- Use shadows on elements that should appear flat :::

## Accessibility

Shadows should enhance usability, not replace other accessibility features:

- Don't rely solely on shadows to indicate focus states
- Combine shadows with borders or outlines for better visibility
- Ensure sufficient contrast between shadowed elements and backgrounds
- Test shadow visibility in different lighting conditions
