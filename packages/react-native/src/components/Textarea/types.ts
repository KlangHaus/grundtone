export interface TextareaProps {
  value?: string;
  label?: string;
  helpText?: string;
  errorText?: string;
  placeholder?: string;
  disabled?: boolean;
  maxChars?: number;
  numberOfLines?: number;
  onChangeText?: (text: string) => void;
  accessibilityLabel?: string;
}
