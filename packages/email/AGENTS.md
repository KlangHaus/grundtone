# @grundtone/email

Framework-agnostic, token-themed email building blocks. MJML in → bulletproof inlined HTML out, with
`{{handlebars}}` placeholders preserved for a send-time layer.

## Invariants — do not break

- **No framework in the artifact.** No Vue/React. The only coupling to grundtone is **token values**
  read from `@grundtone/core` via `resolveEmailTheme`.
- **Tokens, not hardcoded values.** Blocks read colours/fonts/spacing/radii from the resolved
  `EmailTheme`. Never hand-write a hex or font stack in a block. The single place tokens enter the
  MJML is `src/head.ts` (`renderHead`); `mj-table` cells in `src/blocks/invoice.ts` are the one spot
  that interpolates token values into inline styles, because MJML doesn't theme raw tables — that's
  still token-derived, not hand-picked.
- **Placeholders survive compilation.** `{{var}}`, `{{#each}}`, `{{#if}}` must pass through MJML
  untouched. The build/publish step compiles MJML → HTML; it does **not** fill data.
- **HTML body escapes recipient data; subject and text do not.** See `renderTemplate`. Escaping
  covers HTML-text and quoted-attribute contexts, but does NOT validate URL schemes —
  `href="{{url}}"` emits the value verbatim, so callers must pass trusted URLs.

## Layout of the package

- `theme.ts` — `resolveEmailTheme(coreTheme?, options?)`: core `Theme` → curated `EmailTheme`
  (rem→px for the email medium).
- `head.ts` — `renderHead(theme)`: the token-coupling `<mj-head>` (fonts, attribute defaults,
  `mj-class` type styles, inlinable utility classes).
- `layout.ts` — `baseLayout(...)`: full MJML document (head + preheader + content card + footer).
- `blocks/` — section-level MJML helpers. `createBlocks(theme)` binds them to a theme.
- `compile.ts` — `compileMjml` (MJML → inlined HTML) and `toPlainText`.
- `template.ts` — `defineTemplate`, `compileTemplate` (→ publishable artifact), `renderTemplate` /
  `renderEmail` (fill `{{vars}}` with Handlebars).
- `templates/` — built-in grundtone templates; `templates` array is the publish set.
- `scripts/build-templates.ts` — compiles all templates × locales to the CDN-shaped artifact tree.

## Adding a block

Add `blocks/<name>.ts` exporting `(theme: EmailTheme, opts) => string` returning **section-level**
MJML (`<mj-section><mj-column>…`). Re-export it and bind it in `blocks/index.ts` (`createBlocks`).
Add a test in `blocks/blocks.test.ts` asserting it references the relevant tokens.

## Adding a template

Add `templates/<key>.ts` via `defineTemplate`, list it in `templates/index.ts`, and it's picked up
by the compile-all test and the publish script. Every template must compile under
`validationLevel: 'strict'` for every locale — that is the publish gate (`templates.test.ts`).

## Commands

```bash
pnpm build              # tsup: bundle + d.ts
pnpm test               # vitest
pnpm lint               # eslint src scripts
pnpm compile:templates  # publish artifact tree → dist/published/
```

## Branch note

This package was built on `develop`. develop's `@grundtone/core` predates the nested
`createTheme({ light: { colors: {…} } })` override format that exists on `main` — use the flat
shorthand `createTheme({ light: { primary } })` here. The package itself is override-format agnostic
(it only reads a resolved `Theme`).
