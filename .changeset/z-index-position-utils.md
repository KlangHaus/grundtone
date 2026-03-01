---
'@grundtone/design-tokens': minor
---

feat(design-tokens): z-index and position utilities

New features:

- `_z-index.scss` utility classes: `.z-auto`, `.z-0`–`.z-50` scale + semantic `.z-dropdown`,
  `.z-modal`, `.z-tooltip`, `.z-toast` etc. backed by CSS custom properties
- `_position.scss` rewritten: `.relative`, `.absolute`, `.sticky` etc. with inset utilities
  (`.inset-0`, `.inset-x-0`, `.start-0`, `.end-0`) using logical properties for RTL
- All utilities responsive via `{bp}:` prefix, no `!important`
- Added `--z-toast: 1080` token for toast notifications
- Position shortcuts (`.fixed-top`, `.sticky-top`) now use `var(--z-*)` instead of hardcoded values

Breaking changes:

- `_z-index.scss` core: removed overlapping tokens (`header`, `sidebar`, `overlay`, `above`,
  `top: 9999`), removed duplicate `:root` block
- `_position.scss`: `.position-relative` → `.relative`, `!important` removed
