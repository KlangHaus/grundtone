# Header

Semantic reference for `<header>`. Reset to `display: block`.

---

## Usage

```html
<article>
  <header>
    <h2>Post Title</h2>
    <time>1 March 2026</time>
  </header>
  <p>Content here...</p>
</article>
```

The `<header>` element represents introductory content — typically a group of headings, a logo, or navigation. It can appear inside `<article>`, `<section>`, or at page level.

For page-level navigation layout, use the [`.header` component](/web/c-header).

## Accessibility

- A `<header>` that is not nested inside `<article>`, `<section>`, or `<aside>` automatically maps to the `banner` landmark role.
- Add `role="banner"` explicitly when nesting is ambiguous.
