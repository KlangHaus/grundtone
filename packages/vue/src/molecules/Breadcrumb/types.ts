export interface BreadcrumbItem {
  /** Visible label */
  label: string;
  /** URL for navigation link (omit for current page) */
  href?: string;
  /** Vue Router destination (alternative to href for SPA) */
  to?: string | Record<string, unknown>;
}

export interface BreadcrumbProps {
  /** Breadcrumb items — last item is treated as current page */
  items: BreadcrumbItem[];
  /** Separator character between items */
  separator?: string;
  /** Accessible label for the nav element */
  ariaLabel?: string;
}
