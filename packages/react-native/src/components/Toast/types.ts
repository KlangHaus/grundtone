export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  message: string;
  description?: string;
  duration?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
}
