<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { CheckboxGroupProps } from './types';

  const props = withDefaults(defineProps<CheckboxGroupProps>(), {
    modelValue: () => [],
    name: undefined,
    label: undefined,
    helpText: undefined,
    errorText: undefined,
    required: false,
    disabled: false,
    id: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string[]];
  }>();

  const pr = computed(() => getClassPrefix());
  const group = computed(() => `${pr.value}-choice-group`);
  const choice = computed(() => `${pr.value}-choice`);

  const baseId = computed(() => props.id ?? generateId('cbgroup'));
  const descId = computed(() =>
    props.errorText || props.helpText ? `${baseId.value}-desc` : undefined,
  );

  function isChecked(value: string): boolean {
    return props.modelValue.includes(value);
  }

  function handleChange(value: string) {
    if (props.disabled) return;
    const current = [...props.modelValue];
    const index = current.indexOf(value);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(value);
    }
    emit('update:modelValue', current);
  }
</script>

<template>
  <fieldset
    :class="group"
    :aria-describedby="descId"
    :aria-required="required"
    :disabled="disabled"
  >
    <legend v-if="label" :class="`${group}__legend`">{{ label }}</legend>

    <p v-if="helpText && !errorText" :id="descId" :class="`${group}__hint`">
      {{ helpText }}
    </p>
    <p v-if="errorText" :id="descId" :class="`${group}__error`" role="alert">
      {{ errorText }}
    </p>

    <div :class="`${group}__list`">
      <label
        v-for="option in options"
        :key="option.value"
        :class="[
          choice,
          `${choice}--checkbox`,
          {
            [`${choice}--checked`]: isChecked(option.value),
            [`${choice}--disabled`]: disabled || option.disabled,
            [`${choice}--error`]: !!errorText,
          },
        ]"
        :for="`${baseId}-${option.value}`"
      >
        <input
          :id="`${baseId}-${option.value}`"
          :class="`${choice}__input`"
          type="checkbox"
          :name="name ?? baseId"
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="disabled || option.disabled"
          @change="handleChange(option.value)"
        />
        <span :class="`${choice}__indicator`" aria-hidden="true" />
        <span :class="`${choice}__body`">
          <span :class="`${choice}__label`">{{ option.label }}</span>
          <span v-if="option.hint" :class="`${choice}__hint`">{{
            option.hint
          }}</span>
          <div
            v-if="option.content && isChecked(option.value)"
            :class="`${choice}__content`"
            style="display: block"
          >
            <slot :name="`content-${option.value}`" />
          </div>
        </span>
      </label>
    </div>
  </fieldset>
</template>
