import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { Validator, ValidationResult } from '@grundtone/utils';
import type { DateInputValue } from '../atoms/DateInput/types';
import type { UseFieldReturn } from './useField';

export interface UseDateFieldOptions {
  validators?: Validator[];
  validateOn?: 'input' | 'blur' | 'submit';
  initialValue?: DateInputValue;
}

export interface UseDateFieldReturn extends UseFieldReturn {
  /** The reactive DateInputValue — bind with v-model on GTDateInput */
  dateValue: Ref<DateInputValue>;
}

const emptyDate: DateInputValue = { day: '', month: '', year: '' };

/**
 * Reactive date field state with validation for use with GTDateInput.
 *
 * Wraps useField semantics but holds a DateInputValue internally.
 * The string `value` is derived as "DD-MM-YYYY" for validator compatibility.
 * Returns UseFieldReturn so it works with useFormValidation.
 *
 * @example
 * import { useDateField } from '@grundtone/vue';
 * import { required, date, datePast } from '@grundtone/vue';
 *
 * const birthDate = useDateField({
 *   validators: [required('Date is required'), date(), datePast()],
 *   validateOn: 'blur',
 * });
 *
 * <GTDateInput
 *   v-model="birthDate.dateValue.value"
 *   :error-text="birthDate.errorText.value"
 *   v-on="birthDate.handlers"
 * />
 */
export function useDateField(
  options: UseDateFieldOptions = {},
): UseDateFieldReturn {
  const {
    validators = [],
    validateOn = 'blur',
    initialValue = { ...emptyDate },
  } = options;

  const dateValue = ref<DateInputValue>({ ...initialValue });
  const touched = ref(false);
  const validationMessage = ref<string | undefined>(undefined);

  // Derived string for validators: "DD-MM-YYYY" or "" if all empty
  const value = computed({
    get: () => {
      const { day, month, year } = dateValue.value;
      if (!day && !month && !year) return '';
      return `${day}-${month}-${year}`;
    },
    set: (v: string) => {
      if (v === '') {
        dateValue.value = { ...emptyDate };
        return;
      }
      const [day = '', month = '', year = ''] = v.split('-');
      dateValue.value = { day, month, year };
    },
  });

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
    dateValue.value = { ...initialValue };
    touched.value = false;
    validationMessage.value = undefined;
  }

  const handlers = {
    'onUpdate:modelValue': (v: string | DateInputValue) => {
      if (typeof v === 'object') {
        dateValue.value = { ...v };
      } else {
        value.value = v;
      }
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
    dateValue,
    value: value as Ref<string>,
    errorText,
    touched,
    isValid,
    validate,
    reset,
    handlers: handlers as UseFieldReturn['handlers'],
  };
}
