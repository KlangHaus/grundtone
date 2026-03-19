export interface AutocompleteSuggestion {
  value: string;
  label: string;
  description?: string;
}

export interface AutocompleteProps {
  value?: string;
  suggestions?: AutocompleteSuggestion[];
  placeholder?: string;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  noResultsText?: string;
  minChars?: number;
  onChangeText?: (text: string) => void;
  onSearch?: (query: string) => void;
  onSelect?: (suggestion: AutocompleteSuggestion) => void;
  accessibilityLabel?: string;
}
