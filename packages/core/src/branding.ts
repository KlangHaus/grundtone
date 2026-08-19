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
  /**
   * Vector variants (SVG) — added 2026-08-04 with the official identity.
   * Optional so existing consumer overrides keep type-checking.
   */
  /** Iconic mark: gold "g" on navy (square) */
  iconSvg?: string;
  /** Iconic mark, inverted (navy "g" on gold) */
  iconInvertedSvg?: string;
  /** Wordmark: mark + "grundtone" — default header logo */
  wordmarkSvg?: string;
  /** Wordmark for dark backgrounds */
  wordmarkWhiteSvg?: string;
  /** Wordmark, monochrome black */
  wordmarkBlackSvg?: string;
  /** Full lockup incl. "-a part of klanghaus" — footer / endorsed-brand use */
  lockupFullSvg?: string;
  /** Full lockup for dark backgrounds */
  lockupFullWhiteSvg?: string;
  /** Full lockup, monochrome black */
  lockupFullBlackSvg?: string;
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
  // SVG: viewBox dimensions (aspect ratio), not pixel size
  iconSvg: { width: 1280, height: 1280 },
  iconInvertedSvg: { width: 1280, height: 1280 },
  wordmarkSvg: { width: 1256.45, height: 268.2 },
  wordmarkWhiteSvg: { width: 1256.45, height: 268.2 },
  wordmarkBlackSvg: { width: 1256.45, height: 268.2 },
  lockupFullSvg: { width: 1280, height: 488.63 },
  lockupFullWhiteSvg: { width: 1280, height: 488.63 },
  lockupFullBlackSvg: { width: 1280, height: 488.63 },
} as const;

/**
 * Default branding — the OFFICIAL grundtone identity (source: KlangHaus/public,
 * "Grundtone logo/"): gold "g" mark on navy #1b1a2e, navy/coral #e94560 blocks,
 * gold #c4a359. grundtone is an endorsed brand — the full lockup carries
 * "-a part of klanghaus". Paths are relative to `@grundtone/core/assets/`.
 */
export const defaultBranding: BrandingConfig = {
  name: 'Grundtone',
  tagline: 'A cross-platform design system — a part of klanghaus',
  logos: {
    primary: '@grundtone/core/assets/logo.png',
    favicon32: '@grundtone/core/assets/logo-32x32.png',
    favicon16: '@grundtone/core/assets/logo-16x16.png',
    appleTouchIcon: '@grundtone/core/assets/logo-180x180.png',
    pwa192: '@grundtone/core/assets/logo-192x192.png',
    pwa512: '@grundtone/core/assets/logo-512x512.png',
    iconSvg: '@grundtone/core/assets/logo.svg',
    iconInvertedSvg: '@grundtone/core/assets/logo-inverted.svg',
    wordmarkSvg: '@grundtone/core/assets/wordmark.svg',
    wordmarkWhiteSvg: '@grundtone/core/assets/wordmark-white.svg',
    wordmarkBlackSvg: '@grundtone/core/assets/wordmark-black.svg',
    lockupFullSvg: '@grundtone/core/assets/lockup-full.svg',
    lockupFullWhiteSvg: '@grundtone/core/assets/lockup-full-white.svg',
    lockupFullBlackSvg: '@grundtone/core/assets/lockup-full-black.svg',
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
