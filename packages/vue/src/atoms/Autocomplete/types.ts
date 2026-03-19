export type AutocompleteSize = 'sm' | 'md' | 'lg';

export interface AutocompleteSuggestion {
  /** Unique value / ID */
  value: string;
  /** Primary display text */
  label: string;
  /** Optional secondary text */
  description?: string;
}

export interface AutocompleteProps {
  /** Bound value (v-model) — the text in the input */
  modelValue?: string;
  /** List of suggestions to display */
  suggestions?: AutocompleteSuggestion[];
  /** Size preset — matches GTInput */
  size?: AutocompleteSize;
  /** Placeholder text */
  placeholder?: string;
  /** Visible label above input */
  label?: string;
  /** Help text below label */
  helpText?: string;
  /** Error message */
  errorText?: string;
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show loading spinner in dropdown */
  loading?: boolean;
  /** Minimum characters before showing suggestions */
  minChars?: number;
  /** Text shown when no results match */
  noResultsText?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id */
  id?: string;
}
