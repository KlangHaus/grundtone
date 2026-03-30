# Toggle

A toggle switch is a digital on/off button. Unlike radio buttons or checkboxes, the choice takes effect the moment the user interacts with it.

## Demo

<ToggleDemo />

## Installation

```vue
<script setup>
import { GTToggle } from '@grundtone/vue';
</script>
```

In Nuxt, `GTToggle` is auto-imported.

## When to use

Use a toggle switch to turn a single option on or off immediately. The user's choice always takes effect as soon as the switch is pressed.

Do not use a toggle switch when the choice only takes effect after clicking a save button or similar. Use radio buttons or checkboxes instead.

## Usage

### Basic

```vue
<GTToggle v-model="notifications" label="Notifications" />
```

### Sizes

```vue
<GTToggle v-model="value" size="sm" label="Small" />
<GTToggle v-model="value" size="md" label="Medium" />
<GTToggle v-model="value" size="lg" label="Large" />
```

### Disabled

```vue
<GTToggle v-model="value" disabled label="Cannot change" />
```

### Without label

A toggle can be rendered without a visible label, but always provide an accessible name via `aria-label` on the wrapping element or context.

```vue
<GTToggle v-model="value" />
```

## Guidelines

- Give the switch a short, precise label placed **to the left** of the toggle.
- Distance between label and toggle depends on context, device, and text length.
- When a page has multiple toggles, place them directly below each other so the switches visually align in a straight line.
- Ensure toggle usage is consistent across the solution.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Bound value (v-model) |
| `label` | `string` | — | Visible label to the left of the toggle |
| `size` | `ToggleSize` | `'md'` | Size preset: sm, md, lg |
| `disabled` | `boolean` | `false` | Disabled state |
| `name` | `string` | — | HTML name attribute |
| `id` | `string` | auto | HTML id (auto-generated for label association) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when toggled (v-model) |

## Accessibility

- Uses `role="switch"` — the correct ARIA role for on/off controls
- `aria-checked` reflects the current state
- Label associated with toggle via `for`/`id`
- Keyboard operable: Space and Enter toggle the switch
- Focus ring on `:focus-visible`

## CSS Classes

| Class | Description |
|-------|-------------|
| `gt-toggle-field` | Wrapper for label + toggle |
| `gt-toggle-label` | Label text |
| `gt-toggle` | The toggle button |
| `gt-toggle--sm` | Small size |
| `gt-toggle--md` | Medium size |
| `gt-toggle--lg` | Large size |
| `gt-toggle--checked` | Checked/on state |
| `gt-toggle--disabled` | Disabled state |
| `gt-toggle__track` | Track (background pill) |
| `gt-toggle__thumb` | Thumb (sliding circle) |
