# Badge

Non-interactive status indicators and category labels.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.badge` | Base inline-flex pill container |
| `.badge--neutral` | Grey/surface variant |
| `.badge--info` | Blue/info tint |
| `.badge--success` | Green/success tint |
| `.badge--warning` | Yellow/warning tint |
| `.badge--error` | Red/error tint |
| `.badge--sm` | Small size |
| `.badge--md` | Medium size |
| `.badge__dot` | Colored dot indicator |
| `.badge__icon` | Icon element |

---

## Variants

### Status badges

<CodePreview name="c-badge-variants" />

### With dot indicator

<CodePreview name="c-badge-dot" />

### Sizes

<CodePreview name="c-badge-sizes" />

---

## Usage

```html
<span class="badge badge--success badge--md">
  <span class="badge__dot" aria-hidden="true"></span>
  Aktiv
</span>

<span class="badge badge--error badge--sm">Afvist</span>

<span class="badge badge--neutral badge--md">Kladde</span>
```

---

## Accessibility

- Use `<span>` — badges are non-interactive
- Do not make badges into links or buttons
- Do not rely on color alone — always include descriptive text
- Dot is decorative and should use `aria-hidden="true"`

---

## Best practices

**Do:**
- Use adjectives (descriptive words): "Active", "Pending", "Rejected"
- Keep text concise — ideally one or two words
- Use consistent colors for the same status across your application
- Pair with descriptive text, not just color

**Don't:**
- Use verbs (action words) — badges are not calls to action
- Make badges clickable — they should never be interactive
- Overuse badges — mark only what is truly meaningful
- Use uppercase text — it reduces readability
