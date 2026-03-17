<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { GTIcon } from '../../atoms/Icon';
  import type { CardProps } from './types';

  withDefaults(defineProps<CardProps>(), {
    variant: 'raised',
    nav: false,
    href: undefined,
    external: false,
    horizontal: false,
    subheading: undefined,
    image: undefined,
    imageAlt: undefined,
    imageAspect: undefined,
    ariaLabel: undefined,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-card`);
</script>

<template>
  <component
    :is="nav ? 'a' : 'article'"
    :href="nav ? href : undefined"
    :target="nav && external ? '_blank' : undefined"
    :rel="nav && external ? 'noopener noreferrer' : undefined"
    :class="[
      base,
      `${base}--${variant}`,
      { [`${base}--nav`]: nav },
      { [`${base}--horizontal`]: horizontal },
    ]"
    :aria-label="ariaLabel"
  >
    <div v-if="$slots.media || image" :class="`${base}__media`">
      <slot name="media">
        <img
          :src="image"
          :alt="imageAlt || ''"
          :style="imageAspect ? { aspectRatio: imageAspect } : undefined"
        />
      </slot>
    </div>

    <div :class="`${base}__content`">
      <span v-if="subheading" :class="`${base}__subheading`">
        {{ subheading }}
      </span>
      <h3 :class="`${base}__title`">{{ title }}</h3>
      <div v-if="$slots.default" :class="`${base}__body`">
        <slot />
      </div>
      <div v-if="$slots.footer" :class="`${base}__footer`">
        <slot name="footer" />
      </div>
    </div>

    <GTIcon
      v-if="nav"
      :name="external ? 'external-link' : 'arrow-right'"
      size="sm"
      :class="`${base}__arrow`"
    />
  </component>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-card {
    display: flex;
    flex-direction: column;
    border-radius: tokens.radius('lg');
    background: tokens.color('surface-raised');
    overflow: hidden;

    &__media {
      aspect-ratio: 16 / 9;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: tokens.space('xs');
      padding: tokens.space('lg');
    }

    &__subheading {
      font-size: tokens.font-size('sm');
      font-weight: tokens.font-weight('medium');
      color: tokens.color('text-secondary');
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &__title {
      font-size: tokens.font-size('lg');
      font-weight: tokens.font-weight('semibold');
      line-height: tokens.line-height('tight');
      margin: 0;
    }

    &__body {
      font-size: tokens.font-size('sm');
      color: tokens.color('text-secondary');
      line-height: tokens.line-height('base');

      p {
        margin: 0;
      }
    }

    &__footer {
      margin-top: auto;
      padding-top: tokens.space('md');
    }

    &__arrow {
      position: absolute;
      bottom: tokens.space('lg');
      right: tokens.space('lg');
    }

    // Variants
    &--bordered {
      background: tokens.color('surface');
      border: 1px solid tokens.color('border-light');
    }

    &--flat {
      background: transparent;
      border: none;
    }

    // Navigation card
    &--nav {
      text-decoration: none;
      color: inherit;
      position: relative;
      cursor: pointer;
      transition:
        box-shadow tokens.duration('fast') tokens.ease('out'),
        transform tokens.duration('fast') tokens.ease('out');

      &:hover,
      &:focus-visible {
        box-shadow: tokens.shadow('lg');
        transform: translateY(-2px);
      }

      &:focus-visible {
        outline: 3px solid tokens.color('focus-ring');
        outline-offset: 2px;
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
          transform: none;
        }
      }

      // Only underline the title — explicitly reset everything else
      .#{$prefix}-card__subheading,
      .#{$prefix}-card__body,
      .#{$prefix}-card__footer {
        text-decoration: none;
      }

      .#{$prefix}-card__title {
        text-decoration: underline;
      }
    }

    // Horizontal layout
    &--horizontal {
      flex-direction: row;

      .#{$prefix}-card__media {
        width: 40%;
        max-width: 300px;
        aspect-ratio: auto;
        flex-shrink: 0;

        img {
          height: 100%;
        }
      }

      @media (max-width: 30rem) {
        flex-direction: column;

        .#{$prefix}-card__media {
          width: 100%;
          max-width: none;
          aspect-ratio: 16 / 9;
        }
      }
    }
  }
</style>
