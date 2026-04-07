<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { FooterProps } from './types';

  withDefaults(defineProps<FooterProps>(), {
    copyright: undefined,
    nav: () => [],
    ariaLabel: 'Footer navigation',
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-footer`);
</script>

<template>
  <footer :class="base">
    <div :class="`${base}__inner`">
      <slot name="nav">
        <nav
          v-if="nav.length"
          :class="`${base}__links`"
          :aria-label="ariaLabel"
        >
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
          >
            {{ item.label }}
          </a>
        </nav>
      </slot>

      <slot name="center" />

      <slot name="copyright">
        <p v-if="copyright" :class="`${base}__copy`">{{ copyright }}</p>
      </slot>
    </div>
  </footer>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-footer {
    background: tokens.color('background');
    padding-block: tokens.space('3xl');
    position: relative;

    @media (max-width: 991px) {
      padding-block: tokens.space('2xl');
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: tokens.space('3xl');
      width: calc(100% - #{tokens.space('3xl')} * 2);
      height: 1px;
      background: tokens.color('border-light');

      @media (max-width: 1399px) {
        left: tokens.space('md');
        width: calc(100% - #{tokens.space('md')} * 2);
      }
    }

    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-inline: tokens.space('3xl');

      @media (max-width: 1399px) {
        padding-inline: tokens.space('md');
      }

      @media (max-width: 991px) {
        display: block;
        text-align: center;
      }
    }

    &__copy {
      font-size: tokens.font-size('base');
      color: tokens.color('text-tertiary');
      margin: 0;
    }

    &__links {
      display: flex;
      gap: tokens.space('md');

      @media (max-width: 991px) {
        justify-content: center;
        margin-bottom: tokens.space('lg');
      }

      a {
        font-size: tokens.font-size('sm');
        line-height: tokens.line-height('tight');
        font-weight: tokens.font-weight('bold');
        font-family: tokens.font-family('heading');
        text-transform: uppercase;
        color: tokens.color('text');
        text-decoration: none;
        transition: color tokens.duration('fast') tokens.ease('ease');

        &:hover {
          color: tokens.color('primary');
        }
      }
    }
  }
</style>
