# Search Field

Combined search input and submit button. Allows users to search for specific content when they can't find it through navigation.

---

## Preview

<CodePreview name="c-search-field" />

---

## When to use

Use a search field when users need to find specific content by keyword. Provide it as an alternative to navigation.

Do not use on very small solutions or single-page sites where search is unnecessary.

---

## Usage

```html
<form class="search-field search-field--md" role="search">
  <label for="site-search" class="sr-only">Søg</label>
  <input id="site-search" class="search-field__input" type="search"
    placeholder="Søg..." inputmode="search" />
  <button class="search-field__button" type="submit" aria-label="Søg">
    <span class="sr-only">Søg</span>
  </button>
</form>
```

---

## Do's and don'ts

<DosDonts>
  <DoItem>Make the field at least 27 characters wide</DoItem>
  <DoItem>Place in the top right corner where users expect it</DoItem>
  <DoItem>Keep the field empty and white so it's clearly an input</DoItem>
  <DoItem>Show search terms in the field after searching</DoItem>
  <DontItem>Make the field so narrow users can't see what they typed</DontItem>
  <DontItem>Use on single-page sites</DontItem>
  <DontItem>Hide the field behind an icon alone</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.search-field` | Flex container (form) |
| `.search-field--md` | Medium size |
| `.search-field--lg` | Large size |
| `.search-field--disabled` | Disabled state |
| `.search-field__input` | Search input (min 27ch) |
| `.search-field__button` | Submit button with magnifying glass icon |
| `.search-field__suggestions` | Optional autocomplete dropdown |
| `.search-field__suggestion` | Suggestion item |

---

## Accessibility

- Wrapper is `<form role="search">`
- Visually hidden `<label>` for screen readers
- Submit button has `aria-label`
- `type="search"` + `inputmode="search"` on input
- Button `type="submit"` enables Enter key submission

---

## References

- [NNGroup: Search Visible and Simple](https://www.nngroup.com/articles/search-visible-and-simple/)
- [Smashing Magazine: Ideal Search Box is 27 Characters](https://www.smashingmagazine.com/2009/09/10-useful-usability-findings-and-guidelines/)
- [UX Planet: Design a Perfect Search Box](https://uxplanet.org/design-a-perfect-search-box-b6baaf9599c)
