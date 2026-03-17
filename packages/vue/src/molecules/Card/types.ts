export type CardVariant = 'raised' | 'bordered' | 'flat';

export interface CardProps {
  /** Visual style variant */
  variant?: CardVariant;
  /** Render as navigation card (entire card is clickable) */
  nav?: boolean;
  /** URL for navigation cards (renders as <a>) */
  href?: string;
  /** Opens in new tab (nav cards) */
  external?: boolean;
  /** Horizontal layout (image left, content right) */
  horizontal?: boolean;
  /** Subheading text above the title */
  subheading?: string;
  /** Card title (required) */
  title: string;
  /** Image URL */
  image?: string;
  /** Image alt text (required if image provided) */
  imageAlt?: string;
  /** Image aspect ratio CSS value */
  imageAspect?: string;
  /** Accessible label */
  ariaLabel?: string;
}
