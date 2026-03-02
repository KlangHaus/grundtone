# Branding Configuration

Grundtone ships a single source of truth for logos and brand identity. The `createBranding()`
factory centralises your brand name, tagline, and every logo variant so they stay consistent across
web and React Native.

## Logo Variants

Six PNG variants are generated from one high-resolution source file:

| Variant key      | File               | Dimensions  | Use case                    |
| ---------------- | ------------------ | ----------- | --------------------------- |
| `primary`        | `logo.png`         | 1080 × 1080 | Hero images, splash screens |
| `pwa512`         | `logo-512x512.png` | 512 × 512   | PWA manifest (large)        |
| `pwa192`         | `logo-192x192.png` | 192 × 192   | PWA manifest (small)        |
| `appleTouchIcon` | `logo-180x180.png` | 180 × 180   | Apple touch icon            |
| `favicon32`      | `logo-32x32.png`   | 32 × 32     | Browser favicon             |
| `favicon16`      | `logo-16x16.png`   | 16 × 16     | Browser favicon (small)     |

All assets live in `packages/core/assets/` and are referenced by default at
`@grundtone/core/assets/<file>`.

## `createBranding()`

Import the factory from `@grundtone/core` and optionally pass overrides:

```ts
import { createBranding } from '@grundtone/core';

// Use defaults
const branding = createBranding();

// Override selectively
const branding = createBranding({
  name: 'My App',
  tagline: 'Built with Grundtone',
  logos: {
    primary: '/img/my-logo.png',
  },
});
```

Only the properties you provide are overridden — everything else keeps its default value.

## Types

```ts
interface LogoVariants {
  primary: string;
  favicon32: string;
  favicon16: string;
  appleTouchIcon: string;
  pwa192: string;
  pwa512: string;
}

interface BrandingConfig {
  name: string;
  tagline: string;
  logos: LogoVariants;
}
```

`createBranding()` accepts an optional `Partial<BrandingConfig>` and returns a full
`BrandingConfig`.

## Regenerating Variants

If you replace the source logo at `assets/logo/logo.png`, regenerate every variant with:

```bash
npx tsx scripts/generate-logo-variants.ts
```

The script uses [sharp](https://sharp.pixelplumbing.com/) to resize the 1080 × 1080 source into the
five smaller variants and copies them into `packages/core/assets/`.

## Platform Integration

- **Web** — see [Branding](/web/branding) for `brandingHeadTags()` and favicon injection
- **React Native** — see [Branding](/react-native/branding) for `getLogoSource()` and `<Image>`
  usage
