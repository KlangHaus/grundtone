<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import GTDrawer from '../Drawer/Drawer.vue';
  import GTToastContainer from '../Toast/ToastContainer.vue';
  import GTSkipLink from '../../atoms/SkipLink/SkipLink.vue';
  import type { AppShellProps } from './types';

  const props = withDefaults(defineProps<AppShellProps>(), {
    sidebarWidth: '16rem',
    railWidth: '4rem',
    collapsed: false,
    breakpoint: '48rem',
    navLabel: 'Hovednavigation',
    mainId: 'main',
    toasts: true,
  });

  const emit = defineEmits<{
    'update:collapsed': [value: boolean];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-app-shell`);
  const drawerId = generateId('app-shell-drawer');

  // Two independent axes: `collapsed` governs the persistent sidebar at/above
  // the breakpoint; `drawerOpen` governs the overlay below it. They never both
  // apply — `isMobile` picks which one is live. `isMobile` starts false so SSR
  // renders the desktop shell (no `window`); the client resolves the real
  // breakpoint on mount, avoiding a hydration mismatch.
  const isMobile = ref(false);
  const drawerOpen = ref(false);

  let mql: MediaQueryList | null = null;
  function onChange(e: MediaQueryListEvent | MediaQueryList) {
    isMobile.value = e.matches;
    // Leaving mobile always dismisses the overlay so we never strand an open
    // drawer behind a now-persistent sidebar.
    if (!e.matches) drawerOpen.value = false;
  }
  function bind() {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    mql = window.matchMedia(`(max-width: ${props.breakpoint})`);
    onChange(mql);
    mql.addEventListener('change', onChange);
  }
  function unbind() {
    mql?.removeEventListener('change', onChange);
    mql = null;
  }

  onMounted(bind);
  onBeforeUnmount(unbind);
  watch(
    () => props.breakpoint,
    () => {
      unbind();
      bind();
    },
  );

  function toggleCollapsed() {
    emit('update:collapsed', !props.collapsed);
  }

  const sidebarInlineSize = computed(() =>
    props.collapsed ? props.railWidth : props.sidebarWidth,
  );
</script>

<template>
  <div
    :class="[
      base,
      {
        [`${base}--collapsed`]: collapsed && !isMobile,
        [`${base}--mobile`]: isMobile,
      },
    ]"
    :style="{ [`--${p}-app-shell-sidebar`]: sidebarInlineSize }"
  >
    <GTSkipLink :href="`#${mainId}`" />

    <!-- Persistent sidebar (≥ breakpoint). Same slot content the drawer uses. -->
    <aside v-if="!isMobile" :class="`${base}__sidebar`">
      <nav :class="`${base}__nav`" :aria-label="navLabel">
        <slot
          name="sidebar"
          :collapsed="collapsed"
          :toggle-collapsed="toggleCollapsed"
        />
      </nav>
    </aside>

    <!-- Below breakpoint the same sidebar lives in a modal drawer. The dialog
         WRAPS the <nav> so the navigation landmark is preserved on mobile. -->
    <GTDrawer
      v-else
      v-model:open="drawerOpen"
      side="left"
      :aria-label="navLabel"
    >
      <nav :id="drawerId" :class="`${base}__nav`" :aria-label="navLabel">
        <slot
          name="sidebar"
          :collapsed="false"
          :toggle-collapsed="toggleCollapsed"
        />
      </nav>
    </GTDrawer>

    <div :class="`${base}__main`">
      <header :class="`${base}__topbar`">
        <button
          v-if="isMobile"
          type="button"
          :class="`${base}__hamburger`"
          :aria-label="navLabel"
          :aria-expanded="drawerOpen"
          :aria-controls="drawerId"
          @click="drawerOpen = !drawerOpen"
        >
          <span :class="`${base}__hamburger-bars`" aria-hidden="true" />
        </button>
        <div :class="`${base}__topbar-content`">
          <slot name="topbar" />
        </div>
      </header>

      <main :id="mainId" :class="`${base}__content`">
        <slot />
      </main>
    </div>

    <GTToastContainer v-if="toasts" />
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-app-shell {
    display: flex;
    block-size: 100dvh;
    overflow: hidden;
    background: tokens.color('background');

    &__sidebar {
      flex: 0 0 auto;
      inline-size: var(--#{$prefix}-app-shell-sidebar);
      // Width animates on collapse; nothing else moves.
      transition: inline-size tokens.duration('base') tokens.ease('ease-out');
      overflow: hidden;
      border-inline-end: 1px solid tokens.color('border-light');
      background: tokens.color('surface');
    }

    &__nav {
      block-size: 100%;
      overflow-y: auto;
      padding: tokens.space('md');
    }

    &__main {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-inline-size: 0;
    }

    &__topbar {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: tokens.space('sm');
      padding-inline: tokens.space('lg');
      min-block-size: 3.5rem;
      border-block-end: 1px solid tokens.color('border-light');
      background: tokens.color('surface');
    }

    &__topbar-content {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: tokens.space('md');
      min-inline-size: 0;
    }

    &__hamburger {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 2.5rem;
      block-size: 2.5rem;
      padding: 0;
      border: none;
      border-radius: tokens.radius('md');
      background: none;
      cursor: pointer;
      color: tokens.color('text');

      &:hover {
        background: tokens.color('surface-alt');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus');
        outline-offset: 2px;
      }
    }

    &__hamburger-bars {
      position: relative;
      inline-size: 1.25rem;
      block-size: 2px;
      background: currentcolor;
      display: block;

      &::before,
      &::after {
        content: '';
        position: absolute;
        inset-inline: 0;
        block-size: 2px;
        background: currentcolor;
      }
      &::before {
        inset-block-start: -6px;
      }
      &::after {
        inset-block-start: 6px;
      }
    }

    // The single scroll region — sidebar and topbar stay put.
    &__content {
      flex: 1 1 auto;
      overflow-y: auto;
      padding: tokens.space('lg');
      color: tokens.color('text');
    }
  }
</style>
