export type SpinnerSize = 'sm' | 'lg';
export type SpinnerVariant = 'light' | 'dark';

export interface SpinnerProps {
  /** Size preset */
  size?: SpinnerSize;
  /** Color variant for background contrast */
  variant?: SpinnerVariant;
  /** Optional descriptive loading text */
  text?: string;
  /** Accessible label for screen readers */
  accessibilityLabel?: string;
}
