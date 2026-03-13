<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { InputProps } from './types';

  const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    size: 'md',
    rounded: undefined,
    disabled: false,
    readonly: false,
    required: false,
    block: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-input`);

  const inputId = computed(() => props.id ?? generateId('input'));
  const descriptionId = computed(() =>
    props.errorText || props.helpText ? `${inputId.value}-desc` : undefined,
  );

  function handleInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
</script>

<template>
  <div :class="[`${base}-field`, { [`${base}-field--block`]: block }]">
    <label v-if="label" :for="inputId" :class="`${base}-label`">
      {{ label }}
      <span
        v-if="required"
        :class="`${base}-label__required`"
        aria-hidden="true"
        >*</span
      >
    </label>

    <input
      :id="inputId"
      :type="type"
      :class="[
        base,
        `${base}--${size}`,
        {
          [`${base}--error`]: !!errorText,
          [`${base}--disabled`]: disabled,
          [`${base}--readonly`]: readonly,
        },
      ]"
      :style="
        rounded ? { borderRadius: `var(--radius-${rounded})` } : undefined
      "
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :name="name"
      :autocomplete="autocomplete"
      :maxlength="maxlength"
      :aria-invalid="!!errorText"
      :aria-describedby="descriptionId"
      :aria-required="required"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />

    <p
      v-if="errorText"
      :id="descriptionId"
      :class="`${base}-error`"
      role="alert"
    >
      {{ errorText }}
    </p>
    <p v-else-if="helpText" :id="descriptionId" :class="`${base}-help`">
      {{ helpText }}
    </p>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-input-field {
    display: flex;
    flex-direction: column;
    gap: tokens.space('xs');

    &--block {
      width: 100%;
    }
  }

  .#{$prefix}-input-label {
    font-size: tokens.font-size('sm');
    font-weight: tokens.font-weight('medium');
    color: tokens.color('text');
    line-height: tokens.line-height('tight');

    &__required {
      color: tokens.color('error');
      margin-left: 0.125em;
    }
  }

  .#{$prefix}-input {
    display: block;
    width: 100%;
    border: 1px solid tokens.color('border-medium');
    border-radius: tokens.radius('md');
    background-color: tokens.color('background');
    color: tokens.color('text');
    font-family: tokens.font-family('base');
    transition:
      border-color tokens.duration('fast') tokens.ease('ease-out'),
      box-shadow tokens.duration('fast') tokens.ease('ease-out');

    &::placeholder {
      color: tokens.color('text-secondary');
      opacity: 0.7;
    }

    &:focus {
      outline: none;
      border-color: tokens.color('primary');
      box-shadow: 0 0 0 3px tokens.color('focus-ring');
    }

    // Sizes
    &--sm {
      font-size: tokens.font-size('sm');
      padding: tokens.space('xs') tokens.space('sm');
    }

    &--md {
      font-size: tokens.font-size('base');
      padding: tokens.space('sm') tokens.space('md');
    }

    &--lg {
      font-size: tokens.font-size('lg');
      padding: tokens.space('md') tokens.space('xl');
    }

    // States
    &--error {
      border-color: tokens.color('error');

      &:focus {
        border-color: tokens.color('error');
        box-shadow: 0 0 0 3px
          color-mix(in srgb, #{tokens.color('error')} 25%, transparent);
      }
    }

    &--disabled,
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: tokens.color('surface-alt');
    }

    &--readonly,
    &:read-only {
      background-color: tokens.color('surface-alt');
      cursor: default;
    }
  }

  .#{$prefix}-input-help {
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('normal');
    color: tokens.color('text-secondary');
  }

  .#{$prefix}-input-error {
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('normal');
    color: tokens.color('error');
    font-weight: tokens.font-weight('semibold');
  }
</style>
