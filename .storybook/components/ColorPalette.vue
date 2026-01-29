<template>
  <div class="color-palette">
    <h3 v-if="name" class="color-palette__name">{{ name }}</h3>
    <div
      class="color-palette__colors"
      :class="`color-palette__colors--${orientation}`"
    >
      <div
        v-for="color in colors"
        :key="color.shade"
        class="color-palette__item"
        :style="{ backgroundColor: color.hex }"
        @click="copyColor(color.hex)"
        :title="`${color.name || color.shade}: ${color.hex}`"
        role="button"
        tabindex="0"
        @keydown.enter="copyColor(color.hex)"
        @keydown.space.prevent="copyColor(color.hex)"
      >
        <span v-if="showLabels" class="color-palette__label">
          <span class="color-palette__shade">{{ color.shade }}</span>
          <span class="color-palette__hex">{{ color.hex }}</span>
        </span>
      </div>
    </div>
    <div v-if="copiedColor" class="color-palette__copied">
      Copied {{ copiedColor }}!
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  interface ColorItem {
    shade: string; // e.g., '50', '100', '500'
    hex: string; // e.g., '#e3f2fd'
    name?: string; // Optional custom name
  }

  interface Props {
    /** Palette name (e.g., 'Blue', 'Primary') */
    name?: string;
    /** Array of color values with shades */
    colors: ColorItem[];
    /** Display orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Show labels on each color */
    showLabels?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    orientation: 'vertical',
    showLabels: true,
  });

  const copiedColor = ref<string>('');

  async function copyColor(hex: string) {
    try {
      // eslint-disable-next-line no-undef
      await navigator.clipboard.writeText(hex);
      copiedColor.value = hex;
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        copiedColor.value = '';
      }, 2000);
    } catch {
      // Silently fail if clipboard API is not available
    }
  }
</script>

<style lang="scss" scoped>
  .color-palette {
    width: 100%;
    position: relative;
  }

  .color-palette__name {
    margin: 0 0 1rem 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
  }

  .color-palette__colors {
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid #e5e7eb;

    &--horizontal {
      flex-direction: row;
    }

    &--vertical {
      flex-direction: column;
    }
  }

  .color-palette__item {
    flex: 1;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s ease;
    position: relative;

    &:hover {
      filter: brightness(0.95);
      z-index: 1;

      .color-palette__label {
        opacity: 1;
      }
    }

    &:active {
      filter: brightness(0.9);
    }

    &:focus {
      outline: 2px solid #3b82f6;
      outline-offset: -2px;
      z-index: 2;
    }
  }

  .color-palette__label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    opacity: 0.9;
    transition: opacity 0.15s ease;
  }

  .color-palette__shade {
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
  }

  .color-palette__hex {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    color: #6b7280;
  }

  .color-palette__copied {
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    background-color: #10b981;
    color: white;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    animation: slideUp 0.2s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  // Horizontal orientation specific styles
  .color-palette__colors--horizontal {
    .color-palette__item {
      min-width: 4rem;
    }
  }

  // Vertical orientation specific styles
  .color-palette__colors--vertical {
    .color-palette__item {
      min-height: 4rem;
    }
  }
</style>
