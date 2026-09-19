---
'@grundtone/nuxt': patch
---

**Components and composables are registered from `@grundtone/vue` itself, not from its `src/`
folder.** Two measured defects came out of the old directory scan:

- `@grundtone/vue` publishes only `dist` and `scss` (3.1.0 ships 0 `src` files; 2.23.3 shipped 255),
  so `../../vue/src/...` does not exist in an installed package.
- A component loaded from `src` and a consumer's own `import { useToast } from '@grundtone/vue'`
  were two module instances. `useToast` keeps its state in a module-level `reactive`, so the toast
  container read one state while the app wrote the other — the toast never appeared, and nothing
  errored.

Component names are unchanged (all 56, `prefix` still applies), and `GT_ICON_REGISTRY_KEY`, the
composables and the `@grundtone/utils` validators are auto-imported as before.
