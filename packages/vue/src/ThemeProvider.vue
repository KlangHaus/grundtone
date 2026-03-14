<script setup lang="ts">
  import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue';
  import {
    THEME_INJECTION_KEY,
    createTheme,
    type Theme,
    type ThemeMode,
    type ThemeProviderContext,
    type ThemeProviderProps,
  } from '@grundtone/core';
  import {
    getSystemIsDark,
    loadPersistedThemeMode,
    persistThemeMode,
    resolveThemeMode,
  } from '@grundtone/utils';
  import { applyThemeToDOM } from './applyThemeToDOM';

  const props = withDefaults(defineProps<ThemeProviderProps>(), {
    mode: 'auto',
    enableTransitions: true,
    persistMode: true,
    storageKey: 'grundtone-theme-mode',
  });

  // Resolve theme config into light/dark Theme objects
  const themes = computed(() => {
    if (!props.theme) return createTheme({});

    if ('light' in props.theme || 'dark' in props.theme) {
      const cfg = props.theme as {
        light?: Partial<Theme>;
        dark?: Partial<Theme>;
      };
      return createTheme({
        light: cfg.light?.colors,
        dark: cfg.dark?.colors,
      });
    }

    // Single partial theme — apply to light only
    const partial = props.theme as Partial<Theme>;
    return createTheme({ light: partial.colors });
  });

  // Internal mode state — initialized from persisted or prop
  const internalMode = ref<ThemeMode>(
    (props.persistMode ? loadPersistedThemeMode(props.storageKey) : null) ??
      props.mode,
  );

  // System dark state
  const systemIsDark = ref(getSystemIsDark());

  // Resolved concrete mode
  const resolved = computed(() =>
    resolveThemeMode(internalMode.value, systemIsDark.value),
  );

  // Active theme
  const theme = computed<Theme>(() =>
    resolved.value === 'dark' ? themes.value.dark : themes.value.light,
  );

  const isDark = computed(() => resolved.value === 'dark');
  const isLight = computed(() => resolved.value === 'light');

  function setMode(mode: ThemeMode) {
    internalMode.value = mode;
    if (props.persistMode) {
      persistThemeMode(mode, props.storageKey);
    }
  }

  function toggleMode() {
    setMode(isDark.value ? 'light' : 'dark');
  }

  function applyTheme() {
    applyThemeToDOM(theme.value);
  }

  // Apply theme whenever it changes
  watch(theme, applyTheme, { immediate: false });

  // Listen for system theme changes
  let mediaQuery: MediaQueryList | null = null;

  function handleSystemChange(e: MediaQueryListEvent) {
    systemIsDark.value = e.matches;
  }

  onMounted(() => {
    // Initial DOM application
    applyTheme();

    // Listen for system preference changes
    if (typeof window !== 'undefined') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleSystemChange);
    }
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handleSystemChange);
  });

  // Provide context
  const context: ThemeProviderContext = {
    theme: computed(() => theme.value),
    mode: computed(() => internalMode.value),
    isDark,
    isLight,
    setMode,
    toggleMode,
    applyTheme,
  };

  provide(THEME_INJECTION_KEY, context);
</script>

<template>
  <slot />
</template>
