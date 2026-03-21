<script setup lang="ts">
  import { computed } from 'vue';
  import { GTIcon } from '../../atoms/Icon';
  import type { ToastProps } from './types';

  const props = withDefaults(defineProps<ToastProps>(), {
    variant: 'default',
    description: undefined,
    icon: undefined,
    duration: 5000,
    dismissible: true,
    rich: false,
    index: 0,
  });

  const emit = defineEmits<{
    dismiss: [];
  }>();

  const ariaLive = computed(() =>
    props.variant === 'error' || props.variant === 'warning'
      ? 'assertive'
      : 'polite',
  );

  const role = computed(() =>
    props.variant === 'error' || props.variant === 'warning'
      ? 'alert'
      : 'status',
  );

  function onCountdownEnd() {
    emit('dismiss');
  }
</script>

<template>
  <div
    :class="['toast', `toast--${variant}`, { 'toast--rich': rich }]"
    :data-index="index"
    :role="role"
    :aria-live="ariaLive"
    aria-atomic="true"
  >
    <GTIcon v-if="icon" :name="icon" size="sm" class="toast__icon" />

    <div class="toast__content">
      <p class="toast__message">{{ message }}</p>
      <p v-if="description" class="toast__description">{{ description }}</p>
    </div>

    <button
      v-if="dismissible"
      class="toast__close"
      type="button"
      aria-label="Luk"
      @click="emit('dismiss')"
    >
      &times;
    </button>

    <div
      v-if="duration > 0"
      class="toast__countdown"
      :style="{ animationDuration: `${duration}ms` }"
      @animationend="onCountdownEnd"
    />
  </div>
</template>
