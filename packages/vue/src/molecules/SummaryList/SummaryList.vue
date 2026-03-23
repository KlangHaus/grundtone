<script setup lang="ts">
  import { computed } from 'vue';
  import type { SummaryListProps } from './types';

  const props = withDefaults(defineProps<SummaryListProps>(), {
    variant: 'default',
    title: undefined,
    titleTag: 'h2',
  });

  const isCard = computed(() => props.variant === 'card');

  const listClasses = computed(() => [
    'summary-list',
    props.variant === 'borderless' && 'summary-list--borderless',
  ]);
</script>

<template>
  <div v-if="isCard" class="summary-card">
    <div class="summary-card__header">
      <component :is="titleTag" v-if="title" class="summary-card__title">
        {{ title }}
      </component>
      <div v-if="$slots.actions" class="summary-card__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="summary-card__content">
      <dl :class="listClasses">
        <slot />
      </dl>
    </div>
  </div>

  <dl v-else :class="listClasses">
    <slot />
  </dl>
</template>

<style lang="scss">
  // Styles provided by design system (_summary-list.scss)
</style>
