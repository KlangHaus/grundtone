# Fieldset

Groups related form inputs under a common label. Pure CSS — no JavaScript or Vue component needed.

---

## When to use

Use fieldset to show a relationship between multiple form inputs. For example:

- An address group (name, street, postal code, city)
- Personal details (first name, last name, email, phone)
- Payment information (card number, expiry, CVV)
- Any question that requires multiple inputs to answer

**You do NOT need fieldset for:** RadioGroup, CheckboxGroup, or DateInput — these components already include `<fieldset>` and `<legend>` internally.

---

## Preview

<CodePreview name="c-fieldset" />

### Bordered variant

<CodePreview name="c-fieldset-bordered" />

---

## How it works

The first element inside a `<fieldset>` must be a `<legend>` that describes the group. This can be a question ("What is your current address?") or a statement ("Personal details").

If the fieldset is the only question on the page, the legend can serve as the page heading. This is good practice for screen readers — users hear the context only once.

---

## Usage

### Basic

```html
<fieldset class="fieldset">
  <legend class="fieldset__legend">Adresse</legend>
  <div class="fieldset__fields">
    <div class="input-field">
      <label class="input-label" for="street">Gade</label>
      <input id="street" class="input input--md" type="text" />
    </div>
    <div class="fieldset__fields--row">
      <div class="input-field">
        <label class="input-label" for="postal">Postnummer</label>
        <input id="postal" class="input input--md" type="text" />
      </div>
      <div class="input-field">
        <label class="input-label" for="city">By</label>
        <input id="city" class="input input--md" type="text" />
      </div>
    </div>
  </div>
</fieldset>
```

### With help text

```html
<fieldset class="fieldset">
  <legend class="fieldset__legend">Kontaktoplysninger</legend>
  <p class="fieldset__hint">Vi bruger dine oplysninger til at sende kvittering.</p>
  <div class="fieldset__fields">
    ...
  </div>
</fieldset>
```

### With error

```html
<fieldset class="fieldset">
  <legend class="fieldset__legend">Betalingsoplysninger</legend>
  <p class="fieldset__error" role="alert">Udfyld venligst alle betalingsfelter.</p>
  <div class="fieldset__fields">
    ...
  </div>
</fieldset>
```

### Bordered

```html
<fieldset class="fieldset fieldset--bordered">
  <legend class="fieldset__legend">Fakturaadresse</legend>
  <div class="fieldset__fields">
    ...
  </div>
</fieldset>
```

### Horizontal fields (short inputs side by side)

```html
<div class="fieldset__fields--row">
  <div class="input-field">
    <label class="input-label" for="postal">Postnummer</label>
    <input id="postal" class="input input--md" type="text" />
  </div>
  <div class="input-field">
    <label class="input-label" for="city">By</label>
    <input id="city" class="input input--md" type="text" />
  </div>
</div>
```

---

## When fieldset is already included

These components handle fieldset internally — do **not** wrap them in an extra fieldset:

| Component | Internal fieldset | Legend source |
|-----------|:-----------------:|---------------|
| GTRadioGroup | Yes | `label` prop becomes `<legend>` |
| GTCheckboxGroup | Yes | `label` prop becomes `<legend>` |
| GTDateInput | No (uses `role="group"`) | `label` prop becomes group label |

### Do this

```html
<!-- RadioGroup already has fieldset — just use the component -->
<GTRadioGroup label="Betalingsmetode" :options="[...]" />
```

### Do NOT do this

```html
<!-- ❌ Double fieldset — screen readers hear the legend twice -->
<fieldset class="fieldset">
  <legend class="fieldset__legend">Betalingsmetode</legend>
  <GTRadioGroup label="Betalingsmetode" :options="[...]" />
</fieldset>
```

---

## Nesting fieldsets

Avoid nesting fieldsets. If you need sub-groups, use headings (`<h3>`) inside the fieldset instead:

```html
<fieldset class="fieldset">
  <legend class="fieldset__legend">Leveringsoplysninger</legend>
  <div class="fieldset__fields">
    <h3 class="text-base font-medium mb-2">Modtager</h3>
    <!-- name, email fields -->

    <h3 class="text-base font-medium mb-2 mt-4">Adresse</h3>
    <!-- address fields -->
  </div>
</fieldset>
```

---

## Vue usage

Fieldset is intentionally **not** a Vue component — it's just HTML + CSS. Use it directly in your templates:

```vue
<template>
  <fieldset class="fieldset">
    <legend class="fieldset__legend">Adresse</legend>
    <div class="fieldset__fields">
      <GTAddressInput v-model="address" label="Adresse" required />
      <GTSelect label="Land" :options="countries" />
    </div>
  </fieldset>
</template>
```

For form validation, apply `useField` to individual inputs inside the fieldset — not to the fieldset itself.

---

## Do's and don'ts

<DosDonts>
  <DoItem>Use legend as the first child — it describes the group</DoItem>
  <DoItem>Use for grouping related inputs (address, payment, personal details)</DoItem>
  <DoItem>Use fieldset__fields--row for short fields side by side</DoItem>
  <DoItem>Include help text in the fieldset if it applies to the whole group</DoItem>
  <DontItem>Wrap RadioGroup or CheckboxGroup in extra fieldset (they have their own)</DontItem>
  <DontItem>Nest fieldsets inside fieldsets</DontItem>
  <DontItem>Use fieldset for a single input — use input-field instead</DontItem>
  <DontItem>Use fieldset as a visual card — use GTCard for that</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.fieldset` | Base reset (no border, no padding) |
| `.fieldset--bordered` | Visual border + padding |
| `.fieldset__legend` | Group label (semibold, lg font) |
| `.fieldset__hint` | Help text for the group |
| `.fieldset__error` | Error text for the group |
| `.fieldset__fields` | Vertical flex container with gap |
| `.fieldset__fields--row` | Horizontal layout for short fields |

---

## Accessibility

- `<fieldset>` + `<legend>` provides native group labeling for screen readers
- Screen readers announce the legend before each input in the group
- Error text uses `role="alert"` for immediate announcement
- Do not duplicate legends — RadioGroup/CheckboxGroup/DateInput already handle this

---

## References

- [GOV.UK Fieldset](https://design-system.service.gov.uk/components/fieldset/)
- [WAI Tutorials: Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/)
