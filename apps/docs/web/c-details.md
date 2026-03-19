# Details

Disclosure element built on native `<details>`/`<summary>`. Three variants for different contexts.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.details` | Base details container |
| `.details--default` | Border-left accent |
| `.details--subtle` | Inline, minimal |
| `.details--card` | Boxed, standalone |
| `.details__summary` | Clickable summary trigger |
| `.details__arrow` | Chevron indicator (CSS-drawn) |
| `.details__content` | Content wrapper |
| `.details__body` | Inner body |

---

## Variants

### Default

<CodePreview name="c-details-default" />

### Subtle

<CodePreview name="c-details-subtle" />

### Card

<CodePreview name="c-details-card" />

---

## Usage

```html
<details class="details details--default">
  <summary class="details__summary">
    <span class="details__arrow" aria-hidden="true"></span>
    What are design tokens?
  </summary>
  <div class="details__content">
    <div class="details__body">
      <p>Design tokens are named values for colors, spacing, typography, and more.</p>
    </div>
  </div>
</details>
```

---

## Accessibility

- Native `<details>`/`<summary>` provides keyboard and screen reader support
- Summary is focusable and toggled with Enter/Space
- Do not nest details inside other details elements
- Hidden content must respect the document heading hierarchy

---

## Best practices

**Do:**
- Keep summary text short and descriptive
- Use for supplementary information that most users can skip
- Use the card variant for FAQ-style standalone disclosures

**Don't:**
- Hide essential content that most users need to read
- Nest details inside other details
- Use as a replacement for accordions (multiple related sections)
- Place navigation elements inside details
