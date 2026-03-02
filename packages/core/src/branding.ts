/**
 * Grundtone Branding System
 *
 * Central branding definition — one source of truth for logo assets
 * and brand identity across web and React Native.
 *
 * @example
 * // Use defaults
 * import { defaultBranding } from '@grundtone/core';
 *
 * @example
 * // Override for your brand
 * import { createBranding } from '@grundtone/core';
 * const branding = createBranding({
 *   name: 'My App',
 *   tagline: 'Build something great',
 *   logos: { primary: '/my-logo.png' },
 * });
 */

/** Asset path for a single logo variant. */
export interface LogoVariants {
  /** Primary logo (1080×1080) */
  primary: string;
  /** Favicon 32×32 */
  favicon32: string;
  /** Favicon 16×16 */
  favicon16: string;
  /** Apple touch icon (180×180) */
  appleTouchIcon: string;
  /** PWA manifest icon (192×192) */
  pwa192: string;
  /** PWA manifest icon (512×512) */
  pwa512: string;
}

export interface BrandingConfig {
  /** Brand name */
  name: string;
  /** Short tagline / description */
  tagline: string;
  /** Logo asset paths per variant */
  logos: LogoVariants;
}

/** Width and height metadata for each logo variant. */
export const LOGO_VARIANT_SIZES: Record<
  keyof LogoVariants,
  { width: number; height: number }
> = {
  primary: { width: 1080, height: 1080 },
  favicon32: { width: 32, height: 32 },
  favicon16: { width: 16, height: 16 },
  appleTouchIcon: { width: 180, height: 180 },
  pwa192: { width: 192, height: 192 },
  pwa512: { width: 512, height: 512 },
} as const;

/**
 * Default branding — Grundtone reference assets.
 * Paths are relative to `@grundtone/core/assets/`.
 */
export const defaultBranding: BrandingConfig = {
  name: 'Grundtone',
  tagline: 'A cross-platform design system',
  logos: {
    primary: '@grundtone/core/assets/logo.png',
    favicon32: '@grundtone/core/assets/logo-32x32.png',
    favicon16: '@grundtone/core/assets/logo-16x16.png',
    appleTouchIcon: '@grundtone/core/assets/logo-180x180.png',
    pwa192: '@grundtone/core/assets/logo-192x192.png',
    pwa512: '@grundtone/core/assets/logo-512x512.png',
  },
};

/**
 * Create a branding config with your brand identity.
 * Override only what you need — the rest uses Grundtone defaults.
 */
export function createBranding(
  overrides?: Partial<BrandingConfig>,
): BrandingConfig {
  if (!overrides) return { ...defaultBranding };

  return {
    name: overrides.name ?? defaultBranding.name,
    tagline: overrides.tagline ?? defaultBranding.tagline,
    logos: {
      ...defaultBranding.logos,
      ...overrides.logos,
    },
  };
}
