# Article Card

Clickable card for blog/article listings with hover elevation and focus styles.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.article-card` | Block-level card with hover shadow + translateY |

## Features

- `surface-raised` background
- Transition on box-shadow and transform
- Focus-visible outline with `--color-focus-ring`
- `prefers-reduced-motion` disables transitions

### Preview

<CodePreview name="c-article-card" />

---

## Usage

```html
<article class="article-card shadow-sm">
  <div class="article-meta text-xs text-tertiary">
    <span class="article-tag text-xs font-medium">Design</span>
    <time datetime="2026-03-01">1 March 2026</time>
  </div>
  <h2 class="text-xl font-semibold">
    <a href="/post">Article Title</a>
  </h2>
  <p class="article-excerpt text-secondary text-sm">
    Short excerpt...
  </p>
</article>
```
