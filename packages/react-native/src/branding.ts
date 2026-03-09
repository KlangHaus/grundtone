/**
 * React Native branding helpers.
 *
 * Re-exports core branding types and provides RN-specific image source helpers.
 *
 * @example
 * import { getLogoSource } from '@grundtone/react-native';
 * <Image source={getLogoSource()} style={{ width: 120, height: 120 }} />
 */

import type { ImageSourcePropType } from 'react-native';
import type { BrandingConfig } from '@grundtone/core';
import { defaultBranding } from '@grundtone/core';

export type { BrandingConfig, LogoVariants } from '@grundtone/core';
export {
  defaultBranding,
  createBranding,
  LOGO_VARIANT_SIZES,
} from '@grundtone/core';

/** Default logo as an RN ImageSourcePropType (requires bundler `require`). */
/**
 * Static require for Metro bundler — resolves via @grundtone/core/assets/*.
 * In a real RN app, the consumer's Metro config must resolve this package path.
 * Falls back to a URI-based source if the static require is not available.
 */
export const defaultLogoSource: ImageSourcePropType = {
  uri: defaultBranding.logos.primary,
};

/**
 * Get an RN ImageSourcePropType for the primary logo.
 *
 * When using the default branding, returns a static `require()`.
 * When using custom branding, returns a URI-based source.
 */
export function getLogoSource(branding?: BrandingConfig): ImageSourcePropType {
  if (!branding || branding.logos.primary === defaultBranding.logos.primary) {
    return defaultLogoSource;
  }
  return { uri: branding.logos.primary };
}
