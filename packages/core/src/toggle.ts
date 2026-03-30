/**
 * Toggle switch dimensions — single source of truth for all platforms.
 * Track width/height and thumb diameter in pixels.
 */
export const TOGGLE_SIZES = {
  sm: { width: 36, height: 20, thumb: 16 },
  md: { width: 44, height: 24, thumb: 20 },
  lg: { width: 52, height: 28, thumb: 24 },
} as const;

export type ToggleSize = keyof typeof TOGGLE_SIZES;
