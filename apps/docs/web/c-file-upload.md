# File Upload

Modern drop zone for file attachment. Drag-and-drop or click to select. Shows file list with size and remove button.

---

## When to use

Use only when file upload is strictly necessary for your solution. Clearly state accepted formats and max size.

---

## Do's and don'ts

<DosDonts>
  <DoItem>Show accepted formats and max file size</DoItem>
  <DoItem>Validate file type and size before upload</DoItem>
  <DoItem>Give positive feedback when file is uploaded</DoItem>
  <DontItem>Use file upload unless strictly necessary</DontItem>
  <DontItem>Let users waste time uploading invalid files</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.file-upload__dropzone` | Drop zone area |
| `.file-upload__dropzone--dragover` | Active drag state |
| `.file-upload__dropzone--error` | Error state |
| `.file-upload__dropzone--disabled` | Disabled state |
| `.file-upload__icon` | Upload icon |
| `.file-upload__text` | "Drag files here" text |
| `.file-upload__hint` | Format/size hint |
| `.file-upload__input` | Hidden file input |
| `.file-upload__files` | File list |
| `.file-upload__file` | Single file row |
| `.file-upload__filename` | File name (truncated) |
| `.file-upload__filesize` | File size |
| `.file-upload__remove` | Remove button |

---

## Accessibility

- Hidden `<input type="file">` for native file picker
- Label associated via `for`/`id`
- Error text with `role="alert"`
- Remove buttons with descriptive `aria-label`

---

## References

- [GOV.UK File Upload](https://design-system.service.gov.uk/components/file-upload/)
