export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  options: RadioOption[];
  label?: string;
  helpText?: string;
  errorText?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  accessibilityLabel?: string;
}
