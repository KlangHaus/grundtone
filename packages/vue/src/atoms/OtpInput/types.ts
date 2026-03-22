export interface OtpInputProps {
  /** Combined OTP value (v-model) */
  modelValue?: string;
  /** Number of digits */
  length?: number;
  /** Visible label */
  label?: string;
  /** Help text */
  helpText?: string;
  /** Error message */
  errorText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** HTML id prefix */
  id?: string;
}
