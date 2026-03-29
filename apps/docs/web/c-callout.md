# Callout

Info and warning boxes for supplementary content.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.callout` | Base flex container with gap, padding, radius |
| `.callout--info` | Info variant — blue background and border |
| `.callout--warning` | Warning variant — yellow background and border |

### Info Callout

<CodePreview name="c-callout-info" />

### Warning Callout

<CodePreview name="c-callout-warning" />

---

## Usage

```html
<div class="callout callout--info" role="note">
  <span aria-hidden="true">&#x2139;&#xFE0F;</span>
  <p>Informational message here.</p>
</div>

<div class="callout callout--warning" role="note">
  <span aria-hidden="true">&#x26A0;&#xFE0F;</span>
  <p>Warning message here.</p>
</div>
```
