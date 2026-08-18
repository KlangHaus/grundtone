<script setup lang="ts">
  import { computed, useId } from 'vue';
  import type { HeroProps } from './types';

  const props = withDefaults(defineProps<HeroProps>(), {
    subtitle: undefined,
    align: 'center',
    background: 'none',
    headingLevel: 1,
  });

  const titleId = useId();

  const classes = computed(() => [
    'hero',
    `hero--${props.align}`,
    ...(props.background !== 'none' ? [`hero--bg-${props.background}`] : []),
  ]);
</script>

<template>
  <section :class="classes" :aria-labelledby="titleId">
    <div v-if="$slots.eyebrow" class="hero__eyebrow">
      <slot name="eyebrow" />
    </div>
    <component :is="`h${headingLevel}`" :id="titleId" class="hero__title">
      <slot name="title">{{ title }}</slot>
    </component>
    <p v-if="subtitle || $slots.subtitle" class="hero__subtitle">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
    <div v-if="$slots.actions" class="hero__actions">
      <slot name="actions" />
    </div>
    <div v-if="$slots.visual" class="hero__visual">
      <slot name="visual" />
    </div>
  </section>
</template>

<style lang="scss">
  // Styles provided by design system (_hero.scss)
</style>
