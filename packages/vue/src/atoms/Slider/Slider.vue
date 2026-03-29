<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { SliderProps } from './types';

  const props = withDefaults(defineProps<SliderProps>(), {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    range: false,
    orientation: 'horizontal',
    disabled: false,
    label: undefined,
    showValue: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: number | [number, number]];
  }>();

  const isVertical = computed(() => props.orientation === 'vertical');

  // Normalized values
  const lowValue = computed(() =>
    props.range && Array.isArray(props.modelValue)
      ? props.modelValue[0]
      : (props.modelValue as number),
  );

  const highValue = computed(() =>
    props.range && Array.isArray(props.modelValue)
      ? props.modelValue[1]
      : (props.modelValue as number),
  );

  // Percentages
  const span = computed(() => props.max - props.min || 1);

  const lowPercent = computed(
    () => ((lowValue.value - props.min) / span.value) * 100,
  );

  const highPercent = computed(
    () => ((highValue.value - props.min) / span.value) * 100,
  );

  // Range bar style
  const rangeStyle = computed(() => {
    if (isVertical.value) {
      if (props.range) {
        return {
          bottom: `${lowPercent.value}%`,
          height: `${highPercent.value - lowPercent.value}%`,
        };
      }
      return { bottom: '0%', height: `${lowPercent.value}%` };
    }
    if (props.range) {
      return {
        left: `${lowPercent.value}%`,
        width: `${highPercent.value - lowPercent.value}%`,
      };
    }
    return { left: '0%', width: `${lowPercent.value}%` };
  });

  // Thumb positions
  const lowThumbStyle = computed(() =>
    isVertical.value
      ? { bottom: `${lowPercent.value}%` }
      : { left: `${lowPercent.value}%` },
  );

  const highThumbStyle = computed(() =>
    isVertical.value
      ? { bottom: `${highPercent.value}%` }
      : { left: `${highPercent.value}%` },
  );

  // Display value
  const displayValue = computed(() => {
    if (props.range && Array.isArray(props.modelValue)) {
      return `${props.modelValue[0]} – ${props.modelValue[1]}`;
    }
    return String(props.modelValue);
  });

  // Snap to step
  function snap(val: number): number {
    const stepped =
      Math.round((val - props.min) / props.step) * props.step + props.min;
    return Math.max(props.min, Math.min(props.max, stepped));
  }

  function emitValue(val: number, thumb: 'low' | 'high') {
    if (props.range) {
      if (thumb === 'low') {
        emit('update:modelValue', [
          Math.min(val, highValue.value),
          highValue.value,
        ]);
      } else {
        emit('update:modelValue', [
          lowValue.value,
          Math.max(val, lowValue.value),
        ]);
      }
    } else {
      emit('update:modelValue', val);
    }
  }

  // Pointer drag
  const controlRef = ref<HTMLElement | null>(null);
  let activeThumb: 'low' | 'high' = 'low';

  function getValueFromEvent(e: PointerEvent): number {
    const el = controlRef.value;
    if (!el) return props.min;

    const rect = el.getBoundingClientRect();
    let ratio: number;

    if (isVertical.value) {
      ratio = 1 - (e.clientY - rect.top) / rect.height;
    } else {
      ratio = (e.clientX - rect.left) / rect.width;
    }

    ratio = Math.max(0, Math.min(1, ratio));
    return snap(props.min + ratio * span.value);
  }

  function onPointerDown(e: PointerEvent, thumb: 'low' | 'high') {
    if (props.disabled) return;
    activeThumb = thumb;
    (e.currentTarget as HTMLElement)?.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (props.disabled) return;
    // Only track if pointer is captured (button held)
    if (!(e.currentTarget as HTMLElement)?.hasPointerCapture(e.pointerId))
      return;
    const val = getValueFromEvent(e);
    emitValue(val, activeThumb);
  }

  function onPointerUp(e: PointerEvent) {
    (e.currentTarget as HTMLElement)?.releasePointerCapture(e.pointerId);
  }

  // Track click
  function onTrackClick(e: PointerEvent) {
    if (props.disabled) return;
    const val = getValueFromEvent(e);

    if (props.range) {
      // Move closest thumb
      const distLow = Math.abs(val - lowValue.value);
      const distHigh = Math.abs(val - highValue.value);
      emitValue(val, distLow <= distHigh ? 'low' : 'high');
    } else {
      emitValue(val, 'low');
    }
  }

  // Keyboard
  function onKeydown(e: KeyboardEvent, thumb: 'low' | 'high') {
    const current = thumb === 'low' ? lowValue.value : highValue.value;
    let next = current;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        next = snap(current + props.step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        next = snap(current - props.step);
        break;
      case 'Home':
        e.preventDefault();
        next = props.min;
        break;
      case 'End':
        e.preventDefault();
        next = props.max;
        break;
      case 'PageUp':
        e.preventDefault();
        next = snap(current + props.step * 10);
        break;
      case 'PageDown':
        e.preventDefault();
        next = snap(current - props.step * 10);
        break;
      default:
        return;
    }

    emitValue(next, thumb);
  }
</script>

<template>
  <div
    :class="[
      'slider',
      {
        'slider--vertical': isVertical,
        'slider--disabled': disabled,
        'slider--range': range,
      },
    ]"
  >
    <div v-if="label || showValue" class="slider__header">
      <label v-if="label" class="slider__label">{{ label }}</label>
      <span v-if="showValue" class="slider__value">{{ displayValue }}</span>
    </div>

    <div
      ref="controlRef"
      class="slider__control"
      @pointerdown.self="onTrackClick"
    >
      <div class="slider__track" />
      <div class="slider__range" :style="rangeStyle" />

      <!-- Low thumb (or single thumb) -->
      <div
        class="slider__thumb"
        role="slider"
        tabindex="0"
        :aria-valuemin="min"
        :aria-valuemax="range ? highValue : max"
        :aria-valuenow="lowValue"
        :aria-orientation="orientation"
        :aria-label="range ? `${label ?? 'Slider'} minimum` : label"
        :aria-disabled="disabled"
        :style="lowThumbStyle"
        @keydown="onKeydown($event, 'low')"
        @pointerdown="onPointerDown($event, 'low')"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      />

      <!-- High thumb (range mode only) -->
      <div
        v-if="range"
        class="slider__thumb"
        role="slider"
        tabindex="0"
        :aria-valuemin="lowValue"
        :aria-valuemax="max"
        :aria-valuenow="highValue"
        :aria-orientation="orientation"
        :aria-label="`${label ?? 'Slider'} maximum`"
        :aria-disabled="disabled"
        :style="highThumbStyle"
        @keydown="onKeydown($event, 'high')"
        @pointerdown="onPointerDown($event, 'high')"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      />
    </div>
  </div>
</template>

<style lang="scss">
  // Styles provided by design system (_slider.scss)
</style>
