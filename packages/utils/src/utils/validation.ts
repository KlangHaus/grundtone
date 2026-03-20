/**
 * Validerer et dansk CPR-nummer
 *
 * CPR numre før 2007: Bruger modulus 11 check
 * CPR numre fra 2007+: Bruger kun formatvalidering (modulus 11 ikke længere anvendt)
 *
 * @param cpr CPR nummer med eller uden bindestreg (format: DDMMYY-XXXX eller DDMMYYXXXX)
 * @returns true hvis gyldig CPR nummer
 */
export const isValidCPR = (cpr: string): boolean => {
  const cleaned = cpr.replace(/\D/g, '');
  if (cleaned.length !== 10) return false;

  // Udtræk fødselsdato og kontrol cifre
  const day = parseInt(cleaned.substring(0, 2));
  const month = parseInt(cleaned.substring(2, 4));
  const year = parseInt(cleaned.substring(4, 6));
  const lastFourDigits = cleaned.substring(6, 10);

  // Grundlæggende dato validering
  if (day < 1 || day > 31 || month < 1 || month > 12) return false;

  // Bestem fuldt årtal baseret på CPR regler
  let fullYear: number;
  const firstControlDigit = parseInt(lastFourDigits.charAt(0));

  if (firstControlDigit <= 3) {
    fullYear = 1900 + year;
  } else if (firstControlDigit === 4 || firstControlDigit === 9) {
    if (year <= 36) {
      fullYear = 2000 + year;
    } else {
      fullYear = 1900 + year;
    }
  } else if (firstControlDigit >= 5 && firstControlDigit <= 8) {
    if (year <= 57) {
      fullYear = 2000 + year;
    } else {
      fullYear = 1800 + year;
    }
  } else {
    return false;
  }

  // For CPR numre udstedt før 2007, anvend modulus 11 check
  if (fullYear < 2007 || (fullYear === 2007 && month === 1 && day === 1)) {
    const weights = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1];
    const sum = cleaned
      .split('')
      .map(Number)
      .reduce((acc, digit, i) => acc + digit * weights[i], 0);

    return sum % 11 === 0;
  }

  // For CPR numre fra 2007+, kun format validering (modulus 11 ikke anvendt)
  return true;
};

/**
 * Validerer en email adresse
 * Uses a simpler regex to avoid ReDoS vulnerability
 */
export const isValidEmail = (email: string): boolean => {
  // Simple validation: one @ symbol, domain with at least one dot
  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const [local, domain] = parts;
  if (!local || !domain) return false;
  if (domain.indexOf('.') === -1) return false;

  // Basic character validation without complex regex
  return /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

/**
 * Validerer et dansk telefonnummer
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 8;
};

/**
 * Checks that a value is non-empty after trimming whitespace.
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Checks that a value meets a minimum length requirement.
 */
export const isMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

/**
 * Checks that a value does not exceed a maximum length.
 */
export const isMaxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

/**
 * Basic URL validation using the URL constructor.
 */
export const isValidURL = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validates a Danish CVR number (8 digits, modulus 11 check).
 */
export const isValidCVR = (cvr: string): boolean => {
  const cleaned = cvr.replace(/\D/g, '');
  if (cleaned.length !== 8) return false;

  const weights = [2, 7, 6, 5, 4, 3, 2, 1];
  const sum = cleaned
    .split('')
    .map(Number)
    .reduce((acc, digit, i) => acc + digit * weights[i], 0);

  return sum % 11 === 0;
};

/**
 * Checks that a value matches a given regular expression.
 */
export const isPattern = (value: string, regex: RegExp): boolean => {
  return regex.test(value);
};

/**
 * Validates a date given as day, month, year strings.
 * Checks that all fields are filled, values are in range,
 * and the date actually exists (e.g. not 31 February).
 */
export const isValidDate = (
  day: string,
  month: string,
  year: string,
): boolean => {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1) return false;

  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
};

/**
 * Checks whether a date is in the past (before today).
 */
export const isDateInPast = (
  day: string,
  month: string,
  year: string,
): boolean => {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Checks whether a date is in the future (after today).
 */
export const isDateInFuture = (
  day: string,
  month: string,
  year: string,
): boolean => {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};
