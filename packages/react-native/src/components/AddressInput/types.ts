import type { DawaType, DawaResult } from '../../hooks/useDawaAutocomplete';

export type { DawaType, DawaResult };

export interface AddressInputProps {
  value?: string;
  type?: DawaType;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minChars?: number;
  debounce?: number;
  onChangeText?: (text: string) => void;
  onSelect?: (result: DawaResult) => void;
  accessibilityLabel?: string;
}
