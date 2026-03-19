# Tabs

Switch between related content sections. Three minimalist variants: underline, segment, and pill.

---

## Demo

<TabsDemo />

---

## When to use

- Content has clear groupings that benefit from chunking
- Users need only one section at a time — not simultaneous comparison
- Few tabs (max 5–7) with short, scannable labels

## When not to use

- Sequential flows or step-by-step processes — use a step indicator
- Users need to compare content across tabs — show all content or use a table
- More than 7 groupings — consider separate pages
- Content lacks distinct logical groupings

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Underline (default)

```vue
<template>
  <GTTabs :tabs="[
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
  ]">
    <GTTabPanel id="overview"><p>Overview content.</p></GTTabPanel>
    <GTTabPanel id="details"><p>Details content.</p></GTTabPanel>
  </GTTabs>
</template>
```

### Segment

```vue
<template>
  <GTTabs variant="segment" :tabs="tabs">
    <GTTabPanel id="vue"><p>Vue content.</p></GTTabPanel>
    <GTTabPanel id="nuxt"><p>Nuxt content.</p></GTTabPanel>
  </GTTabs>
</template>
```

### Pill

```vue
<template>
  <GTTabs variant="pill" :tabs="tabs">
    <GTTabPanel id="all"><p>All items.</p></GTTabPanel>
    <GTTabPanel id="active"><p>Active items.</p></GTTabPanel>
  </GTTabs>
</template>
```

### With icons

```vue
<template>
  <GTTabs :tabs="[
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'done', label: 'Done', icon: 'check' },
  ]">
    <GTTabPanel id="search"><p>Search results.</p></GTTabPanel>
    <GTTabPanel id="done"><p>Completed items.</p></GTTabPanel>
  </GTTabs>
</template>
```

---

## GTTabs Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | `TabItem[]` | **required** | Tab definitions |
| `modelValue` | `string` | first tab ID | Active tab (v-model) |
| `variant` | `'underline' \| 'segment' \| 'pill'` | `'underline'` | Visual variant |
| `ariaLabel` | `string` | `'Faner'` | Accessible label for tab list |

### TabItem

| Property | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier |
| `label` | `string` | Tab label text |
| `icon` | `string` | Optional icon name (all tabs must have icon if one does) |

## GTTabPanel Props

| Prop | Type | Description |
| --- | --- | --- |
| `id` | `string` | Must match a TabItem.id |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:modelValue` | `string` | Active tab changed |

---

## Accessibility

- `role="tablist"` on tab bar, `role="tab"` on each button, `role="tabpanel"` on panels
- `aria-selected`, `aria-controls`, `aria-labelledby` properly linked
- Keyboard: Arrow left/right cycles tabs, Home/End jumps to first/last, Enter/Space activates
- Active tab has `tabindex="0"`, inactive tabs have `tabindex="-1"` (roving tabindex)
- No disabled tabs — all tabs are always visible and active
- Icons must always be paired with text labels

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-tabs` | Root container |
| `.gt-tabs--underline` | Underline variant |
| `.gt-tabs--segment` | Segment variant |
| `.gt-tabs--pill` | Pill variant |
| `.gt-tabs__list` | Tab button row |
| `.gt-tabs__tab` | Single tab button |
| `.gt-tabs__tab--active` | Active tab |
| `.gt-tabs__icon` | Tab icon |
| `.gt-tabs__panel` | Content panel |

---

## Design system

The CSS-only version is documented in the [Design System — Tabs](/web/c-tabs) reference.
