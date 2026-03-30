export interface DatePickerProps {
  value?: string; // ISO YYYY-MM-DD
  label?: string;
  helpText?: string;
  errorText?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  locale?: string;
  onValueChange?: (iso: string) => void;
}
