# Tabs

Minimalist tab variants: underline, segment, pill.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.tabs` | Root container |
| `.tabs--underline` | Underline active indicator |
| `.tabs--segment` | Recessed track with raised active |
| `.tabs--pill` | Pill-shaped active background |
| `.tabs__list` | Tab button row (flex) |
| `.tabs__tab` | Tab button |
| `.tabs__tab--active` | Active state |
| `.tabs__icon` | Tab icon |
| `.tabs__panel` | Content panel |

---

## Variants

### Underline

<CodePreview name="c-tabs-underline" />

### Segment

<CodePreview name="c-tabs-segment" />

### Pill

<CodePreview name="c-tabs-pill" />

---

## Accessibility

- Tab list: `role="tablist"`
- Tabs: `role="tab"`, `aria-selected`, `aria-controls`, `tabindex`
- Panels: `role="tabpanel"`, `aria-labelledby`
- Keyboard: Arrow keys cycle, Enter/Space activates
- Never disable tabs — remove them or explain empty content
