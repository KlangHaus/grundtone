import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { Validator, ValidationResult } from '@grundtone/utils';

export interface UseFieldOptions {
  validators?: Validator[];
  validateOn?: 'input' | 'blur' | 'submit';
  initialValue?: string;
}

export interface UseFieldReturn {
  value: Ref<string>;
  errorText: ComputedRef<string | undefined>;
  touched: Ref<boolean>;
  isValid: ComputedRef<boolean>;
  validate: () => ValidationResult;
  reset: () => void;
  handlers: {
    'onUpdate:modelValue': (v: string) => void;
    onBlur: () => void;
  };
}

/**
 * Reactive field state with validation for use with GTInput.
 *
 * @example
 * import { useField } from '@grundtone/vue';
 * import { required, email } from '@grundtone/utils';
 *
 * const field = useField({
 *   validators: [required(), email()],
 *   validateOn: 'blur',
 * });
 *
 * <GTInput
 *   v-model="field.value.value"
 *   :error-text="field.errorText.value"
 *   v-on="field.handlers"
 * />
 */
export function useField(options: UseFieldOptions = {}): UseFieldReturn {
  const { validators = [], validateOn = 'blur', initialValue = '' } = options;

  const value = ref(initialValue);
  const touched = ref(false);
  const validationMessage = ref<string | undefined>(undefined);

  function validate(): ValidationResult {
    for (const validator of validators) {
      const result = validator(value.value);
      if (!result.isValid) {
        validationMessage.value = result.message;
        return result;
      }
    }
    validationMessage.value = undefined;
    return { isValid: true };
  }

  const errorText = computed(() =>
    touched.value ? validationMessage.value : undefined,
  );

  const isValid = computed(() => validationMessage.value === undefined);

  function reset() {
    value.value = initialValue;
    touched.value = false;
    validationMessage.value = undefined;
  }

  const handlers = {
    'onUpdate:modelValue': (v: string) => {
      value.value = v;
      if (validateOn === 'input') {
        touched.value = true;
        validate();
      }
    },
    onBlur: () => {
      if (validateOn === 'blur') {
        touched.value = true;
        validate();
      }
    },
  };

  return {
    value,
    errorText,
    touched,
    isValid,
    validate,
    reset,
    handlers,
  };
}
