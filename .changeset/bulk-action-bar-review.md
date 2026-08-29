---
'@grundtone/vue': patch
---

`GTBulkActionBar`: two fixes from a retrospective review.

- **Reserved space is now reconciled between instances.** It lives on a single custom property on
  `document.body`, and releasing it on one bar's unmount used to strip it from every other bar too —
  including one still on screen, whose last row then slid underneath it. The largest claim wins, and
  the property only returns to zero when the last bar goes.
- **New optional `selectionKey`.** The receipt was discarded on a change of count, so swapping three
  selected rows for three others left a stale "3 of 3 moved" beside a completely fresh selection. A
  count cannot express identity; pass a key when your selection can change without changing size.
