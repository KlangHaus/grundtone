<template>
  <component
    :is="iconComponent"
    :size="size"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel"
    :class="['icon', iconClass]"
  />
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { ICON_PROVIDER_KEY, type IconConfig } from './provider';
  import type { IconProps } from './types';
  import { logger } from '../../utils/error-handling';

  interface Props extends IconProps {
    /**
     * Name of the icon to render
     */
    name: string;
  }

  const {
    name,
    size = 16,
    ariaHidden = true,
    ariaLabel,
  } = defineProps<Props>();

  // Get icon configuration from provider
  const iconConfig = inject<IconConfig>(ICON_PROVIDER_KEY, {
    icons: {},
    prefix: '',
    defaultSize: 16,
  });

  // Get the icon component - simplified to only support custom icons
  const iconComponent = computed(() => {
    const customIcon = iconConfig.icons[name];
    if (!customIcon) {
      logger.warn(`Icon "${name}" not found in custom library`, {
        component: 'Icon',
        action: 'loadIcon',
        severity: 'low',
        metadata: {
          iconName: name,
          availableIcons: Object.keys(iconConfig.icons),
        },
      });
      return null;
    }
    return customIcon;
  });

  // Generate CSS class for styling
  const iconClass = computed(() => {
    const classes = [`icon--${name}`];

    if (iconConfig.prefix) {
      classes.push(`${iconConfig.prefix}-${name}`);
    }

    return classes.join(' ');
  });
</script>

<script lang="ts">
  export default {
    name: 'Icon',
  };
</script>

<style lang="scss" scoped>
  .icon {
    display: inline-block;
    vertical-align: middle;
    color: currentColor;
    fill: currentColor;
    transition: all 0.2s ease;

    // Base icon styling
    &:not(:last-child) {
      margin-right: 0.5rem;
    }

    // Icon variants can be styled by name
    // e.g. &--sun, &--moon, etc.
  }
</style>
