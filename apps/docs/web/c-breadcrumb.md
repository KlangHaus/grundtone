# Breadcrumb

Navigation breadcrumb trail with link styling and separator spacing.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.breadcrumb` | Container — styles links and `[aria-hidden]` separators |

### Preview

<CodePreview name="c-breadcrumb" />

---

## Usage

```html
<nav class="breadcrumb text-sm text-tertiary" aria-label="Breadcrumb">
  <a href="/blog">Blog</a>
  <span aria-hidden="true">/</span>
  <span aria-current="page">Current Page</span>
</nav>
```
