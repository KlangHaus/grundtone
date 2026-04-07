<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { HeaderProps } from './types';

  const props = withDefaults(defineProps<HeaderProps>(), {
    logo: undefined,
    logoHref: '/',
    nav: () => [],
    transparent: false,
    scrollThreshold: 80,
    ariaLabel: 'Hovednavigation',
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-header`);

  const scrolled = ref(false);
  const menuOpen = ref(false);

  function onScroll() {
    scrolled.value = window.scrollY > props.scrollThreshold;
  }

  onMounted(() =>
    window.addEventListener('scroll', onScroll, { passive: true }),
  );
  onUnmounted(() => window.removeEventListener('scroll', onScroll));

  function closeMenu() {
    menuOpen.value = false;
  }
</script>

<template>
  <header
    :class="[
      base,
      { [`${base}--scrolled`]: scrolled },
      { [`${base}--transparent`]: transparent && !scrolled },
    ]"
  >
    <div :class="`${base}__inner`">
      <slot name="logo">
        <a v-if="logo" :href="logoHref" :class="`${base}__logo`">{{ logo }}</a>
      </slot>

      <button
        :class="`${base}__toggle`"
        :aria-label="menuOpen ? 'Luk menu' : 'Åbn menu'"
        @click="menuOpen = !menuOpen"
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        :class="[`${base}__nav`, { [`${base}__nav--open`]: menuOpen }]"
        :aria-label="ariaLabel"
      >
        <button
          v-if="menuOpen"
          :class="`${base}__nav-close`"
          aria-label="Luk menu"
          @click="closeMenu"
        >
          &times;
        </button>
        <slot name="nav">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            @click="closeMenu"
          >
            {{ item.label }}
          </a>
        </slot>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-header {
    background: tokens.color('background');
    padding-block: tokens.space('xl');
    position: relative;
    z-index: var(--z-fixed);

    @media (max-width: 991px) {
      padding-block: tokens.space('md');
    }

    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-inline: tokens.space('3xl');

      @media (max-width: 1399px) {
        padding-inline: tokens.space('md');
      }
    }

    &__logo {
      font-family: tokens.font-family('heading');
      font-size: tokens.font-size('xl');
      font-weight: tokens.font-weight('bold');
      color: tokens.color('text');
      text-decoration: none;

      @media (max-width: 767px) {
        font-size: tokens.font-size('lg');
      }
    }

    &__toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: tokens.space('xs');

      span {
        display: block;
        width: 24px;
        height: 2px;
        background: tokens.color('text');
        margin-block: 5px;
        transition: transform tokens.duration('fast') tokens.ease('ease');
      }

      &:hover span {
        background: tokens.color('primary');
      }
    }

    &__nav {
      display: flex;
      gap: tokens.space('xl');

      a {
        font-size: tokens.font-size('sm');
        line-height: tokens.line-height('tight');
        font-weight: tokens.font-weight('bold');
        font-family: tokens.font-family('heading');
        text-transform: uppercase;
        color: tokens.color('text');
        text-decoration: none;
        transition: color tokens.duration('fast') tokens.ease('ease');

        &:hover,
        &.router-link-active {
          color: tokens.color('primary');
        }
      }
    }

    &__nav-close {
      position: absolute;
      top: tokens.space('lg');
      right: tokens.space('lg');
      background: none;
      border: none;
      font-size: tokens.font-size('2xl');
      color: tokens.color('text');
      cursor: pointer;
      transition: color tokens.duration('fast') tokens.ease('ease');

      &:hover {
        color: tokens.color('primary');
      }
    }

    // Transparent over hero
    &--transparent {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: transparent;
      z-index: 100;

      .#{$prefix}-header__logo,
      .#{$prefix}-header__nav a {
        color: #fff;
      }

      .#{$prefix}-header__nav a:hover,
      .#{$prefix}-header__nav a.router-link-active {
        color: tokens.color('primary-light');
      }

      .#{$prefix}-header__toggle span {
        background: #fff;
      }
    }

    // Sticky on scroll
    &--scrolled {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding-block: tokens.space('md');
      animation: #{$prefix}-header-fade-in tokens.duration('slow')
        tokens.ease('ease');
      box-shadow: tokens.shadow('sm');
      background: tokens.color('background');
    }

    // Mobile nav
    @media (max-width: 767px) {
      .#{$prefix}-header__toggle {
        display: block;
      }

      .#{$prefix}-header__nav {
        position: fixed;
        inset: 0;
        z-index: var(--z-modal);
        background: tokens.color('background');
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: tokens.space('lg');
        transform: translateX(100%);
        transition: transform tokens.duration('base') tokens.ease('ease');

        a {
          font-size: tokens.font-size('lg');
        }

        &--open {
          transform: translateX(0);
        }
      }
    }
  }

  @keyframes #{$prefix}-header-fade-in {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
