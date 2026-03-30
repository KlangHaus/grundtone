# Details

Disclosure element that hides content until the user chooses to reveal it. Built on native `<details>`/`<summary>` for progressive enhancement.

---

## Demo

<DetailsDemo />

---

## When to use

- Make a page easier to scan by hiding supplementary information
- FAQ-style content where users need answers to specific questions
- Long reference material where most users only need certain sections

## When not to use

- As a replacement for accordions (use accordions for groups of related sections)
- For content most users need to read — keep it visible
- To hide navigation elements
- Nested inside another details element — this confuses users

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Default (border-left accent)

```vue
<template>
  <GTDetails summary="What are design tokens?">
    <p>Design tokens are the smallest building blocks of a design system.</p>
  </GTDetails>
</template>
```

### Subtle (inline, minimal)

```vue
<template>
  <p>
    We support both light and dark mode.
    <GTDetails variant="subtle" summary="Read more about theming">
      <p>Theme switching happens via CSS custom properties.</p>
    </GTDetails>
  </p>
</template>
```

### Card (boxed, standalone)

```vue
<template>
  <GTDetails variant="card" summary="Do I need @grundtone/core?">
    <p>Yes — core contains TypeScript types, theme presets, and the icon registry.</p>
  </GTDetails>
</template>
```

### Start open

```vue
<template>
  <GTDetails summary="Installation" :open="true">
    <p>Run <code>pnpm add @grundtone/vue</code>.</p>
  </GTDetails>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `summary` | `string` | **required** | Visible trigger text |
| `variant` | `'default' \| 'subtle' \| 'card'` | `'default'` | Visual variant |
| `open` | `boolean` | `false` | Start in open state |
| `ariaLabel` | `string` | — | Accessible label for the details element |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Hidden content revealed on expand |

---

## Accessibility

- Uses native `<details>`/`<summary>` — browser handles aria-expanded, keyboard, focus
- Summary is keyboard-accessible by default (Enter/Space to toggle)
- Hidden content must still follow the document heading hierarchy
- Arrow indicator is decorative (`aria-hidden="true"`)
- Keep summary text short and descriptive

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-details` | Root `<details>` element |
| `.gt-details--default` | Border-left accent variant |
| `.gt-details--subtle` | Inline minimal variant |
| `.gt-details--card` | Boxed standalone variant |
| `.gt-details__summary` | Clickable `<summary>` trigger |
| `.gt-details__arrow` | Chevron indicator |
| `.gt-details__content` | Content wrapper |
| `.gt-details__body` | Inner body with padding |

---

## Design system

The CSS-only version of this component is documented in the [Design System — Details](/web/c-details) reference.
