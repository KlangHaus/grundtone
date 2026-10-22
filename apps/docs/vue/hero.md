# Hero

The opening section of a landing page: heading, supporting text, actions and an optional visual, on a token-driven background.

---

## Demo

<HeroDemo />

---

## When to use

- The top of a landing, product or campaign page

## When not to use

- Inside an application — use a plain page heading
- More than once per page

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<template>
  <GTHero
    title="Design tokens your team owns"
    subtitle="Edit colours and type in Studio. Every app picks them up."
    background="dot-grid"
  >
    <template #actions>
      <GTButton>Get started</GTButton>
    </template>
  </GTHero>
</template>
```

### Accent in the title

The `title` slot replaces the prop and allows partial accent colouring with `<mark>`.

```vue
<template>
  <GTHero align="left" :heading-level="2">
    <template #eyebrow>New</template>
    <template #title>Tokens, <mark>published</mark></template>
  </GTHero>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Main heading. Give either this or the `title` slot |
| `subtitle` | `string` | — | Supporting text under the title |
| `align` | `'center' \| 'left'` | `'center'` | Horizontal alignment |
| `background` | `'none' \| 'dot-grid' \| 'gradient-mesh'` | `'none'` | Background treatment |
| `headingLevel` | `1 \| 2` | `1` | `1` on landing pages, `2` when the page already has an `h1` |

## Slots

| Slot | Description |
| --- | --- |
| `eyebrow` | Small text above the title |
| `title` | Replaces the `title` prop |
| `subtitle` | Replaces the `subtitle` prop |
| `actions` | Buttons or links |
| `visual` | Image or illustration |

---

## Accessibility

- The section is labelled by its heading (`aria-labelledby`)
- With neither a `title` prop nor a `title` slot, the heading is empty and the section has no accessible name; the component warns in the console
