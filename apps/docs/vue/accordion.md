# Accordion

Grouped disclosure sections with expand/collapse all. Use to structure related content that users can selectively reveal.

---

## Demo

<AccordionDemo />

---

## When to use

- Multiple related sections where users need only a few at a time
- FAQ pages, help sections, settings panels
- Mobile-first content where screen space is limited

## When not to use

- For content most users need — keep it visible
- As a replacement for page navigation or step-by-step flows
- For small amounts of content that could be shown directly
- Nested inside other accordions — use headings to group instead

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Default (separators)

```vue
<template>
  <GTAccordion>
    <GTAccordionItem heading="Section one">
      <p>Content for section one.</p>
    </GTAccordionItem>
    <GTAccordionItem heading="Section two">
      <p>Content for section two.</p>
    </GTAccordionItem>
  </GTAccordion>
</template>
```

### Bordered

```vue
<template>
  <GTAccordion variant="bordered">
    <GTAccordionItem heading="Configuration">
      <p>Config details here.</p>
    </GTAccordionItem>
  </GTAccordion>
</template>
```

### Card

```vue
<template>
  <GTAccordion variant="card">
    <GTAccordionItem heading="Vue 3">
      <p>Full component library with Composition API.</p>
    </GTAccordionItem>
  </GTAccordion>
</template>
```

### With summary and pre-opened item

```vue
<template>
  <GTAccordion>
    <GTAccordionItem heading="Getting started" summary="Quick guide" :open="true">
      <p>Start here for a quick overview.</p>
    </GTAccordionItem>
  </GTAccordion>
</template>
```

### Without toggle all

```vue
<template>
  <GTAccordion :show-toggle-all="false">
    <GTAccordionItem heading="Section">
      <p>No toggle-all button.</p>
    </GTAccordionItem>
  </GTAccordion>
</template>
```

---

## Accordion Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'bordered' \| 'card'` | `'default'` | Visual variant |
| `showToggleAll` | `boolean` | `true` | Show "Show all / Hide all" button |
| `toggleAllLabelOpen` | `string` | `'Vis alle'` | Label for show-all state |
| `toggleAllLabelClose` | `string` | `'Skjul alle'` | Label for hide-all state |
| `ariaLabel` | `string` | `'Accordion'` | Accessible label for the region |

## AccordionItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `string` | **required** | Section heading text |
| `summary` | `string` | — | Optional short description under heading |
| `open` | `boolean` | `false` | Start in open state |
| `headingLevel` | `2 \| 3 \| 4` | `3` | Heading element level |

## Slots

### Accordion
| Slot | Description |
| --- | --- |
| `default` | AccordionItem children |

### AccordionItem
| Slot | Description |
| --- | --- |
| `default` | Section content |

---

## Accessibility

- Each header is a `<button>` with `aria-expanded` and `aria-controls`
- Content panels have `role="region"` with `aria-labelledby`
- Keyboard: Enter/Space toggles, Tab navigates between headers
- Heading level is configurable (h2/h3/h4) for document outline
- Plus/minus icon is decorative (`aria-hidden="true"`)
- Multiple sections can be open simultaneously

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-accordion` | Root container |
| `.gt-accordion--default` | Separator variant |
| `.gt-accordion--bordered` | Outlined variant |
| `.gt-accordion--card` | Boxed variant |
| `.gt-accordion__toggle-all` | Show/hide all button |
| `.gt-accordion__item` | Single section |
| `.gt-accordion__item--open` | Open state |
| `.gt-accordion__header` | Clickable trigger button |
| `.gt-accordion__icon` | Plus/minus indicator |
| `.gt-accordion__heading` | Heading text |
| `.gt-accordion__summary` | Optional summary |
| `.gt-accordion__panel` | Content panel |
| `.gt-accordion__body` | Inner body |

---

## Design system

The CSS-only version of this component is documented in the [Design System — Accordion](/web/c-accordion) reference.
