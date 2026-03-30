export type { ToggleSize } from '@grundtone/core';
import type { ToggleSize } from '@grundtone/core';

export interface ToggleProps {
  /** Current value */
  value?: boolean;
  /** Called when toggled */
  onValueChange?: (value: boolean) => void;
  /** Visible label — placed to the left */
  label?: string;
  /** Size preset */
  size?: ToggleSize;
  /** Disabled state */
  disabled?: boolean;
  /** Accessibility label (falls back to label prop) */
  accessibilityLabel?: string;
}
