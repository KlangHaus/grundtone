# Code Block

Displays a snippet of code or text with an optional header and a copy button.

---

## Demo

<CodeBlockDemo />

---

## When to use

- Install commands, usage examples and configuration snippets in an application
- Any text the user is expected to copy exactly

## When not to use

- Inline code in running text — use `<code>`
- Editable code — use [Textarea](/vue/textarea)

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

```vue
<template>
  <GTCodeBlock code="pnpm add @grundtone/vue" language="bash" label="Install" />
</template>
```

### Without copy button

```vue
<template>
  <GTCodeBlock :code="json" language="json" :copyable="false" />
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `code` | `string` | **required** | The code or text to display |
| `language` | `string` | — | Language label in the header (e.g. `bash`, `json`). It is a label; there is no syntax highlighting |
| `label` | `string` | — | Caption in the header (e.g. `Install`, `tokens.json`) |
| `copyable` | `boolean` | `true` | Show a copy-to-clipboard button |

The header renders when `label` or `language` is set, or when `copyable` is `true`.

---

## Accessibility

- The copy button is labelled "Kopiér kode", and "Kopieret" for two seconds after a copy
- Copying uses `navigator.clipboard`, which needs a secure context (HTTPS or localhost)
