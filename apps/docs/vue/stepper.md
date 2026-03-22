# Stepper

Horizontal step indicator with dots, checkmarks, connecting lines. Guides users through multi-step flows.

## Demo

<StepperDemo />

## Installation

```vue
<script setup>
import { GTStepper } from '@grundtone/vue';
</script>
```

In Nuxt, `GTStepper` is auto-imported.

## Usage

### Basic

```vue
<script setup>
const step = ref(0);
const steps = [
  { label: 'Kontaktinfo' },
  { label: 'Adresse' },
  { label: 'Betaling' },
  { label: 'Opsummering' },
];
</script>

<GTStepper v-model:active-step="step" :steps="steps" />
```

### All steps clickable

```vue
<GTStepper v-model:active-step="step" :steps="steps" all-clickable />
```

### With info text

```vue
<GTStepper :steps="[
  { label: 'Kontakt', info: 'Navn og email' },
  { label: 'Adresse', info: 'Leveringsadresse' },
]" />
```

### With error

```vue
<GTStepper :steps="[
  { label: 'Kontakt', error: true },
  { label: 'Adresse' },
]" :active-step="1" />
```

### Simple variant

```vue
<GTStepper :steps="steps" :active-step="1" simple />
<!-- Renders: "Trin 2 af 4" -->

<GTStepper :steps="steps" :active-step="0" simple simple-label="Step {current} of {total}" />
<!-- Renders: "Step 1 of 4" -->
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepperStep[]` | — | Steps config (required) |
| `activeStep` | `number` | `0` | Active step index (v-model) |
| `allClickable` | `boolean` | `false` | All steps navigable |
| `simple` | `boolean` | `false` | Simple "Trin X af Y" text |
| `simpleLabel` | `string` | `'Trin {current} af {total}'` | Template for simple variant |

### StepperStep

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Step label |
| `info` | `string` | Extra info below label |
| `error` | `boolean` | Error state |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:activeStep` | `number` | Step clicked |

## Accessibility

- Ordered list `<ol>` with `aria-current="step"` on active
- Completed steps are clickable, upcoming are disabled
- Error steps visually distinct

See [Stepper (Design System)](/web/c-stepper) for full CSS reference.
