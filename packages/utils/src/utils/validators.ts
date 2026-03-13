import type { Validator } from '../types';
import {
  isRequired,
  isValidEmail,
  isValidPhoneNumber,
  isValidCPR,
  isValidCVR,
  isMinLength,
  isMaxLength,
  isValidURL,
  isPattern,
} from './validation';

const ok = { isValid: true };
const fail = (message: string) => ({ isValid: false, message });

export function required(message = 'This field is required'): Validator {
  return value => (isRequired(value) ? ok : fail(message));
}

export function email(message = 'Invalid email address'): Validator {
  return value => (value === '' || isValidEmail(value) ? ok : fail(message));
}

export function phone(message = 'Invalid phone number'): Validator {
  return value =>
    value === '' || isValidPhoneNumber(value) ? ok : fail(message);
}

export function cpr(message = 'Invalid CPR number'): Validator {
  return value => (value === '' || isValidCPR(value) ? ok : fail(message));
}

export function cvr(message = 'Invalid CVR number'): Validator {
  return value => (value === '' || isValidCVR(value) ? ok : fail(message));
}

export function minLength(
  min: number,
  message = `Must be at least ${min} characters`,
): Validator {
  return value => (isMinLength(value, min) ? ok : fail(message));
}

export function maxLength(
  max: number,
  message = `Must be at most ${max} characters`,
): Validator {
  return value => (isMaxLength(value, max) ? ok : fail(message));
}

export function pattern(regex: RegExp, message = 'Invalid format'): Validator {
  return value =>
    value === '' || isPattern(value, regex) ? ok : fail(message);
}

export function url(message = 'Invalid URL'): Validator {
  return value => (value === '' || isValidURL(value) ? ok : fail(message));
}

/**
 * Composes multiple validators into a single validator.
 * Returns the first failing result, or a passing result if all pass.
 */
export function composeValidators(...validators: Validator[]): Validator {
  return value => {
    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) return result;
    }
    return ok;
  };
}
