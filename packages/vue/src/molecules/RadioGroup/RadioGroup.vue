<script setup lang="ts">
  import { computed } from 'vue';
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
    class="choice-group"
    :aria-describedby="descId"
    :aria-required="required"
    :disabled="disabled"
  >
    <legend v-if="label" class="choice-group__legend">{{ label }}</legend>

    <p v-if="helpText && !errorText" :id="descId" class="choice-group__hint">
      {{ helpText }}
    </p>
    <p v-if="errorText" :id="descId" class="choice-group__error" role="alert">
      {{ errorText }}
    </p>

    <div class="choice-group__list" role="radiogroup">
      <label
        v-for="option in options"
        :key="option.value"
        :class="[
          'choice',
          'choice--radio',
          {
            'choice--checked': modelValue === option.value,
            'choice--disabled': disabled || option.disabled,
            'choice--error': !!errorText,
          },
        ]"
        :for="`${baseId}-${option.value}`"
      >
        <input
          :id="`${baseId}-${option.value}`"
          class="choice__input"
          type="radio"
          :name="groupName"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          @change="handleChange(option.value)"
        />
        <span class="choice__indicator" aria-hidden="true" />
        <span class="choice__body">
          <span class="choice__label">{{ option.label }}</span>
          <span v-if="option.hint" class="choice__hint">{{ option.hint }}</span>
          <div
            v-if="option.content && modelValue === option.value"
            class="choice__content"
            style="display: block"
          >
            <slot :name="`content-${option.value}`" />
          </div>
        </span>
      </label>
    </div>
  </fieldset>
</template>
