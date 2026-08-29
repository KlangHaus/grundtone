---
'@grundtone/vue': minor
'@grundtone/design-system': minor
---

New `GTBulkActionBar`: a sticky bar that rises from the bottom of the viewport when rows are
selected, carrying the actions that apply to the whole selection.

Three contracts are worth knowing before using it, each one there because the obvious alternative
produces a specific failure:

- **It outlives the selection.** Visibility is `count > 0` OR an unacknowledged receipt. On full
  success the consumer clears the selection — bound to the count alone, the result would vanish in
  the same tick it was set, and a successful action would be indistinguishable from no action.
- **It reserves its own space** on `document.body` and releases it again, so the last row of the
  list never ends up under it. Consumers add no padding.
- **It never clears the selection** — it emits `clear`. The consumer clears conditionally on the
  outcome so a partial success stays retryable on exactly the rows that were missed.

Also adds `--blur-overlay` (8px) as a foundation token for overlaid surfaces. The carousel controls,
which had the value hard-coded, now reference it — two independent surfaces landing on the same
physical value is what a shared token is for.
