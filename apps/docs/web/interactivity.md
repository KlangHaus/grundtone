# Interactivity

Cursor and pointer-events utilities.

---

## Cursor

| Class                | CSS                       |
| -------------------- | ------------------------- |
| `cursor-pointer`     | `cursor: pointer`         |
| `cursor-default`     | `cursor: default`         |
| `cursor-not-allowed` | `cursor: not-allowed`     |

<CodePreview name="ia-cursor" />

---

## Pointer Events

| Class                 | CSS                       |
| --------------------- | ------------------------- |
| `pointer-events-none` | `pointer-events: none`    |
| `pointer-events-auto` | `pointer-events: auto`    |

---

## Responsive Variants

All interactivity classes support breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

```html
<div class="pointer-events-none md:pointer-events-auto">
  Non-interactive on mobile, interactive from md up
</div>
```
