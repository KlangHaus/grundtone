<template>
  <div class="contrast-checker">
    <div class="contrast-checker__controls">
      <div class="contrast-checker__control">
        <label for="foreground-color" class="contrast-checker__label"
          >Foreground</label
        >
        <div class="contrast-checker__input-group">
          <input
            id="foreground-color"
            v-model="foregroundColor"
            type="text"
            class="contrast-checker__input"
            placeholder="#000000"
            @input="validateColor('foreground')"
          />
          <input
            v-if="showPickers"
            v-model="foregroundColor"
            type="color"
            class="contrast-checker__picker"
            aria-label="Foreground color picker"
          />
        </div>
      </div>

      <div class="contrast-checker__control">
        <label for="background-color" class="contrast-checker__label"
          >Background</label
        >
        <div class="contrast-checker__input-group">
          <input
            id="background-color"
            v-model="backgroundColor"
            type="text"
            class="contrast-checker__input"
            placeholder="#ffffff"
            @input="validateColor('background')"
          />
          <input
            v-if="showPickers"
            v-model="backgroundColor"
            type="color"
            class="contrast-checker__picker"
            aria-label="Background color picker"
          />
        </div>
      </div>
    </div>

    <div
      class="contrast-checker__preview"
      :style="{
        backgroundColor: backgroundColor,
        color: foregroundColor,
      }"
    >
      <div class="contrast-checker__sample contrast-checker__sample--large">
        Sample Text (Large)
      </div>
      <div class="contrast-checker__sample contrast-checker__sample--normal">
        Sample Text (Normal)
      </div>
    </div>

    <div v-if="contrastRatio" class="contrast-checker__results">
      <div class="contrast-checker__ratio">
        <span class="contrast-checker__ratio-label">Contrast Ratio:</span>
        <span class="contrast-checker__ratio-value">{{ contrastRatio }}</span>
      </div>

      <div class="contrast-checker__wcag">
        <div class="contrast-checker__wcag-item" :class="aaLargeClass">
          <span class="contrast-checker__wcag-icon">{{
            aaLargePasses ? '✓' : '✗'
          }}</span>
          <span class="contrast-checker__wcag-text">
            WCAG AA Large Text (3:1)
          </span>
        </div>

        <div class="contrast-checker__wcag-item" :class="aaNormalClass">
          <span class="contrast-checker__wcag-icon">{{
            aaNormalPasses ? '✓' : '✗'
          }}</span>
          <span class="contrast-checker__wcag-text">
            WCAG AA Normal Text (4.5:1)
          </span>
        </div>

        <div class="contrast-checker__wcag-item" :class="aaaLargeClass">
          <span class="contrast-checker__wcag-icon">{{
            aaaLargePasses ? '✓' : '✗'
          }}</span>
          <span class="contrast-checker__wcag-text">
            WCAG AAA Large Text (4.5:1)
          </span>
        </div>

        <div class="contrast-checker__wcag-item" :class="aaaNormalClass">
          <span class="contrast-checker__wcag-icon">{{
            aaaNormalPasses ? '✓' : '✗'
          }}</span>
          <span class="contrast-checker__wcag-text">
            WCAG AAA Normal Text (7:1)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';

  interface Props {
    /** Foreground color (hex) */
    foreground?: string;
    /** Background color (hex) */
    background?: string;
    /** Show color pickers */
    showPickers?: boolean;
    /** Target WCAG level */
    targetLevel?: 'AA' | 'AAA';
  }

  const props = withDefaults(defineProps<Props>(), {
    foreground: '#000000',
    background: '#ffffff',
    showPickers: true,
    targetLevel: 'AA',
  });

  const foregroundColor = ref(props.foreground);
  const backgroundColor = ref(props.background);

  watch(
    () => props.foreground,
    newValue => {
      foregroundColor.value = newValue;
    },
  );

  watch(
    () => props.background,
    newValue => {
      backgroundColor.value = newValue;
    },
  );

  function validateColor(type: 'foreground' | 'background') {
    const color =
      type === 'foreground' ? foregroundColor.value : backgroundColor.value;

    // Ensure hex color format
    if (color && !color.startsWith('#')) {
      if (type === 'foreground') {
        foregroundColor.value = `#${color}`;
      } else {
        backgroundColor.value = `#${color}`;
      }
    }
  }

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
    if (!foregroundColor.value || !backgroundColor.value) return null;

    try {
      const ratio = getContrastRatio(
        foregroundColor.value,
        backgroundColor.value,
      );
      return `${ratio.toFixed(2)}:1`;
    } catch {
      return null;
    }
  });

  const contrastRatioValue = computed(() => {
    if (!contrastRatio.value) return 0;
    return parseFloat(contrastRatio.value);
  });

  // WCAG AA requirements
  const aaLargePasses = computed(() => contrastRatioValue.value >= 3.0);
  const aaNormalPasses = computed(() => contrastRatioValue.value >= 4.5);

  // WCAG AAA requirements
  const aaaLargePasses = computed(() => contrastRatioValue.value >= 4.5);
  const aaaNormalPasses = computed(() => contrastRatioValue.value >= 7.0);

  // CSS classes for pass/fail indicators
  const aaLargeClass = computed(() =>
    aaLargePasses.value
      ? 'contrast-checker__wcag-item--pass'
      : 'contrast-checker__wcag-item--fail',
  );
  const aaNormalClass = computed(() =>
    aaNormalPasses.value
      ? 'contrast-checker__wcag-item--pass'
      : 'contrast-checker__wcag-item--fail',
  );
  const aaaLargeClass = computed(() =>
    aaaLargePasses.value
      ? 'contrast-checker__wcag-item--pass'
      : 'contrast-checker__wcag-item--fail',
  );
  const aaaNormalClass = computed(() =>
    aaaNormalPasses.value
      ? 'contrast-checker__wcag-item--pass'
      : 'contrast-checker__wcag-item--fail',
  );
