/**
 * Breakpoint widths (px) for responsive design.
 * Aligns with @grundtone/design-tokens SCSS $grid-breakpoints.
 * Use for JS/TS logic (e.g. matchMedia, resize observers, conditional rendering).
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Media query strings for common breakpoints (min-width).
 * Use with window.matchMedia() or in JS-driven responsive logic.
 */
export const MEDIA_QUERIES = {
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `(min-width: ${BREAKPOINTS['2xl']}px)`,
} as const;

/**
 * Media query strings for max-width (breakpoint and down).
 */
export const MEDIA_QUERIES_MAX = {
  xs: '(max-width: 639.98px)',
  sm: '(max-width: 767.98px)',
  md: '(max-width: 1023.98px)',
  lg: '(max-width: 1279.98px)',
  xl: '(max-width: 1535.98px)',
} as const;
