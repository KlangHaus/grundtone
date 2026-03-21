<script setup lang="ts">
  import { GTIcon } from '../Icon';
  import type { TagProps } from './types';

  const props = withDefaults(defineProps<TagProps>(), {
    value: undefined,
    icon: undefined,
    dismissible: false,
    selected: false,
    size: 'md',
    disabled: false,
  });

  const emit = defineEmits<{
    click: [value: string | undefined];
    dismiss: [value: string | undefined];
    'update:selected': [value: boolean];
  }>();

  function handleClick() {
    if (props.disabled) return;
    emit('click', props.value);
    emit('update:selected', !props.selected);
  }

  function handleDismiss(e: Event) {
    e.stopPropagation();
    if (props.disabled) return;
    emit('dismiss', props.value);
  }
</script>

<template>
  <span
    :class="[
      'tag',
      `tag--${size}`,
      {
        'tag--selected': selected,
        'tag--disabled': disabled,
      },
    ]"
    :role="selected !== undefined ? 'option' : undefined"
    :aria-selected="selected !== undefined ? selected : undefined"
    :aria-disabled="disabled || undefined"
    tabindex="0"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <GTIcon v-if="icon" :name="icon" size="xs" class="tag__icon" />
    <span class="tag__label">{{ label }}</span>
    <button
      v-if="dismissible"
      type="button"
      class="tag__dismiss"
      :aria-label="`Fjern ${label}`"
      :disabled="disabled"
      @click="handleDismiss"
    >
      &times;
    </button>
  </span>
</template>
