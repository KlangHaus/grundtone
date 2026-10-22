---
'@grundtone/nuxt': patch
---

Require `@nuxt/kit` ^4.6.2. Nuxt 4.6.2 fixes GHSA-vjh5-4x84-xrqp (server-side route rules),
GHSA-jjm6-p2m9-9w4x (incomplete `javascript:` URL fix) and GHSA-xfq5-w38q-pc2x (server islands
render `useHeadSafe` input unsanitised), all published 2026-10-22.
