# Spinner

Loading indicator that signals content is being fetched. Available in small (inline) and large (section-level) sizes with optional descriptive text.

---

## When to use

Use a spinner to signal a loading state **only when load times are expected to exceed 2 seconds**. Place it in direct connection with the element being loaded.

Do not use a spinner as a default on all pages. Do not use it for live updates or automatic content refresh. Do not use it to compensate for permanently slow performance.

---

## Variants

### Small spinner

For buttons, table cells, and inline contexts. Inherits font-size from parent (uses `1em`).

<CodePreview name="c-spinner-sm" />

```html
<div class="spinner spinner--sm spinner--dark" role="status" aria-live="polite">
  <span class="spinner__circle" aria-hidden="true"></span>
  <span class="sr-only">Indlæser…</span>
</div>
```

### Large spinner

For larger sections. Place horizontally centered at the top of the section being loaded.

<CodePreview name="c-spinner-lg" />

```html
<div class="spinner spinner--lg spinner--dark" role="status" aria-live="polite">
  <span class="spinner__circle" aria-hidden="true"></span>
  <span class="sr-only">Indlæser…</span>
</div>
```

### With text

For long wait times, supplement the spinner with a descriptive message.

```html
<div class="spinner spinner--lg spinner--dark" role="status" aria-live="polite">
  <span class="spinner__circle" aria-hidden="true"></span>
  <span class="spinner__text">Henter data…</span>
</div>
```

### Backdrop

For large spinners over existing content. Content behind gets 25% opacity. Parent must have `position: relative`.

```html
<div style="position: relative">
  <!-- Existing content here -->
  <div class="spinner spinner--lg spinner--dark spinner--backdrop" role="status" aria-live="polite">
    <span class="spinner__circle" aria-hidden="true"></span>
    <span class="spinner__text">Indlæser sektion…</span>
  </div>
</div>
```

---

## Do's and don'ts

<DosDonts>
  <DoItem>Place spinner centered on the section being loaded</DoItem>
  <DoItem>Add descriptive text for wait times over 5 seconds</DoItem>
  <DoItem>Use small spinner in buttons and table cells</DoItem>
  <DontItem>Use spinner on entire pages</DontItem>
  <DontItem>Use spinner for load times under 2 seconds</DontItem>
  <DontItem>Use spinner for live updates or automatic refresh</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.spinner` | Base container |
| `.spinner--sm` | Small size (1em, inline) |
| `.spinner--lg` | Large size (3rem, section) |
| `.spinner--dark` | Dark spinner for light backgrounds |
| `.spinner--light` | Light spinner for dark backgrounds |
| `.spinner--backdrop` | Overlay with 75% background opacity |
| `.spinner__circle` | Rotating circle element |
| `.spinner__text` | Optional loading message |

---

## Accessibility

- `role="status"` on the spinner container
- `aria-live="polite"` for screen reader announcement
- Visually-hidden text (`.sr-only`) when no visible text is present
- `aria-hidden="true"` on the circle (decorative)

---

## References

- [NNGroup: Progress Indicators](https://www.nngroup.com/articles/progress-indicators/)
- [UX Planet: Loading Spinner Design](https://uxplanet.org/loading-spinner-ui-design-tips-and-tricks-73a937e14528)
- Sherwin, K. (2014). *Response Times: The 3 Important Limits*
