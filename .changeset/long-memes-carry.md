---
'@grundtone/design-tokens': minor
'@grundtone/composables': patch
'@grundtone/shared': patch
'@grundtone/core': patch
'@grundtone/nuxt': patch
'@grundtone/vue': patch
---

Add comprehensive platform-specific documentation and 12-column grid system

Major updates:

- Added platform-specific usage examples (Web, iOS, Android, React Native) to all design token pages
- Created new conceptual guide "Design Tokens vs Utilities" explaining cross-platform workflow
- Added complete 12-column CSS Grid system with responsive utilities
- Refactored spacing scale to industry-standard 0-6 system

New features:

- Grid utilities: .grid, .grid-cols-_, .col-span-_, .gap-\*, responsive variants
- Standardized spacing utilities: .m-0 to .m-6, .p-0 to .p-6 with directional variants
- Platform-specific code examples in Swift, Kotlin, and TypeScript

Breaking changes:

- Spacing scale simplified: removed non-standard sizes (305, 405, 505, etc.) - migrate to standard
  0-6 scale
