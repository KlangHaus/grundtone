<script setup lang="ts">
  import { computed, ref, nextTick } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { OtpInputProps } from './types';

  const props = withDefaults(defineProps<OtpInputProps>(), {
    modelValue: '',
    length: 6,
    disabled: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const p = computed(() => getClassPrefix());
  const inputBase = computed(() => `${p.value}-input`);
  const base = computed(() => `${p.value}-otp-input`);
  const baseId = computed(() => props.id ?? generateId('otp'));
  const descId = computed(() =>
    props.errorText || props.helpText ? `${baseId.value}-desc` : undefined,
  );

  const fieldRefs = ref<HTMLInputElement[]>([]);

  const digits = computed(() => {
    const arr = props.modelValue.split('');
    return Array.from({ length: props.length }, (_, i) => arr[i] ?? '');
  });

  function setRef(el: unknown, i: number) {
    if (el) fieldRefs.value[i] = el as HTMLInputElement;
  }

  function updateDigit(index: number, value: string) {
    const filtered = value.replace(/\D/g, '').slice(0, 1);
    const arr = [...digits.value];
    arr[index] = filtered;
    emit('update:modelValue', arr.join(''));

    if (filtered && index < props.length - 1) {
      nextTick(() => fieldRefs.value[index + 1]?.focus());
    }
  }

  function handleKeydown(e: Event, index: number) {
    const ke = e as { key?: string };
    if (ke.key === 'Backspace' && !digits.value[index] && index > 0) {
      e.preventDefault();
      const arr = [...digits.value];
      arr[index - 1] = '';
      emit('update:modelValue', arr.join(''));
      nextTick(() => fieldRefs.value[index - 1]?.focus());
    }
  }

  function handlePaste(e: Event) {
    const ce = e as { clipboardData?: { getData: (t: string) => string } };
    e.preventDefault();
    const pasted = (ce.clipboardData?.getData('text') ?? '')
      .replace(/\D/g, '')
      .slice(0, props.length);
    emit('update:modelValue', pasted);
    nextTick(() => {
      const focusIdx = Math.min(pasted.length, props.length - 1);
      fieldRefs.value[focusIdx]?.focus();
    });
  }
</script>

<template>
  <div :class="`${inputBase}-field`">
    <label v-if="label" :class="`${inputBase}-label`">
      {{ label }}
    </label>

    <p v-if="helpText && !errorText" :id="descId" :class="`${inputBase}-hint`">
      {{ helpText }}
    </p>
    <p v-if="errorText" :id="descId" :class="`${inputBase}-error`" role="alert">
      {{ errorText }}
    </p>

    <div
      :class="base"
      role="group"
      :aria-label="label"
      :aria-describedby="descId"
    >
      <input
        v-for="(digit, i) in digits"
        :key="i"
        :ref="el => setRef(el, i)"
        :id="`${baseId}-${i}`"
        :class="[
          `${base}__field`,
          {
            [`${base}__field--filled`]: !!digit,
            [`${base}__field--error`]: !!errorText,
          },
        ]"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="1"
        :value="digit"
        :disabled="disabled"
        autocomplete="one-time-code"
        @input="updateDigit(i, ($event.target as HTMLInputElement).value)"
        @keydown="handleKeydown($event, i)"
        @paste="handlePaste"
      />
    </div>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-otp-input {
    display: flex;
    gap: tokens.space('sm');

    &__field {
      width: 3rem;
      height: 3rem;
      text-align: center;
      font-size: tokens.font-size('xl');
      font-weight: tokens.font-weight('semibold');
      font-family: tokens.font-family('mono');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('md');
      background: tokens.color('background');
      color: tokens.color('text');
      transition:
        border-color tokens.duration('fast') tokens.ease('ease'),
        box-shadow tokens.duration('fast') tokens.ease('ease');

      &:focus {
        outline: none;
        border-color: tokens.color('primary');
        box-shadow: 0 0 0 3px tokens.color('focus-ring');
      }

      &--filled {
        border-color: tokens.color('primary');
        background: color-mix(
          in srgb,
          #{tokens.color('primary')} 4%,
          #{tokens.color('background')}
        );
      }

      &--error {
        border-color: tokens.color('error');

        &:focus {
          border-color: tokens.color('error');
          box-shadow: 0 0 0 3px
            color-mix(in srgb, #{tokens.color('error')} 25%, transparent);
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
</style>
