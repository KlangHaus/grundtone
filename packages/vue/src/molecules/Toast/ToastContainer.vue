<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Toast from './Toast.vue';
  import type { ToastContainerProps } from './types';
  import { toastState } from '../../composables/useToast';

  const props = withDefaults(defineProps<ToastContainerProps>(), {
    position: 'bottom-center',
    visibleToasts: 3,
    richColors: false,
    expand: false,
  });

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
        'toast-container',
        `toast-container--${position}`,
        { 'toast-container--expanded': isExpanded },
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
