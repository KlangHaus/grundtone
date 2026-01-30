<script setup>
const radii = {
  none: '0',
  xs: '2px',
  sm: '4px',
  default: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  round: '50%',
  full: '9999px',
};

const componentRadii = {
  input: { radius: '6px', description: 'Input fields, textareas' },
  button: { radius: '6px', description: 'Buttons, call-to-action elements' },
  checkbox: { radius: '4px', description: 'Checkboxes, small inputs' },
  card: { radius: '6px', description: 'Cards, panels, containers' },
  modal: { radius: '12px', description: 'Modal dialogs, large overlays' },
  tooltip: { radius: '4px', description: 'Tooltips, small popovers' },
  badge: { radius: '4px', description: 'Badges, tags, labels' },
  pill: { radius: '9999px', description: 'Pills, capsule buttons' },
};
</script>

# Border Radius

Border radius tokens define the roundedness of corners for UI elements. Consistent border radius
creates visual harmony and helps establish the design system's personality.

## Radius Scale

<div style="display: grid; gap: 1.5rem; margin-top: 1.5rem;">
  <div
    v-for="(radius, name) in radii"
    :key="name"
    style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;"
  >
    <div style="min-width: 100px;">
      <div style="font-weight: 600; margin-bottom: 0.25rem;">{{ name }}</div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ radius }}</div>
    </div>
    <div style="flex: 1; display: flex; gap: 1rem; align-items: center;">
      <div
        :style="{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          borderRadius: radius,
          border: '2px solid #1d4ed8',
          flexShrink: 0
        }"
      />
      <div
        :style="{
          width: '200px',
          height: '60px',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          borderRadius: radius,
          border: '2px solid #1d4ed8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          flexShrink: 0
        }"
      >
        {{ name }}
      </div>
    </div>
  </div>
</div>

## Component-Specific Radius

Pre-defined radius values optimized for specific UI components.

<div style="display: grid; gap: 1.5rem; margin-top: 1.5rem;">
  <div
    v-for="(config, name) in componentRadii"
    :key="name"
    style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;"
  >
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
      <div>
        <div style="font-weight: 600; margin-bottom: 0.25rem; text-transform: capitalize;">{{ name }}</div>
        <div style="color: #666; font-size: 0.875rem;">{{ config.description }}</div>
      </div>
      <div style="font-family: monospace; font-size: 0.875rem; color: #666;">{{ config.radius }}</div>
    </div>
    <div style="padding: 2rem; background: #f9fafb; border-radius: 8px; display: flex; justify-content: center; align-items: center;">
      <div
        :style="{
          width: name === 'pill' ? '200px' : '180px',
          height: name === 'pill' ? '48px' : '100px',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          borderRadius: config.radius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          color: 'white',
          padding: name === 'checkbox' || name === 'badge' ? '0.5rem' : '1rem'
        }"
      >
        {{ name }}
      </div>
    </div>
  </div>
</div>

## Interactive Examples

### Button Variants

Different border radius values create different button personalities.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 8px;">
  <div v-for="(radius, name) in { sm: radii.sm, default: radii.default, lg: radii.lg, full: radii.full }" :key="name" style="text-align: center;">
    <div style="margin-bottom: 0.5rem; font-weight: 600; text-transform: capitalize;">{{ name }}</div>
    <button
      :style="{
        width: '100%',
        padding: '0.75rem 1.5rem',
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: radius,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.2s',
      }"
      @mouseenter="(e) => e.currentTarget.style.background = '#2563eb'"
      @mouseleave="(e) => e.currentTarget.style.background = '#3b82f6'"
    >
      Button
    </button>
    <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.75rem; color: #666;">{{ radius }}</div>
  </div>
</div>

### Card Variants

