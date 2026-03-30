<script setup lang="ts">
  import { computed, ref, useSlots } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { GTButton } from '../../atoms/Button';
  import { GTIcon } from '../../atoms/Icon';
  import type { CookieMessageProps } from './types';

  withDefaults(defineProps<CookieMessageProps>(), {
    heading: undefined,
    icon: undefined,
    acceptLabel: 'Acceptér',
    rejectLabel: undefined,
    settingsLabel: undefined,
    persistent: true,
    ariaLabel: 'Cookiemeddelelse',
  });

  const emit = defineEmits<{
    accept: [];
    reject: [];
    settings: [];
  }>();

  const slots = useSlots();
  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-cookie-message`);

  const settingsOpen = ref(false);

  function toggleSettings() {
    if (slots.settings) {
      settingsOpen.value = !settingsOpen.value;
    } else {
      emit('settings');
    }
  }
</script>

<template>
  <div
    :class="[base, { [`${base}--static`]: !persistent }]"
    role="region"
    :aria-label="ariaLabel"
  >
    <GTIcon v-if="icon" :name="icon" size="lg" :class="`${base}__icon`" />

    <div :class="`${base}__content`">
      <p v-if="heading" :class="`${base}__heading`">{{ heading }}</p>
      <div :class="`${base}__body`">
        <slot />
      </div>
      <div v-if="!$slots.actions" :class="`${base}__actions`">
        <GTButton variant="primary" size="sm" @click="emit('accept')">
          {{ acceptLabel }}
        </GTButton>
        <GTButton
          v-if="rejectLabel"
          variant="secondary"
          size="sm"
          @click="emit('reject')"
        >
          {{ rejectLabel }}
        </GTButton>
        <GTButton
          v-if="settingsLabel"
          variant="tertiary"
          size="sm"
          :aria-expanded="slots.settings ? settingsOpen : undefined"
          @click="toggleSettings"
        >
          {{ settingsLabel }}
        </GTButton>
      </div>
      <div v-else :class="`${base}__actions`">
        <slot name="actions" />
      </div>
      <div v-if="slots.settings && settingsOpen" :class="`${base}__settings`">
        <slot name="settings" />
      </div>
    </div>

    <button
      type="button"
      :class="`${base}__close`"
      aria-label="Luk"
      @click="emit('accept')"
    >
      <GTIcon name="close" size="xs" />
    </button>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-cookie-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: tokens.z-index('fixed');
    display: flex;
    gap: tokens.space('md');
    padding: tokens.space('lg');
    background: tokens.color('surface-overlay');
    border-top: 1px solid tokens.color('border-light');
    box-shadow: tokens.shadow('lg');
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('base');
    color: tokens.color('text');

    &--static {
      position: relative;
      border-top: none;
      border-radius: tokens.radius('lg');
      border: 1px solid tokens.color('border-light');
    }

    &__icon {
      flex-shrink: 0;
      align-self: flex-start;
      margin-top: tokens.space('xs');
    }

    &__content {
      flex: 1;
      min-width: 0;
    }

    &__heading {
      font-weight: tokens.font-weight('semibold');
      margin: 0 0 tokens.space('xs');
    }

    &__body {
      p {
        margin: 0;
      }

      a {
        color: tokens.color('primary');
        text-decoration: underline;
      }
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      gap: tokens.space('sm');
      margin-top: tokens.space('md');
    }

    &__settings {
      margin-top: tokens.space('md');
      padding-top: tokens.space('md');
      border-top: 1px solid tokens.color('border-light');
    }

    &__close {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;

      &:hover,
      &:focus-visible {
        opacity: 1;
      }
    }
  }
</style>
