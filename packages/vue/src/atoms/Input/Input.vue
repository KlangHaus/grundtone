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
    width: undefined,
    charWidth: undefined,
    prefix: undefined,
    suffix: undefined,
    optionalLabel: undefined,
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

  const hasWrapper = computed(() => !!props.prefix || !!props.suffix);

  const inputWidthClass = computed(() => {
    if (props.charWidth) return `${base.value}-char-${props.charWidth}`;
    if (props.width) return `${base.value}-width-${props.width}`;
    return undefined;
  });

  function handleInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
</script>

<template>
  <div :class="[`${base}-field`, { [`${base}-field--block`]: block }]">
    <!-- Label -->
    <label v-if="label" :for="inputId" :class="`${base}-label`">
      {{ label }}
      <span
        v-if="optionalLabel && !required"
        :class="`${base}-label__optional`"
      >
        {{ optionalLabel }}
      </span>
    </label>

    <!-- Help text: between label and input (designsystem.dk guideline) -->
    <p
      v-if="helpText && !errorText"
      :id="descriptionId"
      :class="`${base}-hint`"
    >
      {{ helpText }}
    </p>

    <!-- Error message: between label and input (designsystem.dk guideline) -->
    <p
      v-if="errorText"
      :id="descriptionId"
      :class="`${base}-error`"
      role="alert"
    >
      {{ errorText }}
    </p>

    <!-- Input with optional prefix/suffix wrapper -->
    <div
      v-if="hasWrapper"
      :class="[
        `${base}-wrapper`,
        { [`${base}-wrapper--prefix`]: prefix },
        { [`${base}-wrapper--suffix`]: suffix },
      ]"
    >
      <div v-if="prefix" :class="`${base}-prefix`" aria-hidden="true">
        {{ prefix }}
      </div>
      <input
        :id="inputId"
        :type="type"
        :class="[
          base,
          `${base}--${size}`,
          inputWidthClass,
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
      <div v-if="suffix" :class="`${base}-suffix`" aria-hidden="true">
        {{ suffix }}
      </div>
    </div>

    <!-- Input without wrapper -->
    <input
      v-else
      :id="inputId"
      :type="type"
      :class="[
        base,
        `${base}--${size}`,
        inputWidthClass,
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

    &__optional {
      font-weight: tokens.font-weight('normal');
      color: tokens.color('text-secondary');
    }
  }

  .#{$prefix}-input-hint {
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('normal');
    color: tokens.color('text-secondary');
    margin: 0;
  }

  .#{$prefix}-input-error {
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('normal');
    color: tokens.color('error');
    font-weight: tokens.font-weight('semibold');
    margin: 0;
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

    // Width presets (rem-based, per designsystem.dk)
    &-width-xxs {
      max-width: 8rem;
    }
    &-width-xs {
      max-width: 16rem;
    }
    &-width-s {
      max-width: 24rem;
    }
    &-width-m {
      max-width: 32rem;
    }
    &-width-l {
      max-width: 40rem;
    }
    &-width-xl {
      max-width: 48rem;
    }

    // Width by character count — includes padding compensation
    &-char-4 {
      max-width: calc(4ch + 2 * #{tokens.space('md')} + 2px);
    }
    &-char-8 {
      max-width: calc(8ch + 2 * #{tokens.space('md')} + 2px);
    }
    &-char-11 {
      max-width: calc(11ch + 2 * #{tokens.space('md')} + 2px);
    }
    &-char-27 {
      max-width: calc(27ch + 2 * #{tokens.space('md')} + 2px);
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

  // Prefix / suffix wrapper
  .#{$prefix}-input-wrapper {
    display: flex;
    align-items: stretch;

    .#{$prefix}-input {
      flex: 1;
      min-width: 0;
    }

    &--prefix .#{$prefix}-input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &--suffix .#{$prefix}-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .#{$prefix}-input-prefix,
  .#{$prefix}-input-suffix {
    display: flex;
    align-items: center;
    padding: tokens.space('sm') tokens.space('md');
    background-color: tokens.color('surface');
    border: 1px solid tokens.color('border-medium');
    color: tokens.color('text-secondary');
    font-size: tokens.font-size('base');
    white-space: nowrap;
  }

  .#{$prefix}-input-prefix {
    border-right: 0;
    border-radius: tokens.radius('md') 0 0 tokens.radius('md');
  }

  .#{$prefix}-input-suffix {
    border-left: 0;
    border-radius: 0 tokens.radius('md') tokens.radius('md') 0;
  }
</style>
