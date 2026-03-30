export interface DatePickerProps {
  /** Selected date in ISO format YYYY-MM-DD (v-model) */
  modelValue?: string;
  /** Visible label */
  label?: string;
  /** Help text */
  helpText?: string;
  /** Error message */
  errorText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Display format for the selected date */
  format?: string;
  /** Earliest selectable date (ISO) */
  min?: string;
  /** Latest selectable date (ISO) */
  max?: string;
  /** Calendar opens showing this month (ISO) */
  initialDate?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Locale for month/weekday names */
  locale?: string;
  /** HTML id */
  id?: string;
}
