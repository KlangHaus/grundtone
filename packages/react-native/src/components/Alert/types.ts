import type { ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** Visual and semantic variant */
  variant: AlertVariant;
  /** Optional heading above the message body */
  heading?: string;
  /** Icon name from the icon registry (renders GTIcon) */
  icon?: string;
  /** Show close/dismiss button */
  dismissible?: boolean;
  /** Callback when dismiss is pressed */
  onDismiss?: () => void;
  /** Accessible label for the alert */
  accessibilityLabel?: string;
  /** Alert body content */
  children: ReactNode;
  /** Optional footer content, separated by a line */
  footer?: ReactNode;
}
