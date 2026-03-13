import { useMemo, useCallback } from 'react';
import type { UseFieldReturn } from './useField';

export interface UseFormValidationReturn {
  isValid: boolean;
  validateAll: () => boolean;
  resetAll: () => void;
}

/**
 * Aggregates multiple useField instances for form-level validation.
 *
 * @example
 * const nameField = useField({ validators: [required()] });
 * const emailField = useField({ validators: [required(), email()] });
 *
 * const form = useFormValidation({ name: nameField, email: emailField });
 *
 * function onSubmit() {
 *   if (!form.validateAll()) return;
 *   // all fields valid
 * }
 */
export function useFormValidation(
  fields: Record<string, UseFieldReturn>,
): UseFormValidationReturn {
  const fieldValues = Object.values(fields);

  const isValid = useMemo(
    () => fieldValues.every(f => f.isValid),
    [fieldValues],
  );

  const validateAll = useCallback((): boolean => {
    let allValid = true;
    for (const field of Object.values(fields)) {
      const result = field.validate();
      if (!result.isValid) allValid = false;
    }
    return allValid;
  }, [fields]);

  const resetAll = useCallback(() => {
    for (const field of Object.values(fields)) {
      field.reset();
    }
  }, [fields]);

  return { isValid, validateAll, resetAll };
}
