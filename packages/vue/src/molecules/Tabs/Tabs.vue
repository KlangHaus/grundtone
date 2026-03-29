<script setup lang="ts">
  import { computed, ref, provide, watch } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { GTIcon } from '../../atoms/Icon';
  import type { TabsProps } from './types';

  const props = withDefaults(defineProps<TabsProps>(), {
    modelValue: undefined,
    variant: 'underline',
    ariaLabel: 'Faner',
  });

  const emit = defineEmits<{
    'update:modelValue': [id: string];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-tabs`);

  // Internal active state — syncs with v-model or defaults to first tab
  const activeTab = ref(props.modelValue ?? props.tabs[0]?.id ?? '');

  watch(
    () => props.modelValue,
    val => {
      if (val !== undefined) activeTab.value = val;
    },
  );

  const slideDirection = ref<'left' | 'right'>('right');

  provide('gt-tabs-active', activeTab);
  provide('gt-tabs-direction', slideDirection);

  function selectTab(id: string) {
    const ids = props.tabs.map(t => t.id);
    const oldIndex = ids.indexOf(activeTab.value);
    const newIndex = ids.indexOf(id);
    slideDirection.value = newIndex > oldIndex ? 'right' : 'left';
    activeTab.value = id;
    emit('update:modelValue', id);
  }

   
  function handleKeydown(event: KeyboardEvent) {
    const ids = props.tabs.map(t => t.id);
    const currentIndex = ids.indexOf(activeTab.value);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % ids.length;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = (currentIndex - 1 + ids.length) % ids.length;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = ids.length - 1;
        break;
      default:
        return;
    }

    selectTab(ids[nextIndex]);

    // Focus the new active tab button
    const el = document.getElementById(`tab-${ids[nextIndex]}`);
    el?.focus();
  }
</script>

<template>
  <div :class="[base, `${base}--${variant}`]">
    <div
      :class="`${base}__list`"
      role="tablist"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :id="`tab-${tab.id}`"
        type="button"
        role="tab"
        :class="[
          `${base}__tab`,
          { [`${base}__tab--active`]: activeTab === tab.id },
        ]"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="activeTab === tab.id ? 0 : -1"
        @click="selectTab(tab.id)"
      >
        <GTIcon
          v-if="tab.icon"
          :name="tab.icon"
          size="sm"
          :class="`${base}__icon`"
        />
        {{ tab.label }}
      </button>
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-tabs {
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('base');

    &__list {
      display: flex;
      gap: 0;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__tab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: tokens.space('xs');
      padding: tokens.space('sm') tokens.space('md');
      min-height: 2.5rem;
      border: none;
      background: none;
      cursor: pointer;
      font-family: tokens.font-family('base');
      font-size: tokens.font-size('sm');
      font-weight: tokens.font-weight('medium');
      color: tokens.color('text-secondary');
      white-space: nowrap;
      transition:
        color tokens.duration('fast') tokens.ease('out'),
        background tokens.duration('fast') tokens.ease('out'),
        border-color tokens.duration('fast') tokens.ease('out'),
        box-shadow tokens.duration('fast') tokens.ease('out');

      &:hover {
        color: tokens.color('text');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: -2px;
        border-radius: tokens.radius('sm');
      }
    }

    &__icon {
      flex-shrink: 0;
    }

    &__panel {
      padding-top: tokens.space('lg');
    }

    // Slide transitions
    &__slide-right-enter-active,
    &__slide-right-leave-active,
    &__slide-left-enter-active,
    &__slide-left-leave-active {
      transition:
        opacity tokens.duration('fast') tokens.ease('out'),
        transform tokens.duration('fast') tokens.ease('out');
    }

    &__slide-right-enter-from {
      opacity: 0;
      transform: translateX(16px);
    }

    &__slide-right-leave-to {
      opacity: 0;
      transform: translateX(-16px);
    }

    &__slide-left-enter-from {
      opacity: 0;
      transform: translateX(-16px);
    }

    &__slide-left-leave-to {
      opacity: 0;
      transform: translateX(16px);
    }

    // Underline
    &--underline {
      .#{$prefix}-tabs__list {
        border-bottom: 1px solid tokens.color('border-light');
        gap: tokens.space('xs');
      }

      .#{$prefix}-tabs__tab {
        position: relative;
        padding-bottom: calc(#{tokens.space('sm')} + 2px);
        border-radius: tokens.radius('sm') tokens.radius('sm') 0 0;

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: transparent;
          transition: background tokens.duration('fast') tokens.ease('out');
        }

        &--active {
          color: tokens.color('text');
          font-weight: tokens.font-weight('semibold');

          &::after {
            background: tokens.color('primary');
          }
        }
      }
    }

    // Segment
    &--segment {
      .#{$prefix}-tabs__list {
        background: tokens.color('surface-alt');
        border-radius: tokens.radius('lg');
        padding: 3px;
        gap: 2px;
      }

      .#{$prefix}-tabs__tab {
        flex: 1;
        border-radius: calc(#{tokens.radius('lg')} - 2px);
        padding: tokens.space('xs') tokens.space('md');

        &--active {
          color: tokens.color('text');
          font-weight: tokens.font-weight('semibold');
          background: tokens.color('surface');
          box-shadow: tokens.shadow('xs');
        }
      }
    }

    // Pill
    &--pill {
      .#{$prefix}-tabs__list {
        gap: tokens.space('xs');
      }

      .#{$prefix}-tabs__tab {
        border-radius: tokens.radius('full');
        padding: tokens.space('xs') tokens.space('lg');

        &--active {
          color: tokens.color('on-primary');
          font-weight: tokens.font-weight('semibold');
          background: tokens.color('primary');
        }

        &:hover:not(.#{$prefix}-tabs__tab--active) {
          background: tokens.color('surface-alt');
        }
      }
    }
  }
</style>
