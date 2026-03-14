export type { ToggleSize } from '@grundtone/core';
import type { ToggleSize } from '@grundtone/core';

export interface ToggleProps {
  /** Bound value (v-model) */
  modelValue?: boolean;
  /** Visible label — placed to the left of the toggle */
  label?: string;
  /** Size preset */
  size?: ToggleSize;
  /** Disabled state */
  disabled?: boolean;
  /** HTML name attribute */
  name?: string;
  /** HTML id (auto-generated if not provided) */
  id?: string;
}
