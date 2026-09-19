---
'@grundtone/nuxt': patch
---

Declare `@grundtone/utils` as a dependency, so the auto-imported validators reach consumers.

The module registers `required`, `email`, `cpr`, `cvr` and the other validators
`from: '@grundtone/utils'`, but declared no dependency on that package. Nuxt resolves an
auto-import's `from` against the consumer's module directories, and when it cannot, it skips the
import **silently**: a build printed
`[NUXT_B6005] Could not resolve @grundtone/utils used by the auto-import required` on stdout and
stayed green. Measured on the test fixture: 1 occurrence before this change, 0 after. The workspace
playground could not have shown it, because it declares `@grundtone/utils` itself.
