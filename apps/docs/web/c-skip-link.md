# Skip Link

Accessible skip-to-content link, hidden offscreen until focused.
Allows keyboard users to skip repetitive navigation and jump directly to the main content or other key sections.

---

## Class

| Class | Purpose |
| --- | --- |
| `.skip-link` | Offscreen link, slides in on `:focus` |

## Styling

| Property | Value |
| --- | --- |
| `position` | `absolute` (offscreen left) |
| `background` | `var(--color-text)` |
| `color` | `var(--color-background)` |
| `z-index` | `var(--z-toast)` |
| `border-radius` | `0 0 var(--radius-md) var(--radius-md)` |

On `:focus`, `left` resets to `1rem` making it visible.

### Preview

<CodePreview name="c-skip-link" />

---

## Usage

Place skip links as the first elements in `<body>`. Add a link for main content and for each major section the user should be able to jump to:

```html
<body>
  <a href="#main" class="skip-link">Skip to content</a>
  <a href="#search" class="skip-link">Skip to search</a>
  <a href="#nav" class="skip-link">Skip to navigation</a>

  <header>...</header>
  <nav id="nav">...</nav>
  <main id="main">
    <form id="search">...</form>
    ...
  </main>
</body>
```

---

## Guidelines

- At minimum, there should be a skip link to `<main>`.
- Add skip links to other important sections (search, navigation) so the user can jump directly to them.
- Skip links use inverted colors (`--color-text` on `--color-background`) to ensure contrast regardless of the page's color scheme.
