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
        'textarea',
        {
          'textarea--error': !!errorText || isOverLimit,
          'textarea--disabled': disabled,
          'textarea--readonly': readonly,
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
      :class="['textarea-count', { 'textarea-count--over': isOverLimit }]"
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
