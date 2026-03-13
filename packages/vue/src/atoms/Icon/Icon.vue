<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { getClassPrefix, getIconColor } from '@grundtone/core';
  import type { IconDefinition } from '@grundtone/core';
  import type { IconProps } from './types';
  import { GT_ICON_REGISTRY_KEY } from './types';

  const props = withDefaults(defineProps<IconProps>(), {
    icon: undefined,
    name: undefined,
    size: 'lg',
    label: undefined,
    color: undefined,
  });

  const registry = inject(GT_ICON_REGISTRY_KEY, undefined);

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-icon`);
  const defaultColor = computed(() => getIconColor());

  const resolvedIcon = computed<IconDefinition | null>(() => {
    // Direct icon prop takes precedence
    if (props.icon) return props.icon;

    // Fall back to registry lookup by name
    if (props.name && registry) {
      return registry[props.name] ?? null;
    }

    return null;
  });

  const resolvedColor = computed(() => props.color ?? defaultColor.value);
  const colorStyle = computed(() =>
    resolvedColor.value !== 'currentColor'
      ? { color: resolvedColor.value }
      : undefined,
  );

  // Dev warning for missing icon
  if (!resolvedIcon.value) {
    if (props.name && !registry) {
      // eslint-disable-next-line no-console
      console.warn(
        `[GTIcon] No icon registry provided. Use app.provide(GT_ICON_REGISTRY_KEY, registry) or pass the "icon" prop directly.`,
      );
    } else if (props.name) {
      // eslint-disable-next-line no-console
      console.warn(`[GTIcon] Icon "${props.name}" not found in registry.`);
    }
  }
</script>

<template>
  <svg
    v-if="resolvedIcon"
    :class="[base, `${base}--${size}`]"
    :style="colorStyle"
    :viewBox="resolvedIcon.viewBox"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-hidden="!label || undefined"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    v-html="resolvedIcon.body"
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
