<script setup lang="ts">
  import { inject, computed } from 'vue';
  import type { ChartLegendProps, ChartConfig } from './types';

  const props = withDefaults(defineProps<ChartLegendProps>(), {
    keys: undefined,
  });

  const config = inject<{ value: ChartConfig }>('gt-chart-config');

  const entries = computed(() => {
    if (!config?.value) return [];
    const cfg = config.value;
    const keys = props.keys ?? Object.keys(cfg);
    return keys.map(key => ({
      key,
      label: cfg[key]?.label ?? key,
      color: cfg[key]?.color ?? 'var(--color-text)',
    }));
  });
</script>

<template>
  <div class="chart__legend">
    <span
      v-for="entry in entries"
      :key="entry.key"
      class="chart__legend-item"
    >
      <span
        class="chart__legend-dot"
        :style="{ backgroundColor: entry.color }"
      />
      {{ entry.label }}
    </span>
  </div>
</template>
