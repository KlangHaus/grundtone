# Checkbox

Checkboxes let the user select one or more options from a visible list. Uses native `<input type="checkbox">` with custom visual indicators.

---

## Preview

<CodePreview name="c-checkbox-basic" />

---

## Usage

```html
<fieldset class="choice-group">
  <legend class="choice-group__legend">Nationalitet</legend>
  <p class="choice-group__hint">Angiv alle der gælder</p>

  <div class="choice-group__list">
    <label class="choice choice--checkbox" for="c1">
      <input id="c1" class="choice__input" type="checkbox" name="nationality" value="dk" />
      <span class="choice__indicator" aria-hidden="true"></span>
      <span class="choice__body">
        <span class="choice__label">Dansk</span>
      </span>
    </label>
    <label class="choice choice--checkbox" for="c2">
      <input id="c2" class="choice__input" type="checkbox" name="nationality" value="se" />
      <span class="choice__indicator" aria-hidden="true"></span>
      <span class="choice__body">
        <span class="choice__label">Svensk</span>
      </span>
    </label>
  </div>
</fieldset>
```

## Standalone checkbox (yes/no)

```html
<label class="choice choice--checkbox" for="terms">
  <input id="terms" class="choice__input" type="checkbox" name="terms" />
  <span class="choice__indicator" aria-hidden="true"></span>
  <span class="choice__body">
    <span class="choice__label">Jeg accepterer vilkårene</span>
  </span>
</label>
```

## Classes

Same as [Radio](/web/c-radio) — uses `.choice--checkbox` instead of `.choice--radio`.

| Class | Description |
| --- | --- |
| `.choice--checkbox` | Checkbox variant (square indicator + checkmark) |

All other classes (`.choice-group`, `.choice`, `.choice__*`) are shared with radio.

## Accessibility

- Native `<input type="checkbox">` provides Space key toggle
- `<fieldset>` + `<legend>` for group labeling
- Focus visible on indicator
- Label click toggles (native `<label for>`)

## References

- [GOV.UK Checkboxes](https://design-system.service.gov.uk/components/checkboxes/)
- [NNGroup: Checkboxes vs Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
