export interface PasswordInputProps {
  /** Bound value (v-model) */
  modelValue?: string;
  /** Visible label */
  label?: string;
  /** Help text */
  helpText?: string;
  /** Error message */
  errorText?: string;
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Autocomplete hint */
  autocomplete?: 'new-password' | 'current-password';
  /** Show button label */
  showLabel?: string;
  /** Hide button label */
  hideLabel?: string;
  /** HTML name */
  name?: string;
  /** HTML id */
  id?: string;
}
