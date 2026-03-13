export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export type Validator = (value: string) => ValidationResult;

export type Currency = 'DKK' | 'EUR' | 'USD';
export type DateFormat = 'short' | 'medium' | 'long';
