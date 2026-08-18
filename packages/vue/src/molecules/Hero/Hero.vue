<script setup lang="ts">
  import { computed, useId, useSlots } from 'vue';
  import type { HeroProps } from './types';

  const props = withDefaults(defineProps<HeroProps>(), {
    title: undefined,
    subtitle: undefined,
    align: 'center',
    background: 'none',
    headingLevel: 1,
  });

  const titleId = useId();
  const slots = useSlots();

  // [review]-fund på #132: med hverken prop eller slot renderes en TOM
  // heading som sektionens aria-labelledby peger på — et landmark uden
  // accessible name, og efter at title blev valgfri fanger Vues egen
  // required-prop-check det ikke længere. Samme warn-mønster som GTIcon.
  if (!props.title && !slots.title) {
    // eslint-disable-next-line no-console
    console.warn(
      '[GTHero] Neither a `title` prop nor a `title` slot was given — the heading renders empty and the section has no accessible name.',
    );
  }

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
