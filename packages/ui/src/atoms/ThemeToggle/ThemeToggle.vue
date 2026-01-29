<template>
  <button
    type="button"
    :class="[
      'theme-toggle',
      `theme-toggle--${variant}`,
      `theme-toggle--${size}`,
      {
        'theme-toggle--disabled': disabled,
      },
    ]"
    :aria-label="ariaLabel"
    :aria-pressed="isDark"
    :disabled="disabled"
    @click="handleToggle"
  >
    <span class="theme-toggle__track">
      <span
        class="theme-toggle__thumb"
        :style="{ transform: `translateX(${thumbPosition}px)` }"
      >
        <Transition name="icon-fade" mode="out-in">
          <SunIcon
            v-if="!isDark"
            key="sun"
            class="theme-toggle__icon theme-toggle__icon--sun"
            :size="iconSize"
          />
          <MoonIcon
            v-else
            key="moon"
            class="theme-toggle__icon theme-toggle__icon--moon"
            :size="iconSize"
          />
        </Transition>
      </span>
    </span>

    <span v-if="showLabel" class="theme-toggle__label">
      {{ isDark ? darkLabel : lightLabel }}
    </span>
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTheme } from '@ipeeon/composables';
  import type { ThemeToggleProps } from './types';

  // Icons - can use either individual components or the configurable system
  import SunIcon from '../Icon/SunIcon.vue';
  import MoonIcon from '../Icon/MoonIcon.vue';
  // Alternative: import { Icon } from '../Icon'; for configurable system

  const props = withDefaults(defineProps<ThemeToggleProps>(), {
    variant: 'default',
    size: 'md',
    showLabel: false,
    disabled: false,
    lightLabel: 'Light mode',
    darkLabel: 'Dark mode',
    ariaLabel: 'Toggle theme',
  });

  const emit = defineEmits<{
    toggle: [isDark: boolean];
    change: [mode: 'light' | 'dark'];
  }>();

  // Theme integration
  const { isDark, toggleMode } = useTheme();

  // Removed artificial loading state - CSS handles transitions

  // Computed properties for styling and behavior
  const ariaLabel = computed(() => {
    if (props.ariaLabel) return props.ariaLabel;
    return isDark.value ? 'Switch to light mode' : 'Switch to dark mode';
  });

  const thumbPosition = computed(() => {
    const baseSize = props.size === 'sm' ? 20 : props.size === 'lg' ? 28 : 24;
    return isDark.value ? baseSize : 0;
  });

  const iconSize = computed(() => {
    const sizeMap = {
      sm: 12,
      md: 16,
      lg: 20,
    };
    return sizeMap[props.size];
  });

  // Toggle handler with instant response
  const handleToggle = () => {
    if (props.disabled) return;

    // Instant theme toggle - CSS handles the smooth animation
    toggleMode();

    emit('toggle', isDark.value);
    emit('change', isDark.value ? 'dark' : 'light');
  };
</script>

<script lang="ts">
  export default {
    name: 'ThemeToggle',
  };
</script>

<style lang="scss" scoped>
  @use './ThemeToggle.scss';
</style>
