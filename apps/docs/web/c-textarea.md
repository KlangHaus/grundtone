# Textarea

Multi-line text input for longer content — comments, descriptions, background stories. Supports character count with over-limit indication.

---

## Preview

<CodePreview name="c-textarea" />

---

## When to use

Use for unstructured text of more than 2 lines. Set height to match expected input length.

Do not use for structured data where consistency matters.

---

## Usage

```html
<div class="input-field">
  <label class="input-label" for="comment">Kommentar</label>
  <p class="input-help">Beskriv din situation</p>
  <textarea id="comment" class="textarea" rows="4" placeholder="Skriv her..."></textarea>
</div>
```

### With character count

```html
<div class="input-field">
  <label class="input-label" for="desc">Beskrivelse</label>
  <textarea id="desc" class="textarea" rows="4"></textarea>
  <p class="textarea-count">Du har 60 tegn tilbage</p>
</div>
```

---

## Classes

| Class | Description |
| --- | --- |
| `.textarea` | Base textarea styling |
| `.textarea--error` | Error border |
| `.textarea--disabled` | Disabled state |
| `.textarea--readonly` | Readonly state |
| `.textarea-count` | Character count text |
| `.textarea-count--over` | Over-limit styling (red) |
| `.input-field` | Wrapper (reused from Input) |
| `.input-label` | Label (reused) |
| `.input-help` | Help text (reused) |
| `.input-error` | Error text (reused) |

---

## Accessibility

- `<label>` associated via `for`/`id`
- `aria-invalid` when in error state
- `aria-describedby` for help/error text
- Character count uses `aria-live="polite"`
- Do not stop input when over limit — show warning instead

---

## References

- [GOV.UK Textarea](https://design-system.service.gov.uk/components/textarea/)
