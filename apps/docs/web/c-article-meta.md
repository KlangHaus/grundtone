# Article Meta

Metadata row and pill badge for articles.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.article-meta` | Flex row with gap and center alignment |
| `.article-tag` | Inline pill badge — primary bg, full radius |

### Preview

<CodePreview name="c-article-meta" />

---

## Usage

```html
<div class="article-meta text-sm text-secondary">
  <span class="article-tag text-xs font-medium">Design</span>
  <time datetime="2026-03-01">1 March 2026</time>
  <span aria-hidden="true">&middot;</span>
  <span>6 min read</span>
</div>
```
