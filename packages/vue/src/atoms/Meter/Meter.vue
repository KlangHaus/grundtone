<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { MeterProps, MeterTone } from './types';

  const props = withDefaults(defineProps<MeterProps>(), {
    max: 100,
    variant: 'determinate',
    tone: 'primary',
    accent: undefined,
    thresholds: () => [],
    direction: 'asc',
    label: undefined,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-meter`);

  const clampedMax = computed(() => (props.max > 0 ? props.max : 100));
  const percent = computed(() =>
    Math.max(0, Math.min(100, (props.value / clampedMax.value) * 100)),
  );

  // Threshold resolution — bidirectional. asc: the highest boundary the value
  // has reached wins (high = bad). desc: the lowest boundary the value has
  // dropped to wins (low = bad). No band crossed → the base `tone`.
  const activeTone = computed<MeterTone>(() => {
    if (props.variant !== 'threshold' || props.thresholds.length === 0)
      return props.tone;
    const sorted = [...props.thresholds].sort((a, b) =>
      props.direction === 'asc' ? a.at - b.at : b.at - a.at,
    );
    let tone = props.tone;
    for (const t of sorted) {
      const crossed =
        props.direction === 'asc' ? props.value >= t.at : props.value <= t.at;
      if (crossed) tone = t.tone;
    }
    return tone;
  });

  // accent variant paints the caller's colour; every other variant maps a
  // semantic tone to its CSS custom property.
  const fillColor = computed(() =>
    props.variant === 'accent' && props.accent
      ? props.accent
      : `var(--color-${activeTone.value})`,
  );
</script>

<template>
  <div
    :class="[base, `${base}--${variant}`]"
    role="progressbar"
    :aria-valuenow="Math.round(value)"
    :aria-valuemin="0"
    :aria-valuemax="clampedMax"
    :aria-label="label"
  >
    <div
      :class="`${base}__fill`"
      :style="{ inlineSize: `${percent}%`, backgroundColor: fillColor }"
    />
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-meter {
    inline-size: 100%;
    block-size: 0.5rem;
    background: tokens.color('surface-alt');
    border-radius: tokens.radius('sm');
    overflow: hidden;

    &__fill {
      block-size: 100%;
      border-radius: inherit;
      // Width animates on value change; respect reduced-motion.
      transition: inline-size tokens.duration('base') tokens.ease('ease-out');
    }

    @media (prefers-reduced-motion: reduce) {
      &__fill {
        transition: none;
      }
    }
  }
</style>
