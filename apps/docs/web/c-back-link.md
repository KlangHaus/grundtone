# Back Link

Navigation link to return to a previous page or step. Arrow (←) is rendered via CSS `::before` and animates on hover.

---

## Preview

<CodePreview name="c-back-link" />

---

## When to use

Use in multi-step flows where users need to navigate back. Also for pages with a clear parent (e.g. blog post → blog listing).

Do not use together with breadcrumbs — choose one or the other. Do not use when you don't know where the user came from (e.g. search engine landing).

---

## Usage

```html
<a href="/blog" class="back-link">Alle indlæg</a>
```

The `←` arrow is added automatically via CSS — do not include it in the markup.

---

## Do's and don'ts

<DosDonts>
  <DoItem>Place at the top left, before the main content</DoItem>
  <DoItem>Use specific text: "Alle indlæg" not just "Tilbage"</DoItem>
  <DoItem>Link to the previous page in the state the user last saw it</DoItem>
  <DontItem>Use together with breadcrumbs</DontItem>
  <DontItem>Use when you don't know the user's previous page</DontItem>
  <DontItem>Include the arrow in HTML — it's added by CSS</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.back-link` | Link with `::before` arrow, primary color, underline on hover |

---

## Accessibility

- Standard `<a>` element — fully accessible by default
- Focus ring via `:focus-visible`
- Arrow animates left on hover

---

## References

- [GOV.UK Back Link](https://design-system.service.gov.uk/components/back-link/)
