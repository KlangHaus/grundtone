import { describe, it, expect } from 'vitest';
import {
  required,
  email,
  phone,
  cpr,
  cvr,
  minLength,
  maxLength,
  pattern,
  url,
  composeValidators,
} from './validators';

describe('required', () => {
  const v = required();

  it('fails on empty string', () => {
    expect(v('')).toEqual({
      isValid: false,
      message: 'This field is required',
    });
  });

  it('passes on non-empty', () => {
    expect(v('hello')).toEqual({ isValid: true });
  });

  it('uses custom message', () => {
    const v2 = required('Påkrævet');
    expect(v2('')).toEqual({ isValid: false, message: 'Påkrævet' });
  });
});

describe('email', () => {
  const v = email();

  it('passes on valid email', () => {
    expect(v('test@example.com').isValid).toBe(true);
  });

  it('fails on invalid email', () => {
    expect(v('invalid').isValid).toBe(false);
  });

  it('passes on empty (optional)', () => {
    expect(v('').isValid).toBe(true);
  });
});

describe('phone', () => {
  const v = phone();

  it('passes on 8-digit number', () => {
    expect(v('12345678').isValid).toBe(true);
  });

  it('fails on short number', () => {
    expect(v('1234').isValid).toBe(false);
  });

  it('passes on empty', () => {
    expect(v('').isValid).toBe(true);
  });
});

describe('cpr', () => {
  const v = cpr();

  it('fails on garbage', () => {
    expect(v('abc').isValid).toBe(false);
  });

  it('passes on empty', () => {
    expect(v('').isValid).toBe(true);
  });
});

describe('cvr', () => {
  const v = cvr();

  it('passes on valid CVR', () => {
    expect(v('28980671').isValid).toBe(true);
  });

  it('fails on invalid CVR', () => {
    expect(v('12345678').isValid).toBe(false);
  });

  it('passes on empty', () => {
    expect(v('').isValid).toBe(true);
  });
});

describe('minLength', () => {
  const v = minLength(3);

  it('passes at min length', () => {
    expect(v('abc').isValid).toBe(true);
  });

  it('fails below min', () => {
    expect(v('ab').isValid).toBe(false);
  });
});

describe('maxLength', () => {
  const v = maxLength(5);

  it('passes at max length', () => {
    expect(v('abcde').isValid).toBe(true);
  });

  it('fails above max', () => {
    expect(v('abcdef').isValid).toBe(false);
  });
});

describe('pattern', () => {
  const v = pattern(/^\d+$/);

  it('passes on matching', () => {
    expect(v('123').isValid).toBe(true);
  });

  it('fails on non-matching', () => {
    expect(v('abc').isValid).toBe(false);
  });

  it('passes on empty', () => {
    expect(v('').isValid).toBe(true);
  });
});

describe('url', () => {
  const v = url();

  it('passes on valid URL', () => {
    expect(v('https://example.com').isValid).toBe(true);
  });

  it('fails on invalid URL', () => {
    expect(v('not-a-url').isValid).toBe(false);
  });

  it('passes on empty', () => {
    expect(v('').isValid).toBe(true);
  });
});

describe('composeValidators', () => {
  it('returns first failure', () => {
    const v = composeValidators(required(), email());
    const result = v('');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('This field is required');
  });

  it('runs second validator if first passes', () => {
    const v = composeValidators(required(), email());
    const result = v('notanemail');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Invalid email address');
  });

  it('returns valid if all pass', () => {
    const v = composeValidators(required(), email());
    expect(v('test@example.com')).toEqual({ isValid: true });
  });
});
