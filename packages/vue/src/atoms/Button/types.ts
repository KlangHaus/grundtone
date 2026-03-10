export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'negative'
  | 'unstyled';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Border radius using design-system radius tokens */
  rounded?: ButtonRadius;
  /** Render as a different HTML element (e.g. 'a' for links) */
  as?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state — disables button and shows spinner */
  loading?: boolean;
  /** Full-width button */
  block?: boolean;
}
