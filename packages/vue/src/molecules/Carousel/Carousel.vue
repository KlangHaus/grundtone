<script setup lang="ts">
  import {
    ref,
    computed,
    watch,
    provide,
    onMounted,
    onUnmounted,
    toRef,
  } from 'vue';
  import type { CarouselProps } from './types';

  const props = withDefaults(defineProps<CarouselProps>(), {
    modelValue: 0,
    autoplay: false,
    interval: 5000,
    loop: true,
    fade: false,
    showControls: true,
    showIndicators: true,
    pauseOnHover: true,
    ariaLabel: 'Karrusel',
  });

  const emit = defineEmits<{
    'update:modelValue': [index: number];
  }>();

  const activeIndex = ref(props.modelValue);
  const slideCount = ref(0);
  const isPaused = ref(false);
  let autoplayTimer: ReturnType<typeof setInterval> | null = null;

  // Sync with v-model
  watch(
    () => props.modelValue,
    val => {
      activeIndex.value = val;
    },
  );

  // Provide to children
  provide('gt-carousel-active', activeIndex);
  provide('gt-carousel-fade', toRef(props, 'fade'));

  let nextSlideIndex = 0;
  provide('gt-carousel-register', () => {
    const idx = nextSlideIndex++;
    slideCount.value = nextSlideIndex;
    return idx;
  });

  provide('gt-carousel-unregister', (_idx: number) => {
    // Simple decrement — slides are always unmounted in bulk
    slideCount.value = Math.max(0, slideCount.value - 1);
  });

  function goTo(index: number) {
    if (slideCount.value === 0) return;

    let target = index;
    if (props.loop) {
      target = ((index % slideCount.value) + slideCount.value) % slideCount.value;
    } else {
      target = Math.max(0, Math.min(index, slideCount.value - 1));
    }

    activeIndex.value = target;
    emit('update:modelValue', target);
  }

  function prev() {
    goTo(activeIndex.value - 1);
  }

  function next() {
    goTo(activeIndex.value + 1);
  }

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    if (!props.autoplay) return;

    // Respect reduced motion
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) return;
    }

    autoplayTimer = setInterval(() => {
      if (!isPaused.value) next();
    }, props.interval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  watch(() => props.autoplay, startAutoplay);
  watch(() => props.interval, startAutoplay);

  onMounted(startAutoplay);
  onUnmounted(stopAutoplay);

  function onMouseEnter() {
    if (props.pauseOnHover) isPaused.value = true;
  }

  function onMouseLeave() {
    if (props.pauseOnHover) isPaused.value = false;
  }

  // Keyboard
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  }

  // Touch / pointer
  let pointerStartX = 0;
  let pointerStartY = 0;
  let isDragging = false;

  function onPointerDown(e: PointerEvent) {
    pointerStartX = e.clientX;
    pointerStartY = e.clientY;
    isDragging = true;
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;

    const dx = e.clientX - pointerStartX;
    const dy = e.clientY - pointerStartY;

    // Only swipe if horizontal movement > vertical and > 50px threshold
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  }

  const trackStyle = computed(() => {
    if (props.fade) return {};
    return {
      transform: `translateX(${-activeIndex.value * 100}%)`,
    };
  });

  const indicators = computed(() =>
    Array.from({ length: slideCount.value }, (_, i) => i),
  );
</script>

<template>
  <div
    :class="['carousel', { 'carousel--fade': fade }]"
    :aria-label="ariaLabel"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeydown"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
  >
    <div class="carousel__track" :style="trackStyle">
      <slot />
    </div>

    <template v-if="showControls && slideCount > 1">
      <button
        type="button"
        class="carousel__prev"
        :aria-label="'Forrige slide'"
        @click="prev"
      >
        <slot name="prev">&#8249;</slot>
      </button>
      <button
        type="button"
        class="carousel__next"
        :aria-label="'Næste slide'"
        @click="next"
      >
        <slot name="next">&#8250;</slot>
      </button>
    </template>

    <div
      v-if="showIndicators && slideCount > 1"
      class="carousel__indicators"
      role="tablist"
    >
      <button
        v-for="i in indicators"
        :key="i"
        type="button"
        role="tab"
        :class="[
          'carousel__indicator',
          { 'carousel__indicator--active': activeIndex === i },
        ]"
        :aria-selected="activeIndex === i"
        :aria-label="`Gå til slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style lang="scss">
  // Styles provided by design system (_carousel.scss)
</style>
