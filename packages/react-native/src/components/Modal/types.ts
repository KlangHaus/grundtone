import type { ReactNode } from 'react';

export type ModalTransition = 'fade' | 'slide-up' | 'none';

export interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Dialog title (required for accessibility) */
  title: string;
  /** Persistent modal — only closeable via action buttons */
  persistent?: boolean;
  /** Enter/exit animation */
  transition?: ModalTransition;
  /** Called when the modal requests to close */
  onClose?: () => void;
  /** Accessible label override */
  accessibilityLabel?: string;
  /** Body content */
  children?: ReactNode;
  /** Footer content (action buttons) */
  footer?: ReactNode;
}
