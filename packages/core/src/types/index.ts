export interface ComponentProps {
  class?: string;
  style?: string | Record<string, string>;
}

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'tertiary';

/** SVG icon definition — the universal contract for icon data. */
export interface IconDefinition {
  /** SVG inner content (paths, circles, etc.) */
  body: string;
  /** SVG viewBox attribute */
  viewBox: string;
  /** Category for grouping (optional, not needed for rendering) */
  category?: string;
}

/** A record mapping icon names to their definitions. */
export type IconRegistry = Record<string, IconDefinition>;
