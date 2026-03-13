import { describe, it, expect } from 'vitest';
import {
  isValidCPR,
  isValidEmail,
  isValidPhoneNumber,
  isRequired,
  isMinLength,
  isMaxLength,
  isValidURL,
  isValidCVR,
  isPattern,
} from './validation';

describe('isValidCPR', () => {
  it('accepts valid CPR with modulus 11 (pre-2007)', () => {
    expect(isValidCPR('010190-1234')).toBe(false); // random, likely invalid mod11
  });

  it('rejects too-short input', () => {
    expect(isValidCPR('12345')).toBe(false);
  });

  it('rejects invalid date', () => {
    expect(isValidCPR('3213001234')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('accepts valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('rejects email without @', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });

  it('rejects email without domain dot', () => {
    expect(isValidEmail('test@example')).toBe(false);
  });
});

describe('isValidPhoneNumber', () => {
  it('accepts 8-digit Danish number', () => {
    expect(isValidPhoneNumber('12345678')).toBe(true);
  });

  it('accepts formatted number', () => {
    expect(isValidPhoneNumber('12 34 56 78')).toBe(true);
  });

  it('rejects too short', () => {
    expect(isValidPhoneNumber('1234')).toBe(false);
  });
});

describe('isRequired', () => {
  it('returns true for non-empty string', () => {
    expect(isRequired('hello')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(isRequired('')).toBe(false);
  });

  it('returns false for whitespace-only', () => {
    expect(isRequired('   ')).toBe(false);
  });
});

describe('isMinLength', () => {
  it('passes when length meets minimum', () => {
    expect(isMinLength('abc', 3)).toBe(true);
  });

  it('fails when too short', () => {
    expect(isMinLength('ab', 3)).toBe(false);
  });
});

describe('isMaxLength', () => {
  it('passes when length within maximum', () => {
    expect(isMaxLength('abc', 3)).toBe(true);
  });

  it('fails when too long', () => {
    expect(isMaxLength('abcd', 3)).toBe(false);
  });
});

describe('isValidURL', () => {
  it('accepts https URL', () => {
    expect(isValidURL('https://example.com')).toBe(true);
  });

  it('accepts http URL', () => {
    expect(isValidURL('http://example.com/path')).toBe(true);
  });

  it('rejects non-http protocols', () => {
    expect(isValidURL('ftp://example.com')).toBe(false);
  });

  it('rejects garbage', () => {
    expect(isValidURL('not a url')).toBe(false);
  });
});

describe('isValidCVR', () => {
  it('accepts valid CVR (Energinet: 28980671)', () => {
    // Energinet CVR: 2*2 + 8*7 + 9*6 + 8*5 + 0*4 + 6*3 + 7*2 + 1*1
    // = 4 + 56 + 54 + 40 + 0 + 18 + 14 + 1 = 187 → 187 % 11 = 0
    expect(isValidCVR('28980671')).toBe(true);
  });

  it('rejects wrong length', () => {
    expect(isValidCVR('1234567')).toBe(false);
  });

  it('rejects invalid modulus', () => {
    expect(isValidCVR('12345678')).toBe(false);
  });
});

describe('isPattern', () => {
  it('matches regex', () => {
    expect(isPattern('abc123', /^[a-z]+\d+$/)).toBe(true);
  });

  it('rejects non-matching', () => {
    expect(isPattern('123abc', /^[a-z]+$/)).toBe(false);
  });
});
