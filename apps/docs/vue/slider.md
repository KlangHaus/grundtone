# Slider

Range input component with single and dual-thumb modes.

## Demo

<SliderDemo />

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number \| [number, number]` | `0` | Value (v-model) |
| `min` | `number` | `0` | Minimum |
| `max` | `number` | `100` | Maximum |
| `step` | `number` | `1` | Step increment |
| `range` | `boolean` | `false` | Enable dual-thumb range |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | — | Accessible label |
| `showValue` | `boolean` | `false` | Show current value |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number \| [number, number]` | Value changed |

---

## Usage

### Basic

```vue
<script setup>
import { ref } from 'vue';
import { GTSlider } from '@grundtone/vue';

const volume = ref(60);
</script>

<template>
  <GTSlider v-model="volume" label="Volumen" show-value />
</template>
```

### Range

```vue
<script setup>
import { ref } from 'vue';
import { GTSlider } from '@grundtone/vue';

const price = ref<[number, number]>([200, 800]);
</script>

<template>
  <GTSlider
    v-model="price"
    :min="0"
    :max="1000"
    :step="50"
    range
    label="Pris (kr)"
    show-value
  />
</template>
```

---

## CSS classes

See [Design System Slider reference](/web/c-slider) for all CSS classes.
