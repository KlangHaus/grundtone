# Tooltip

Dark, minimal tooltip for brief explanatory text. Auto-positions based on viewport space.

## Demo

<TooltipDemo />

## Installation

```vue
<script setup>
import { GTTooltip } from '@grundtone/vue';
</script>
```

In Nuxt, `GTTooltip` is auto-imported.

## Usage

### Click tooltip (help icon)

```vue
<GTTooltip content="CPR bruges til at verificere din identitet.">
  <GTInput label="CPR-nummer" />
</GTTooltip>
```

### Hover tooltip (icon descriptions)

```vue
<GTTooltip content="Slet" trigger="hover">
  <GTButton variant="outlined">
    <GTIcon name="close" />
  </GTButton>
</GTTooltip>
```

### Position

```vue
<GTTooltip content="Info" position="bottom">...</GTTooltip>
```

Auto-flips if not enough space in preferred direction.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — | Tooltip text (required) |
| `position` | `'top' \| 'bottom'` | `'top'` | Preferred position (auto-flips) |
| `trigger` | `'click' \| 'hover'` | `'click'` | Trigger mode |
| `delay` | `number` | `300` | Hover delay in ms |

## Behavior

- **Click**: (?) icon toggles tooltip. Outside click or Escape closes.
- **Hover**: 300ms delay, shows on hover + focus, hides on leave + blur.
- **Auto-position**: Flips top↔bottom when near viewport edge.

## Accessibility

- `role="tooltip"` on bubble
- `aria-expanded` on click trigger
- Hover tooltips also activate on focus
- Escape closes

See [Tooltip (Design System)](/web/c-tooltip) for full CSS reference.
