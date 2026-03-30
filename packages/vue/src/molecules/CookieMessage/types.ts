export interface CookieMessageProps {
  /** Optional heading above the message body */
  heading?: string;
  /** Icon name from the icon registry (renders GTIcon) */
  icon?: string;
  /** Label for the accept button */
  acceptLabel?: string;
  /** Label for the reject button (hidden when omitted) */
  rejectLabel?: string;
  /** Label for the settings button (hidden when omitted) */
  settingsLabel?: string;
  /** Keep the bar fixed and visible while scrolling (default: true) */
  persistent?: boolean;
  /** Accessible label for the cookie message region */
  ariaLabel?: string;
}
