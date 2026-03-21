# Overflow Menu

Dropdown menu for secondary actions on limited space. Triggered by a button (typically three dots). Supports sorting with active state indicators.

---

## Preview

<CodePreview name="c-overflow-menu" />

---

## When to use

Use overflow menus for extra functionality where space is limited — profile actions, sorting, secondary operations. Place to the right of text-based menu items.

Do not use for primary navigation. Do not use with fewer than 3 or more than 10 items. Do not let the menu stand alone without context.

---

## Usage

```html
<div class="overflow-menu">
  <button class="overflow-menu__trigger" aria-haspopup="menu" aria-expanded="false">
    ⋯
  </button>
  <div class="overflow-menu__panel" role="menu">
    <ul class="overflow-menu__list">
      <li class="overflow-menu__item">
        <button class="overflow-menu__link" role="menuitem">Redigér</button>
      </li>
      <li class="overflow-menu__item">
        <button class="overflow-menu__link" role="menuitem">Dupliker</button>
      </li>
      <li class="overflow-menu__item">
        <button class="overflow-menu__link overflow-menu__link--danger" role="menuitem">Slet</button>
      </li>
    </ul>
  </div>
</div>
```

### Sorting variant

```html
<div class="overflow-menu overflow-menu--left">
  <button class="overflow-menu__trigger" aria-haspopup="menu" aria-expanded="false">
    Sortér
  </button>
  <div class="overflow-menu__panel" role="menu">
    <ul class="overflow-menu__list">
      <li class="overflow-menu__item">
        <button class="overflow-menu__link overflow-menu__link--active" role="menuitem">Nyeste først</button>
      </li>
      <li class="overflow-menu__item">
        <button class="overflow-menu__link" role="menuitem">Ældste først</button>
      </li>
    </ul>
  </div>
</div>
```

---

## Do's and don'ts

<DosDonts>
  <DoItem>Place to the right of text-based menu items</DoItem>
  <DoItem>Use clear, action-oriented labels</DoItem>
  <DoItem>Place destructive actions last</DoItem>
  <DoItem>Sort parameters alphabetically with checkmark on active</DoItem>
  <DontItem>Use for primary navigation</DontItem>
  <DontItem>Let the menu stand alone without context</DontItem>
  <DontItem>Hide essential functions users must not miss</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.overflow-menu` | Container (position: relative) |
| `.overflow-menu__trigger` | Trigger button |
| `.overflow-menu__panel` | Dropdown panel |
| `.overflow-menu__list` | Item list |
| `.overflow-menu__item` | List item |
| `.overflow-menu__link` | Action button/link |
| `.overflow-menu__link--active` | Active item (checkmark) |
| `.overflow-menu__link--danger` | Destructive action (red) |
| `.overflow-menu__link--disabled` | Disabled item |
| `.overflow-menu--open` | Panel visible |
| `.overflow-menu--left` | Left-aligned panel |

---

## Accessibility

- `aria-haspopup="menu"` and `aria-expanded` on trigger
- `role="menu"` on panel, `role="menuitem"` on items
- Arrow keys for navigation, Escape to close
- Focus moves to first item on open, returns to trigger on close

---

## References

- Jeff Johnson: *Designing with the Mind in Mind* (2014)
- Daniel Burka: *Stop the overuse of overflow menus* (2016)
