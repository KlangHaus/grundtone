# Chart

Container, tooltip, and legend components for data visualizations. Chart-library agnostic.

## Demo

<ChartDemo />

---

## Components

### GTChartContainer

Wrapper that provides chart config (colors, labels) via `provide` and sets CSS custom properties.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `ChartConfig` | — | Chart series configuration (required) |
| `ariaLabel` | `string` | — | Accessible chart description |

**ChartConfig** is `Record<string, { label: string; color: string }>`.

Each config key generates a CSS custom property `--color-{key}` on the container.

### GTChartTooltip

Styled tooltip that resolves labels and colors from the chart config.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Tooltip header |
| `items` | `ChartTooltipItem[]` | `[]` | Data items to display |

**ChartTooltipItem**: `{ key: string; value: string | number }`

### GTChartLegend

Legend that renders color dots with labels from the chart config.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `string[]` | all keys | Filter which series to show |

---

## Usage

### Basic with inline SVG

```vue
<script setup>
import { GTChartContainer, GTChartLegend } from '@grundtone/vue';

const config = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--chart-2)' },
};
</script>

<template>
  <GTChartContainer :config="config" aria-label="Revenue vs expenses">
    <div class="chart__header">
      <p class="chart__title">Monthly revenue</p>
    </div>

    <svg viewBox="0 0 300 100">
      <rect x="10" y="20" width="30" height="80" fill="var(--color-revenue)" rx="4" />
      <rect x="50" y="40" width="30" height="60" fill="var(--color-expenses)" rx="4" />
    </svg>

    <GTChartLegend />
  </GTChartContainer>
</template>
```

### With Chart.js (vue-chartjs)

```vue
<script setup>
import { GTChartContainer, GTChartLegend } from '@grundtone/vue';
import { Bar } from 'vue-chartjs';

const config = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
};
</script>

<template>
  <GTChartContainer :config="config" aria-label="Monthly revenue">
    <Bar :data="chartData" :options="chartOptions" />
    <GTChartLegend />
  </GTChartContainer>
</template>
```

---

## CSS classes

See [Design System Chart reference](/web/c-chart) for all available CSS classes and color tokens.
