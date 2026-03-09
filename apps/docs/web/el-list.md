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

---

## Use for

- Use lists when you need to list words or sentences.
- Use lists to give the user a quick overview.

## Do not use for

- Lists of long paragraphs with explanatory text. Use spacing instead.

## Guidelines

- Keep lists as short and factual as possible.
- Use numbers (`<ol>`) when there is a hierarchy in what you are presenting.
- When using numbers, keep the list to as few levels as possible — and if possible under 3 levels.
- Use bullets (`<ul>`) when there is no hierarchy in the information.
