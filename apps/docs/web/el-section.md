# Section

Semantic reference for `<section>`.

---

## Usage

```html
<section aria-labelledby="features-heading">
  <h2 id="features-heading">Features</h2>
  <p>A thematic grouping of content.</p>
</section>
```

The `<section>` element represents a thematic grouping of content, typically with a heading.

## Accessibility

- A `<section>` with an accessible name (via `aria-labelledby` or `aria-label`) creates a `region` landmark.
- Without a name, it has no implicit role — always associate it with its heading.
