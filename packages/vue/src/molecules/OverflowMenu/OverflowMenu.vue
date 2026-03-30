<script setup lang="ts">
  import { computed, ref, nextTick, onBeforeUnmount } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { OverflowMenuProps, OverflowMenuItem } from './types';

  const props = withDefaults(defineProps<OverflowMenuProps>(), {
    label: undefined,
    align: 'right',
    ariaLabel: 'Flere muligheder',
  });

  const emit = defineEmits<{
    select: [item: OverflowMenuItem];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-overflow-menu`);

  const menuId = generateId('overflow');
  const isOpen = ref(false);
  const triggerRef = ref<HTMLElement | null>(null);
  const panelRef = ref<HTMLElement | null>(null);
  const panelPosition = ref<Record<string, string>>({});

  function toggle() {
    if (isOpen.value) close();
    else open();
  }

  function computePosition() {
    if (!triggerRef.value) return;
    const rect = triggerRef.value.getBoundingClientRect();
    const viewH = window.innerHeight;
    const viewW = window.innerWidth;
    const style: Record<string, string> = { display: 'block' };

    // Vertical: open upward if trigger is in the bottom 40% of viewport
    if (rect.bottom > viewH * 0.6) {
      style.bottom = '100%';
      style.top = 'auto';
      style.marginBottom = '0.125rem';
      style.marginTop = '0';
    } else {
      style.top = '100%';
      style.bottom = 'auto';
      style.marginTop = '0.125rem';
      style.marginBottom = '0';
    }

    // Horizontal: flip to left-aligned if trigger is in the right 30% of viewport
    if (props.align === 'left' || rect.left < viewW * 0.3) {
      style.left = '0';
      style.right = 'auto';
    } else {
      style.right = '0';
      style.left = 'auto';
    }

    panelPosition.value = style;
  }

  function open() {
    isOpen.value = true;
    document.addEventListener('click', onOutsideClick);
    nextTick(() => {
      computePosition();
      const first = panelRef.value?.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      );
      first?.focus();
    });
  }

  function close() {
    isOpen.value = false;
    document.removeEventListener('click', onOutsideClick);
    triggerRef.value?.focus();
  }

  function onOutsideClick(e: Event) {
    const target = e.target as HTMLElement;
    if (triggerRef.value?.contains(target) || panelRef.value?.contains(target))
      return;
    close();
  }

  function onSelect(item: OverflowMenuItem) {
    if (item.disabled) return;
    emit('select', item);
    close();
  }

  function onKeydown(e: Event) {
    const ke = e as { key?: string };
    if (!ke.key) return;
    const items = Array.from(
      panelRef.value?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      ) ?? [],
    );
    const idx = items.indexOf(document.activeElement as HTMLElement);

    switch (ke.key) {
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        items[(idx + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
    }
  }

  onBeforeUnmount(() => {
    document.removeEventListener('click', onOutsideClick);
  });
</script>

<template>
  <div
    :class="[
      base,
      {
        [`${base}--open`]: isOpen,
        [`${base}--bordered`]: !!label,
      },
    ]"
    @keydown="onKeydown"
  >
    <button
      ref="triggerRef"
      :class="`${base}__trigger`"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      :aria-controls="menuId"
      :aria-label="label ? undefined : ariaLabel"
      @click.stop="toggle"
    >
      <span v-if="label">{{ label }}</span>
      <span v-else aria-hidden="true">&#x22EF;</span>
    </button>

    <div
      v-if="isOpen"
      :id="menuId"
      ref="panelRef"
      :class="`${base}__panel`"
      role="menu"
      :style="panelPosition"
    >
      <ul :class="`${base}__list`">
        <li v-for="(item, i) in items" :key="i" :class="`${base}__item`">
          <component
            :is="item.href ? 'a' : 'button'"
            :href="item.href"
            :class="[
              `${base}__link`,
              {
                [`${base}__link--active`]: item.active,
                [`${base}__link--danger`]: item.danger,
                [`${base}__link--disabled`]: item.disabled,
              },
            ]"
            role="menuitem"
            :tabindex="item.disabled ? -1 : 0"
            :aria-disabled="item.disabled || undefined"
            @click.prevent="onSelect(item)"
          >
            {{ item.label }}
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-overflow-menu {
    position: relative;
    display: inline-block;

    &__trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: tokens.space('xs');
      background: none;
      border: none;
      border-radius: tokens.radius('md');
      padding: tokens.space('xs') tokens.space('sm');
      cursor: pointer;
      color: tokens.color('text-secondary');
      font-size: tokens.font-size('sm');
      font-weight: tokens.font-weight('medium');
      line-height: 1;
      min-width: 2rem;
      min-height: 2rem;
      transition:
        color tokens.duration('fast') tokens.ease('ease'),
        background-color tokens.duration('fast') tokens.ease('ease');

      &:hover {
        color: tokens.color('text');
        background: tokens.color('surface-alt');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
      }
    }

    &--bordered &__trigger {
      border: 1px solid tokens.color('border-medium');
    }

    &__panel {
      position: absolute;
      top: 100%;
      margin-top: 0.125rem;
      min-width: 10rem;
      background: tokens.color('surface');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('md');
      box-shadow: tokens.shadow('lg');
      z-index: tokens.z-index('dropdown');
      display: none;
      right: 0;
    }

    &--left .#{$prefix}-overflow-menu__panel {
      right: auto;
      left: 0;
    }

    &--open .#{$prefix}-overflow-menu__panel {
      display: block;
    }

    &__list {
      list-style: none !important;
      margin: 0;
      padding: 0.5rem 0;
      padding-left: 0;
    }

    &__item {
      margin: 0;
      padding: 0;
      list-style: none;

      &::before,
      &::marker {
        content: none;
      }
    }

    &__divider {
      height: 0;
      margin: 0.5rem 0;
      border: 0;
      border-top: 1px solid tokens.color('border-medium');
    }

    &__link {
      display: flex;
      align-items: center;
      gap: tokens.space('sm');
      width: 100%;
      padding: 0.375rem 1rem;
      background: none;
      border: none;
      color: tokens.color('text');
      font-size: tokens.font-size('sm');
      text-decoration: none;
      cursor: pointer;
      text-align: left;
      white-space: nowrap;
      line-height: tokens.line-height('normal');
      border-radius: 0;
      transition: background-color tokens.duration('fast') tokens.ease('ease');

      &:hover {
        background: tokens.color('surface-alt');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: -2px;
        background: tokens.color('surface-alt');
      }

      &--active {
        font-weight: tokens.font-weight('semibold');
        color: tokens.color('primary');

        &::before {
          content: '\2713';
          display: inline-block;
          width: 1.25em;
          flex-shrink: 0;
        }
      }

      &--danger {
        color: tokens.color('error');

        &:hover {
          background: color-mix(in srgb, tokens.color('error') 8%, transparent);
        }
      }

      &--disabled {
        color: tokens.color('text-secondary');
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
</style>
