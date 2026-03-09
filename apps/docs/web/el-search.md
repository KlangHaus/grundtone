# Search

Semantic reference for `<search>`.

---

## Usage

```html
<search>
  <label for="q">Search</label>
  <input type="search" id="q" name="q" placeholder="Search…" />
</search>
```

The `<search>` element identifies a section containing search or filtering controls. Supported from Chrome 118, Safari 17, Firefox 118.

## Accessibility

- Creates a `search` landmark role automatically.
- Use `aria-label` when multiple search regions appear on the same page.
