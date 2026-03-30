export interface TextareaProps {
  /** Bound value (v-model) */
  modelValue?: string;
  /** Visible label above textarea */
  label?: string;
  /** Help text between label and textarea */
  helpText?: string;
  /** Error message (replaces helpText) */
  errorText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Number of visible rows */
  rows?: number;
  /** Maximum character count (shows counter) */
  maxChars?: number;
  /** HTML name attribute */
  name?: string;
  /** HTML id (auto-generated if not provided) */
  id?: string;
  /** Full-width textarea */
  block?: boolean;
}
