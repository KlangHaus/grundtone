# Footer

Semantic reference for `<footer>`. Reset to `display: block`.

---

## Usage

```html
<article>
  <p>Content here...</p>
  <footer>
    <small>Published 1 March 2026</small>
  </footer>
</article>
```

The `<footer>` element represents a footer for its nearest sectioning content — typically metadata, copyright, or related links. It can appear inside `<article>`, `<section>`, or at page level.

For page-level footer with border and spacing, use the [`.footer` component](/web/c-footer).

## Accessibility

- A `<footer>` that is not nested inside `<article>`, `<section>`, or `<aside>` automatically maps to the `contentinfo` landmark role.
