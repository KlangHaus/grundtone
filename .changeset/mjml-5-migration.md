---
'@grundtone/email': minor
---

Migrate to mjml 5. mjml's render is now asynchronous, so the compile chain is async accordingly:
`compileMjml`, `compileTemplate` and `renderEmail` now return Promises (add `await`).
`renderTemplate` (pure Handlebars interpolation) stays synchronous, and the published artifact
shape/contract is unchanged — the Go notifications consumer is unaffected.
