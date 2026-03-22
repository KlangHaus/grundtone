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
  isValidDate,
  isDateInPast,
  isDateInFuture,
  isStrongPassword,
  getPasswordStrength,
  isValidOtp,
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

export function date(message = 'Invalid date'): Validator {
  return value => {
    if (value === '') return ok;
    const [day, month, year] = value.split('-');
    return isValidDate(day, month, year) ? ok : fail(message);
  };
}

export function datePast(message = 'Date must be in the past'): Validator {
  return value => {
    if (value === '') return ok;
    const [day, month, year] = value.split('-');
    if (!isValidDate(day, month, year)) return fail(message);
    return isDateInPast(day, month, year) ? ok : fail(message);
  };
}

export function dateFuture(message = 'Date must be in the future'): Validator {
  return value => {
    if (value === '') return ok;
    const [day, month, year] = value.split('-');
    if (!isValidDate(day, month, year)) return fail(message);
    return isDateInFuture(day, month, year) ? ok : fail(message);
  };
}

export function password(
  minLength = 8,
  message = 'Password must contain letters and numbers',
): Validator {
  return value => {
    if (value === '') return ok;
    return isStrongPassword(value, minLength) ? ok : fail(message);
  };
}

export function passwordStrength(
  level: 'fair' | 'strong' = 'fair',
  message = 'Password is too weak',
): Validator {
  return value => {
    if (value === '') return ok;
    const strength = getPasswordStrength(value);
    const levels = { weak: 0, fair: 1, strong: 2 };
    return levels[strength] >= levels[level] ? ok : fail(message);
  };
}

export function otp(length = 6, message = 'Invalid code'): Validator {
  return value => {
    if (value === '') return ok;
    return isValidOtp(value, length) ? ok : fail(message);
  };
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
