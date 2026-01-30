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

## Usage

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
