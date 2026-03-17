# Meta

Metadata row and pill badge. Use in cards, article listings, blog overviews, or anywhere you need a compact row of tags, dates, and secondary info.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.meta` | Flex row with wrap, gap, and center alignment |
| `.tag` | Inline pill badge — primary background, full radius |

---

## Standalone

<CodePreview name="c-meta" />

---

## Inside a Card

Compose `.meta` and `.tag` inside a card's content area for article-style cards:

<CodePreview name="c-meta-in-card" />

---

## Usage

### Standalone

```html
<div class="meta text-sm text-secondary">
  <span class="tag text-xs">Design</span>
  <time datetime="2026-03-01">1 March 2026</time>
  <span aria-hidden="true">&middot;</span>
  <span>6 min read</span>
</div>
```

### Inside a Card

```html
<article class="card">
  <div class="card__media">
    <img src="/image.jpg" alt="Article image" />
  </div>
  <div class="card__content">
    <div class="meta text-sm text-secondary">
      <span class="tag text-xs">Tutorial</span>
      <time datetime="2026-03-01">1 March 2026</time>
    </div>
    <h3 class="card__title">Article Title</h3>
    <div class="card__body">
      <p>Article excerpt goes here.</p>
    </div>
  </div>
</article>
```

---

## Accessibility

- Use `<time>` with `datetime` attribute for dates
- Decorative separators (middot) should have `aria-hidden="true"`
- Tags are purely visual — if they function as links, use `<a>` instead of `<span>`

---

## Best practices

**Do:**
- Combine with utility classes (`text-sm`, `text-secondary`, `text-xs`) for sizing
- Use inside cards, article lists, or standalone metadata rows
- Keep content short — tags, dates, read time, author name

**Don't:**
- Use for long-form content
- Nest interactive elements without proper context
- Use `.tag` for status indicators — use Alert variants instead
