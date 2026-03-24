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
      target =
        ((index % slideCount.value) + slideCount.value) % slideCount.value;
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

  // Touch / pointer — continuous drag with visual feedback
  let pointerStartX = 0;
  let pointerStartY = 0;
  let isDragging = false;
  let directionLocked = false;
  const dragOffset = ref(0);

  function onPointerDown(e: PointerEvent) {
    if (props.fade) return; // No drag in fade mode
    pointerStartX = e.clientX;
    pointerStartY = e.clientY;
    isDragging = true;
    directionLocked = false;
    dragOffset.value = 0;

    // Capture pointer for smooth tracking
    (e.currentTarget as HTMLElement)?.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;

    const dx = e.clientX - pointerStartX;
    const dy = e.clientY - pointerStartY;

    // Lock direction on first significant movement
    if (!directionLocked && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      directionLocked = true;
      if (Math.abs(dy) > Math.abs(dx)) {
        // Vertical scroll — abort drag
        isDragging = false;
        dragOffset.value = 0;
        return;
      }
    }

    if (!directionLocked) return;

    // Resistance at edges when not looping
    let offset = dx;
    if (!props.loop) {
      const atStart = activeIndex.value === 0 && dx > 0;
      const atEnd = activeIndex.value === slideCount.value - 1 && dx < 0;
      if (atStart || atEnd) {
        offset = dx * 0.3; // Rubber-band effect
      }
    }

    dragOffset.value = offset;
  }

  function onPointerUp(_e: PointerEvent) {
    if (!isDragging) {
      dragOffset.value = 0;
      return;
    }
    isDragging = false;

    const dx = dragOffset.value;
    const threshold = 50;

    if (Math.abs(dx) > threshold) {
      if (dx < 0) next();
      else prev();
    }

    dragOffset.value = 0;
  }

  const trackStyle = computed(() => {
    if (props.fade) return {};
    const baseOffset = -activeIndex.value * 100;
    const dragPx = dragOffset.value;
    // During drag: disable transition for instant feedback
    if (dragPx !== 0) {
      return {
        transform: `translateX(calc(${baseOffset}% + ${dragPx}px))`,
        transition: 'none',
      };
    }
    return {
      transform: `translateX(${baseOffset}%)`,
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
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
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
