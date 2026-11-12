---
'@grundtone/email': patch
---

`html-to-text` 9.0.5 → 10.0.1. Version 10 replaces `deepmerge` with `deepmerge-ts`, so
`@grundtone/email` no longer installs `deepmerge`. `toPlainText` output is unchanged for every
built-in template. html-to-text 10 needs Node.js >= 20.19.0.
