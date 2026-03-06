# Skip Link

Accessible skip-to-content link, hidden offscreen until focused.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.skip-link` | Offscreen link, slides in on `:focus` |

## Styling

| Property | Value |
| --- | --- |
| `position` | `absolute` (offscreen left) |
| `background` | `var(--color-primary)` |
| `color` | `var(--color-on-primary)` |
| `z-index` | `var(--z-toast)` |
| `border-radius` | `0 0 var(--radius-md) var(--radius-md)` |

On `:focus`, `left` resets to `1rem` making it visible.

### Preview

<CodePreview name="c-skip-link" />

---

## Usage

Place as the first element in `<body>`:

```html
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  <header>...</header>
  <main id="main">...</main>
</body>
```
