import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type { UseFieldReturn } from './useField';

export interface UseFormValidationReturn {
  isValid: ComputedRef<boolean>;
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
  const isValid = computed(() =>
    Object.values(fields).every(f => f.isValid.value),
  );

  function validateAll(): boolean {
    let allValid = true;
    for (const field of Object.values(fields)) {
      field.touched.value = true;
      const result = field.validate();
      if (!result.isValid) allValid = false;
    }
    return allValid;
  }

  function resetAll() {
    for (const field of Object.values(fields)) {
      field.reset();
    }
  }

  return { isValid, validateAll, resetAll };
}
