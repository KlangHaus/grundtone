# Date Input

Three separate fields for day, month, and year. Use for dates the user knows from memory (birth date, passport issue date). Do not use for date picking or scheduling.

---

## When to use

Use date input when you need a specific, known date — such as a birth date, document issue date, or historical event. Three separate fields are easier and faster than a single date picker for memorised dates.

Do not use date input for scheduling, booking, or selecting dates from a range — use a date picker for those.

---

## Preview

<CodePreview name="c-date-input-basic" />

```html
<div class="input-field">
  <label class="input-label" id="bday-label">Fødselsdato</label>
  <p class="input-help" id="bday-hint">For eksempel: 27 03 1990</p>

  <div class="date-input" role="group"
    aria-labelledby="bday-label" aria-describedby="bday-hint">
    <div class="date-input__field">
      <label class="date-input__label" for="bday-day">Dag</label>
      <input id="bday-day" class="input input--md date-input__input--day"
        type="text" inputmode="numeric" pattern="[0-9]*"
        maxlength="2" autocomplete="bday-day" />
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="bday-month">Måned</label>
      <input id="bday-month" class="input input--md date-input__input--month"
        type="text" inputmode="numeric" pattern="[0-9]*"
        maxlength="2" autocomplete="bday-month" />
    </div>
    <div class="date-input__field">
      <label class="date-input__label" for="bday-year">År</label>
      <input id="bday-year" class="input input--md date-input__input--year"
        type="text" inputmode="numeric" pattern="[0-9]*"
        maxlength="4" autocomplete="bday-year" />
    </div>
  </div>
</div>
```

---

## Error State

<CodePreview name="c-date-input-error" />

```html
<div class="input-field">
  <label class="input-label" id="start-label">Startdato</label>
  <p id="start-desc" class="input-error" role="alert">
    Datoen kan ikke være i fremtiden
  </p>
  <div class="date-input" role="group"
    aria-labelledby="start-label" aria-describedby="start-desc">
    <div class="date-input__field">
      <label class="date-input__label" for="start-day">Dag</label>
      <input id="start-day"
        class="input input--md input--error date-input__input--day"
        type="text" inputmode="numeric" pattern="[0-9]*"
        maxlength="2" aria-invalid="true" />
    </div>
    <!-- ... month and year identical pattern -->
  </div>
</div>
```

Mark individual fields with `input--error` when only specific parts are invalid (e.g. missing month).

---

## Guidance

- Always show example format in help text: "For eksempel: 27 03 1990"
- Use day → month → year order (Danish convention)
- Each field has its own `<label>` (Dag, Måned, År)
- The group label describes what the date is for
- Do not use `type="number"` — use `type="text"` + `inputmode="numeric"` to avoid spinners and browser formatting

---

## Do's and don'ts

<DosDonts>
  <DoItem>Use three separate fields for day, month, and year</DoItem>
  <DoItem>Provide example format in help text</DoItem>
  <DoItem>Use autocomplete attributes (bday-day, bday-month, bday-year)</DoItem>
  <DontItem>Use a single text field for the entire date</DontItem>
  <DontItem>Use type="number" (causes spinners and +/- issues)</DontItem>
  <DontItem>Use a date picker for memorised dates like birth date</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.date-input` | Flex container for the three fields |
| `.date-input__field` | Wrapper for a single field (label + input) |
| `.date-input__label` | Small label for each field (Dag/Måned/År) |
| `.date-input__input--day` | Day input width |
| `.date-input__input--month` | Month input width |
| `.date-input__input--year` | Year input width |
| `.input` | Base input styling (reused from Input) |
| `.input--sm/md/lg` | Size variants (reused from Input) |
| `.input--error` | Error state (reused from Input) |
| `.input-field` | Outer wrapper (reused from Input) |
| `.input-label` | Group label (reused from Input) |
| `.input-help` | Help text (reused from Input) |
| `.input-error` | Error text (reused from Input) |

---

## Accessibility

- `role="group"` on the `.date-input` wrapper
- `aria-labelledby` points to the group label
- `aria-describedby` points to help or error text
- Each input has its own `<label>` (Dag, Måned, År)
- `inputmode="numeric"` for numeric keyboard on mobile
- `pattern="[0-9]*"` for iOS numeric keyboard
- `autocomplete="bday-day/month/year"` for autofill
- `aria-invalid="true"` on error state
- `aria-required="true"` on required fields
- Error text uses `role="alert"` for screen reader announcement

---

## References

- [GOV.UK Date Input](https://design-system.service.gov.uk/components/date-input/)
- [NNGroup: Date Input](https://www.nngroup.com/articles/date-input/)
- [DKFDS: Datofelter](https://designsystem.dk/komponenter/dato-input/)
- Silver, A. (2018). *Inclusive Components*, s. 155-158
- Babich, N. (2019). *Date Input UX*
