# Anchor Links

In-page table of contents linking to sections on the same page.

---

## Classes

| Class | Purpose |
| --- | --- |
| `.anchor-links` | Root nav container with bottom border |
| `.anchor-links__heading` | Section heading (semibold, secondary text) |
| `.anchor-links__list` | Ordered flex list with wrapping |
| `.anchor-links__item` | List item |
| `.anchor-links__link` | Link styled with primary color, underline on hover |
| `.anchor-links__link--active` | Active section indicator (bottom border) |

---

## Variants

### Basic

<CodePreview name="c-anchor-links-basic" />

### With active link

<CodePreview name="c-anchor-links-active" />

---

## Usage

```html
<nav class="anchor-links" aria-label="Indholdsfortegnelse">
  <p class="anchor-links__heading">Indhold på siden</p>
  <ol class="anchor-links__list">
    <li class="anchor-links__item">
      <a href="#intro" class="anchor-links__link">Introduktion</a>
    </li>
    <li class="anchor-links__item">
      <a href="#features" class="anchor-links__link anchor-links__link--active"
         aria-current="true">Funktioner</a>
    </li>
    <li class="anchor-links__item">
      <a href="#install" class="anchor-links__link">Installation</a>
    </li>
  </ol>
</nav>
```

---

## Accessibility

- Use `<nav>` with `aria-label` to identify the table of contents
- Use `<ol>` — sections are ordered content
- Mark the active link with `aria-current="true"`
- Link text must match destination headings exactly
- Add `scroll-margin-top` to target headings to prevent sticky headers from covering them

---

## Best practices

**Do:**
- Use on long pages where users benefit from a content overview
- Place at the top of the page, below the heading and lead text
- Use clear, descriptive link text that matches section headings exactly
- Add a heading like "Indhold på siden" to clarify in-page navigation

**Don't:**
- Use on short pages — unnecessary navigation increases cognitive load
- Place in the site navigation area — users expect those links to lead elsewhere
- Use vague link text like "Section 1" or "Read more"
- Rely on anchor links as the sole accessibility mechanism for long content
