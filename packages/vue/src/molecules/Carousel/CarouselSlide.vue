<script setup lang="ts">
  import { inject, computed, onMounted, onUnmounted, ref } from 'vue';
  import type { CarouselSlideProps } from './types';

  defineProps<CarouselSlideProps>();

  const activeIndex = inject<{ value: number }>('gt-carousel-active');
  const registerSlide = inject<() => number>('gt-carousel-register');
  const unregisterSlide = inject<(idx: number) => void>(
    'gt-carousel-unregister',
  );

  const index = ref(-1);

  onMounted(() => {
    if (registerSlide) {
      index.value = registerSlide();
    }
  });

  onUnmounted(() => {
    if (unregisterSlide) {
      unregisterSlide(index.value);
    }
  });

  const isActive = computed(() => activeIndex?.value === index.value);
</script>

<template>
  <div
    class="carousel__slide"
    :class="{ 'carousel__slide--active': isActive }"
    role="tabpanel"
    :aria-hidden="!isActive"
    :aria-label="ariaLabel"
    :aria-roledescription="'slide'"
  >
    <slot />
  </div>
</template>
