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
  /** Current value */
  value?: string;
  /** Called when text changes */
  onChangeText?: (text: string) => void;
  /** Called on focus */
  onFocus?: () => void;
  /** Called on blur */
  onBlur?: () => void;
  /** Input type — maps to keyboardType and secureTextEntry */
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
  /** Required field — adds visual indicator */
  required?: boolean;
  /** Full-width input */
  block?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Accessibility label (falls back to label prop) */
  accessibilityLabel?: string;
}
