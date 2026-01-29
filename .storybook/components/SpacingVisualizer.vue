<template>
  <div class="spacing-visualizer">
    <div
      v-for="item in spacing"
      :key="item.name"
      class="spacing-visualizer__item"
    >
      <div class="spacing-visualizer__info">
        <span class="spacing-visualizer__name">{{ item.name }}</span>
        <span class="spacing-visualizer__value">
          {{ item.value }}
          <span
            v-if="pixelValue(item.value)"
            class="spacing-visualizer__pixels"
          >
            ({{ pixelValue(item.value) }}px)
          </span>
        </span>
      </div>
      <div
        class="spacing-visualizer__demo"
        :class="`spacing-visualizer__demo--${mode}`"
      >
        <div
          class="spacing-visualizer__box"
          :style="getSpacingStyle(item.value)"
        >
          <span class="spacing-visualizer__content">Content</span>
        </div>
        <div
          v-if="showMeasurements"
          class="spacing-visualizer__measurement"
          :style="getMeasurementStyle(item.value)"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface SpacingItem {
    name: string; // e.g., 'xs', 'sm', 'md'
    value: string; // e.g., '0.25rem', '4px'
  }

  interface Props {
    /** Spacing tokens to visualize */
    spacing: SpacingItem[];
    /** Visualization mode */
    mode?: 'padding' | 'margin' | 'gap';
    /** Show measurements */
    showMeasurements?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    mode: 'padding',
    showMeasurements: true,
  });

  function pixelValue(value: string): number | null {
    // Convert rem to pixels (assuming 16px base)
    if (value.endsWith('rem')) {
      return parseFloat(value) * 16;
    }
    // If already in pixels
    if (value.endsWith('px')) {
      return parseFloat(value);
    }
    return null;
  }

  function getSpacingStyle(value: string) {
    switch (props.mode) {
      case 'padding':
        return { padding: value };
      case 'margin':
        return { margin: value };
      case 'gap':
        return { gap: value };
      default:
        return {};
    }
  }

  function getMeasurementStyle(value: string) {
    const pixels = pixelValue(value);
    if (!pixels) return {};

    switch (props.mode) {
      case 'padding':
        return { width: `${pixels}px`, height: `${pixels}px` };
      case 'margin':
        return { width: `${pixels}px`, height: `${pixels}px` };
      case 'gap':
        return { width: `${pixels}px` };
      default:
        return {};
    }
  }
</script>

<style lang="scss" scoped>
  .spacing-visualizer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .spacing-visualizer__item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
  }

  .spacing-visualizer__info {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
  }

  .spacing-visualizer__name {
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    min-width: 3rem;
  }

  .spacing-visualizer__value {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    color: #6b7280;
  }

  .spacing-visualizer__pixels {
    color: #9ca3af;
  }

  .spacing-visualizer__demo {
    position: relative;
    background: repeating-linear-gradient(
      45deg,
      #f9fafb,
      #f9fafb 10px,
      #f3f4f6 10px,
      #f3f4f6 20px
    );
    border-radius: 0.25rem;
    padding: 1rem;

    &--padding {
      .spacing-visualizer__box {
        background-color: #dbeafe;
        border: 2px dashed #3b82f6;
      }

      .spacing-visualizer__content {
        background-color: #ffffff;
        padding: 0.5rem 1rem;
        border: 1px solid #3b82f6;
      }
    }

    &--margin {
      .spacing-visualizer__box {
        background-color: #fef3c7;
        border: 2px dashed #f59e0b;
        display: inline-block;
      }

      .spacing-visualizer__content {
        background-color: #ffffff;
        padding: 0.5rem 1rem;
        border: 1px solid #f59e0b;
      }
    }

    &--gap {
      .spacing-visualizer__box {
        display: flex;
        background-color: transparent;
        border: none;
      }

      .spacing-visualizer__content {
        background-color: #dbeafe;
        border: 2px solid #3b82f6;
        padding: 0.5rem 1rem;
        flex: 1;

        &:not(:last-child) {
          margin-right: 0;
        }
      }

      .spacing-visualizer__box::after {
        content: 'Item 2';
        background-color: #dbeafe;
        border: 2px solid #3b82f6;
        padding: 0.5rem 1rem;
        flex: 1;
      }
    }
  }

  .spacing-visualizer__box {
    display: inline-block;
    border-radius: 0.25rem;
    transition: all 0.15s ease;
  }

  .spacing-visualizer__content {
    display: inline-block;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  .spacing-visualizer__measurement {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem 0.5rem;
    background-color: #1f2937;
    color: #ffffff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .spacing-visualizer__item {
      padding: 1rem;
    }

    .spacing-visualizer__info {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
</style>
