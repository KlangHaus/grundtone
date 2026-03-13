import type { ReactNode } from 'react';

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
  /** Border radius override using design-system radius tokens */
  rounded?: ButtonRadius;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state — disables button and shows spinner */
  loading?: boolean;
  /** Full-width button */
  block?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Accessible label (defaults to children text if string) */
  accessibilityLabel?: string;
  /** Button content */
  children: ReactNode;
}
