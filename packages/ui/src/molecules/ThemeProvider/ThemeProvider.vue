<!--
  ThemeProvider Component
  
  PERFORMANCE NOTE: Theme transitions are now opt-in via utility classes.
  Instead of applying transitions to ALL elements (*), use these classes:
  - .haspen-transition-colors: For background, border, text color transitions
  - .haspen-transition-fill: For SVG fill/stroke transitions  
  - .haspen-transition-shadow: For box-shadow transitions
  - .haspen-transition-all: For all theme-related transitions
  
  This prevents performance issues on complex pages with many elements.
-->
<template>
  <div
    :class="[
      'haspen-theme-provider',
      {
        'haspen-theme-provider--transitions': enableTransitions,
      },
    ]"
    :data-theme="theme.mode"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    provide,
    ref,
    watch,
  } from 'vue';
  import type {
    ThemeProviderProps,
    ThemeProviderContext,
    ThemeMode,
    Theme,
  } from '@ipeeon/core';
  import { THEME_INJECTION_KEY } from '@ipeeon/core';
  import { lightTheme, darkTheme } from './themes';
  import {
    applyThemeToDOM,
    getSystemThemeMode,
    getStoredThemeMode,
    storeThemeMode,
    mergeThemes,
  } from './utils';

  const props = withDefaults(defineProps<ThemeProviderProps>(), {
    mode: 'auto',
    enableTransitions: true,
    persistMode: true,
    storageKey: 'haspen-ui-theme-mode',
  });

  const currentMode = ref<ThemeMode>(props.mode);
  const mediaQueryList = ref<MediaQueryList>();

  const resolvedMode = computed<'light' | 'dark'>(() => {
    if (currentMode.value === 'auto') {
      return getSystemThemeMode();
    }
    return currentMode.value;
  });

  const theme = computed<Theme>(() => {
    const baseTheme = resolvedMode.value === 'dark' ? darkTheme : lightTheme;
    return mergeThemes(baseTheme, props.theme);
  });

  const isDark = computed(() => resolvedMode.value === 'dark');
  const isLight = computed(() => resolvedMode.value === 'light');

  function setMode(mode: ThemeMode): void {
    currentMode.value = mode;

    if (props.persistMode) {
      storeThemeMode(props.storageKey, mode);
    }
  }

  function toggleMode(): void {
    if (currentMode.value === 'auto') {
      setMode(resolvedMode.value === 'dark' ? 'light' : 'dark');
    } else {
      setMode(currentMode.value === 'dark' ? 'light' : 'dark');
    }
  }

  function applyTheme(): void {
    applyThemeToDOM(theme.value);
  }

  function handleSystemThemeChange(_event: MediaQueryListEvent): void {
    // Only apply changes if we're in auto mode
    if (currentMode.value === 'auto') {
      applyTheme();
    }
  }

  // Initialize theme on mount
  onMounted(() => {
    // Load persisted theme mode
    if (props.persistMode) {
      const storedMode = getStoredThemeMode(props.storageKey);
      if (storedMode) {
        currentMode.value = storedMode;
      }
    }

    // Listen to system theme changes
    if (typeof window !== 'undefined') {
      mediaQueryList.value = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQueryList.value.addEventListener('change', handleSystemThemeChange);
    }

    // Apply initial theme
    applyTheme();
  });

  onBeforeUnmount(() => {
    if (mediaQueryList.value) {
      mediaQueryList.value.removeEventListener(
        'change',
        handleSystemThemeChange,
      );
    }
  });

  // Watch for theme changes and apply to DOM
  watch(theme, applyTheme, { deep: true, immediate: false });

  // Watch for prop changes and update current mode
  watch(
    () => props.mode,
    newMode => {
      currentMode.value = newMode;
    },
    { immediate: true },
  );

  // Provide theme context
  const themeContext: ThemeProviderContext = {
    theme: computed(() => theme.value),
    mode: computed(() => currentMode.value),
    isDark,
    isLight,
    setMode,
    toggleMode,
    applyTheme,
  };

  provide(THEME_INJECTION_KEY, themeContext);
</script>

