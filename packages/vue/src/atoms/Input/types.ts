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
export type InputWidth = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
export type InputCharWidth = 4 | 8 | 11 | 27;

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
  /** Help text displayed between label and input (designsystem.dk guideline) */
  helpText?: string;
  /** Error message displayed between label and input (replaces helpText when present) */
  errorText?: string;
  /** Disabled state — consider omitting the field entirely (a11y recommendation) */
  disabled?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Required field — adds text indicator and aria-required */
  required?: boolean;
  /**
   * Label suffix for optional fields. Shown when required=false and optionalLabel is set.
   * Use when most fields are required and a few are optional.
   * @example "(valgfrit)"
   */
  optionalLabel?: string;
  /** Full-width input */
  block?: boolean;
  /** Fixed width preset (rem-based) */
  width?: InputWidth;
  /** Fixed width by character count */
  charWidth?: InputCharWidth;
  /** HTML name attribute */
  name?: string;
  /** HTML id (auto-generated if not provided) */
  id?: string;
  /** Autocomplete attribute — recommended for a11y (WCAG 2.1 SC 1.3.5) */
  autocomplete?: string;
  /** Maximum character length */
  maxlength?: number;
  /** Prefix text (e.g. "kr.") — aria-hidden, so also describe in label or helpText */
  prefix?: string;
  /** Suffix text (e.g. "kg") — aria-hidden, so also describe in label or helpText */
  suffix?: string;
}
