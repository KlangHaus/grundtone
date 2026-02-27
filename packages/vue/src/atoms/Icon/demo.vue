<!-- Demo component to test the new Icon system -->
<template>
  <div class="icon-demo">
    <h2>Icon System Test</h2>

    <!-- Test 1: Custom Icons with Built-ins -->
    <div class="demo-section">
      <h3>Built-in Custom Icons</h3>
      <IconProvider :icons="builtInIcons">
        <Icon name="sun" :size="24" />
        <Icon name="moon" :size="24" />
      </IconProvider>
    </div>

    <!-- Test 2: Custom Icons with Provider -->
    <div class="demo-section">
      <h3>Custom Icons with Provider</h3>
      <IconProvider :icons="customIcons">
        <Icon name="heart" :size="32" />
        <Icon name="star" :size="32" />
      </IconProvider>
    </div>

    <!-- Test 3: Without Provider (fallback) -->
    <div class="demo-section">
      <h3>Without Provider (should warn)</h3>
      <Icon name="test" :size="16" />
    </div>

    <!-- Test 4: Different sizes and accessibility -->
    <div class="demo-section">
      <h3>Sizes and Accessibility</h3>
      <IconProvider :icons="builtInIcons">
        <Icon name="sun" :size="16" />
        <Icon name="sun" :size="24" />
        <Icon name="sun" :size="32" />
        <Icon name="sun" :size="48" />

        <!-- Semantic icon with label -->
        <Icon
          name="moon"
          :size="24"
          :aria-hidden="false"
          aria-label="Dark mode"
        />
      </IconProvider>
    </div>

    <!-- Test 5: Composables -->
    <div class="demo-section">
      <h3>Composables Test</h3>
      <IconProvider :icons="builtInIcons">
        <p>Available icons: {{ availableIcons }}</p>
        <p>Sun icon exists: {{ sunExists }}</p>
        <p>Config library: {{ iconConfig.library }}</p>
      </IconProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    Icon,
    IconProvider,
    grundtoneIcons,
    useIconConfig,
    useIconExists,
    useAvailableIcons,
  } from './index';

  // Built-in icons
  const builtInIcons = grundtoneIcons;

  // Custom test icons (simple SVG components)
  const HeartIcon = {
    name: 'HeartIcon',
    props: ['size', 'aria-hidden', 'aria-label'],
    template: `
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  `,
  };

  const StarIcon = {
    name: 'StarIcon',
    props: ['size', 'aria-hidden', 'aria-label'],
    template: `
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `,
  };

  const customIcons = {
    heart: HeartIcon,
    star: StarIcon,
  };

  // Test composables
  const iconConfig = useIconConfig();
  const availableIcons = useAvailableIcons();
  const sunExists = useIconExists('sun');
</script>

<script lang="ts">
  export default {
    name: 'IconDemo',
  };
</script>

<style scoped>
  .icon-demo {
    padding: 2rem;
    font-family: system-ui, sans-serif;
  }

  .demo-section {
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  .demo-section h3 {
    margin-top: 0;
    color: #374151;
  }

  .demo-section > * + * {
    margin-left: 1rem;
  }
</style>
