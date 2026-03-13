import { useState, useCallback, useRef } from 'react';
import type { Validator, ValidationResult } from '@grundtone/utils';

export interface UseFieldOptions {
  validators?: Validator[];
  validateOn?: 'input' | 'blur' | 'submit';
  initialValue?: string;
}

export interface UseFieldReturn {
  value: string;
  setValue: (v: string) => void;
  errorText: string | undefined;
  touched: boolean;
  isValid: boolean;
  validate: () => ValidationResult;
  reset: () => void;
  fieldProps: {
    value: string;
    onChangeText: (v: string) => void;
    onBlur: () => void;
  };
}

/**
 * Reactive field state with validation for use with GTInput.
 *
 * @example
 * import { useField } from '@grundtone/react-native';
 * import { required, email } from '@grundtone/utils';
 *
 * const field = useField({
 *   validators: [required(), email()],
 *   validateOn: 'blur',
 * });
 *
 * <GTInput {...field.fieldProps} errorText={field.errorText} />
 */
export function useField(options: UseFieldOptions = {}): UseFieldReturn {
  const { validators = [], validateOn = 'blur', initialValue = '' } = options;

  const [value, setValueState] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [validationMessage, setValidationMessage] = useState<
    string | undefined
  >(undefined);

  // Keep current value in ref for validate() to read synchronously
  const valueRef = useRef(value);

  const runValidation = useCallback(
    (val: string): ValidationResult => {
      for (const validator of validators) {
        const result = validator(val);
        if (!result.isValid) {
          setValidationMessage(result.message);
          return result;
        }
      }
      setValidationMessage(undefined);
      return { isValid: true };
    },
    [validators],
  );

  const validate = useCallback((): ValidationResult => {
    return runValidation(valueRef.current);
  }, [runValidation]);

  const setValue = useCallback(
    (v: string) => {
      setValueState(v);
      valueRef.current = v;
      if (validateOn === 'input') {
        setTouched(true);
        runValidation(v);
      }
    },
    [validateOn, runValidation],
  );

  const onBlur = useCallback(() => {
    if (validateOn === 'blur') {
      setTouched(true);
      runValidation(valueRef.current);
    }
  }, [validateOn, runValidation]);

  const reset = useCallback(() => {
    setValueState(initialValue);
    valueRef.current = initialValue;
    setTouched(false);
    setValidationMessage(undefined);
  }, [initialValue]);

  return {
    value,
    setValue,
    errorText: touched ? validationMessage : undefined,
    touched,
    isValid: validationMessage === undefined,
    validate,
    reset,
    fieldProps: {
      value,
      onChangeText: setValue,
      onBlur,
    },
  };
}
