# List

Base element styles for `<ul>`, `<ol>`, and `<li>`. Resets margins and provides consistent spacing.

---

## Styling

| Selector | Property | Value |
| --- | --- | --- |
| `ul`, `ol` | `margin` | `0` |
| `ul`, `ol` | `padding-left` | `1.5em` |
| `li + li` | `margin-top` | `var(--space-xs)` |

### Preview

<CodePreview name="el-list" />

---

## Usage

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
```
