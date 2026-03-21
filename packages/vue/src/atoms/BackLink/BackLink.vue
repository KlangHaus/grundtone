<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { BackLinkProps } from './types';

  defineProps<BackLinkProps>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-back-link`);
</script>

<template>
  <a :href="href" :class="base">{{ label }}</a>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-back-link {
    display: inline-flex;
    align-items: center;
    gap: tokens.space('xs');
    font-size: tokens.font-size('sm');
    font-weight: tokens.font-weight('medium');
    color: tokens.color('primary');
    text-decoration: none;
    line-height: tokens.line-height('normal');
    transition: color tokens.duration('fast') tokens.ease('ease');

    &::before {
      content: '←';
      display: inline-block;
      font-size: 1.1em;
      transition: transform tokens.duration('fast') tokens.ease('ease');
    }

    &:hover {
      text-decoration: underline;

      &::before {
        transform: translateX(-2px);
      }
    }

    &:focus-visible {
      outline: 2px solid tokens.color('focus-ring');
      outline-offset: 2px;
      border-radius: tokens.radius('sm');
      text-decoration: underline;
    }
  }
</style>
