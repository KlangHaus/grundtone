export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export type Currency = 'DKK' | 'EUR' | 'USD';
export type DateFormat = 'short' | 'medium' | 'long';
