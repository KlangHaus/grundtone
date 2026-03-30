<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import Toast from './Toast.vue';
  import type { ToastContainerProps } from './types';
  import { toastState } from '../../composables/useToast';

  const props = withDefaults(defineProps<ToastContainerProps>(), {
    position: 'bottom-center',
    visibleToasts: 3,
    richColors: false,
    expand: false,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-toast-container`);

  const isHovered = ref(false);

  const isExpanded = computed(() => props.expand || isHovered.value);

  const visibleItems = computed(() => {
    if (isExpanded.value) return toastState.toasts;
    return toastState.toasts.slice(0, props.visibleToasts);
  });

  function dismiss(id: string) {
    const idx = toastState.toasts.findIndex(t => t.id === id);
    if (idx >= 0) toastState.toasts.splice(idx, 1);
  }
</script>

<template>
  <Teleport to="body">
    <div
      v-if="toastState.toasts.length > 0"
      :class="[
        base,
        `${base}--${position}`,
        { [`${base}--expanded`]: isExpanded },
      ]"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <Toast
        v-for="(item, i) in visibleItems"
        :key="item.id"
        :variant="item.variant"
        :message="item.message"
        :description="item.description"
        :icon="item.icon"
        :duration="item.duration"
        :dismissible="item.dismissible"
        :rich="richColors"
        :index="i"
        @dismiss="dismiss(item.id)"
      />
    </div>
  </Teleport>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-toast-container {
    position: fixed;
    z-index: tokens.z-index('toast');
    display: flex;
    flex-direction: column-reverse;
    pointer-events: none;
    gap: 0;
    padding: tokens.space('lg');

    &--bottom-center {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &--bottom-right {
      bottom: 0;
      right: 0;
    }

    &--bottom-left {
      bottom: 0;
      left: 0;
    }

    &--top-center {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      flex-direction: column;
    }

    &--top-right {
      top: 0;
      right: 0;
      flex-direction: column;
    }

    &--top-left {
      top: 0;
      left: 0;
      flex-direction: column;
    }

    &--expanded {
      gap: tokens.space('sm');

      .#{$prefix}-toast {
        transform: scale(1) translateY(0) !important;
        opacity: 1 !important;
      }
    }
  }
</style>
