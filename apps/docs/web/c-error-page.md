# Error Page

Full-page error display with musical illustrations, status code, title, description, and actions. Uses Grundtone's musical identity — each error type has a unique staff-line illustration with a thematic metaphor.

## When to use

- 404 Not Found — broken links, deleted pages
- 403 Forbidden — unauthorized access
- 500 Internal Server Error — server failures
- 503 Service Unavailable — maintenance, downtime
- Any HTTP error that needs a user-facing page

## Design rationale

"Grundtone" means *fundamental tone* — the musical foundation. Error pages use musical metaphors to stay on-brand while communicating clearly:

| Code | Metaphor | Title |
|------|----------|-------|
| 404 | Missing note on staff | "Denne side spiller ikke" |
| 403 | Locked practice room | "Øverummet er lukket" |
| 500 | Broken strings / dissonance | "Noget gik galt i orkestret" |
| 503 | Pause in the score | "Vi stemmer instrumenterne" |

---

## CSS classes

| Class | Description |
|-------|-------------|
| `.error-page` | Root container — centered flex, min-height 60vh |
| `.error-page__illustration` | SVG wrapper with breathing animation |
| `.error-page__code` | Large status code — monospace, responsive size |
| `.error-page__title` | Error heading |
| `.error-page__description` | Explanatory text — tertiary color, max-width |
| `.error-page__actions` | Button group |
| `.error-page__debug` | Dev-only debug output — monospace, surface-alt bg |

---

## HTML structure

```html
<div class="error-page">
  <div class="error-page__illustration">
    <!-- SVG illustration -->
  </div>
  <div class="error-page__code">404</div>
  <h1 class="error-page__title">Denne side spiller ikke</h1>
  <p class="error-page__description">Vi kunne ikke finde den node, du ledte efter.</p>
  <div class="error-page__actions">
    <a href="/" class="gt-btn gt-btn--primary gt-btn--md">Gå til forsiden</a>
  </div>
</div>
```

---

## Accessibility

- Illustration SVG has `role="img"` and `aria-label`
- Title uses `<h1>` for document heading
- Animation respects `prefers-reduced-motion`
- Home link is a native `<a>` for keyboard and screen reader access
- Debug section uses monospace font and semantic structure
