export interface BackToTopProps {
  /** Button label text */
  label?: string;
  /** Scroll threshold in pixels before button appears (default: 2× viewport height) */
  threshold?: number;
  /** Use smooth scroll animation */
  smooth?: boolean;
}
