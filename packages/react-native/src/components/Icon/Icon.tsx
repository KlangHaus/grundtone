import React from 'react';
import { SvgXml } from 'react-native-svg';
import { getIconColor } from '@grundtone/core';
import { iconRegistry } from '@grundtone/icons';
import type { IconName } from '@grundtone/icons';
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
 * GTIcon — renders an SVG icon from the @grundtone/core icon registry.
 *
 * Requires `react-native-svg` as a peer dependency.
 *
 * @example
 * <GTIcon name="check" />
 * <GTIcon name="search" size="xl" color="#ff0000" />
 * <GTIcon name="close" size="sm" label="Close dialog" />
 */
export function GTIcon({ name, size = 'lg', label, color }: IconProps) {
  const icon = iconRegistry[name as IconName];

  if (!icon) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[GTIcon] Icon "${name}" not found in registry.`);
    }
    return null;
  }

  const px = ICON_SIZES[size];
  const resolvedColor = color ?? getIconColor();

  const xml = `<svg viewBox="${icon.viewBox}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${resolvedColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon.body}</svg>`;

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
