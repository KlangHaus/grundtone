export type TagSize = 'sm' | 'md';

export interface TagProps {
  /** Display text */
  label: string;
  /** Value emitted on events */
  value?: string;
  /** Optional icon name */
  icon?: string;
  /** Show dismiss (×) button */
  dismissible?: boolean;
  /** Selected/active state (for filter tags) */
  selected?: boolean;
  /** Size preset */
  size?: TagSize;
  /** Disabled state */
  disabled?: boolean;
}
