# Slider

Range input for selecting numeric values visually. Supports single value, dual-thumb range, steps, and vertical orientation.

## When to use

- Price/budget range filters
- Volume, opacity, or brightness controls
- Any numeric input where a visual scale aids selection

## When not to use

- Precise values where exact input matters — use [Input](/web/c-input) with `type="number"`
- Binary choices — use [Toggle](/web/c-toggle)
- Selecting from discrete options — use [Select](/web/c-select) or [Radio](/web/c-radio)

---

## Default

<CodePreview id="c-slider-default" />

## Range (dual thumb)

<CodePreview id="c-slider-range" />

## Disabled

<CodePreview id="c-slider-disabled" />

---

## CSS classes

| Class | Description |
|-------|-------------|
| `.slider` | Root container |
| `.slider__header` | Label + value row |
| `.slider__label` | Label text |
| `.slider__value` | Value display — tabular-nums |
| `.slider__control` | Interactive track area (touch target) |
| `.slider__track` | Full-width rail |
| `.slider__range` | Filled portion (primary color) |
| `.slider__thumb` | Draggable handle — circle, shadow, focus ring |
| `.slider--vertical` | Vertical orientation |
| `.slider--disabled` | Disabled state |
| `.slider--range` | Dual-thumb range mode |

## Data attributes (vanilla JS)

| Attribute | Description |
|-----------|-------------|
| `data-min` | Minimum value (default: 0) |
| `data-max` | Maximum value (default: 100) |
| `data-step` | Step increment (default: 1) |

---

## Accessibility

- Thumb has `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `aria-orientation` set for vertical sliders
- Keyboard: ArrowLeft/Right/Up/Down (step), Home/End (min/max), PageUp/PageDown (10× step)
- Range mode: each thumb has scoped aria-valuemin/max to prevent crossing
- `touch-action: none` prevents scroll interference during drag
- `prefers-reduced-motion` disables thumb animations

---

## References

- [W3C Slider Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)
- [shadcn/ui Slider](https://ui.shadcn.com/docs/components/radix/slider)
