# Anchor Links

In-page table of contents linking to sections on the same page. Placed at the top of long pages, under the heading and optional lead text.

---

## Demo

<AnchorLinksDemo />

---

## When to use

- Long pages where users need direct access to specific sections
- Content with multiple distinct sections that users may not read sequentially
- Pages where scrolling would be excessive without a table of contents

## When not to use

- Short pages where content is easily scannable without navigation
- As primary navigation — users expect links to lead to new pages
- When content could be shortened, reorganised, or split across multiple pages

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<template>
  <GTAnchorLinks
    :items="[
      { label: 'Introduction', href: '#intro' },
      { label: 'Features', href: '#features' },
      { label: 'Getting Started', href: '#getting-started' },
    ]"
  />
</template>
```

### Custom heading

```vue
<template>
  <GTAnchorLinks
    heading="On this page"
    :items="[
      { label: 'Overview', href: '#overview' },
      { label: 'API', href: '#api' },
    ]"
  />
</template>
```

### Without active highlight

```vue
<template>
  <GTAnchorLinks
    :items="items"
    :active-highlight="false"
  />
</template>
```

### With smooth scroll

Add `scroll-behavior: smooth` to your page CSS and `scroll-margin-top` to target headings to account for sticky headers:

```css
html {
  scroll-behavior: smooth;
}

h2, h3, h4 {
  scroll-margin-top: 80px;
}
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `AnchorLinkItem[]` | **required** | List of anchor link items |
| `heading` | `string` | `'Indhold på siden'` | Heading text above the links |
| `ariaLabel` | `string` | `'Indholdsfortegnelse'` | Accessible label for the nav element |
| `activeHighlight` | `boolean` | `true` | Highlight the currently visible section |

### AnchorLinkItem

| Property | Type | Description |
| --- | --- | --- |
| `label` | `string` | Visible link text — must match the destination heading exactly |
| `href` | `string` | Fragment identifier, e.g. `"#section-1"` |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `navigate` | `string` (href) | Emitted when a link is clicked |

---

## Accessibility

- Renders as `<nav>` with `aria-label` for landmark identification
- Uses `<ol>` for ordered list semantics (sections appear in page order)
- Active link is marked with `aria-current="true"`
- All links are standard `<a href="#id">` — native browser behaviour
- Link text must match destination headings exactly (NNGroup recommendation)

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-anchor-links` | Root `<nav>` container |
| `.gt-anchor-links__heading` | Heading text above the list |
| `.gt-anchor-links__list` | Ordered list container (flex, wrapping) |
| `.gt-anchor-links__item` | List item |
| `.gt-anchor-links__link` | Anchor link |
| `.gt-anchor-links__link--active` | Currently visible section |

---

## Design system

The CSS-only version of this component is documented in the [Design System — Anchor Links](/web/c-anchor-links) reference.
