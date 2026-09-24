---
'@grundtone/design-system': patch
'@grundtone/react-native': patch
'@grundtone/core': patch
'@grundtone/email': patch
'@grundtone/icons': patch
'@grundtone/utils': patch
'@grundtone/nuxt': patch
'@grundtone/vue': patch
'@grundtone/mcp': patch
---

Bump development dependencies (#233): `@vitejs/plugin-vue` 6.0.8→6.0.9, `eslint` 10.10.0→10.11.0,
`tsx` 4.23.13→4.23.15, `@vue/test-utils` 2.5.0→2.5.1 and the rest of the dev-remainder group.

No source file changes. Written because the repo's own gate requires a changeset from every
published package whose `package.json` is touched, and Dependabot does not write one — not because
these bumps are known to alter what consumers receive.

🔴 Whether they DO alter it is unmeasured here. The honest test is whether the packed tarball
changes byte for byte, which is the instrument this repo already uses for the licence text; it does
not exist for this question yet. Until it does, a changeset is the conservative answer: a version
nobody needed costs a patch number, a missing one ships a change with no record.