<style lang="scss">
  .haspen-theme-provider {
    &--transitions {
      // Utility classes for theme transitions - apply only where needed
      .haspen-transition-colors {
        transition-property: background-color, border-color, color;
        transition-timing-function: var(
          --haspen-transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--haspen-transition-duration-fast, 150ms);
      }

      .haspen-transition-fill {
        transition-property: fill, stroke;
        transition-timing-function: var(
          --haspen-transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--haspen-transition-duration-fast, 150ms);
      }

      .haspen-transition-shadow {
        transition-property: box-shadow;
        transition-timing-function: var(
          --haspen-transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--haspen-transition-duration-fast, 150ms);
      }

      .haspen-transition-all {
        transition-property:
          background-color, border-color, color, fill, stroke, box-shadow;
        transition-timing-function: var(
          --haspen-transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--haspen-transition-duration-fast, 150ms);
      }
    }
  }

  // Base theme variables with modern CSS light-dark() support
  :root {
    // Set color scheme preference for better native support
    color-scheme: light dark;

    // Modern light-dark() function for automatic theme switching
    // Colors - WCAG 2.1 AA compliant (4.5:1 normal text, 3:1 large text)
    --haspen-color-primary: light-dark(#0059b3, #1565c0);
    --haspen-color-secondary: light-dark(#6c757d, #adb5bd);
    --haspen-color-tertiary: light-dark(#17a2b8, #26c6da);
    --haspen-color-error: light-dark(#d32f2f, #f44336);
    --haspen-color-warning: light-dark(#d84315, #ff9800);
    --haspen-color-success: light-dark(#2e7d32, #4caf50);
    --haspen-color-info: light-dark(#01579b, #03a9f4);
    --haspen-color-neutral: light-dark(#757575, #9e9e9e);
    --haspen-color-background: light-dark(#ffffff, #121212);
    --haspen-color-surface: light-dark(#f5f5f5, #1e1e1e);
    --haspen-color-text: light-dark(#212529, #ffffff);
    --haspen-color-textSecondary: light-dark(#6c757d, #adb5bd);
    --haspen-color-border: light-dark(#757575, #757575);
    --haspen-color-divider: light-dark(#9e9e9e, #616161);

    // Spacing
    --haspen-spacing-xs: 0.25rem;
    --haspen-spacing-sm: 0.5rem;
    --haspen-spacing-md: 1rem;
    --haspen-spacing-lg: 1.5rem;
    --haspen-spacing-xl: 2rem;
    --haspen-spacing-2xl: 3rem;
    --haspen-spacing-3xl: 4rem;
    --haspen-spacing-4xl: 5rem;

    // Typography
    --haspen-font-family-base:
      'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif;
    --haspen-font-family-heading:
      'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif;
    --haspen-font-family-mono: 'IBM Plex Mono', 'Courier New', monospace;

    --haspen-font-size-xs: 0.75rem;
    --haspen-font-size-sm: 0.875rem;
    --haspen-font-size-base: 1rem;
    --haspen-font-size-lg: 1.125rem;
    --haspen-font-size-xl: 1.25rem;
    --haspen-font-size-2xl: 1.5rem;
    --haspen-font-size-3xl: 1.875rem;
    --haspen-font-size-4xl: 2.25rem;
    --haspen-font-size-5xl: 3rem;

    --haspen-font-weight-thin: 100;
    --haspen-font-weight-light: 300;
    --haspen-font-weight-normal: 400;
    --haspen-font-weight-medium: 500;
    --haspen-font-weight-semibold: 600;
    --haspen-font-weight-bold: 700;
    --haspen-font-weight-extrabold: 800;

    --haspen-line-height-none: 1;
    --haspen-line-height-tight: 1.25;
    --haspen-line-height-snug: 1.375;
    --haspen-line-height-normal: 1.5;
    --haspen-line-height-relaxed: 1.625;
    --haspen-line-height-loose: 2;

    // Shadows
    --haspen-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --haspen-shadow-sm:
      0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --haspen-shadow-md:
      0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --haspen-shadow-lg:
      0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --haspen-shadow-xl:
      0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --haspen-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --haspen-shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    --haspen-shadow-none: none;

    // Radius
    --haspen-radius-none: 0;
    --haspen-radius-xs: 0.125rem;
    --haspen-radius-sm: 0.25rem;
    --haspen-radius-md: 0.375rem;
    --haspen-radius-lg: 0.5rem;
    --haspen-radius-xl: 0.75rem;
    --haspen-radius-2xl: 1rem;
    --haspen-radius-3xl: 1.5rem;
    --haspen-radius-full: 9999px;

    // Transitions
    --haspen-transition-duration-fast: 150ms;
    --haspen-transition-duration-base: 300ms;
    --haspen-transition-duration-slow: 500ms;

    --haspen-transition-timing-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --haspen-transition-timing-easeIn: cubic-bezier(0.4, 0, 1, 1);
    --haspen-transition-timing-easeOut: cubic-bezier(0, 0, 0.2, 1);
    --haspen-transition-timing-easeInOut: cubic-bezier(0.4, 0, 0.2, 1);
    --haspen-transition-timing-linear: linear;
  }

  // Legacy data-attribute overrides for manual theme control
  // These provide fallback support for browsers without light-dark() and explicit theme switching
  [data-theme='dark'] {
    color-scheme: dark;
    --haspen-color-primary: #1565c0;
    --haspen-color-secondary: #adb5bd;
    --haspen-color-tertiary: #26c6da;
    --haspen-color-error: #f44336;
    --haspen-color-warning: #ff9800;
    --haspen-color-success: #4caf50;
    --haspen-color-info: #03a9f4;
    --haspen-color-neutral: #9e9e9e;
    --haspen-color-background: #121212;
    --haspen-color-surface: #1e1e1e;
    --haspen-color-text: #ffffff;
    --haspen-color-textSecondary: #adb5bd;
    --haspen-color-border: #757575;
    --haspen-color-divider: #616161;
  }

  [data-theme='light'] {
    color-scheme: light;
    --haspen-color-primary: #0059b3;
    --haspen-color-secondary: #6c757d;
    --haspen-color-tertiary: #17a2b8;
    --haspen-color-error: #d32f2f;
    --haspen-color-warning: #d84315;
    --haspen-color-success: #2e7d32;
    --haspen-color-info: #01579b;
    --haspen-color-neutral: #757575;
    --haspen-color-background: #ffffff;
    --haspen-color-surface: #f5f5f5;
    --haspen-color-text: #212529;
    --haspen-color-textSecondary: #6c757d;
    --haspen-color-border: #757575;
    --haspen-color-divider: #9e9e9e;
  }

  // Auto mode: respects system preference via light-dark() function
  [data-theme='auto'] {
    color-scheme: light dark;
    // light-dark() values are already set in :root, no overrides needed
  }
</style>
