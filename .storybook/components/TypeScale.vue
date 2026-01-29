<template>
  <div class="type-scale">
    <div v-for="item in scale" :key="item.name" class="type-scale__item">
      <div class="type-scale__info">
        <span class="type-scale__name">{{ item.name }}</span>
        <span class="type-scale__size">
          {{ item.fontSize }}
          <span v-if="pixelSize(item.fontSize)" class="type-scale__pixels">
            ({{ pixelSize(item.fontSize) }}px)
          </span>
        </span>
        <span v-if="item.fontWeight" class="type-scale__weight"
          >Weight: {{ item.fontWeight }}</span
        >
        <span v-if="item.lineHeight" class="type-scale__line-height">
          Line height: {{ item.lineHeight }}
        </span>
      </div>
      <div
        class="type-scale__sample"
        :style="{
          fontSize: item.fontSize,
          fontWeight: item.fontWeight,
          lineHeight: item.lineHeight,
        }"
      >
        {{ sampleText }}
      </div>
      <div
        v-if="showRulers"
        class="type-scale__ruler"
        :style="{ height: item.fontSize }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface TypeScaleItem {
    name: string; // e.g., 'xs', 'sm', 'base'
    fontSize: string; // e.g., '0.75rem'
    fontWeight?: number; // e.g., 400
    lineHeight?: number; // e.g., 1.5
  }

  interface Props {
    /** Typography scale data */
    scale: TypeScaleItem[];
    /** Sample text to display */
    sampleText?: string;
    /** Show rulers for sizing */
    showRulers?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    sampleText: 'The quick brown fox jumps over the lazy dog',
    showRulers: false,
  });

  function pixelSize(fontSize: string): number | null {
    // Convert rem to pixels (assuming 16px base)
    if (fontSize.endsWith('rem')) {
      return parseFloat(fontSize) * 16;
    }
    // If already in pixels
    if (fontSize.endsWith('px')) {
      return parseFloat(fontSize);
    }
    return null;
  }
</script>

<style lang="scss" scoped>
  .type-scale {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .type-scale__item {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.5rem;
    align-items: center;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
    position: relative;

    &:hover {
      border-color: #d1d5db;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
  }

  .type-scale__info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .type-scale__name {
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .type-scale__size {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    color: #6b7280;
  }

  .type-scale__pixels {
    color: #9ca3af;
  }

  .type-scale__weight,
  .type-scale__line-height {
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .type-scale__sample {
    color: #1f2937;
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
  }

  .type-scale__ruler {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    border-radius: 2px;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    .type-scale__item {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .type-scale__ruler {
      display: none;
    }
  }
</style>
