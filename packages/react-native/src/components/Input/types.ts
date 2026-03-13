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
  /** Help text displayed between label and input */
  helpText?: string;
  /** Error message displayed between label and input (replaces helpText) */
  errorText?: string;
  /** Disabled state — consider omitting the field instead */
  disabled?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Required field — adds aria indicator */
  required?: boolean;
  /**
   * Label suffix for optional fields. Shown when required=false and optionalLabel is set.
   * @example "(valgfrit)"
   */
  optionalLabel?: string;
  /** Full-width input */
  block?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Prefix text (e.g. "kr.") — decorative, also describe in label or helpText */
  prefix?: string;
  /** Suffix text (e.g. "kg") — decorative, also describe in label or helpText */
  suffix?: string;
  /** Accessibility label (falls back to label prop) */
  accessibilityLabel?: string;
}
