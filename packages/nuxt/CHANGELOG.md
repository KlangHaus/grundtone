# @grundtone/nuxt

## 2.23.1

### Patch Changes

- fix: add @grundtone/vue to vite.ssr.noExternal so CSS side-effect imports work during SSR

## 2.23.0

### Minor Changes

- feat: auto CSS per component — zero-config tree-shaking

  Each Grundtone component now imports its own CSS automatically. Just import components — CSS
  follows. Unused components are tree-shaken from both JS and CSS.

  - `@grundtone/vue/css` unchanged — full bundle for CDN/legacy
  - `@grundtone/vue/css/utilities` new — opt-in utility classes
  - `@grundtone/nuxt` no longer injects CSS bundle — relies on Vite side-effect imports

### Patch Changes

- Updated dependencies []:
  - @grundtone/design-system@2.23.0
  - @grundtone/vue@2.23.0

## 2.22.0

### Minor Changes

- Unified version 2.22.0 release:

  - @grundtone/vue: TypeScript declarations now shipped in dist/types/index.d.ts (fixes TS users
    getting 'any' types)
  - @grundtone/vue: Re-exports createTheme, iconRegistry, and all core types — users no longer need
    to install @grundtone/core or @grundtone/icons separately
  - All packages: Unified version number (was split across 2.2.0, 2.17.0, 2.21.6)

### Patch Changes

- Updated dependencies []:
  - @grundtone/core@2.22.0
  - @grundtone/design-system@2.22.0
  - @grundtone/icons@2.22.0
  - @grundtone/vue@2.22.0

## 2.21.6

### Patch Changes

- Updated dependencies []:
  - @grundtone/vue@2.21.6

## 2.21.5

### Patch Changes

- Updated dependencies []:
  - @grundtone/vue@2.21.5

## 2.21.4

### Patch Changes

- Set plugin enforce: 'pre' so icon registry is provided before all components render (fixes GTIcon
  SSR warnings)

## 2.21.3

### Patch Changes

- Register runtime plugin via addPlugin so icon registry is provided in SSR and client. Fixes GTIcon
  warnings about missing registry.

## 2.21.2

### Patch Changes

- Updated dependencies []:
  - @grundtone/vue@2.21.2

## 2.21.1

### Patch Changes

- Fix @layer gt-theme wrapper being stripped from theme CSS during module build

## 2.21.0

### Minor Changes

- Use CSS @layer to guarantee theme overrides always win over design-system defaults regardless of
  bundle load order. Design-system CSS is wrapped in @layer gt-defaults, theme CSS in @layer
  gt-theme.

## 2.20.3

### Patch Changes

- Write theme CSS to node_modules/.cache/grundtone/ for reliable path resolution in Nuxt 4

## 2.20.2

### Patch Changes

- Fix theme CSS file path resolution using absolute rootDir

## 2.20.1

### Patch Changes

- Write theme CSS to file and inject after design-system defaults so custom properties correctly
  override light-dark() fallbacks

## 2.20.0

### Minor Changes

- Inject theme CSS custom properties as inline style in head during SSR/SSG so tokens are available
  before client hydration. Supports light theme and dark mode via prefers-color-scheme media query.

## 2.19.2

### Patch Changes

- Rebuild plugin with icon registry provider

## 2.19.1

### Patch Changes

- Ensure icon registry is provided in Nuxt plugin for SSR

## 2.19.0

### Minor Changes

- Add GTHeader and GTFooter organism components with transparent mode, sticky scroll, mobile menu,
  and responsive layout.

### Patch Changes

- Updated dependencies []:
  - @grundtone/vue@2.19.0

## 2.18.0

### Minor Changes

- Auto-import formatDate, formatCurrency, formatPhoneNumber, formatCPR, generateId from
  @grundtone/utils. Auto-provide icon registry in Nuxt plugin so GTCard nav and other icon-using
  components work without manual setup.

## 2.17.0

### Minor Changes

- Extend createTheme() to accept typography, radius, transitions, and spacing overrides in addition
  to colors. Backwards-compatible — flat color overrides still work.

### Patch Changes

- Updated dependencies []:
  - @grundtone/core@2.17.0
  - @grundtone/vue@2.17.0
  - @grundtone/design-system@2.17.0

## 2.16.3

### Patch Changes

- Nuxt module now auto-injects SCSS preprocessor config so component style blocks can use the tokens
  namespace. Also adds ./package.json to design-system exports.

- Updated dependencies []:
  - @grundtone/design-system@2.16.3
  - @grundtone/vue@2.16.3

## 2.16.2

### Patch Changes

- Updated dependencies []:
  - @grundtone/vue@2.16.2

## 2.16.1

### Patch Changes

- Fix Nuxt module to resolve @grundtone/vue via node_modules instead of relative paths. Include src/
  in published @grundtone/vue package for Nuxt auto-imports.

- Updated dependencies []:
  - @grundtone/vue@2.16.1

## 2.16.0

### Minor Changes

