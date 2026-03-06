# Description List

Base element styles for `<dl>`, `<dt>`, and `<dd>`. Resets margins and provides consistent defaults.

---

## Base Reset

| Selector | Property | Value |
| --- | --- | --- |
| `dl` | `margin` | `0` |
| `dt` | `font-weight` | `var(--font-weight-medium)` |
| `dd` | `margin-left` | `0` |

### Preview

<CodePreview name="el-dl" />

---

## Variants

### `.detail-row`

Horizontal key-value row with bottom border, used for product details.

| Class | Purpose |
| --- | --- |
| `.detail-row` | Flex row with gap, padding, and border-bottom |
| `.detail-row dt` | Secondary color label with min-width |

<CodePreview name="el-detail-row" />

```html
<dl>
  <div class="detail-row">
    <dt>Material</dt>
    <dd>100% organic cotton</dd>
  </div>
  <div class="detail-row">
    <dt>Fit</dt>
    <dd>Regular, unisex</dd>
  </div>
</dl>
```
