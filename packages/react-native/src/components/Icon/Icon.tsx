import React from 'react';
import { SvgXml } from 'react-native-svg';
import { getIconColor } from '@grundtone/core';
import type { IconDefinition } from '@grundtone/core';
import { useIconRegistry } from '../../IconRegistryContext';
import type { IconProps } from './types';

/**
 * Icon sizes in pixels — mirrors the design-system icon-size() tokens.
 * xs: 0.75rem, sm: 1rem, md: 1.25rem, lg: 1.5rem, xl: 2rem, 2xl: 2.5rem
 */
const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
} as const;

/**
 * GTIcon — renders an SVG icon from a provided icon definition or registry.
 *
 * Requires `react-native-svg` as a peer dependency.
 *
 * @example
 * // Direct icon prop
 * <GTIcon icon={{ body: '<path d="M20 6L9 17l-5-5"/>', viewBox: '0 0 24 24' }} />
 *
 * // Name lookup (requires IconRegistryProvider)
 * <GTIcon name="check" />
 * <GTIcon name="search" size="xl" color="#ff0000" />
 */
export function GTIcon({ icon, name, size = 'lg', label, color }: IconProps) {
  const registry = useIconRegistry();

  let resolved: IconDefinition | null = null;

  if (icon) {
    resolved = icon;
  } else if (name && registry) {
    resolved = registry[name] ?? null;
  }

  if (!resolved) {
    if (process.env.NODE_ENV !== 'production') {
      if (name && !registry) {
        // eslint-disable-next-line no-console
        console.warn(
          `[GTIcon] No icon registry provided. Wrap your app in <IconRegistryProvider> or pass the "icon" prop directly.`,
        );
      } else if (name) {
        // eslint-disable-next-line no-console
        console.warn(`[GTIcon] Icon "${name}" not found in registry.`);
      }
    }
    return null;
  }

  const px = ICON_SIZES[size];
  const resolvedColor = color ?? getIconColor();

  const xml = `<svg viewBox="${resolved.viewBox}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${resolvedColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${resolved.body}</svg>`;

  return (
    <SvgXml
      xml={xml}
      width={px}
      height={px}
      accessibilityLabel={label}
      accessibilityRole={label ? 'image' : undefined}
      accessible={!!label}
    />
  );
}
