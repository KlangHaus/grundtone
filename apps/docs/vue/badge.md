# Badge

Non-interactive status indicators and category labels. Use to draw attention to new, changed, or important content.

---

## Demo

<BadgeDemo />

---

## When to use

- Show status of an item (active, pending, rejected, approved)
- Label categories in cards, lists, or tables
- Highlight new or updated content

## When not to use

- As a clickable element — badges are not buttons or links
- Where placement might make users think it is a button (test for this)
- On pages with dynamic content where recency is already obvious (e.g. newest on top)
- To mark too many items — use badges sparingly where truly meaningful

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<template>
  <GTBadge>Default</GTBadge>
  <GTBadge variant="success">Godkendt</GTBadge>
  <GTBadge variant="error">Afvist</GTBadge>
</template>
```

### With dot indicator

```vue
<template>
  <GTBadge variant="success" dot>Aktiv</GTBadge>
  <GTBadge variant="warning" dot>Afventer</GTBadge>
  <GTBadge variant="error" dot>Offline</GTBadge>
</template>
```

### With icon

```vue
<template>
  <GTBadge variant="success" icon="check">Bekræftet</GTBadge>
</template>
```

### Sizes

```vue
<template>
  <GTBadge size="sm">Small</GTBadge>
  <GTBadge size="md">Medium</GTBadge>
</template>
```

### In card metadata

```vue
<template>
  <div class="meta text-sm text-secondary">
    <GTBadge size="sm" variant="info">Design</GTBadge>
    <time>19 March 2026</time>
    <span>6 min read</span>
  </div>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'neutral'` | Visual variant |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `icon` | `string` | — | Icon name from the registry (renders `GTIcon`) |
| `dot` | `boolean` | `false` | Show a colored dot indicator |
| `ariaLabel` | `string` | — | Accessible label (overrides slot text) |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Badge text content |

---

## Accessibility

- Renders as `<span>` — non-interactive, no button or link semantics
- `aria-label` overrides visible text for screen readers when provided
- Dot is decorative (`aria-hidden="true"`)
- Do not rely on color alone to convey meaning — pair with descriptive text (WCAG 1.4.1)

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-badge` | Root container |
| `.gt-badge--neutral` | Neutral variant |
| `.gt-badge--info` | Info variant |
| `.gt-badge--success` | Success variant |
| `.gt-badge--warning` | Warning variant |
| `.gt-badge--error` | Error variant |
| `.gt-badge--sm` | Small size |
| `.gt-badge--md` | Medium size |
| `.gt-badge__dot` | Dot indicator |
| `.gt-badge__icon` | Icon element |

---

## Design system

The CSS-only version of this component is documented in the [Design System — Badge](/web/c-badge) reference.
