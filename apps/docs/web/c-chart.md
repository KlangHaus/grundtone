# Chart

Color tokens and container styling for data visualizations. Chart-library agnostic — works with Chart.js, ECharts, D3, inline SVG, or any charting tool.

## When to use

- Dashboards and data-driven interfaces
- Reports, analytics, and monitoring views
- Any context where data needs visual representation

## Philosophy

Grundtone provides **theming and layout** for charts, not a charting engine. Use your preferred chart library and apply Grundtone tokens for visual consistency.

---

## Color tokens

Five semantic chart colors, optimized for contrast in both light and dark mode:

| Token | Usage |
|-------|-------|
| `--chart-1` | Primary series |
| `--chart-2` | Secondary series |
| `--chart-3` | Tertiary series |
| `--chart-4` | Quaternary series |
| `--chart-5` | Quinary series |

Use as `fill`, `stroke`, or `background-color`:

```html
<rect fill="var(--chart-1)" />
<div style="background: var(--chart-2)"></div>
```

---

## CSS classes

### Container

| Class | Description |
|-------|-------------|
| `.chart` | Root container — ensures SVG/canvas fills width |
| `.chart__header` | Title + description block |
| `.chart__title` | Chart title — semibold, sm |
| `.chart__description` | Subtitle — xs, tertiary |
| `.chart__footer` | Below-chart annotation |

### Legend

| Class | Description |
|-------|-------------|
| `.chart__legend` | Flex container for legend items |
| `.chart__legend-item` | Single legend entry |
| `.chart__legend-dot` | Color dot indicator |

### Tooltip

| Class | Description |
|-------|-------------|
| `.chart__tooltip` | Styled tooltip container |
| `.chart__tooltip-label` | Tooltip header |
| `.chart__tooltip-item` | Single data row |
| `.chart__tooltip-indicator` | Dot + label |
| `.chart__tooltip-dot` | Color dot |
| `.chart__tooltip-value` | Value — semibold, tabular-nums |

---

## Example: inline SVG bar chart

```html
<div class="chart">
  <div class="chart__header">
    <p class="chart__title">Monthly revenue</p>
    <p class="chart__description">Jan – Jun 2026</p>
  </div>

  <svg viewBox="0 0 300 100">
    <rect x="10" y="20" width="30" height="80" fill="var(--chart-1)" rx="4" />
    <rect x="50" y="40" width="30" height="60" fill="var(--chart-1)" rx="4" />
    <!-- ... more bars -->
  </svg>

  <div class="chart__legend">
    <span class="chart__legend-item">
      <span class="chart__legend-dot" style="background: var(--chart-1)"></span>
      Revenue
    </span>
  </div>
</div>
```

---

## Integration guides

### Chart.js

```js
import { Chart } from 'chart.js';

// Read Grundtone tokens from computed styles
const styles = getComputedStyle(document.documentElement);
const chart1 = styles.getPropertyValue('--chart-1').trim();
const chart2 = styles.getPropertyValue('--chart-2').trim();

new Chart(ctx, {
  data: {
    datasets: [
      { backgroundColor: chart1, ... },
      { backgroundColor: chart2, ... },
    ]
  }
});
```

### Vue (GTChartContainer)

See [Vue Chart documentation](/vue/chart) for the `GTChartContainer`, `GTChartTooltip`, and `GTChartLegend` components.

---

## Accessibility

- Use `role="img"` and `aria-label` on the chart container
- Provide a text summary or data table alongside the chart for screen readers
- Ensure chart colors have sufficient contrast (WCAG AA for large text)
- Consider colorblind-safe palettes for categorical data — supplement color with patterns or labels
