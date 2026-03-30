<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import { GTIcon } from '../Icon';
  import type { PasswordInputProps } from './types';

  const props = withDefaults(defineProps<PasswordInputProps>(), {
    modelValue: '',
    size: 'md',
    required: false,
    disabled: false,
    autocomplete: 'current-password',
    showLabel: 'Vis',
    hideLabel: 'Skjul',
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const p = computed(() => getClassPrefix());
  const inputBase = computed(() => `${p.value}-input`);
  const base = computed(() => `${p.value}-password-input`);
  const inputId = computed(() => props.id ?? generateId('password'));
  const descId = computed(() =>
    props.errorText || props.helpText ? `${inputId.value}-desc` : undefined,
  );

  const showPassword = ref(false);

  function handleInput(e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).value);
  }

  function toggleVisibility() {
    showPassword.value = !showPassword.value;
  }
</script>

<template>
  <div :class="`${inputBase}-field`">
    <label v-if="label" :for="inputId" :class="`${inputBase}-label`">
      {{ label }}
    </label>

    <p v-if="helpText && !errorText" :id="descId" :class="`${inputBase}-hint`">
      {{ helpText }}
    </p>
    <p v-if="errorText" :id="descId" :class="`${inputBase}-error`" role="alert">
      {{ errorText }}
    </p>

    <div :class="base">
      <input
        :id="inputId"
        :type="showPassword ? 'text' : 'password'"
        :class="[
          inputBase,
          `${inputBase}--${size}`,
          { [`${inputBase}--error`]: !!errorText },
        ]"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :name="name"
        :autocomplete="autocomplete"
        spellcheck="false"
        autocapitalize="off"
        :aria-invalid="!!errorText"
        :aria-describedby="descId"
        :aria-required="required"
        @input="handleInput"
      />
      <button
        type="button"
        :class="`${base}__toggle`"
        :aria-label="showPassword ? hideLabel : showLabel"
        @click="toggleVisibility"
      >
        <GTIcon :name="showPassword ? 'eye-off' : 'eye'" size="sm" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-password-input {
    position: relative;

    &__toggle {
      position: absolute;
      right: 1px;
      top: 1px;
      bottom: 1px;
      display: flex;
      align-items: center;
      padding: 0 tokens.space('sm');
      background: tokens.color('background');
      border: none;
      border-left: 1px solid tokens.color('border-medium');
      border-radius: 0 tokens.radius('md') tokens.radius('md') 0;
      color: tokens.color('text-secondary');
      font-size: tokens.font-size('xs');
      font-weight: tokens.font-weight('medium');
      cursor: pointer;
      transition: color tokens.duration('fast') tokens.ease('ease');

      &:hover {
        color: tokens.color('text');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: -2px;
      }
    }

    .#{$prefix}-input {
      padding-right: 4rem;
    }
  }
</style>
