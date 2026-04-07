export interface FooterNavItem {
  /** Display label */
  label: string;
  /** Link href */
  href: string;
  /** Open in new tab */
  external?: boolean;
}

export interface FooterProps {
  /** Copyright text (e.g. "© 2026 Company Name") */
  copyright?: string;
  /** Navigation items */
  nav?: FooterNavItem[];
  /** Accessible label */
  ariaLabel?: string;
}
