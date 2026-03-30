# Select

Native `<select>` with custom styling. Reuses Input component patterns for form consistency.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.select` | Base native select with appearance reset + custom chevron |
| `.select--sm` | Small size |
| `.select--md` | Medium size |
| `.select--lg` | Large size |
| `.select--error` | Error state border |
| `.select--placeholder` | Placeholder text color |

Reuses `.input-field`, `.input-label`, `.input-help`, `.input-error` for form layout.

---

## Variants

### Basic

<CodePreview name="c-select-basic" />

### With error

<CodePreview name="c-select-error" />

### Sizes

<CodePreview name="c-select-sizes" />

---

## Usage

```html
<div class="input-field">
  <label class="input-label" for="region">Region <span class="input-label__required">*</span></label>
  <select id="region" class="select select--md" required>
    <option value="" disabled selected>Vælg...</option>
    <option value="hovedstaden">Hovedstaden</option>
    <option value="midtjylland">Midtjylland</option>
    <option value="sjaelland">Sjælland</option>
  </select>
</div>
```

### Grouped

```html
<select class="select select--md">
  <option value="" disabled selected>Vælg land...</option>
  <optgroup label="Norden">
    <option value="dk">Danmark</option>
    <option value="se">Sverige</option>
  </optgroup>
  <optgroup label="Baltikum">
    <option value="ee">Estland</option>
  </optgroup>
</select>
```

---

## Accessibility

- Native `<select>` provides keyboard and screen reader support
- Always associate with `<label>` via `for`/`id`
- Use `aria-invalid` and `aria-describedby` for error states
- Grey out unavailable options with `disabled` — never remove them
- Avoid dependent dropdowns where one select changes another's options

---

## Best practices

**Do:**
- Use only for 5–15 options where space is limited
- Keep option text short and consistent
- Pre-select the most common value when known
- Use a submit button — don't react to selection change immediately

**Don't:**
- Use for fewer than 5 options — show radio buttons
- Use for more than 15 options — use autocomplete
- Use for navigation between pages
- Remove unavailable options — grey them out instead
- Create dependent dropdowns that affect each other
