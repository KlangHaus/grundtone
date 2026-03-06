# Author Card

Author bio card with circular avatar.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.author-card` | Flex container with gap, padding, and radius |
| `.author-avatar` | 56px circular avatar placeholder |

### Preview

<CodePreview name="c-author-card" />

---

## Usage

```html
<aside class="author-card bg-surface" aria-label="About the author">
  <div class="author-avatar bg-primary text-on-primary font-bold text-xl"
       aria-hidden="true">AH</div>
  <div>
    <div class="font-semibold">Allan Hansen</div>
    <div class="text-sm text-secondary">Designer and frontend architect.</div>
  </div>
</aside>
```
