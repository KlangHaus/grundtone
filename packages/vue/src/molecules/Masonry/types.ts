export interface MasonryProps {
  /** Array of items to render in the masonry grid */
  items: unknown[];
  /** Gap between items in pixels */
  gap?: number;
  /** Minimum column width in pixels (columns auto-fill based on container) */
  columnWidth?: number;
  /** Number of columns for SSR (before client-side layout) */
  ssrColumns?: number;
  /** Accessible label for the masonry grid */
  ariaLabel?: string;
}
