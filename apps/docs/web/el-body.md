# Body

Base styles applied directly to the `<body>` element. No class required.

Sets font-family, font-size, line-height, text color, background, and resets margin/padding.

---

## Styling

| Property | Value |
| --- | --- |
| `font-family` | `var(--font-family-base)` |
| `font-size` | `var(--font-size-base)` |
| `line-height` | `var(--line-height-normal)` |
| `color` | `var(--color-text)` |
| `background-color` | `var(--color-background)` |
| `margin` | `0` |
| `padding` | `0` |

### Preview

<CodePreview name="el-body" />

---

## Usage

These styles are applied automatically — no class or configuration needed. Override with utility classes or page-level styles as needed:

```html
<body>
  <!-- All text inherits base typography from body -->
  <p>Hello world</p>
</body>
```
