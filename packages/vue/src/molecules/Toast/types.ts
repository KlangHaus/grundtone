export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  description?: string;
  icon?: string;
  duration: number;
  dismissible: boolean;
  closeLabel?: string;
}

export interface ToastProps {
  /** Toast variant */
  variant?: ToastVariant;
  /** Main text */
  message: string;
  /** Secondary text */
  description?: string;
  /** Optional icon name (from icon registry) */
  icon?: string;
  /** Auto-dismiss duration in ms (0 = persistent) */
  duration?: number;
  /** Show close button */
  dismissible?: boolean;
  /** Rich color background */
  rich?: boolean;
  /** Stack index (for stacking transforms) */
  index?: number;
  /** Accessible label for the close button */
  closeLabel?: string;
}

export interface ToastContainerProps {
  /** Position on screen */
  position?: ToastPosition;
  /** Max visible toasts before stacking */
  visibleToasts?: number;
  /** Use rich/filled variant colors */
  richColors?: boolean;
  /** Always expanded (no stack effect) */
  expand?: boolean;
  /** Accessible label for every toast's close button, unless a toast sets its own */
  closeLabel?: string;
}

export interface ToastOptions {
  description?: string;
  icon?: string;
  duration?: number;
  dismissible?: boolean;
  /** Accessible label for this toast's close button */
  closeLabel?: string;
}
