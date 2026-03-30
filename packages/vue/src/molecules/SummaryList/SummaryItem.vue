<script setup lang="ts">
  import { computed } from 'vue';
  import type { SummaryItemProps } from './types';

  const props = withDefaults(defineProps<SummaryItemProps>(), {
    action: undefined,
    actionLabel: undefined,
  });

  const emit = defineEmits<{
    action: [];
  }>();

  const hasAction = computed(() => !!props.action || false);
</script>

<template>
  <div
    :class="[
      'summary-list__row',
      { 'summary-list__row--no-actions': !hasAction && !$slots.actions },
    ]"
  >
    <dt class="summary-list__key">{{ label }}</dt>
    <dd class="summary-list__value">
      <slot />
    </dd>
    <dd v-if="hasAction || $slots.actions" class="summary-list__actions">
      <slot name="actions">
        <button
          v-if="action"
          type="button"
          class="summary-list__action"
          @click="emit('action')"
        >
          {{ action }}
          <span v-if="actionLabel" class="sr-only">, {{ actionLabel }}</span>
        </button>
      </slot>
    </dd>
  </div>
</template>

<style lang="scss">
  // Styles provided by design system (_summary-list.scss)
</style>
