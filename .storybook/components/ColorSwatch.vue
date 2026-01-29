<template>
  <div class="color-swatch" :class="`color-swatch--${size}`">
    <div
      class="color-swatch__color"
      :style="{ backgroundColor: hex }"
      @click="copyToClipboard"
      :title="`Click to copy ${hex}`"
      role="button"
      tabindex="0"
      @keydown.enter="copyToClipboard"
      @keydown.space.prevent="copyToClipboard"
    />
    <div class="color-swatch__info">
      <span class="color-swatch__name">{{ name }}</span>
      <span class="color-swatch__hex" @click="copyToClipboard">{{ hex }}</span>
      <span v-if="rgb" class="color-swatch__rgb">{{ rgb }}</span>
      <span v-if="showContrast && contrastRatio" class="color-swatch__contrast">
        Contrast: {{ contrastRatio }}
        <span :class="contrastClass">{{ contrastLevel }}</span>
      </span>
      <span v-if="copied" class="color-swatch__copied">Copied!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  interface Props {
    /** Color name (e.g., 'primary', 'blue-500') */
    name: string;
    /** Hex color value (e.g., '#0059b3') */
    hex: string;
    /** RGB color value (optional, auto-calculated if not provided) */
    rgb?: string;
    /** Show contrast ratio against white background */
    showContrast?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    showContrast: false,
  });

  const copied = ref(false);

  // Calculate relative luminance
  function getLuminance(hex: string): number {
    const rgb = hex.replace('#', '');
    const r = parseInt(rgb.substring(0, 2), 16) / 255;
    const g = parseInt(rgb.substring(2, 4), 16) / 255;
    const b = parseInt(rgb.substring(4, 6), 16) / 255;

    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Calculate contrast ratio
  function getContrastRatio(color1: string, color2: string): number {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  const contrastRatio = computed(() => {
    if (!props.showContrast) return null;

    // Calculate contrast against white background
    const ratio = getContrastRatio(props.hex, '#ffffff');
    return `${ratio.toFixed(2)}:1`;
  });

  const contrastLevel = computed(() => {
    if (!props.showContrast || !contrastRatio.value) return '';

    const ratio = parseFloat(contrastRatio.value);

    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    return 'Fail';
  });

  const contrastClass = computed(() => {
    return `color-swatch__contrast-badge color-swatch__contrast-badge--${contrastLevel.value.toLowerCase()}`;
  });

  async function copyToClipboard() {
    try {
      // eslint-disable-next-line no-undef
      await navigator.clipboard.writeText(props.hex);
      copied.value = true;
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch {
      // Silently fail if clipboard API is not available
    }
  }
</script>

<style lang="scss" scoped>
  .color-swatch {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #ffffff;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  }

  .color-swatch__color {
    width: 100%;
    cursor: pointer;
    transition: opacity 0.15s ease;
    position: relative;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.8;
    }

    &:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  }

  .color-swatch--sm {
    .color-swatch__color {
      height: 4rem;
    }
  }

  .color-swatch--md {
    .color-swatch__color {
      height: 6rem;
    }
  }

  .color-swatch--lg {
    .color-swatch__color {
      height: 8rem;
    }
  }

  .color-swatch__info {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .color-swatch__name {
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
  }

  .color-swatch__hex {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    color: #6b7280;
    cursor: pointer;

    &:hover {
      color: #3b82f6;
    }
  }

  .color-swatch__rgb {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .color-swatch__contrast {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .color-swatch__contrast-badge {
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-weight: 600;
    font-size: 0.625rem;
    text-transform: uppercase;

    &--aaa {
      background-color: #d1fae5;
      color: #065f46;
    }

    &--aa {
      background-color: #dbeafe;
      color: #1e40af;
    }

    &--fail {
      background-color: #fee2e2;
      color: #991b1b;
    }
  }

  .color-swatch__copied {
    font-size: 0.75rem;
    color: #10b981;
    font-weight: 500;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
