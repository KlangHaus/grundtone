export interface HeaderNavItem {
  /** Display label */
  label: string;
  /** Link href */
  href: string;
  /** Open in new tab */
  external?: boolean;
}

export interface HeaderProps {
  /** Site logo text */
  logo?: string;
  /** Logo link href */
  logoHref?: string;
  /** Navigation items */
  nav?: HeaderNavItem[];
  /** Transparent mode (for use over hero sections) */
  transparent?: boolean;
  /** Scroll threshold in px before sticky activates */
  scrollThreshold?: number;
  /** Accessible label for nav */
  ariaLabel?: string;
}
