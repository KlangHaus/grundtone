export interface CheckboxProps {
  /** Bound value (v-model) */
  modelValue?: boolean;
  /** Label text */
  label?: string;
  /** Help text */
  helpText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** HTML name attribute */
  name?: string;
  /** HTML id (auto-generated if not provided) */
  id?: string;
}