- Add GTMasonry molecule component for responsive masonry grid layouts

### Patch Changes

- Updated dependencies []:
  - @grundtone/vue@2.16.0
  - @grundtone/design-system@2.16.0

## 2.15.0

### Patch Changes

- Updated dependencies [366ae17]
  - @grundtone/design-system@2.15.0
  - @grundtone/vue@2.15.0

## 2.14.0

### Patch Changes

- Updated dependencies [7e77c0b]
  - @grundtone/design-system@2.14.0
  - @grundtone/vue@2.14.0

## 2.13.0

### Patch Changes

- Updated dependencies [dbd9c2c]
  - @grundtone/design-system@2.13.0
  - @grundtone/vue@2.13.0

## 2.12.0 - 2026-03-22

### Patch Changes

- Updated dependencies
  [[`fc456bf`](https://github.com/grundtone/grundtone/commit/fc456bfc25e1263f3fc19140f8108698072c269d)]:
  - @grundtone/design-system@2.12.0
  - @grundtone/vue@2.12.0
  - @grundtone/icons@2.2.0

## 2.11.0 - 2026-03-22

### Patch Changes

- Updated dependencies
  [[`c37762e`](https://github.com/grundtone/grundtone/commit/c37762e4ae7944dffc13d04de43a5b0ba83fcf32)]:
  - @grundtone/design-system@2.11.0
  - @grundtone/vue@2.11.0

## 2.10.0 - 2026-03-22

### Patch Changes

- Updated dependencies
  [[`200846b`](https://github.com/grundtone/grundtone/commit/200846b19a450ca48fc97919cf858989483c4318)]:
  - @grundtone/design-system@2.10.0
  - @grundtone/vue@2.10.0

## 2.9.1 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`009ab18`](https://github.com/grundtone/grundtone/commit/009ab18cbff1652f5b42665bfcc7bc37a4e310b7)]:
  - @grundtone/vue@2.9.1
  - @grundtone/icons@2.1.2

## 2.9.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`efee6cf`](https://github.com/grundtone/grundtone/commit/efee6cfe57c2ec6f038bd2ddc7bd7004a71e2a67)]:
  - @grundtone/design-system@2.9.0
  - @grundtone/vue@2.9.0
  - @grundtone/icons@2.1.1

## 2.8.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`ccb6a4e`](https://github.com/grundtone/grundtone/commit/ccb6a4e5833b18115cf520ef625c802ed55c42ba),
  [`8fc757a`](https://github.com/grundtone/grundtone/commit/8fc757a37e5cb862f4d6c48b8a1271088535ff6d),
  [`9cf5217`](https://github.com/grundtone/grundtone/commit/9cf52174c298cab51259a2ca948523eef26a1516)]:
  - @grundtone/design-system@2.8.0
  - @grundtone/vue@2.8.0

## 2.7.1 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`f41cfa6`](https://github.com/grundtone/grundtone/commit/f41cfa697d66f842719621865c8ddafe96cf3b25)]:
  - @grundtone/design-system@2.7.1
  - @grundtone/vue@2.7.1

## 2.7.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`98a30f3`](https://github.com/grundtone/grundtone/commit/98a30f3c7786ac7425b5249740cb22e351874f16)]:
  - @grundtone/design-system@2.7.0
  - @grundtone/vue@2.7.0

## 2.6.1 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`fd7b9e7`](https://github.com/grundtone/grundtone/commit/fd7b9e736af8c3b2964a8bb9089c55583c18f1ae)]:
  - @grundtone/design-system@2.6.1
  - @grundtone/vue@2.6.1

## 2.6.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`a8f16af`](https://github.com/grundtone/grundtone/commit/a8f16af2101e8fddec6e5e7e08cf287ca76937f4)]:
  - @grundtone/vue@2.6.0
  - @grundtone/design-system@2.6.0

## 2.5.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`47eec5f`](https://github.com/grundtone/grundtone/commit/47eec5f72d7299faf3b97bfc32513d6df4ff9ea4)]:
  - @grundtone/vue@2.5.0
  - @grundtone/design-system@2.5.0

## 2.4.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`b24dbd9`](https://github.com/grundtone/grundtone/commit/b24dbd9a10bf80685d571ab69ff40ec1098fc9a6)]:
  - @grundtone/vue@2.4.0
  - @grundtone/design-system@2.4.0

## 2.3.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`f155ea5`](https://github.com/grundtone/grundtone/commit/f155ea5b91ab9e7393a96dc3654aa92b46210db5)]:
  - @grundtone/vue@2.3.0
  - @grundtone/design-system@2.3.0

## 2.2.0 - 2026-03-21

### Patch Changes

- Updated dependencies
  [[`d087e51`](https://github.com/grundtone/grundtone/commit/d087e51106acb475d92a51e063ce540a0ea41d47)]:
  - @grundtone/vue@2.2.0
  - @grundtone/design-system@2.2.0

## 2.1.0 - 2026-03-21

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
