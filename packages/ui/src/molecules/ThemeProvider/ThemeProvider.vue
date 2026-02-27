<!--
  ThemeProvider Component
  
  PERFORMANCE NOTE: Theme transitions are now opt-in via utility classes.
  Instead of applying transitions to ALL elements (*), use these classes:
  - .grundtone-transition-colors: For background, border, text color transitions
  - .grundtone-transition-fill: For SVG fill/stroke transitions  
  - .grundtone-transition-shadow: For box-shadow transitions
  - .grundtone-transition-all: For all theme-related transitions
  
  This prevents performance issues on complex pages with many elements.
-->
<template>
  <div
    :class="[
      'grundtone-theme-provider',
      {
        'grundtone-theme-provider--transitions': enableTransitions,
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
  } from '@grundtone/core';
  import { THEME_INJECTION_KEY } from '@grundtone/core';
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
    storageKey: 'grundtone-theme-mode',
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
  .grundtone-theme-provider {
    &--transitions {
      // Utility classes for theme transitions - apply only where needed
      .grundtone-transition-colors {
        transition-property: background-color, border-color, color;
        transition-timing-function: var(
          --grundtone-transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--grundtone-transition-duration-fast, 150ms);
      }

      .grundtone-transition-fill {
        transition-property: fill, stroke;
        transition-timing-function: var(
          --grundtone-transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--grundtone-transition-duration-fast, 150ms);
      }

      .grundtone-transition-shadow {
        transition-property: box-shadow;
        transition-timing-function: var(
          --grundtone-transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--grundtone-transition-duration-fast, 150ms);
      }

      .grundtone-transition-all {
        transition-property:
          background-color, border-color, color, fill, stroke, box-shadow;
        transition-timing-function: var(
          --grundtone-transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--grundtone-transition-duration-fast, 150ms);
      }
    }
  }

  // Base theme variables with modern CSS light-dark() support
  :root {
    // Set color scheme preference for better native support
    color-scheme: light dark;

    // Modern light-dark() function for automatic theme switching
    // Colors - WCAG 2.1 AA compliant (4.5:1 normal text, 3:1 large text)
    --grundtone-color-primary: light-dark(#0059b3, #1565c0);
    --grundtone-color-secondary: light-dark(#6c757d, #adb5bd);
    --grundtone-color-tertiary: light-dark(#17a2b8, #26c6da);
    --grundtone-color-error: light-dark(#d32f2f, #f44336);
    --grundtone-color-warning: light-dark(#d84315, #ff9800);
    --grundtone-color-success: light-dark(#2e7d32, #4caf50);
    --grundtone-color-info: light-dark(#01579b, #03a9f4);
    --grundtone-color-neutral: light-dark(#757575, #9e9e9e);
    --grundtone-color-background: light-dark(#ffffff, #121212);
    --grundtone-color-surface: light-dark(#f5f5f5, #1e1e1e);
    --grundtone-color-text: light-dark(#212529, #ffffff);
    --grundtone-color-textSecondary: light-dark(#6c757d, #adb5bd);
    --grundtone-color-border: light-dark(#757575, #757575);
    --grundtone-color-divider: light-dark(#9e9e9e, #616161);

    // Spacing
    --grundtone-spacing-xs: 0.25rem;
    --grundtone-spacing-sm: 0.5rem;
    --grundtone-spacing-md: 1rem;
    --grundtone-spacing-lg: 1.5rem;
    --grundtone-spacing-xl: 2rem;
    --grundtone-spacing-2xl: 3rem;
    --grundtone-spacing-3xl: 4rem;
    --grundtone-spacing-4xl: 5rem;

    // Typography
    --grundtone-font-family-base:
      'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif;
    --grundtone-font-family-heading:
      'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif;
    --grundtone-font-family-mono: 'IBM Plex Mono', 'Courier New', monospace;

    --grundtone-font-size-xs: 0.75rem;
    --grundtone-font-size-sm: 0.875rem;
    --grundtone-font-size-base: 1rem;
    --grundtone-font-size-lg: 1.125rem;
    --grundtone-font-size-xl: 1.25rem;
    --grundtone-font-size-2xl: 1.5rem;
    --grundtone-font-size-3xl: 1.875rem;
    --grundtone-font-size-4xl: 2.25rem;
    --grundtone-font-size-5xl: 3rem;

    --grundtone-font-weight-thin: 100;
    --grundtone-font-weight-light: 300;
    --grundtone-font-weight-normal: 400;
    --grundtone-font-weight-medium: 500;
    --grundtone-font-weight-semibold: 600;
    --grundtone-font-weight-bold: 700;
    --grundtone-font-weight-extrabold: 800;

    --grundtone-line-height-none: 1;
    --grundtone-line-height-tight: 1.25;
    --grundtone-line-height-snug: 1.375;
    --grundtone-line-height-normal: 1.5;
    --grundtone-line-height-relaxed: 1.625;
    --grundtone-line-height-loose: 2;

    // Shadows
    --grundtone-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --grundtone-shadow-sm:
      0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --grundtone-shadow-md:
      0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --grundtone-shadow-lg:
      0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --grundtone-shadow-xl:
      0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --grundtone-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --grundtone-shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    --grundtone-shadow-none: none;

    // Radius
    --grundtone-radius-none: 0;
    --grundtone-radius-xs: 0.125rem;
    --grundtone-radius-sm: 0.25rem;
    --grundtone-radius-md: 0.375rem;
    --grundtone-radius-lg: 0.5rem;
    --grundtone-radius-xl: 0.75rem;
    --grundtone-radius-2xl: 1rem;
    --grundtone-radius-3xl: 1.5rem;
    --grundtone-radius-full: 9999px;

    // Transitions
    --grundtone-transition-duration-fast: 150ms;
    --grundtone-transition-duration-base: 300ms;
    --grundtone-transition-duration-slow: 500ms;

    --grundtone-transition-timing-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --grundtone-transition-timing-easeIn: cubic-bezier(0.4, 0, 1, 1);
    --grundtone-transition-timing-easeOut: cubic-bezier(0, 0, 0.2, 1);
    --grundtone-transition-timing-easeInOut: cubic-bezier(0.4, 0, 0.2, 1);
    --grundtone-transition-timing-linear: linear;
  }

  // Legacy data-attribute overrides for manual theme control
  // These provide fallback support for browsers without light-dark() and explicit theme switching
  [data-theme='dark'] {
    color-scheme: dark;
    --grundtone-color-primary: #1565c0;
    --grundtone-color-secondary: #adb5bd;
    --grundtone-color-tertiary: #26c6da;
    --grundtone-color-error: #f44336;
    --grundtone-color-warning: #ff9800;
    --grundtone-color-success: #4caf50;
    --grundtone-color-info: #03a9f4;
    --grundtone-color-neutral: #9e9e9e;
    --grundtone-color-background: #121212;
    --grundtone-color-surface: #1e1e1e;
    --grundtone-color-text: #ffffff;
    --grundtone-color-textSecondary: #adb5bd;
    --grundtone-color-border: #757575;
    --grundtone-color-divider: #616161;
  }

  [data-theme='light'] {
    color-scheme: light;
    --grundtone-color-primary: #0059b3;
    --grundtone-color-secondary: #6c757d;
    --grundtone-color-tertiary: #17a2b8;
    --grundtone-color-error: #d32f2f;
    --grundtone-color-warning: #d84315;
    --grundtone-color-success: #2e7d32;
    --grundtone-color-info: #01579b;
    --grundtone-color-neutral: #757575;
    --grundtone-color-background: #ffffff;
    --grundtone-color-surface: #f5f5f5;
    --grundtone-color-text: #212529;
    --grundtone-color-textSecondary: #6c757d;
    --grundtone-color-border: #757575;
    --grundtone-color-divider: #9e9e9e;
  }

  // Auto mode: respects system preference via light-dark() function
  [data-theme='auto'] {
    color-scheme: light dark;
    // light-dark() values are already set in :root, no overrides needed
  }
</style>
