<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix, getIconColor } from '@grundtone/core';
  import { iconRegistry } from '@grundtone/icons';
  import type { IconDefinition } from '@grundtone/icons';
  import type { IconProps } from './types';

  const props = withDefaults(defineProps<IconProps>(), {
    size: 'lg',
    label: undefined,
    color: undefined,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-icon`);
  const defaultColor = computed(() => getIconColor());

  const customIcon = computed<IconDefinition | null>(() => {
    const icon = iconRegistry[props.name as keyof typeof iconRegistry];
    return icon ?? null;
  });

  const isCustom = computed(() => customIcon.value !== null);

  const resolvedColor = computed(() => props.color ?? defaultColor.value);
  const colorStyle = computed(() =>
    resolvedColor.value !== 'currentColor'
      ? { color: resolvedColor.value }
      : undefined,
  );

  // Warn if icon not found in custom registry
  if (!isCustom.value) {
    // eslint-disable-next-line no-console
    console.warn(`[GTIcon] Icon "${props.name}" not found in custom registry.`);
  }
</script>

<template>
  <svg
    v-if="isCustom"
    :class="[base, `${base}--${size}`]"
    :style="colorStyle"
    :viewBox="customIcon!.viewBox"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-hidden="!label || undefined"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    v-html="customIcon!.body"
  />
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-icon {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
    color: currentColor;

    &--xs {
      width: tokens.icon-size('xs');
      height: tokens.icon-size('xs');
    }

    &--sm {
      width: tokens.icon-size('sm');
      height: tokens.icon-size('sm');
    }

    &--md {
      width: tokens.icon-size('md');
      height: tokens.icon-size('md');
    }

    &--lg {
      width: tokens.icon-size('lg');
      height: tokens.icon-size('lg');
    }

    &--xl {
      width: tokens.icon-size('xl');
      height: tokens.icon-size('xl');
    }

    &--2xl {
      width: tokens.icon-size('2xl');
      height: tokens.icon-size('2xl');
    }
  }
</style>
