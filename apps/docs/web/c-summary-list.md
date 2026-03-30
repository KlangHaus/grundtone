# Summary List

A key-value list for presenting information in a structured, scannable format. Used for review pages, profile summaries, order confirmations, and any context where data is presented as label-value pairs.

## When to use

- Summarising user answers on a review or confirmation page
- Displaying profile or account details
- Showing order information or metadata
- Any key-value pair display with optional edit actions

## When not to use

- Tabular data with multiple columns — use [Table](/web/c-table)
- Expandable/collapsible content — use [Details](/web/c-details) or [Accordion](/web/c-accordion)
- Navigation — use [Card](/web/c-card)

---

## Default

Key-value pairs with optional action links.

<CodePreview id="c-summary-list-default" />

## Borderless

Removes row dividers for a cleaner look.

<CodePreview id="c-summary-list-borderless" />

## Card

Wraps the list in a card with a title and optional card-level actions.

<CodePreview id="c-summary-list-card" />

## Read-only (no actions)

Add `summary-list__row--no-actions` when a row has no action column.

<CodePreview id="c-summary-list-readonly" />

---

## CSS classes

| Class | Description |
|-------|-------------|
| `.summary-list` | Root `<dl>` element |
| `.summary-list--borderless` | Removes row borders |
| `.summary-list__row` | Row wrapper `<div>` inside `<dl>` |
| `.summary-list__row--no-actions` | Row without action column |
| `.summary-list__key` | `<dt>` label |
| `.summary-list__value` | `<dd>` value |
| `.summary-list__actions` | `<dd>` actions container |
| `.summary-list__action` | Action button/link |
| `.summary-card` | Card wrapper |
| `.summary-card__header` | Card header with title and actions |
| `.summary-card__title` | Card title |
| `.summary-card__actions` | Card-level actions |
| `.summary-card__content` | Card body containing `<dl>` |

---

## Accessibility

- Uses native `<dl>` / `<dt>` / `<dd>` semantics — no ARIA roles needed
- Action links include visually hidden text via `.sr-only` for context (e.g. "Change, name")
- Card titles use semantic headings (`<h2>`–`<h4>`)
- Responsive: stacks vertically on small screens

---

## References

- [GOV.UK Summary List](https://design-system.service.gov.uk/components/summary-list/)
- [DKFDS Struktureret liste](https://designsystem.dk/komponenter/struktureret-liste/)
