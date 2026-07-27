---
'@grundtone/vue': minor
---

Add `GTConfirmDialog` and `GTCodeBlock`, continuing the redesign component set. `GTConfirmDialog` is
an opinionated wrapper over `GTModal` that replaces `window.confirm()` — title + message,
cancel/confirm buttons, a `destructive` variant (negative confirm button), and a `loading` state for
async confirms (confirm doesn't auto-close so the parent controls timing). `GTCodeBlock` is a
token-anchored, theme-aware code surface with an optional header (label / language) and
copy-to-clipboard button, for install snippets, token JSON, and keys.
