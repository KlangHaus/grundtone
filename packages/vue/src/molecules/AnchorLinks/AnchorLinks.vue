<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { AnchorLinksProps } from './types';

  const props = withDefaults(defineProps<AnchorLinksProps>(), {
    heading: 'Indhold på siden',
    ariaLabel: 'Indholdsfortegnelse',
    activeHighlight: true,
  });

  const emit = defineEmits<{
    navigate: [href: string];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-anchor-links`);

  const activeHref = ref('');
  /* eslint-disable no-undef */
  let observer: IntersectionObserver | null = null;

  let isClickScrolling = false;

  function onClick(e: Event, href: string) {
    e.preventDefault();
    const id = href.replace(/^#/, '');
    const target = document.getElementById(id);
    if (target) {
      isClickScrolling = true;
      activeHref.value = href;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
      // Re-enable observer after scroll settles
      setTimeout(() => {
        isClickScrolling = false;
      }, 800);
    }
    emit('navigate', href);
  }

  onMounted(() => {
    if (!props.activeHighlight || typeof window === 'undefined') return;

    const ids = props.items
      .map(item => item.href.replace(/^#/, ''))
      .filter(Boolean);

    const targets = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!targets.length) return;

    observer = new IntersectionObserver(
      entries => {
        if (isClickScrolling) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeHref.value = `#${entry.target.id}`;
          }
        }
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0 },
    );

    for (const target of targets) {
      observer.observe(target);
    }
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
</script>

<template>
  <nav :class="base" :aria-label="ariaLabel">
    <p :class="`${base}__heading`">{{ heading }}</p>
    <ol :class="`${base}__list`">
      <li v-for="item in items" :key="item.href" :class="`${base}__item`">
        <a
          :href="item.href"
          :class="[
            `${base}__link`,
            {
              [`${base}__link--active`]:
                activeHighlight && activeHref === item.href,
            },
          ]"
          :aria-current="
            activeHighlight && activeHref === item.href ? 'true' : undefined
          "
          @click="onClick($event, item.href)"
        >
          {{ item.label }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-anchor-links {
    padding: tokens.space('md') tokens.space('lg');
    background: tokens.color('surface-alt');
    border-radius: tokens.radius('xl');
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('base');

    &__heading {
      font-weight: tokens.font-weight('semibold');
      font-size: tokens.font-size('xs');
      color: tokens.color('text-tertiary');
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 tokens.space('sm');
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    &__item {
      margin: 0;
    }

    &__link {
      display: flex;
      align-items: center;
      gap: tokens.space('sm');
      color: tokens.color('text-secondary');
      text-decoration: none;
      padding: tokens.space('xs') tokens.space('sm');
      border-radius: tokens.radius('md');
      border-left: 2px solid transparent;
      transition: all tokens.duration('fast') tokens.ease('ease');

      &:hover {
        color: tokens.color('text');
        background: tokens.color('surface');
      }

      &:focus-visible {
        color: tokens.color('text');
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 1px;
      }

      &--active {
        color: tokens.color('primary');
        font-weight: tokens.font-weight('medium');
        background: tokens.color('surface');
        border-left-color: tokens.color('primary');
      }
    }
  }
</style>
