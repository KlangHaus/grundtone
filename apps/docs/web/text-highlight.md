# Highlight Text

Classes for emphasizing specific numbers, results, or key information.

---

## Display Text

Display text can be used to highlight positive or negative results,
emphasizing specific numbers or words.

### Class

| Class           | Size           | Weight | Line height |
| --------------- | -------------- | ------ | ----------- |
| `.display-text` | 2.25rem (36px) | bold   | tight (1.25)|

### Preview

<CodePreview name="c-display-text" />

### Usage

```html
<p class="body-text-sm text-secondary">Your tax statement</p>
<p class="display-text">23,450 kr</p>
```

### Use for

- Highlighting numbers or words with special emphasis.

### Do not use for

- Paragraphs of text.
- All numbers in a calculation.
- Headings — use `<h1>`–`<h6>` instead.

### Guidelines

- Only use display text sparingly and for carefully chosen communicative purposes.

---

## Facit

Numbers that are the result of a calculation are marked with a double underline.

### Class

| Class    | CSS                                                        |
| -------- | ---------------------------------------------------------- |
| `.facit` | `text-decoration: underline double` · `font-weight: bold`  |

### Preview

<CodePreview name="c-facit" />

### Usage

```html
<div>
  <span>Subtotal</span><span>1,200 kr</span>
</div>
<div>
  <span>VAT (25%)</span><span>300 kr</span>
</div>
<hr />
<div>
  <span>Total</span><span class="facit">1,500 kr</span>
</div>
```

### Guidelines

- Use `.facit` to mark the final result of a calculation.
- Apply only to the final number — not to intermediate results.
