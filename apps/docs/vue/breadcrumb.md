# Breadcrumb

Breadcrumb navigation helps users understand their location in a hierarchy and navigate back.

---

## Demo

<BreadcrumbDemo />

---

## When to use

- Multi-level navigation hierarchies (e.g. e-commerce categories, documentation)
- When users need to understand where they are in a structure
- As secondary navigation alongside primary nav

## When not to use

- Flat site structures with only one level
- Mobile apps (use back-navigation instead)
- Single-page flows / wizards (use a step indicator)

---

## Installation

```bash
pnpm add @grundtone/vue
```

## Usage

### Basic

```vue
<template>
  <GTBreadcrumb
    :items="[
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Current Post' },
    ]"
  />
</template>
```

### With Vue Router

```vue
<template>
  <GTBreadcrumb
    :items="[
      { label: 'Home', to: '/' },
      { label: 'Products', to: { name: 'products' } },
      { label: 'T-shirt' },
    ]"
  />
</template>
```

### Custom separator

```vue
<template>
  <GTBreadcrumb
    separator="→"
    :items="[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile' },
    ]"
  />
</template>
```

---

## Responsive behavior

On screens narrower than 640px, only the last two items (parent + current page) are shown. This prevents long breadcrumb trails from wrapping on mobile.

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `BreadcrumbItem[]` | **required** | Array of breadcrumb items |
| `separator` | `string` | `"/"` | Separator character between items |
| `ariaLabel` | `string` | `"Breadcrumb"` | Accessible label for the `<nav>` element |

### BreadcrumbItem

| Property | Type | Description |
| --- | --- | --- |
| `label` | `string` | Visible text |
| `href` | `string?` | URL for plain `<a>` link |
| `to` | `string \| object?` | Vue Router destination (renders `<router-link>`) |

The last item is always treated as the current page. Items without `href` or `to` also render as current (non-link).

---

## Accessibility

- `<nav>` landmark with `aria-label="Breadcrumb"`
- `<ol>` ordered list — conveys hierarchy to screen readers
- `aria-current="page"` on the current (last) item
- Separators use `aria-hidden="true"` — not announced by screen readers

---

## CSS Classes

| Class | Element |
| --- | --- |
| `.gt-breadcrumb` | `<nav>` root |
| `.gt-breadcrumb__list` | `<ol>` list |
| `.gt-breadcrumb__item` | `<li>` item |
| `.gt-breadcrumb__link` | `<a>` or `<router-link>` |
| `.gt-breadcrumb__separator` | Separator span |
| `.gt-breadcrumb__current` | Current page span |

---

## Design system

The CSS-only version of this component is documented in the [Design System — Breadcrumb](/web/c-breadcrumb) reference.
