# Autocomplete

Input with dropdown suggestion list (combobox pattern).

---

## Classes

| Class | Purpose |
| --- | --- |
| `.autocomplete` | Root container (position: relative) |
| `.autocomplete__dropdown` | Suggestion dropdown (absolute, shadow, border) |
| `.autocomplete__option` | Single suggestion item |
| `.autocomplete__option--active` | Keyboard-highlighted item |
| `.autocomplete__option-label` | Primary text |
| `.autocomplete__option-description` | Secondary text |
| `.autocomplete__empty` | No results message |
| `.autocomplete__loading` | Loading indicator |

Reuses `.input`, `.input-field`, `.input-label`, `.input-help`, `.input-error` for the input field.

---

## Usage

```html
<div class="autocomplete input-field">
  <label class="input-label" for="search">Search</label>
  <input
    id="search"
    class="input input--md"
    type="text"
    role="combobox"
    aria-expanded="true"
    aria-controls="search-listbox"
    aria-autocomplete="list"
    autocomplete="off"
  />
  <ul id="search-listbox" class="autocomplete__dropdown" role="listbox">
    <li class="autocomplete__option autocomplete__option--active" role="option" aria-selected="true">
      <span class="autocomplete__option-label">Vesterbrogade 1</span>
      <span class="autocomplete__option-description">1620 København V</span>
    </li>
    <li class="autocomplete__option" role="option">
      <span class="autocomplete__option-label">Vesterbrogade 2</span>
      <span class="autocomplete__option-description">1620 København V</span>
    </li>
  </ul>
</div>
```

---

## Accessibility

- Input: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`
- Dropdown: `role="listbox"`
- Options: `role="option"`, `aria-selected`
- Keyboard: Arrow keys navigate, Enter selects, Escape closes
- `autocomplete="off"` prevents browser interference
