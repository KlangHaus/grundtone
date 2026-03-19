<script setup lang="ts">
  import {
    computed,
    ref,
    inject,
    useId,
    watch,
    nextTick,
    useTemplateRef,
    type Ref,
    type ComputedRef,
  } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { AccordionItemProps, AccordionTransition } from './types';

  const props = withDefaults(defineProps<AccordionItemProps>(), {
    summary: undefined,
    open: false,
    headingLevel: 3,
  });

  const isOpen = ref(props.open);
  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-accordion`);

  const headingId = useId();
  const panelId = useId();
  const panelRef = useTemplateRef<HTMLElement>('panel');

  // Injected from parent Accordion
  const register = inject<((isOpen: Ref<boolean>) => void) | null>(
    'gt-accordion-register',
    null,
  );
  if (register) register(isOpen);

  const transition = inject<ComputedRef<AccordionTransition>>(
    'gt-accordion-transition',
    computed(() => 'slide'),
  );

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  // JS-driven height animation for slide
  watch(isOpen, async open => {
    if (transition.value !== 'slide') return;
    const el = panelRef.value;
    if (!el) return;

    if (open) {
      // Measure natural height
      el.style.height = 'auto';
      await nextTick();
      const height = el.scrollHeight;
      el.style.height = '0px';
      // Force reflow
      void el.offsetHeight;
      el.style.height = `${height}px`;
      el.addEventListener(
        'transitionend',
        () => {
          el.style.height = 'auto';
        },
        { once: true },
      );
    } else {
      // Collapse from current height
      el.style.height = `${el.scrollHeight}px`;
      void el.offsetHeight;
      el.style.height = '0px';
    }
  });
</script>

<template>
  <div :class="[`${base}__item`, { [`${base}__item--open`]: isOpen }]">
    <component :is="`h${headingLevel}`" class="sr-only">{{
      heading
    }}</component>
    <button
      type="button"
      :class="`${base}__header`"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      :id="headingId"
      @click="toggle"
    >
      <span :class="`${base}__icon`" aria-hidden="true" />
      <span :class="`${base}__heading`">
        {{ heading }}
        <span v-if="summary" :class="`${base}__summary`">{{ summary }}</span>
      </span>
    </button>
    <div
      ref="panel"
      :id="panelId"
      :class="[
        `${base}__panel`,
        `${base}__panel--${transition}`,
        { [`${base}__panel--open`]: isOpen },
      ]"
      role="region"
      :aria-labelledby="headingId"
      :hidden="!isOpen && transition === 'none' ? true : undefined"
    >
      <div :class="`${base}__body`">
        <slot />
      </div>
    </div>
  </div>
</template>
