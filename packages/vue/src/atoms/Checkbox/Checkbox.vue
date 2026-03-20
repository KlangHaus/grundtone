<script setup lang="ts">
  import { computed } from 'vue';
  import { generateId } from '@grundtone/utils';
  import type { CheckboxProps } from './types';

  const props = withDefaults(defineProps<CheckboxProps>(), {
    modelValue: false,
    disabled: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
  }>();

  const inputId = computed(() => props.id ?? generateId('checkbox'));

  function handleChange() {
    if (props.disabled) return;
    emit('update:modelValue', !props.modelValue);
  }
</script>

<template>
  <label
    :class="[
      'choice',
      'choice--checkbox',
      { 'choice--checked': modelValue, 'choice--disabled': disabled },
    ]"
    :for="inputId"
  >
    <input
      :id="inputId"
      class="choice__input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :name="name"
      @change="handleChange"
    />
    <span class="choice__indicator" aria-hidden="true" />
    <span v-if="label || helpText" class="choice__body">
      <span v-if="label" class="choice__label">{{ label }}</span>
      <span v-if="helpText" class="choice__hint">{{ helpText }}</span>
    </span>
  </label>
</template>
