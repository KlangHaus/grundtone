<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { TextareaProps } from './types';

  const props = withDefaults(defineProps<TextareaProps>(), {
    modelValue: '',
    rows: 4,
    disabled: false,
    readonly: false,
    required: false,
    block: false,
    maxChars: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-input`); // reuse input-field pattern
  const ta = computed(() => `${p.value}-textarea`);

  const textareaId = computed(() => props.id ?? generateId('textarea'));
  const descriptionId = computed(() =>
    props.errorText || props.helpText ? `${textareaId.value}-desc` : undefined,
  );

  const charsRemaining = computed(() => {
    if (!props.maxChars) return null;
    return props.maxChars - (props.modelValue?.length ?? 0);
  });

  const isOverLimit = computed(
    () => charsRemaining.value !== null && charsRemaining.value < 0,
  );

  function handleInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
</script>

<template>
  <div :class="[`${base}-field`, { [`${base}-field--block`]: block }]">
    <!-- Label -->
    <label v-if="label" :for="textareaId" :class="`${base}-label`">
      {{ label }}
    </label>

    <!-- Help text -->
    <p
      v-if="helpText && !errorText"
      :id="descriptionId"
      :class="`${base}-hint`"
    >
      {{ helpText }}
    </p>

    <!-- Error text -->
    <p
      v-if="errorText"
      :id="descriptionId"
      :class="`${base}-error`"
      role="alert"
    >
      {{ errorText }}
    </p>

    <!-- Textarea -->
    <textarea
      :id="textareaId"
      :class="[
        ta,
        {
          [`${ta}--error`]: !!errorText || isOverLimit,
          [`${ta}--disabled`]: disabled,
          [`${ta}--readonly`]: readonly,
        },
      ]"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :name="name"
      :rows="rows"
      :aria-invalid="!!errorText || isOverLimit"
      :aria-describedby="descriptionId"
      :aria-required="required"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />

    <!-- Character count -->
    <p
      v-if="maxChars"
      :class="[`${ta}-count`, { [`${ta}-count--over`]: isOverLimit }]"
      aria-live="polite"
    >
      <template v-if="charsRemaining! >= 0">
        Du har {{ charsRemaining }} tegn tilbage
      </template>
      <template v-else>
        Du har overskredet med {{ Math.abs(charsRemaining!) }} tegn
      </template>
    </p>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-textarea {
    display: block;
    width: 100%;
    border: 1px solid tokens.color('border-medium');
    border-radius: tokens.radius('md');
    background-color: tokens.color('background');
    color: tokens.color('text');
    font-family: tokens.font-family('base');
    font-size: tokens.font-size('base');
    line-height: tokens.line-height('normal');
    padding: tokens.space('sm') tokens.space('md');
    resize: vertical;
    min-height: 6rem;
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

  .#{$prefix}-textarea-count {
    font-size: tokens.font-size('sm');
    color: tokens.color('text-secondary');
    margin-top: tokens.space('xs');

    &--over {
      color: tokens.color('error');
      font-weight: tokens.font-weight('semibold');
    }
  }
</style>
