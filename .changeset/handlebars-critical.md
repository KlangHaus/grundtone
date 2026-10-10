---
'@grundtone/email': patch
---

Bump `handlebars` to `^4.7.10` — a critical advisory (`>=4.0.0 <=4.7.9`) with a patch in 4.7.10.

This one is consumer-relevant, unlike most dependency bumps: `handlebars` is a runtime template
engine declared directly in `@grundtone/email`, so the vulnerable code was in the published
tarball's dependency closure, not merely in our tooling. Raised on the declared range rather than
with an override, because an override on a direct dependency hides the real version from anyone
reading the manifest.
