export type ModalTransition =
  | 'fade'
  | 'scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-right'
  | 'none';

export interface ModalProps {
  /** Controls visibility (v-model:open) */
  open: boolean;
  /** Dialog title (required for accessibility) */
  title: string;
  /** Persistent modal — only closeable via action buttons */
  persistent?: boolean;
  /** Enter/exit animation */
  transition?: ModalTransition;
  /** Accessible label override (defaults to title) */
  ariaLabel?: string;
}
