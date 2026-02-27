<!--
  ThemeProvider Component
  
  PERFORMANCE NOTE: Theme transitions are now opt-in via utility classes.
  Instead of applying transitions to ALL elements (*), use these classes:
  - .transition-colors: For background, border, text color transitions
  - .transition-fill: For SVG fill/stroke transitions  
  - .transition-shadow: For box-shadow transitions
  - .transition-all: For all theme-related transitions
  
  This prevents performance issues on complex pages with many elements.
-->
<template>
  <div
    :class="[
      'theme-provider',
      {
        'theme-provider--transitions': enableTransitions,
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
  .theme-provider {
    &--transitions {
      // Utility classes for theme transitions - apply only where needed
      .transition-colors {
        transition-property: background-color, border-color, color;
        transition-timing-function: var(
          --transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--transition-duration-fast, 150ms);
      }

      .transition-fill {
        transition-property: fill, stroke;
        transition-timing-function: var(
          --transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--transition-duration-fast, 150ms);
      }

      .transition-shadow {
        transition-property: box-shadow;
        transition-timing-function: var(
          --transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--transition-duration-fast, 150ms);
      }

      .transition-all {
        transition-property:
          background-color, border-color, color, fill, stroke, box-shadow;
        transition-timing-function: var(
          --transition-timing-ease,
          cubic-bezier(0.4, 0, 0.2, 1)
        );
        transition-duration: var(--transition-duration-fast, 150ms);
      }
    }
  }

  // Base theme variables – overridden by applyThemeToDOM when ThemeProvider mounts
  // These are fallbacks from defaultColorPreset for initial paint / SSR
  :root {
    color-scheme: light dark;

    --color-primary: light-dark(#0059b3, #4dabf7);
    --color-primary-hover: light-dark(#004a96, #74c0fc);
    --color-primary-active: light-dark(#003a7a, #339af0);
    --color-on-primary: light-dark(#ffffff, #121212);
    --color-secondary: light-dark(#6c757d, #adb5bd);
    --color-secondary-hover: light-dark(#5a6268, #ced4da);
    --color-secondary-active: light-dark(#494f54, #868e96);
    --color-success: light-dark(#198754, #51cf66);
    --color-success-bg: light-dark(#d1e7dd, #1a3d20);
    --color-warning: light-dark(#ffc107, #ffd43b);
    --color-warning-bg: light-dark(#fff3cd, #3d3a1a);
    --color-error: light-dark(#dc3545, #ff6b6b);
    --color-error-bg: light-dark(#f8d7da, #3d1a1c);
    --color-info: light-dark(#0dcaf0, #4dabf7);
    --color-info-bg: light-dark(#cff4fc, #1a2e3d);
    --color-background: light-dark(#ffffff, #121212);
    --color-surface: light-dark(#f8f9fa, #1e1e1e);
    --color-surface-hover: light-dark(#e9ecef, #2a2a2a);
    --color-text: light-dark(#212529, #ffffff);
    --color-text-secondary: light-dark(#6c757d, #b0b0b0);
    --color-text-tertiary: light-dark(#adb5bd, #808080);
    --color-border: light-dark(#dee2e6, #404040);
    --color-border-hover: light-dark(#adb5bd, #606060);
    --color-focus: light-dark(#0059b3, #4dabf7);
    --color-focus-ring: light-dark(
      rgba(0, 89, 179, 0.25),
      rgba(77, 171, 247, 0.25)
    );
    --color-neutral: light-dark(#6c757d, #9e9e9e);

    // Spacing
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    --spacing-4xl: 5rem;

    // Typography
    --font-family-base:
      'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif;
    --font-family-heading:
      'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif;
    --font-family-mono: 'IBM Plex Mono', 'Courier New', monospace;

    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    --font-size-5xl: 3rem;

    --font-weight-thin: 100;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;

    --line-height-none: 1;
    --line-height-tight: 1.25;
    --line-height-snug: 1.375;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.625;
    --line-height-loose: 2;

    // Shadows
    --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-sm:
      0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md:
      0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg:
      0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl:
      0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    --shadow-none: none;

    // Radius
    --radius-none: 0;
    --radius-xs: 0.125rem;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-3xl: 1.5rem;
    --radius-full: 9999px;

    // Transitions
    --transition-duration-fast: 150ms;
    --transition-duration-base: 300ms;
    --transition-duration-slow: 500ms;

    --transition-timing-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --transition-timing-easeIn: cubic-bezier(0.4, 0, 1, 1);
    --transition-timing-easeOut: cubic-bezier(0, 0, 0.2, 1);
    --transition-timing-easeInOut: cubic-bezier(0.4, 0, 0.2, 1);
    --transition-timing-linear: linear;
  }

  [data-theme='dark'] {
    color-scheme: dark;
  }

  [data-theme='light'] {
    color-scheme: light;
  }

  [data-theme='auto'] {
    color-scheme: light dark;
  }
</style>
