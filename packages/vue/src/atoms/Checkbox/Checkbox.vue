<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { CheckboxProps } from './types';

  const props = withDefaults(defineProps<CheckboxProps>(), {
    modelValue: false,
    disabled: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-choice`);
  const inputId = computed(() => props.id ?? generateId('checkbox'));

  function handleChange() {
    if (props.disabled) return;
    emit('update:modelValue', !props.modelValue);
  }
</script>

<template>
  <label
    :class="[
      base,
      `${base}--checkbox`,
      { [`${base}--checked`]: modelValue, [`${base}--disabled`]: disabled },
    ]"
    :for="inputId"
  >
    <input
      :id="inputId"
      :class="`${base}__input`"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :name="name"
      @change="handleChange"
    />
    <span :class="`${base}__indicator`" aria-hidden="true" />
    <span v-if="label || helpText" :class="`${base}__body`">
      <span v-if="label" :class="`${base}__label`">{{ label }}</span>
      <span v-if="helpText" :class="`${base}__hint`">{{ helpText }}</span>
    </span>
  </label>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-choice {
    display: flex;
    align-items: flex-start;
    gap: tokens.space('sm');
    cursor: pointer;

    &__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    &__indicator {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      margin-top: 0.125rem;
      border: 2px solid tokens.color('border-medium');
      background: tokens.color('background');
      transition:
        border-color tokens.duration('fast') tokens.ease('ease'),
        background-color tokens.duration('fast') tokens.ease('ease');
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: tokens.space('xs');
    }

    &__label {
      font-size: tokens.font-size('base');
      color: tokens.color('text');
      line-height: tokens.line-height('normal');
    }

    &__hint {
      font-size: tokens.font-size('sm');
      color: tokens.color('text-secondary');
      margin: 0;
    }

    &__content {
      display: none;
      padding-top: tokens.space('xs');
    }

    &--radio .#{$prefix}-choice__indicator {
      border-radius: tokens.radius('full');

      &::after {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: tokens.radius('full');
        background: transparent;
        transition: background-color tokens.duration('fast') tokens.ease('ease');
      }
    }

    &--checkbox .#{$prefix}-choice__indicator {
      border-radius: tokens.radius('sm');

      &::after {
        content: '';
        width: 0.625rem;
        height: 0.375rem;
        border-left: 2px solid transparent;
        border-bottom: 2px solid transparent;
        transform: rotate(-45deg) translateY(-0.0625rem);
        transition: border-color tokens.duration('fast') tokens.ease('ease');
      }
    }

    &--checked .#{$prefix}-choice__indicator {
      border-color: tokens.color('primary');
      background: tokens.color('primary');
    }

    &--checked.#{$prefix}-choice--radio .#{$prefix}-choice__indicator::after {
      background: tokens.color('background');
    }

    &--checked.#{$prefix}-choice--checkbox
      .#{$prefix}-choice__indicator::after {
      border-left-color: tokens.color('background');
      border-bottom-color: tokens.color('background');
    }

    &--checked .#{$prefix}-choice__content {
      display: block;
    }

    &__input:focus-visible + .#{$prefix}-choice__indicator {
      outline: 2px solid tokens.color('focus-ring');
      outline-offset: 2px;
    }

    &--error .#{$prefix}-choice__indicator {
      border-color: tokens.color('error');
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;

      .#{$prefix}-choice__indicator {
        background: tokens.color('surface-alt');
      }
    }
  }
</style>
