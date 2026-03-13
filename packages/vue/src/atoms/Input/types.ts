export type InputSize = 'sm' | 'md' | 'lg';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';
export type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface InputProps {
  /** Bound value (v-model) */
  modelValue?: string;
  /** Input type */
  type?: InputType;
  /** Size preset — matches GTButton sizes */
  size?: InputSize;
  /** Border radius override */
  rounded?: InputRadius;
  /** Placeholder text */
  placeholder?: string;
  /** Visible label above input */
  label?: string;
  /** Help text below input */
  helpText?: string;
  /** Error message (replaces helpText when present) */
  errorText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Required field — adds visual indicator and aria-required */
  required?: boolean;
  /** Full-width input */
  block?: boolean;
  /** HTML name attribute */
  name?: string;
  /** HTML id (auto-generated if not provided) */
  id?: string;
  /** Autocomplete attribute */
  autocomplete?: string;
  /** Maximum character length */
  maxlength?: number;
}
