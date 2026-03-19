import type {
  DawaType,
  DawaResult,
} from '../../composables/useDawaAutocomplete';

export type { DawaType, DawaResult };

export type AddressInputSize = 'sm' | 'md' | 'lg';

export interface AddressInputProps {
  /** Bound value (v-model) — the text in the input */
  modelValue?: string;
  /** DAWA address type to search for */
  type?: DawaType;
  /** Size preset */
  size?: AddressInputSize;
  /** Visible label */
  label?: string;
  /** Help text */
  helpText?: string;
  /** Error message */
  errorText?: string;
  /** Placeholder */
  placeholder?: string;
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Minimum characters before searching */
  minChars?: number;
  /** Debounce delay in ms */
  debounce?: number;
}
