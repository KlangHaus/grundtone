<script setup lang="ts">
  import { onMounted, computed, ref, watch, nextTick } from 'vue';
  import { useData } from 'vitepress';

  const props = withDefaults(
    defineProps<{
      /** Snack name shown in header */
      name: string;
      /** Raw source code for the snack */
      code: string;
      /** Default platform to show */
      platform?: 'ios' | 'android' | 'web';
      /** Show preview panel */
      preview?: boolean;
      /** Iframe height */
      height?: number;
      /** NPM dependencies as "pkg@version,pkg2@version" */
      dependencies?: string;
    }>(),
    {
      platform: 'ios',
      preview: true,
      height: 600,
      dependencies: '',
    },
  );

  const { isDark } = useData();
  const theme = computed(() => (isDark.value ? 'dark' : 'light'));

  const baseDeps =
    '@grundtone/react-native@latest,@grundtone/core@latest,@grundtone/icons@latest,@grundtone/utils@latest,react-native-svg@15.11.2';

  const allDeps = computed(() => {
    if (props.dependencies) return `${baseDeps},${props.dependencies}`;
    return baseDeps;
  });

  const encodedCode = computed(() => encodeURIComponent(props.code));
  const encodedName = computed(() => encodeURIComponent(props.name));
  const encodedDeps = computed(() => encodeURIComponent(allDeps.value));

  const container = ref<HTMLElement>();

  function loadEmbedScript() {
    return new Promise<void>(resolve => {
      const existing = document.querySelector(
        'script[src="https://snack.expo.dev/embed.js"]',
      );
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://snack.expo.dev/embed.js';
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  async function initSnack() {
    await loadEmbedScript();
    await nextTick();
    // Re-scan DOM for new snack elements
    (window as any).ExpoSnack?.remove?.();
    (window as any).ExpoSnack?.append?.(container.value);
  }

  onMounted(initSnack);
  watch(theme, initSnack);
</script>

<template>
  <div class="snack-embed" ref="container">
    <div
      :key="theme"
      :data-snack-code="encodedCode"
      :data-snack-name="encodedName"
      :data-snack-dependencies="encodedDeps"
      :data-snack-platform="platform"
      :data-snack-preview="String(preview)"
      :data-snack-theme="theme"
      data-snack-loading="lazy"
      :style="{
        overflow: 'hidden',
        background: isDark ? '#1e1e1e' : '#fafafa',
        border: '1px solid var(--vp-c-divider)',
        borderRadius: '4px',
        height: `${height}px`,
        width: '100%',
      }"
    />
  </div>
</template>

<style scoped>
  .snack-embed {
    margin: 1.25rem 0;
  }
</style>
