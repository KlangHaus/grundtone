export interface RadioOption {
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

export interface RadioGroupProps {
  /** Selected value (v-model) */
  modelValue?: string;
  /** Available options */
  options: RadioOption[];
  /** HTML name attribute (auto-generated if not provided) */
  name?: string;
  /** Group legend/label */
  label?: string;
  /** Group help text */
  helpText?: string;
  /** Group error message */
  errorText?: string;
  /** Required field */
  required?: boolean;
  /** Disable all options */
  disabled?: boolean;
  /** HTML id prefix */
  id?: string;
}