How border radius affects card appearance.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
  <div
    v-for="(radius, name) in { sm: radii.sm, default: radii.default, lg: radii.lg, xl: radii.xl }"
    :key="name"
    :style="{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: radius,
      overflow: 'hidden',
    }"
  >
    <div style="height: 120px; background: linear-gradient(135deg, #3b82f6, #2563eb);"></div>
    <div style="padding: 1rem;">
      <div style="font-weight: 600; margin-bottom: 0.5rem; text-transform: capitalize;">{{ name }}</div>
      <div style="color: #666; font-size: 0.875rem; margin-bottom: 0.5rem;">This card uses {{ radius }} border radius</div>
      <div style="font-family: monospace; font-size: 0.75rem; color: #999;">border-radius: {{ radius }}</div>
    </div>
  </div>
</div>

## Corner Radius Comparison

Visual comparison of all radius values on identical shapes.

<div style="margin-top: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 8px;">
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 2rem;">
    <div
      v-for="(radius, name) in { none: radii.none, xs: radii.xs, sm: radii.sm, default: radii.default, md: radii.md, lg: radii.lg, xl: radii.xl, '2xl': radii['2xl'], '3xl': radii['3xl'] }"
      :key="name"
      style="text-align: center;"
    >
      <div
        :style="{
          width: '120px',
          height: '120px',
          margin: '0 auto 1rem',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          borderRadius: radius,
          border: '2px solid #1d4ed8'
        }"
      />
      <div style="font-weight: 600; margin-bottom: 0.25rem; text-transform: capitalize;">{{ name }}</div>
      <div style="font-family: monospace; font-size: 0.75rem; color: #666;">{{ radius }}</div>
    </div>
  </div>
</div>

## Usage Guidelines

### When to Use Each Radius

::: tip Radius Selection

- **none (0)**: Sharp corners for modern, technical UIs
- **xs-sm (2-4px)**: Small elements like badges, checkboxes
- **default (6px)**: Standard elements like inputs, buttons, cards
- **md-lg (8-12px)**: Larger containers, modals, featured cards
- **xl-3xl (16-24px)**: Hero sections, large images, prominent elements
- **round (50%)**: Circular elements like avatars, icons
- **full (9999px)**: Pills, capsule buttons, tags :::

## Usage

### SCSS

```scss
@use '@ipeeon/design-tokens' as tokens;

.button {
  border-radius: tokens.radius('default'); // 6px
}

.card {
  border-radius: tokens.radius('lg'); // 12px
}

// Component-specific
.input {
  border-radius: $border-radius-input; // 6px
}

.modal {
  border-radius: $border-radius-modal; // 12px
}
```

### CSS Variables

```css
.button {
  border-radius: var(--radius-default);
}

.card {
  border-radius: var(--radius-lg);
}

/* Pill button */
.button-pill {
  border-radius: var(--radius-full);
}

/* Circular avatar */
.avatar {
  border-radius: var(--radius-round);
}
```

### CSS Custom Properties Available

```css
--radius-none
--radius-xs
--radius-sm
--radius-default
--radius-md
--radius-lg
--radius-xl
--radius-2xl
--radius-3xl
--radius-round
--radius-full
--border-radius-base
--border-radius-input
--border-radius-button
--border-radius-card
```

## Best Practices

::: tip Do

- Use consistent border radius across similar components
- Choose radius values that match your design system's personality
- Use smaller radius for small elements (badges, icons)
- Use larger radius for prominent elements (hero sections, featured cards)
- Consider the relationship between border radius and element size :::

::: warning Don't

- Mix too many different radius values in one interface
- Use very large radius on small elements (looks disproportionate)
- Use sharp corners (0) and rounded corners inconsistently
- Forget to consider border radius on hover/focus states
- Use arbitrary values like `7px` or `13px` instead of scale values :::

## Design System Personality

Border radius significantly impacts the design system's personality:

| Radius Style        | Personality                      | Best For                                        |
| ------------------- | -------------------------------- | ----------------------------------------------- |
| **Sharp (0-2px)**   | Modern, technical, precise       | Developer tools, dashboards, enterprise apps    |
| **Soft (4-8px)**    | Friendly, approachable, balanced | General applications, SaaS products             |
| **Round (12-24px)** | Playful, warm, consumer-friendly | Consumer apps, social media, lifestyle products |
| **Pill (9999px)**   | Modern, dynamic, mobile-first    | Tags, chips, mobile interfaces                  |
