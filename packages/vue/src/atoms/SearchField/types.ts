export interface SearchSuggestion {
  /** Value submitted when selected */
  value: string;
  /** Display label */
  label: string;
}

export interface SearchFieldProps {
  /** Search query (v-model) */
  modelValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Accessible label (visually hidden) */
  label?: string;
  /** Submit button label */
  buttonLabel?: string;
  /** Size preset */
  size?: 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** HTML id */
  id?: string;
  /** Autocomplete suggestions (optional) */
  suggestions?: SearchSuggestion[];
  /** Loading state for suggestions */
  loading?: boolean;
  /** Minimum characters before showing suggestions */
  minChars?: number;
  /** Text when no suggestions match */
  noResultsText?: string;
}
