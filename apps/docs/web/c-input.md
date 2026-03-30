# Input

Class-based input component with label, help text, error state, and accessible markup.

---

## Classes

| Class | Description |
| --- | --- |
| `.input` | Base input styling (border, font, transitions) |
| `.input--sm` | Small size |
| `.input--md` | Medium size (default) |
| `.input--lg` | Large size |
| `.input--error` | Error border color and focus ring |
| `.input--disabled` | Disabled opacity and cursor |
| `.input--readonly` | Readonly background |
| `.input-field` | Wrapper for label + input + help/error |
| `.input-field--block` | Full-width wrapper |
| `.input-label` | Label text |
| `.input-label__required` | Required asterisk |
| `.input-help` | Help text below input |
| `.input-error` | Error message text |

---

## Sizes

<CodePreview name="c-input-sizes" />

```html
<input class="input input--sm" placeholder="Small" />
<input class="input input--md" placeholder="Medium" />
<input class="input input--lg" placeholder="Large" />
```

---

## With Label & Help Text

<CodePreview name="c-input-label" />

```html
<div class="input-field">
  <label class="input-label" for="name">
    Full name <span class="input-label__required">*</span>
  </label>
  <input id="name" class="input input--md" type="text" placeholder="John Doe"
    required aria-required="true" />
  <p class="input-help">Enter your full legal name</p>
</div>
```

---

## Error State

<CodePreview name="c-input-error" />

```html
<div class="input-field">
  <label class="input-label" for="username">Username</label>
  <input id="username" class="input input--md input--error" type="text"
    aria-invalid="true" aria-describedby="username-error" />
  <p id="username-error" class="input-error" role="alert">
    Username is already taken
  </p>
</div>
```

---

## Disabled & Readonly

<CodePreview name="c-input-states" />

```html
<input class="input input--md" disabled value="Cannot edit" />
<input class="input input--md" readonly value="Read only" />
```

---

## Accessibility

- Associate `<label>` with input via `for`/`id`
- Set `aria-invalid="true"` when in error state
- Point `aria-describedby` to help or error text element
- Use `role="alert"` on error text for screen reader announcement
- Set `aria-required="true"` on required fields
