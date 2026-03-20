<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { DateInputProps } from './types';

  const props = withDefaults(defineProps<DateInputProps>(), {
    size: 'md',
    disabled: false,
    required: false,
    dayLabel: 'Dag',
    monthLabel: 'Måned',
    yearLabel: 'År',
    autocomplete: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: { day: string; month: string; year: string }];
  }>();

  const p = computed(() => getClassPrefix());
  const inputBase = computed(() => `${p.value}-input`);

  const baseId = computed(() => props.id ?? generateId('date'));
  const labelId = computed(() => `${baseId.value}-label`);
  const descriptionId = computed(() =>
    props.errorText || props.helpText ? `${baseId.value}-desc` : undefined,
  );

  const dayRef = ref<HTMLInputElement | null>(null);
  const monthRef = ref<HTMLInputElement | null>(null);
  const yearRef = ref<HTMLInputElement | null>(null);

  const current = computed(
    () => props.modelValue ?? { day: '', month: '', year: '' },
  );

  function filterNumeric(value: string): string {
    return value.replace(/\D/g, '');
  }

  function emitUpdate(
    field: 'day' | 'month' | 'year',
    raw: string,
    maxLen: number,
  ) {
    const value = filterNumeric(raw).slice(0, maxLen);
    emit('update:modelValue', { ...current.value, [field]: value });
    return value;
  }

  function onDayInput(event: Event) {
    const value = emitUpdate(
      'day',
      (event.target as HTMLInputElement).value,
      2,
    );
    if (value.length === 2) monthRef.value?.focus();
  }

  function onMonthInput(event: Event) {
    const value = emitUpdate(
      'month',
      (event.target as HTMLInputElement).value,
      2,
    );
    if (value.length === 2) yearRef.value?.focus();
  }

  function onYearInput(event: Event) {
    emitUpdate('year', (event.target as HTMLInputElement).value, 4);
  }

  const autocompleteDay = computed(() =>
    props.autocomplete ? `${props.autocomplete}-day` : undefined,
  );
  const autocompleteMonth = computed(() =>
    props.autocomplete ? `${props.autocomplete}-month` : undefined,
  );
  const autocompleteYear = computed(() =>
    props.autocomplete ? `${props.autocomplete}-year` : undefined,
  );
</script>

<template>
  <div :class="`${inputBase}-field`">
    <!-- Label -->
    <label v-if="label" :id="labelId" :class="`${inputBase}-label`">
      {{ label }}
    </label>

    <!-- Help text -->
    <p
      v-if="helpText && !errorText"
      :id="descriptionId"
      :class="`${inputBase}-hint`"
    >
      {{ helpText }}
    </p>

    <!-- Error text -->
    <p
      v-if="errorText"
      :id="descriptionId"
      :class="`${inputBase}-error`"
      role="alert"
    >
      {{ errorText }}
    </p>

    <!-- Date input group -->
    <div
      class="date-input"
      role="group"
      :aria-labelledby="label ? labelId : undefined"
      :aria-describedby="descriptionId"
    >
      <!-- Day -->
      <div class="date-input__field">
        <label class="date-input__label" :for="`${baseId}-day`">{{
          dayLabel
        }}</label>
        <input
          :id="`${baseId}-day`"
          ref="dayRef"
          :class="[
            inputBase,
            `${inputBase}--${size}`,
            'date-input__input--day',
            { [`${inputBase}--error`]: !!errorText },
          ]"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="2"
          :value="current.day"
          :disabled="disabled"
          :aria-required="required"
          :aria-invalid="!!errorText"
          :autocomplete="autocompleteDay"
          @input="onDayInput"
        />
      </div>

      <!-- Month -->
      <div class="date-input__field">
        <label class="date-input__label" :for="`${baseId}-month`">{{
          monthLabel
        }}</label>
        <input
          :id="`${baseId}-month`"
          ref="monthRef"
          :class="[
            inputBase,
            `${inputBase}--${size}`,
            'date-input__input--month',
            { [`${inputBase}--error`]: !!errorText },
          ]"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="2"
          :value="current.month"
          :disabled="disabled"
          :aria-required="required"
          :aria-invalid="!!errorText"
          :autocomplete="autocompleteMonth"
          @input="onMonthInput"
        />
      </div>

      <!-- Year -->
      <div class="date-input__field">
        <label class="date-input__label" :for="`${baseId}-year`">{{
          yearLabel
        }}</label>
        <input
          :id="`${baseId}-year`"
          ref="yearRef"
          :class="[
            inputBase,
            `${inputBase}--${size}`,
            'date-input__input--year',
            { [`${inputBase}--error`]: !!errorText },
          ]"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="4"
          :value="current.year"
          :disabled="disabled"
          :aria-required="required"
          :aria-invalid="!!errorText"
          :autocomplete="autocompleteYear"
          @input="onYearInput"
        />
      </div>
    </div>
  </div>
</template>