</script>

<style lang="scss" scoped>
  .contrast-checker {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    background-color: #ffffff;
  }

  .contrast-checker__controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .contrast-checker__control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .contrast-checker__label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
  }

  .contrast-checker__input-group {
    display: flex;
    gap: 0.5rem;
  }

  .contrast-checker__input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.875rem;
    color: #1f2937;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }

  .contrast-checker__picker {
    width: 3rem;
    height: 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    cursor: pointer;

    &::-webkit-color-swatch-wrapper {
      padding: 2px;
    }

    &::-webkit-color-swatch {
      border: none;
      border-radius: 0.25rem;
    }
  }

  .contrast-checker__preview {
    padding: 2rem;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border: 1px solid #e5e7eb;
  }

  .contrast-checker__sample {
    font-weight: 600;
    text-align: center;

    &--large {
      font-size: 1.5rem;
    }

    &--normal {
      font-size: 1rem;
    }
  }

  .contrast-checker__results {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contrast-checker__ratio {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.375rem;
  }

  .contrast-checker__ratio-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
  }

  .contrast-checker__ratio-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    font-family: 'IBM Plex Mono', monospace;
  }

  .contrast-checker__wcag {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .contrast-checker__wcag-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 0.375rem;
    transition: all 0.15s ease;

    &--pass {
      background-color: #d1fae5;
      color: #065f46;

      .contrast-checker__wcag-icon {
        color: #10b981;
      }
    }

    &--fail {
      background-color: #fee2e2;
      color: #991b1b;

      .contrast-checker__wcag-icon {
        color: #ef4444;
      }
    }
  }

  .contrast-checker__wcag-icon {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1;
  }

  .contrast-checker__wcag-text {
    font-size: 0.875rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .contrast-checker {
      padding: 1rem;
    }

    .contrast-checker__controls {
      grid-template-columns: 1fr;
    }

    .contrast-checker__preview {
      padding: 1.5rem 1rem;
    }

    .contrast-checker__sample--large {
      font-size: 1.25rem;
    }
  }
</style>
