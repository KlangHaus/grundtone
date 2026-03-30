export interface ErrorPageProps {
  /** HTTP status code */
  code?: number;
  /** Error title (auto-generated from code if omitted) */
  title?: string;
  /** Error description (auto-generated from code if omitted) */
  description?: string;
  /** Show "Go to home" button */
  showHomeLink?: boolean;
  /** Home link href */
  homeHref?: string;
  /** Home button label */
  homeLabel?: string;
  /** Debug info (URL, status, message, stack) — only render in dev */
  debug?: {
    url?: string;
    statusCode?: number;
    message?: string;
    stack?: string;
  };
}
