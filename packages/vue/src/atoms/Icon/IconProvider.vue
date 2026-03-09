<template>
  <slot />
</template>

<script setup lang="ts">
  import { provide } from 'vue';
  import {
    ICON_PROVIDER_KEY,
    createIconConfig,
    type IconConfig,
  } from './provider';

  interface Props {
    /**
     * Custom icon registry
     */
    icons?: Record<string, any>;

    /**
     * CSS class prefix for icons
     */
    prefix?: string;

    /**
     * Default icon size
     */
    defaultSize?: number;

    /**
     * Full configuration object
     */
    config?: Partial<IconConfig>;
  }

  const props = defineProps<Props>();

  // Create icon configuration
  const iconConfig = createIconConfig({
    icons: props.icons || {},
    prefix: props.prefix,
    defaultSize: props.defaultSize,
    ...props.config,
  });

  // Provide configuration to child components
  provide(ICON_PROVIDER_KEY, iconConfig);
</script>

<script lang="ts">
  export default {
    name: 'IconProvider',
  };
</script>
