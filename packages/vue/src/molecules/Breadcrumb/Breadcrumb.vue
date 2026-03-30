<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { BreadcrumbProps, BreadcrumbItem } from './types';

  const props = withDefaults(defineProps<BreadcrumbProps>(), {
    separator: '/',
    ariaLabel: 'Breadcrumb',
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-breadcrumb`);

  function isCurrentPage(item: BreadcrumbItem, index: number): boolean {
    return index === props.items.length - 1 || (!item.href && !item.to);
  }
</script>

<template>
  <nav :aria-label="ariaLabel" :class="base">
    <ol :class="`${base}__list`">
      <li v-for="(item, i) in items" :key="i" :class="`${base}__item`">
        <span v-if="i > 0" :class="`${base}__separator`" aria-hidden="true">
          {{ separator }}
        </span>

        <template v-if="isCurrentPage(item, i)">
          <span :class="`${base}__current`" aria-current="page">
            {{ item.label }}
          </span>
        </template>
        <template v-else>
          <component
            :is="item.to ? 'router-link' : 'a'"
            :href="item.to ? undefined : item.href"
            :to="item.to"
            :class="`${base}__link`"
          >
            {{ item.label }}
          </component>
        </template>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-breadcrumb {
    font-size: tokens.font-size('sm');
    color: tokens.color('text-tertiary');

    &__list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: tokens.space('xs');
      list-style: none;
      padding: 0 !important;
      padding-left: 0 !important;
      margin: 0;
    }

    &__item {
      display: inline-flex;
      align-items: center;
      gap: tokens.space('xs');
      margin-top: 0 !important; // override global li + li margin
    }

    &__link {
      color: tokens.color('primary');
      text-decoration: none;

      &:hover,
      &:focus-visible {
        text-decoration: underline;
      }
    }

    &__separator {
      color: tokens.color('text-tertiary');
      user-select: none;
    }

    &__current {
      color: tokens.color('text');
      font-weight: tokens.font-weight('medium');
    }

    // Responsive: show only last 2 items on small screens
    @media (max-width: 639px) {
      .#{$prefix}-breadcrumb__list {
        flex-wrap: nowrap;
        overflow: hidden;
      }

      .#{$prefix}-breadcrumb__item {
        display: none;

        &:nth-last-child(-n + 2) {
          display: inline-flex;
        }
      }
    }
  }
</style>
