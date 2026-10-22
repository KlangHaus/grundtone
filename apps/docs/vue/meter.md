# Meter

A horizontal bar showing a value against a maximum: progress, usage against a quota, or a rate.

---

## Demo

<MeterDemo />

---

## When to use

- Usage against a limit (storage, seats, API calls)
- Progress of a task whose total is known
- A value whose colour should change when it crosses a threshold

## When not to use

- Progress with an unknown end — use [Spinner](/vue/spinner)
- Comparing several values — use [Chart](/vue/chart)

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Determinate

```vue
<template>
  <GTMeter :value="40" label="Upload progress" />
</template>
```

### Threshold

Ascending (`asc`, default): high is bad, as in capacity. Descending (`desc`): low is bad, as in a success rate.

```vue
<template>
  <GTMeter
    :value="usage"
    :max="1000"
    variant="threshold"
    tone="success"
    :thresholds="[
      { at: 800, tone: 'warning' },
      { at: 950, tone: 'error' },
    ]"
    label="API calls this month"
  />
</template>
```

### Accent colour

```vue
<template>
  <GTMeter :value="62" variant="accent" accent="#8B5CF6" label="Album progress" />
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | **required** | Current value |
| `max` | `number` | `100` | Maximum value. A value ≤ 0 falls back to 100 |
| `variant` | `'determinate' \| 'accent' \| 'threshold'` | `'determinate'` | How the fill colour is chosen |
| `tone` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'primary'` | Fill tone, and the base tone before a threshold is crossed |
| `accent` | `string` | — | Fill colour (any CSS colour or variable) for `accent` |
| `thresholds` | `{ at: number; tone: MeterTone }[]` | `[]` | Bands for `threshold` |
| `direction` | `'asc' \| 'desc'` | `'asc'` | Which way the thresholds apply |
| `label` | `string` | — | Accessible label |

The fill is clamped to 0–100 %.

---

## Accessibility

- `role="progressbar"` with `aria-valuenow` (rounded), `aria-valuemin="0"` and `aria-valuemax`
- Always set `label`; the colour alone does not tell a screen-reader user what is measured or that a threshold was crossed
