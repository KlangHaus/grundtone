<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import type { BackToTopProps } from './types';

  const props = withDefaults(defineProps<BackToTopProps>(), {
    label: 'Til toppen',
    smooth: true,
    threshold: 0,
  });

  const visible = ref(false);
  let computedThreshold = 0;

  function onScroll() {
    visible.value = window.scrollY > computedThreshold;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: props.smooth ? 'smooth' : 'instant',
    });
  }

  onMounted(() => {
    computedThreshold =
      props.threshold > 0 ? props.threshold : window.innerHeight * 2;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
</script>

<template>
  <button
    type="button"
    :class="['back-to-top', { 'back-to-top--visible': visible }]"
    :aria-label="label"
    @click="scrollToTop"
  >
    <span class="back-to-top__icon" aria-hidden="true" />
    <span class="back-to-top__label">{{ label }}</span>
  </button>
</template>
