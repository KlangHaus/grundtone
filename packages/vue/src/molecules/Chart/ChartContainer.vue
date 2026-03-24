<script setup lang="ts">
  import { computed, provide } from 'vue';
  import type { ChartContainerProps, ChartConfig } from './types';

  const props = withDefaults(defineProps<ChartContainerProps>(), {
    ariaLabel: undefined,
  });

  provide('gt-chart-config', computed(() => props.config));

  // Generate CSS custom properties for each config entry
  // so chart libs can reference var(--color-revenue) etc.
  const colorVars = computed(() => {
    const vars: Record<string, string> = {};
    for (const [key, item] of Object.entries(props.config)) {
      vars[`--color-${key}`] = item.color;
    }
    return vars;
  });
</script>

<template>
  <div
    class="chart"
    :style="colorVars"
    :aria-label="ariaLabel"
    role="img"
  >
    <slot />
  </div>
</template>

<style lang="scss">
  // Styles provided by design system (_chart.scss)
</style>
