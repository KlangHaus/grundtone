# Header

Element styles for `<header>`. Provides a flex layout with brand link and nav.

---

## Styling

| Selector | Properties |
| --- | --- |
| `header` | `display: flex`, `align-items: center`, `justify-content: space-between`, `padding-bottom`, `margin-bottom`, `border-bottom` |
| `header > a` | Bold brand link, `font-size-lg`, no underline |
| `header nav a` | Secondary color, `font-size-sm`, hover → primary |

### Preview

<CodePreview name="el-header" />

---

## Usage

```html
<header role="banner">
  <a href="/">Brand</a>
  <nav>
    <a href="/about">About</a>
    <a href="/blog">Blog</a>
  </nav>
</header>
```

The `<header>` element is styled directly — no class needed. Use `role="banner"` for the page-level header.
