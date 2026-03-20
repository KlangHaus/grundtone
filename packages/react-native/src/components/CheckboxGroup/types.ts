export interface CheckboxOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  value?: string[];
  options: CheckboxOption[];
  label?: string;
  helpText?: string;
  errorText?: string;
  disabled?: boolean;
  onValueChange?: (value: string[]) => void;
  accessibilityLabel?: string;
}
