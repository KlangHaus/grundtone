# Tag

Interactive metadata element for categories, filters, and keywords. For static status indicators, use [Badge](/web/c-badge) instead.

> **Pill** is a visual style, not a component — use Badge (it's already rounded).
> **Chip** is an interactive metadata element — use Tag.

---

## Preview

<CodePreview name="c-tag" />

---

## When to use

Use tags for secondary metadata: categories, filters, keywords. Use as many as needed, but as few as possible.

Do not use for primary functionality (use Button). Do not mix with buttons — it confuses users. Do not use as navigation.

---

## Usage

### Display tag

```html
<span class="tag tag--md" tabindex="0">
  <span class="tag__label">Design</span>
</span>
```

### Dismissible

```html
<span class="tag tag--md" tabindex="0">
  <span class="tag__label">Vue 3</span>
  <button class="tag__dismiss" aria-label="Fjern Vue 3">&times;</button>
</span>
```

### Selected (filter)

```html
<span class="tag tag--md tag--selected" tabindex="0" role="option" aria-selected="true">
  <span class="tag__label">Active filter</span>
</span>
```

---

## Do's and don'ts

<DosDonts>
  <DoItem>Use for metadata, categories, filters, keywords</DoItem>
  <DoItem>Keep text short and recognizable</DoItem>
  <DoItem>Use uppercase first letter, lowercase rest</DoItem>
  <DontItem>Use for primary actions (use Button)</DontItem>
  <DontItem>Mix with buttons — confuses users</DontItem>
  <DontItem>Use as navigation replacement</DontItem>
  <DontItem>Design static tags to look like buttons</DontItem>
</DosDonts>

---

## Classes

| Class | Description |
| --- | --- |
| `.tag` | Base container |
| `.tag--sm` | Small size |
| `.tag--md` | Medium size |
| `.tag--selected` | Active/selected state (filled primary) |
| `.tag--disabled` | Disabled state |
| `.tag__icon` | Optional icon |
| `.tag__label` | Text |
| `.tag__dismiss` | Remove button (×) |

---

## Accessibility

- Focusable via `tabindex="0"`
- `role="option"` + `aria-selected` for selectable tags
- Dismiss button has `aria-label="Fjern {label}"`
- Keyboard: Enter/Space activates, × dismisses
