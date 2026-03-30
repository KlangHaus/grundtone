export interface DateInputValue {
  day: string;
  month: string;
  year: string;
}

export type DateInputSize = 'sm' | 'md' | 'lg';

export interface DateInputProps {
  /** Bound value (v-model) — { day, month, year } */
  modelValue?: DateInputValue;
  /** Size preset — matches GTInput sizes */
  size?: DateInputSize;
  /** Visible label above the date group */
  label?: string;
  /** Help text displayed between label and fields */
  helpText?: string;
  /** Error message displayed between label and fields (replaces helpText) */
  errorText?: string;
  /** Required field — adds aria-required on all inputs */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** HTML id prefix (auto-generated if not provided) */
  id?: string;
  /** Label for the day field */
  dayLabel?: string;
  /** Label for the month field */
  monthLabel?: string;
  /** Label for the year field */
  yearLabel?: string;
  /** Autocomplete prefix — e.g. "bday" produces bday-day, bday-month, bday-year */
  autocomplete?: string;
}
