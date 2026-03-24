<script setup lang="ts">
  import { inject } from 'vue';
  import type { ChartTooltipProps, ChartConfig } from './types';

  withDefaults(defineProps<ChartTooltipProps>(), {
    label: undefined,
    items: () => [],
  });

  const config = inject<{ value: ChartConfig }>('gt-chart-config');

  function getLabel(key: string): string {
    return config?.value?.[key]?.label ?? key;
  }

  function getColor(key: string): string {
    return config?.value?.[key]?.color ?? 'var(--color-text)';
  }
</script>

<template>
  <div class="chart__tooltip">
    <p v-if="label" class="chart__tooltip-label">{{ label }}</p>
    <div v-for="item in items" :key="item.key" class="chart__tooltip-item">
      <span class="chart__tooltip-indicator">
        <span
          class="chart__tooltip-dot"
          :style="{ backgroundColor: getColor(item.key) }"
        />
        {{ getLabel(item.key) }}
      </span>
      <span class="chart__tooltip-value">{{ item.value }}</span>
    </div>
    <slot />
  </div>
</template>
