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
  /** Accessible label for the alert region */
  ariaLabel?: string;
}
