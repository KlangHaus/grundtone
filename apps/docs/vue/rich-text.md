# Rich Text

A rich-text editor with a constrained set of formatting features. The value is a ProseMirror JSON document; HTML is available as output only.

---

## Demo

<RichTextDemo />

---

## When to use

- Descriptions, notes or messages where the user needs headings, lists, links or emphasis
- When the stored value must round-trip without loss

## When not to use

- Plain text — use [Textarea](/vue/textarea)
- Full documents with images, tables or custom layout

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<script setup>
  import { ref } from 'vue';
  const doc = ref(null);
</script>

<template>
  <GTRichText v-model="doc" aria-label="Description" placeholder="Write a description…" />
</template>
```

### Limited features

A feature that is not listed is neither in the toolbar nor accepted on paste.

```vue
<template>
  <GTRichText v-model="doc" :features="['bold', 'italic', 'link']" aria-label="Comment" />
</template>
```

### HTML output

```vue
<template>
  <GTRichText v-model="doc" @update:html="html => (preview = html)" aria-label="Body" />
</template>
```

### Migrating stored HTML

`fromHTML` converts existing HTML to the JSON document once, on load. Store the JSON afterwards.

```ts
import { fromHTML } from '@grundtone/vue';

const doc = fromHTML(storedHtml);
```

::: danger fromHTML is not a sanitizer
It parses HTML against the editor's schema, so content with no place in the schema is dropped. That looks like an allow-list, but it is not one: extending the extension set with anything that accepts arbitrary attributes changes what survives. Sanitize untrusted HTML separately, and sanitize the `update:html` output before you render it elsewhere.
:::

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `JSONContent \| null` | `null` | The document (`v-model`). The source of truth |
| `placeholder` | `string` | `''` | Shown while the document is empty |
| `readonly` | `boolean` | `false` | Render the content only; the toolbar is hidden |
| `disabled` | `boolean` | `false` | Dimmed and non-interactive |
| `error` | `boolean \| string` | `false` | Invalid state, or the id of the message that describes it |
| `ariaLabel` | `string` | — | Accessible label for the editor |
| `features` | `RichTextFeature[]` | all | Subset of `bold`, `italic`, `code`, `heading`, `bulletList`, `orderedList`, `link` |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `JSONContent` | The document changed |
| `update:html` | `string` | The same change as HTML (output only) |
| `focus` | — | The editor gained focus |
| `blur` | — | The editor lost focus |

## Exposed

| Name | Description |
| --- | --- |
| `editor` | The underlying Tiptap editor instance |

---

## Accessibility

- The editor has `aria-multiline="true"`, `aria-label` and `aria-invalid`; with `error` as a string, `aria-describedby` points at that message
- The toolbar is a `role="toolbar"` controlling the editor, and each button reports its state with `aria-pressed`
- Link editing opens a labelled dialog; errors in it are announced with `role="alert"`
