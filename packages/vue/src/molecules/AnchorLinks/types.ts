export interface AnchorLinkItem {
  /** Visible link text — should match the destination heading exactly */
  label: string;
  /** Fragment identifier, e.g. "#section-1" */
  href: string;
}

export interface AnchorLinksProps {
  /** List of anchor link items */
  items: AnchorLinkItem[];
  /** Heading text above the links */
  heading?: string;
  /** Accessible label for the nav element */
  ariaLabel?: string;
  /** Highlight the currently visible section (requires IntersectionObserver) */
  activeHighlight?: boolean;
}
