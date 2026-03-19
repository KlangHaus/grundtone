# Accordion

Grouped disclosure sections with expand/collapse all. Three variants.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.accordion` | Root container |
| `.accordion--bordered` | Outlined variant |
| `.accordion--card` | Boxed variant |
| `.accordion__toggle-all` | Show/hide all button |
| `.accordion__item` | Single section |
| `.accordion__item--open` | Open state modifier |
| `.accordion__header` | Clickable trigger button |
| `.accordion__icon` | Plus/minus CSS indicator |
| `.accordion__heading` | Heading text |
| `.accordion__summary` | Optional summary |
| `.accordion__panel` | Content panel |
| `.accordion__body` | Inner body |

---

## Variants

### Default

<CodePreview name="c-accordion-default" />

### Bordered

<CodePreview name="c-accordion-bordered" />

### Card

<CodePreview name="c-accordion-card" />

---

## Usage

```html
<div class="accordion" role="region" aria-label="FAQ">
  <div class="accordion__item accordion__item--open">
    <button class="accordion__header" aria-expanded="true" aria-controls="panel-1">
      <span class="accordion__icon" aria-hidden="true"></span>
      <span class="accordion__heading">Section heading</span>
    </button>
    <div id="panel-1" class="accordion__panel" role="region">
      <div class="accordion__body">
        <p>Section content here.</p>
      </div>
    </div>
  </div>
</div>
```

---

## Accessibility

- Headers are `<button>` elements with `aria-expanded` and `aria-controls`
- Panels have `role="region"` and `aria-labelledby`
- Keyboard: Enter/Space to toggle, Tab to navigate
- Do not nest accordions inside other accordions

---

## Best practices

**Do:**
- Allow multiple sections open simultaneously
- Consider opening the most important section by default
- Keep heading text short and descriptive
- Use adjective-based summaries when provided

**Don't:**
- Hide content that most users need to read
- Use for step-by-step flows (use a step indicator instead)
- Nest accordions within other accordions
- Use for search results or dynamic content lists
