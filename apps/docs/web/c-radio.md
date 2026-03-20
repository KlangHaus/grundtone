# Radio

Radio buttons let the user select one option from a visible list. Uses native `<input type="radio">` with custom visual indicators.

---

## Usage

```html
<fieldset class="choice-group">
  <legend class="choice-group__legend">Sagen handler om</legend>
  <p class="choice-group__hint">Vælg den kategori der passer bedst</p>

  <div class="choice-group__list" role="radiogroup">
    <label class="choice choice--radio" for="r1">
      <input id="r1" class="choice__input" type="radio" name="subject" value="insurance" />
      <span class="choice__indicator" aria-hidden="true"></span>
      <span class="choice__body">
        <span class="choice__label">Ulykkesforsikring</span>
      </span>
    </label>
    <label class="choice choice--radio" for="r2">
      <input id="r2" class="choice__input" type="radio" name="subject" value="liability" />
      <span class="choice__indicator" aria-hidden="true"></span>
      <span class="choice__body">
        <span class="choice__label">Erstatningsansvar</span>
      </span>
    </label>
  </div>
</fieldset>
```

## Classes

| Class | Description |
| --- | --- |
| `.choice-group` | Fieldset wrapper |
| `.choice-group__legend` | Group label |
| `.choice-group__hint` | Group help text |
| `.choice-group__error` | Group error message |
| `.choice-group__list` | Vertical list container |
| `.choice` | Single option wrapper |
| `.choice--radio` | Radio variant (circle indicator) |
| `.choice--checked` | Selected state |
| `.choice--error` | Error state |
| `.choice--disabled` | Disabled state |
| `.choice__input` | Hidden native input |
| `.choice__indicator` | Custom visual circle/square |
| `.choice__body` | Label + hint container |
| `.choice__label` | Option label text |
| `.choice__hint` | Option help text |
| `.choice__content` | Collapsible content (shown when checked) |

## Accessibility

- Native `<input type="radio">` provides keyboard navigation (arrow keys)
- `<fieldset>` + `<legend>` for group labeling
- `role="radiogroup"` on the list
- Focus visible on indicator via `:focus-visible` on input
- Label click selects option (native `<label for>`)

## References

- [GOV.UK Radios](https://design-system.service.gov.uk/components/radios/)
- [NNGroup: Radio Buttons Default Selection](https://www.nngroup.com/articles/radio-buttons-default-selection/)
- [NNGroup: Checkboxes vs Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
