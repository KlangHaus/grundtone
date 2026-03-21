# Overflow Menu

Dropdown menu for secondary actions and sorting. Triggered by a button with keyboard navigation support.

## Demo

<OverflowMenuDemo />

## Installation

```vue
<script setup>
import { GTOverflowMenu } from '@grundtone/vue';
</script>
```

In Nuxt, `GTOverflowMenu` is auto-imported.

## When to use

Use for extra functionality where space is limited. 3-10 items. Place to the right of text-based menu items.

Do not use for primary navigation or essential functions users must not miss.

## Usage

### Actions menu

```vue
<GTOverflowMenu
  :items="[
    { label: 'Redigér', value: 'edit' },
    { label: 'Dupliker', value: 'duplicate' },
    { label: 'Slet', value: 'delete', danger: true },
  ]"
  @select="handleAction"
/>
```

### With label

```vue
<GTOverflowMenu
  label="Handlinger"
  :items="[...]"
  @select="handleAction"
/>
```

### Sorting

```vue
<GTOverflowMenu
  label="Sortér"
  align="left"
  :items="[
    { label: 'Nyeste først', value: 'newest', active: sort === 'newest' },
    { label: 'Ældste først', value: 'oldest', active: sort === 'oldest' },
  ]"
  @select="sort = $event.value"
/>
```

### Links

```vue
<GTOverflowMenu
  :items="[
    { label: 'Profil', href: '/profile' },
    { label: 'Indstillinger', href: '/settings' },
    { label: 'Log ud', href: '/logout', danger: true },
  ]"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `OverflowMenuItem[]` | — | Menu items (required) |
| `label` | `string` | — | Trigger label (icon-only if omitted) |
| `align` | `'left' \| 'right'` | `'right'` | Panel alignment |
| `ariaLabel` | `string` | `'Flere muligheder'` | Screen reader label for trigger |

### OverflowMenuItem

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Display text |
| `value` | `string` | Emitted on select |
| `href` | `string` | Renders as link |
| `danger` | `boolean` | Destructive styling |
| `disabled` | `boolean` | Disabled state |
| `active` | `boolean` | Checkmark (sort menus) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | `OverflowMenuItem` | Emitted when an item is selected |

## Keyboard

- **Enter/Space**: Open menu, select item
- **Arrow Down/Up**: Navigate items
- **Home/End**: First/last item
- **Escape**: Close menu, return focus to trigger

## Accessibility

- `aria-haspopup="menu"` and `aria-expanded` on trigger
- `role="menu"` on panel, `role="menuitem"` on items
- Focus trapped in menu, restored on close

See [Overflow Menu (Design System)](/web/c-overflow-menu) for full CSS reference.
