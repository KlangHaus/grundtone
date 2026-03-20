# Checkbox

Standalone checkbox for single yes/no confirmation (e.g. accept terms). For groups of checkboxes, use [Checkbox Group](/vue/checkbox-group).

## Demo

<CheckboxDemo />

## Installation

```vue
<script setup>
import { GTCheckbox } from '@grundtone/vue';
</script>
```

## Usage

```vue
<GTCheckbox v-model="accepted" label="Jeg accepterer vilkårene" />
<GTCheckbox v-model="newsletter" label="Modtag nyhedsbrev"
  help-text="Vi sender maks én email om ugen" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Checked state (v-model) |
| `label` | `string` | — | Label text |
| `helpText` | `string` | — | Help text below label |
| `disabled` | `boolean` | `false` | Disabled state |
| `name` | `string` | — | HTML name attribute |
| `id` | `string` | auto | HTML id |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted on toggle |
