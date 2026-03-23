# Table

Tables present data in a systematic grid of columns and rows. Use tables for structured data that users need to scan, compare, or sort — never for layout.

## When to use

- Displaying tabular data (numbers, statuses, names, dates)
- Comparing data across rows
- Enabling sorting or selection of records

## When not to use

- Page layout — use CSS Grid or Flexbox
- Key-value pairs with few fields — use a [Structured List](#structured-list) or description list
- Navigation or action lists — use [Card](/web/c-card) or list elements

---

## Default

<CodePreview id="c-table-default" />

## Borderless

Removes all row borders for a cleaner look in dense interfaces.

<CodePreview id="c-table-borderless" />

## Zebra (striped)

Alternating row backgrounds for better readability in long tables.

<CodePreview id="c-table-zebra" />

## Compact

Reduced padding for data-dense views like dashboards.

<CodePreview id="c-table-compact" />

## Sortable

Add `data-sortable` for vanilla JS behavior. Use `aria-sort` on the active `<th>` and `.table__sort` buttons.

<CodePreview id="c-table-sortable" />

## Selectable

Add `data-selectable` for vanilla JS behavior. Use checkboxes with `.table__select` cells.

<CodePreview id="c-table-selectable" />

## Responsive

Wrap in `.table-wrapper--responsive` to stack rows as cards on small screens. Add `data-label` to each `<td>`.

<CodePreview id="c-table-responsive" />

## Key-value pairs?

For key-value displays (profiles, summaries, review pages), use [Summary List](/web/c-summary-list) instead of a table. Summary List uses `<dl>` semantics and supports actions and a card variant.

---

## CSS classes

| Class | Description |
|-------|-------------|
| `.table` | Base table class |
| `.table--borderless` | Removes row borders |
| `.table--zebra` | Alternating row backgrounds |
| `.table--compact` | Reduced padding |
| `.table--extra-compact` | Minimal padding |
| `.table__num` | Right-aligned numeric cell (th/td) |
| `.table__sort` | Sortable column header button |
| `.table__sort--active` | Active sort column |
| `.table__sort-icon` | Sort direction indicator |
| `.table__select` | Checkbox column cell |
| `.table__row--selected` | Selected row highlight |
| `.table__footer` | Table footer with count/actions |
| `.table__count` | Tabular-nums count display |
| `.table-wrapper` | Overflow container |
| `.table-wrapper--responsive` | Enables stacked mobile layout |

---

## Accessibility

- Always provide a `<caption>` — use `.sr-only` if not visually needed
- Use `<th scope="col">` for column headers, `<th scope="row">` for row headers
- Use `aria-sort="ascending"` or `aria-sort="descending"` on the active sorted column
- Sortable headers use `<button>` elements inside `<th>` for keyboard access
- Selection checkboxes have descriptive `aria-label` attributes
- In responsive mode, `data-label` on `<td>` provides context when headers are hidden

---

## References

- [DKFDS Table](https://designsystem.dk/komponenter/tables/)
- [GOV.UK Table](https://design-system.service.gov.uk/components/table/)
- [shadcn/ui Table](https://ui.shadcn.com/docs/components/table)
- Rost, A. (2019). *Accessible Data Tables.* Smashing Magazine.
- Rutter, R. (2017). *Web Typography.* A Book Apart.
