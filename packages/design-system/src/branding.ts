/**
 * Web-specific branding helpers.
 *
 * Re-exports core branding types and provides HTML head tag generation
 * for favicons and apple-touch-icon.
 *
 * @example
 * import { brandingHeadTags } from '@grundtone/design-system';
 * // Returns HTML <link> tags for favicon + apple-touch-icon
 * document.head.insertAdjacentHTML('beforeend', brandingHeadTags());
 */

export type { BrandingConfig, LogoVariants } from '@grundtone/core';
export {
  defaultBranding,
  createBranding,
  LOGO_VARIANT_SIZES,
} from '@grundtone/core';

import type { BrandingConfig } from '@grundtone/core';
import { defaultBranding } from '@grundtone/core';

/**
 * Generate HTML `<link>` tags for favicons and apple-touch-icon.
 * Inject into `<head>` or use in SSR / meta frameworks.
 */
export function brandingHeadTags(branding?: BrandingConfig): string {
  const b = branding ?? defaultBranding;
  return [
    `<link rel="icon" type="image/png" sizes="16x16" href="${b.logos.favicon16}">`,
    `<link rel="icon" type="image/png" sizes="32x32" href="${b.logos.favicon32}">`,
    `<link rel="apple-touch-icon" sizes="180x180" href="${b.logos.appleTouchIcon}">`,
  ].join('\n');
}
