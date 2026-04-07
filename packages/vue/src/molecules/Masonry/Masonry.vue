<script setup lang="ts">
  import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { MasonryProps } from './types';

  const props = withDefaults(defineProps<MasonryProps>(), {
    gap: 24,
    columnWidth: 300,
    ssrColumns: 3,
    ariaLabel: 'Masonry-gitter',
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-masonry`);

  const containerRef = ref<HTMLElement | null>(null);
  const columnCount = ref(props.ssrColumns);
  const columns = computed(() => {
    const cols: unknown[][] = Array.from(
      { length: columnCount.value },
      () => [],
    );
    props.items.forEach((item, i) => {
      cols[i % columnCount.value].push(item);
    });
    return cols;
  });

  // Slot index mapping: map (colIdx, rowIdx) back to original item index
  const itemIndex = (colIdx: number, rowIdx: number): number => {
    return rowIdx * columnCount.value + colIdx;
  };

  function recalculate() {
    if (!containerRef.value) return;
    const width = containerRef.value.clientWidth;
    const count = Math.max(
      1,
      Math.floor((width + props.gap) / (props.columnWidth + props.gap)),
    );
    columnCount.value = count;
  }

  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    recalculate();
    if (containerRef.value && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => recalculate());
      resizeObserver.observe(containerRef.value);
    }
  });

  onUnmounted(() => {
    resizeObserver?.disconnect();
  });

  watch(
    () => [props.columnWidth, props.gap],
    () => nextTick(recalculate),
  );
</script>

<template>
  <div
    ref="containerRef"
    :class="base"
    :style="{ gap: `${gap}px` }"
    :aria-label="ariaLabel"
    role="list"
  >
    <div
      v-for="(col, colIdx) in columns"
      :key="colIdx"
      :class="`${base}__column`"
      :style="{ gap: `${gap}px` }"
    >
      <div
        v-for="(item, rowIdx) in col"
        :key="itemIndex(colIdx, rowIdx)"
        :class="`${base}__item`"
        role="listitem"
      >
        <slot :item="item" :index="itemIndex(colIdx, rowIdx)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-masonry {
    display: flex;
    align-items: flex-start;
    width: 100%;

    &__column {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    &__item {
      break-inside: avoid;
    }
  }
</style>
