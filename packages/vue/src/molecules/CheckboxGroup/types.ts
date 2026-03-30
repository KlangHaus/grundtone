export interface CheckboxOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Help text for this option */
  hint?: string;
  /** Disabled state for this option */
  disabled?: boolean;
  /** Has collapsible content (use slot #content-{value}) */
  content?: boolean;
}

export interface CheckboxGroupProps {
  /** Selected values (v-model) */
  modelValue?: string[];
  /** Available options */
  options: CheckboxOption[];
  /** HTML name attribute (auto-generated if not provided) */
  name?: string;
  /** Group legend/label */
  label?: string;
  /** Group help text */
  helpText?: string;
  /** Group error message */
  errorText?: string;
  /** Required field (at least one must be selected) */
  required?: boolean;
  /** Disable all options */
  disabled?: boolean;
  /** HTML id prefix */
  id?: string;
}
