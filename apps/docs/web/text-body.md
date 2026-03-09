# Body Text

Text classes for paragraphs, leads, and captions — the building blocks of readable content.

---

## Lead

Use a lead paragraph to introduce a step or a page's content.
Typically used when and where it makes sense in context for the user.

### Class

| Class   | CSS                                                                 |
| ------- | ------------------------------------------------------------------- |
| `.lead` | `font-size: var(--font-size-xl)` · `line-height: var(--line-height-normal)` · `font-weight: var(--font-weight-normal)` |

### Preview

<CodePreview name="c-lead" />

### Prose auto-lead

Inside `.prose`, the first `<p>` is automatically styled as a lead paragraph — no extra class needed.

<CodePreview name="c-lead-prose" />

### Usage

```html
<h1>Page title</h1>
<p class="lead">
  A short introductory paragraph that sets the context for the page.
</p>
```

#### Inside prose

```html
<div class="prose">
  <p>This first paragraph automatically becomes a lead.</p>
  <p>Subsequent paragraphs use normal body size.</p>
</div>
```

### Guidelines

- Keep the lead short and concise, preferably no more than three lines.
- The lead is only for short introductory text, not for long informational text. Use body text and lists for additional information.
- Only use a lead when and where it is necessary. For example, do not use a lead if the user can decode the page and start entering data right away.
- Typically the input flow or a section starts right below the lead. If it supports the user's completion of the solution, you can insert body text, lists, links, etc. after the lead.

### SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.intro {
  @include gt.lead-text;
}
```

---

## Standard body text

Standard body text classes for consistent paragraph styling.
Three variants: standard, small, and bold.

### Classes

| Class            | Size            | Weight | Use case                    |
| ---------------- | --------------- | ------ | --------------------------- |
| `.body-text`     | 1rem (16px)     | 400    | Standard body text          |
| `.body-text-sm`  | 0.875rem (14px) | 400    | Secondary / supporting text |
| `.body-text-bold`| 1rem (16px)     | 700    | Emphasized body text        |

### Preview

<CodePreview name="c-body-text" />

### Usage

```html
<p class="body-text">
  Standard body text for main content.
</p>

<p class="body-text-sm">
  Smaller supporting text, e.g. form hints or metadata.
</p>

<p class="body-text">
  You can inline <span class="body-text-bold">bold text</span> to
  highlight key numbers or points.
</p>
```

#### Example

<CodePreview name="c-body-text-usage" />

### Guidelines

- Avoid "walls of text": Use white space to create breathing room between text blocks and increase readability.
- Use bold text sparingly: For example, within sentences to highlight particularly important numbers or points.
- Do not use bold text as a heading — use `<h1>`–`<h6>` instead.
- Do not use underlined text, as it resembles links.
- Do not use italic text, as it reduces readability.

### SCSS

```scss
@use '@grundtone/design-tokens/scss/lib' as gt;

.custom-text {
  @include gt.body-text;
}

.custom-small {
  @include gt.small-text;
}
```

---

## Caption

Explanatory or descriptive text accompanying an image.

### Class

| Class      | Size            | Color                |
| ---------- | --------------- | -------------------- |
| `.caption` | 0.875rem (14px) | `--color-text-secondary` |

### Preview

<CodePreview name="c-caption" />

### Usage

```html
<figure>
  <img src="photo.jpg" alt="Descriptive alt text" />
  <figcaption class="caption">
    Grundtone color palette in light and dark mode.
  </figcaption>
</figure>
```

### Guidelines

- Captions are displayed below an image so it is visually clear that the text and image belong together, and that the text is not necessarily part of the surrounding body text.
- Keep captions short and descriptive.
- Always pair with a meaningful `alt` attribute on the image.
- Use `<figure>` and `<figcaption>` for semantic markup.
