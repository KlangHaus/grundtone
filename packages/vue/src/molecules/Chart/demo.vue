<script setup lang="ts">
  import GTChartContainer from './ChartContainer.vue';
  import GTChartLegend from './ChartLegend.vue';
  import type { ChartConfig } from './types';

  const config: ChartConfig = {
    revenue: { label: 'Omsætning', color: 'var(--chart-1)' },
    expenses: { label: 'Udgifter', color: 'var(--chart-2)' },
    profit: { label: 'Resultat', color: 'var(--chart-4)' },
  };

  const data = [
    { month: 'Jan', revenue: 42, expenses: 28, profit: 14 },
    { month: 'Feb', revenue: 38, expenses: 25, profit: 13 },
    { month: 'Mar', revenue: 55, expenses: 30, profit: 25 },
    { month: 'Apr', revenue: 48, expenses: 32, profit: 16 },
    { month: 'Maj', revenue: 62, expenses: 35, profit: 27 },
    { month: 'Jun', revenue: 58, expenses: 33, profit: 25 },
  ];

  const maxVal = Math.max(...data.map(d => d.revenue));
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4>Bar chart (inline SVG)</h4>
      <GTChartContainer :config="config" aria-label="Omsætning per måned">
        <div class="chart__header">
          <p class="chart__title">Månedlig omsætning</p>
          <p class="chart__description">Januar – Juni 2026</p>
        </div>

        <svg
          viewBox="0 0 600 200"
          style="width: 100%; max-width: 600px; height: auto"
        >
          <g v-for="(d, i) in data" :key="d.month">
            <!-- Revenue bar -->
            <rect
              :x="i * 100 + 16"
              :y="200 - (d.revenue / maxVal) * 170"
              width="28"
              :height="(d.revenue / maxVal) * 170"
              :fill="config.revenue.color"
              rx="4"
            />
            <!-- Expenses bar -->
            <rect
              :x="i * 100 + 48"
              :y="200 - (d.expenses / maxVal) * 170"
              width="28"
              :height="(d.expenses / maxVal) * 170"
              :fill="config.expenses.color"
              rx="4"
            />
            <!-- Label -->
            <text
              :x="i * 100 + 45"
              y="196"
              text-anchor="middle"
              style="
                font-size: 11px;
                fill: var(--color-text-tertiary);
              "
            >
              {{ d.month }}
            </text>
          </g>
        </svg>

        <GTChartLegend />

        <div class="chart__footer">
          <p>Total omsætning: {{ data.reduce((s, d) => s + d.revenue, 0) }}k kr</p>
        </div>
      </GTChartContainer>
    </div>

    <div>
      <h4>Color tokens</h4>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-2"
        >
          <div
            :style="{
              width: '2rem',
              height: '2rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: `var(--chart-${i})`,
            }"
          />
          <code class="text-xs">--chart-{{ i }}</code>
        </div>
      </div>
    </div>
  </div>
</template>
