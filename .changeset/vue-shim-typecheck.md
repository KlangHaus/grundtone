---
'@grundtone/vue': patch
---

Add `types/shims-vue.d.ts` ambient module declaration so `.vue` SFC imports resolve under plain
`tsc` (not just `vue-tsc`). No change to the package's public API or runtime behaviour.
