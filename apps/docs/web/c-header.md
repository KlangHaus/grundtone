# Header

Page-level header with flex layout, brand link, and nav styling.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.header` | Flex container with space-between, bottom border, and spacing |
| `.header > a` | Bold brand link, `font-size-lg`, no underline |
| `.header nav a` | Secondary color, `font-size-sm`, hover → primary |

### Preview

<CodePreview name="c-header" />

---

## Usage

```html
<header class="header" role="banner">
  <a href="/">Brand</a>
  <nav>
    <a href="/about">About</a>
    <a href="/blog">Blog</a>
  </nav>
</header>
```

Apply to a `<header>` element for the page-level navigation bar. Use `role="banner"` for the landmark.

A plain `<header>` without the class only gets `display: block` from the elements layer.
