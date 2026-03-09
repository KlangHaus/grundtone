# Function Link

Function links trigger an action instead of navigating to a new page.
They use a secondary color and must always be accompanied by an icon to
visually distinguish them from navigation links.

---

## Class

| Class            | Size            | Color                | Hover            |
| ---------------- | --------------- | -------------------- | ---------------- |
| `.function-link` | 0.875rem (14px) | `--color-text-secondary` | `--color-text` + underline |

### Preview

<CodePreview name="c-function-link" />

---

## Usage

Function links must always have an icon before the text. Use `<button>` since they trigger an action — not navigation:

```html
<button type="button" class="function-link">
  <svg><!-- icon --></svg>
  Add another person
</button>
```

If the function link navigates (e.g. with JavaScript), `<a>` can be used:

```html
<a href="#" class="function-link" role="button">
  <svg><!-- icon --></svg>
  Print receipt
</a>
```

---

## Guidelines

- Function links must always be accompanied by an icon.
- The icon is placed before the text and helps the user quickly recognize the action's purpose.

## Use for

- Actions in forms (add, remove, print).
- Links to functionality rather than pages.

## Do not use for

- Standard navigation between pages — use a normal link.
- Primary actions — use a `<button>` instead.
