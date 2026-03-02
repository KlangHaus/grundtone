---
'@grundtone/core': minor
'@grundtone/design-tokens': minor
'@grundtone/react-native': minor
---

Add branding system with logo variants and platform helpers.

- `createBranding()` factory for centralised brand name, tagline, and logo paths
- Six logo variants (primary 1080, pwa512, pwa192, appleTouchIcon 180, favicon32, favicon16)
- Web: `brandingHeadTags()` generates favicon/apple-touch-icon `<link>` tags
- React Native: `getLogoSource()` returns `ImageSourcePropType` for `<Image>`
- Build script `scripts/generate-logo-variants.ts` to regenerate variants from source
