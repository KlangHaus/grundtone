# @grundtone/nuxt

## 2.2.0

### Patch Changes

- Updated dependencies
  [[`d087e51`](https://github.com/grundtone/grundtone/commit/d087e51106acb475d92a51e063ce540a0ea41d47)]:
  - @grundtone/vue@2.2.0
  - @grundtone/design-system@2.2.0

## 2.1.0

### Patch Changes

- [`c7e2fbe`](https://github.com/grundtone/grundtone/commit/c7e2fbed5d370449cb61e92b3bcade97897e0581)
  Thanks [@allanasp](https://github.com/allanasp)! - Nuxt module now auto-injects design-system CSS.
  Add @grundtone/core and @grundtone/design-system as dependencies. Fix Sass if() deprecation
  warnings in accessibility module.
- Updated dependencies
  [[`36758db`](https://github.com/grundtone/grundtone/commit/36758db0b2b3823e5a71e5bc7b14ed80b7ee4a25),
  [`1e90785`](https://github.com/grundtone/grundtone/commit/1e90785ab0b0ad5df1437a1b87e15db602582cd6),
  [`33219d3`](https://github.com/grundtone/grundtone/commit/33219d309b4ad6f56df0f02083a5730f5543a1d4),
  [`fe730ff`](https://github.com/grundtone/grundtone/commit/fe730ff700a9801f6985aa326d899fdb03e0f88f),
  [`c7e2fbe`](https://github.com/grundtone/grundtone/commit/c7e2fbed5d370449cb61e92b3bcade97897e0581)]:
  - @grundtone/design-system@2.1.0
  - @grundtone/vue@2.1.0
  - @grundtone/icons@2.1.0
  - @grundtone/core@2.1.0

## 2.0.0 - 2026-03-09

### Major Changes

- [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60)
  Thanks [@allanasp](https://github.com/allanasp)! - And it begins! The Ui library

  - design token
  - components in vue
  - types
  - composables/hooks

- [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60)
  Thanks [@allanasp](https://github.com/allanasp)! - Complete v1.0.0 release of Grundtone - a Vue 3
  design system with:

### Patch Changes

- [`8e5f24b`](https://github.com/grundtone/grundtone/commit/8e5f24b04c6bf8807069caa8ebc941584f165c31)
  Thanks [@allanasp](https://github.com/allanasp)! - Add comprehensive platform-specific
  documentation and 12-column grid system

  Major updates:

  - Added platform-specific usage examples (Web, iOS, Android, React Native) to all design token
    pages
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

- Updated dependencies
  [[`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`8e5f24b`](https://github.com/grundtone/grundtone/commit/8e5f24b04c6bf8807069caa8ebc941584f165c31),
  [`434dbb6`](https://github.com/grundtone/grundtone/commit/434dbb6db98a36b64448b1a6064b8c86cd2e39c5),
  [`995f630`](https://github.com/grundtone/grundtone/commit/995f63062cd9dbb030b148d6d9a5f8b6e026fd20),
  [`7ed86fa`](https://github.com/grundtone/grundtone/commit/7ed86facc17a308f5532ff235fad5d94a37b044c)]:
  - @grundtone/vue@2.0.0
  - @grundtone/composables@2.0.0

## 1.0.0 - 2025-12-31

### Major Changes

- [`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)
  Thanks [@allanasp](https://github.com/allanasp)! - Initial release of Grundtone design system with
  grid system, design tokens, Vue 3 components, and Nuxt module

### Patch Changes

- Updated dependencies
  [[`8174960`](https://github.com/allanasp/grundtone/commit/817496074311a1eee4da2f14603eb79e633636e5)]:
  - @grundtone/composables@1.0.0
  - @grundtone/vue@1.0.0
