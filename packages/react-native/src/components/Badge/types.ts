import type { ReactNode } from 'react';

export type BadgeVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size */
  size?: BadgeSize;
  /** Icon name from the icon registry (renders GTIcon) */
  icon?: string;
  /** Show a colored dot indicator before the text */
  dot?: boolean;
  /** Accessible label */
  accessibilityLabel?: string;
  /** Badge text content */
  children: ReactNode;
}
