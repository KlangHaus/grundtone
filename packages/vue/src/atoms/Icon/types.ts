export interface IconProps {
  /**
   * Size of the icon in pixels
   * @default 16
   */
  size?: number;

  /**
   * Whether the icon should be hidden from screen readers
   * @default true
   */
  ariaHidden?: boolean;

  /**
   * Accessible label for the icon
   * Only used when ariaHidden is false
   */
  ariaLabel?: string;
}

/**
 * Icon registry for custom icons
 */
export type IconRegistry = Record<string, any>;
