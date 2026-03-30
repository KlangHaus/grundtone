# Date Picker

Calendar popover for selecting dates. For dates the user already knows, use [DateInput](/vue/date-input) instead.

## Demo

<DatePickerDemo />

## Installation

```vue
<script setup>
import { GTDatePicker } from '@grundtone/vue';
</script>
```

## Usage

### Basic

```vue
<GTDatePicker v-model="date" label="Dato for aftale" />
```

### With min/max

```vue
<GTDatePicker v-model="date" label="Booking" min="2025-12-01" max="2025-12-31" />
```

### With initial date

```vue
<GTDatePicker v-model="date" label="Start" initial-date="2025-12-01" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | ISO date YYYY-MM-DD (v-model) |
| `label` | `string` | — | Label |
| `helpText` | `string` | — | Help text |
| `errorText` | `string` | — | Error message |
| `placeholder` | `string` | `'DD/MM/ÅÅÅÅ'` | Placeholder |
| `format` | `string` | `'DD/MM/YYYY'` | Display format |
| `min` | `string` | — | Earliest date (ISO) |
| `max` | `string` | — | Latest date (ISO) |
| `initialDate` | `string` | — | Calendar starts at this month |
| `disabled` | `boolean` | `false` | Disabled |
| `required` | `boolean` | `false` | Required |
| `locale` | `string` | `'da'` | Locale for names |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | ISO date selected |

## Calendar utilities

Available from `@grundtone/utils`:

```ts
import { getCalendarGrid, formatDate, parseDate, getMonthNames, getWeekdayNames } from '@grundtone/utils';
```

## DatePicker vs DateInput

Use **DatePicker** for booking/scheduling. Use **DateInput** for known dates (birth date, passport).
