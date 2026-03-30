export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Greyed out and not selectable */
  disabled?: boolean;
}

export interface SelectOptionGroup {
  /** Group label */
  label: string;
  /** Options within the group */
  options: SelectOption[];
}

export interface SelectProps {
  /** Bound value (v-model) */
  modelValue?: string;
  /** Options — flat or grouped */
  options: (SelectOption | SelectOptionGroup)[];
  /** Size preset — matches GTInput sizes */
  size?: SelectSize;
  /** Placeholder text (shown as disabled first option) */
  placeholder?: string;
  /** Visible label above select */
  label?: string;
  /** Help text below label */
  helpText?: string;
  /** Error message (replaces helpText when present) */
  errorText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Label suffix for optional fields */
  optionalLabel?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id (auto-generated if not provided) */
  id?: string;
}
