export interface SearchFieldProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  onSubmit?: (query: string) => void;
  accessibilityLabel?: string;
}
