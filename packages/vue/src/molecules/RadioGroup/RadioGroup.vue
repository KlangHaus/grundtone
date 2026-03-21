<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { RadioGroupProps } from './types';

  const props = withDefaults(defineProps<RadioGroupProps>(), {
    modelValue: undefined,
    name: undefined,
    label: undefined,
    helpText: undefined,
    errorText: undefined,
    required: false,
    disabled: false,
    id: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const pr = computed(() => getClassPrefix());
  const group = computed(() => `${pr.value}-choice-group`);
  const choice = computed(() => `${pr.value}-choice`);

  const baseId = computed(() => props.id ?? generateId('radio'));
  const groupName = computed(() => props.name ?? baseId.value);
  const descId = computed(() =>
    props.errorText || props.helpText ? `${baseId.value}-desc` : undefined,
  );

  function handleChange(value: string) {
    if (props.disabled) return;
    emit('update:modelValue', value);
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

    <div :class="`${group}__list`" role="radiogroup">
      <label
        v-for="option in options"
        :key="option.value"
        :class="[
          choice,
          `${choice}--radio`,
          {
            [`${choice}--checked`]: modelValue === option.value,
            [`${choice}--disabled`]: disabled || option.disabled,
            [`${choice}--error`]: !!errorText,
          },
        ]"
        :for="`${baseId}-${option.value}`"
      >
        <input
          :id="`${baseId}-${option.value}`"
          :class="`${choice}__input`"
          type="radio"
          :name="groupName"
          :value="option.value"
          :checked="modelValue === option.value"
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
            v-if="option.content && modelValue === option.value"
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

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-choice-group {
    border: none;
    padding: 0;
    margin: 0;

    &__legend {
      font-size: tokens.font-size('sm');
      font-weight: tokens.font-weight('medium');
      color: tokens.color('text');
      margin-bottom: tokens.space('xs');
    }

    &__hint {
      font-size: tokens.font-size('sm');
      color: tokens.color('text-secondary');
      margin: 0 0 tokens.space('sm');
    }

    &__error {
      font-size: tokens.font-size('sm');
      color: tokens.color('error');
      font-weight: tokens.font-weight('semibold');
      margin: 0 0 tokens.space('sm');
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: tokens.space('sm');
    }
  }
</style>
