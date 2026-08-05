---
---

Version-drift-gate plus the version bumps it demanded (core/utils/icons 2.23.0,
design-system/vue/nuxt 2.24.0, mcp 0.2.0). Empty changeset per the "frozen 2.x packages" guard: the
2.x line stays publish-frozen until the main/develop reconciliation, and these numbers exist so the
`next` prerelease channel sorts ABOVE npm `latest` rather than below it. They are deliberately not a
`latest` release — changesets writes those when the freeze lifts.
