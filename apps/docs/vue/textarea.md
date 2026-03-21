# Textarea

Multi-line text input with label, help text, error state, and optional character count.

## Demo

<TextareaDemo />

## Installation

```vue
<script setup>
import { GTTextarea } from '@grundtone/vue';
</script>
```

In Nuxt, `GTTextarea` is auto-imported.

## When to use

Use for unstructured text of more than 2 lines. Set `rows` to match expected input length.

Do not use for structured data or single-line input (use GTInput).

## Usage

### Basic

```vue
<GTTextarea v-model="comment" label="Kommentar" placeholder="Skriv her..." />
```

### With character limit

```vue
<GTTextarea v-model="text" label="Beskrivelse" :max-chars="200" />
```

Shows remaining characters. When over limit, counter turns red but input is NOT blocked.

### Error state

```vue
<GTTextarea v-model="text" label="Begrundelse" error-text="Feltet er påkrævet" />
```

### Custom rows

```vue
<GTTextarea v-model="text" label="Detaljer" :rows="8" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Bound value (v-model) |
| `label` | `string` | — | Visible label |
| `helpText` | `string` | — | Help text |
| `errorText` | `string` | — | Error message (replaces helpText) |
| `placeholder` | `string` | — | Placeholder text |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `rows` | `number` | `4` | Visible rows |
| `maxChars` | `number` | — | Max characters (shows counter) |
| `name` | `string` | — | HTML name |
| `id` | `string` | auto | HTML id |
| `block` | `boolean` | `false` | Full-width |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Input change |
| `focus` | `FocusEvent` | Focus |
| `blur` | `FocusEvent` | Blur |

## Accessibility

- Label associated via `for`/`id`
- `aria-invalid` on error or over-limit
- `aria-describedby` for help/error text
- `aria-required` when required
- Character count uses `aria-live="polite"`

See [Textarea (Design System)](/web/c-textarea) for full CSS reference.
