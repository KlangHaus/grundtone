# File Upload

Modern drop zone with drag-and-drop, file validation, and file list. Uses upload and file icons from the icon registry.

## Demo

<FileUploadDemo />

## Installation

```vue
<script setup>
import { GTFileUpload } from '@grundtone/vue';
</script>
```

In Nuxt, `GTFileUpload` is auto-imported.

## Usage

### Basic

```vue
<GTFileUpload
  label="Vedhæft fil"
  help-text="PDF, JPG eller PNG. Maks 5MB."
  accept=".pdf,.jpg,.jpeg,.png"
  :max-size="5 * 1024 * 1024"
/>
```

### Multiple files

```vue
<GTFileUpload label="Dokumenter" multiple :max-size="10 * 1024 * 1024" />
```

### Handle files

```vue
<GTFileUpload
  label="Bilag"
  @change="files => console.log(files)"
  @error="msg => toast.error(msg)"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Visible label |
| `helpText` | `string` | — | Help text (formats, size) |
| `errorText` | `string` | — | Error message |
| `accept` | `string` | — | Accepted MIME types |
| `maxSize` | `number` | — | Max file size in bytes |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `id` | `string` | auto | HTML id |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change` | `File[]` | Files added or removed |
| `error` | `string` | Validation error message |

## Features

- **Drag-and-drop** with visual dragover state
- **Click to select** via hidden file input
- **File validation** — type and size checked before adding
- **File list** — shows name, size, remove button
- **Icons** — upload icon in drop zone, file icon per file

See [File Upload (Design System)](/web/c-file-upload) for full CSS reference.
