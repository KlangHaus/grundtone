# Prose

Rich-text container for article/blog content. Styles headings, paragraphs, lists, code, and pre blocks.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.prose` | Container for rich text content |

## Styled Elements

| Selector | Styling |
| --- | --- |
| `.prose h2` | `font-size-2xl`, semibold, tight line-height |
| `.prose h3` | `font-size-lg`, semibold |
| `.prose p` | Relaxed line-height, bottom margin |
| `.prose ul, ol` | Left padding, relaxed line-height |
| `.prose li` | Small bottom margin |
| `.prose code` | Mono font, surface-alt background, small padding |
| `.prose pre` | Surface background, rounded-lg, overflow-x auto |
| `.prose pre code` | Reset padding and background |

### Preview

<CodePreview name="c-prose" />

---

## Usage

```html
<div class="prose">
  <h2>Section Title</h2>
  <p>Paragraph with <code>inline code</code>.</p>
  <ul>
    <li>List item</li>
  </ul>
  <pre><code>code block</code></pre>
</div>
```
