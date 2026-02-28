---
'@grundtone/design-tokens': minor
---

feat(design-tokens): spacing and visibility utilities

New features:

- `_spacing.scss` — modernized margin and padding utilities with 25-step scale matching gap
- Logical properties for RTL support: `.mx-*` uses `margin-inline`, `.ms-*`/`.me-*` use
  `margin-inline-start`/`margin-inline-end`
- Auto margins: `.mx-auto`, `.ms-auto`, `.mt-auto` etc. for centering and flex push
- `.visible` / `.invisible` visibility utilities with responsive variants
- All utilities use `{bp}:` prefix convention and no `!important`

Breaking changes:

- `_spacing.scss` rewritten: `.mt-md-3` → `.md:mt-3`, `.mr-3` → `.me-3`, `.ml-3` → `.ms-3`
