# @grundtone/react-native

## 2.0.0 - 2026-03-09

### Minor Changes

- [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26)
  Thanks [@allanasp](https://github.com/allanasp)! - Add branding system with logo variants and
  platform helpers.

  - `createBranding()` factory for centralised brand name, tagline, and logo paths
  - Six logo variants (primary 1080, pwa512, pwa192, appleTouchIcon 180, favicon32, favicon16)
  - Web: `brandingHeadTags()` generates favicon/apple-touch-icon `<link>` tags
  - React Native: `getLogoSource()` returns `ImageSourcePropType` for `<Image>`
  - Build script `scripts/generate-logo-variants.ts` to regenerate variants from source

### Patch Changes

- Updated dependencies
  [[`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26),
  [`bb8563f`](https://github.com/grundtone/grundtone/commit/bb8563f95d51f36804d2b5fce88c0632d8f89e26),
  [`cd4c165`](https://github.com/grundtone/grundtone/commit/cd4c1659c34d925d5744502f01b8d8eb97d128c0),
  [`6a885a9`](https://github.com/grundtone/grundtone/commit/6a885a9d0ac1a0ee15647529b9bc998db7b5863f),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`fda04b9`](https://github.com/grundtone/grundtone/commit/fda04b9badebeb214b0468b71fcc06c3c3a00a60),
  [`8e5f24b`](https://github.com/grundtone/grundtone/commit/8e5f24b04c6bf8807069caa8ebc941584f165c31),
  [`7ed86fa`](https://github.com/grundtone/grundtone/commit/7ed86facc17a308f5532ff235fad5d94a37b044c)]:
  - @grundtone/core@2.0.0
