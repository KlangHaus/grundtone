<script setup lang="ts">
  import { computed, onBeforeUnmount, ref, watch } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { BulkActionBarProps } from './types';

  const props = withDefaults(defineProps<BulkActionBarProps>(), {
    state: 'idle',
    message: undefined,
    clearLabel: 'Clear',
    ariaLabel: undefined,
  });

  const emit = defineEmits<{
    /**
     * Emitted when the user dismisses the bar, and after a receipt has been
     * seen and dismissed.
     *
     * 🔴 The bar never clears the selection itself. The consumer owns it and
     * clears conditionally on the outcome — a partial success must stay
     * retryable on exactly the rows that were missed. A bar that cleared for
     * them would overwrite that logic.
     */
    clear: [];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-bulk-action-bar`);

  const barRef = ref<HTMLElement | null>(null);

  // A receipt the user has not dismissed yet. Tracked separately from
  // `props.message` because it must OUTLIVE the selection: on full success the
  // consumer clears the count, and the result would otherwise disappear in the
  // same tick it was set.
  const pendingReceipt = ref<string | null>(null);

  watch(
    () => [props.state, props.message] as const,
    ([state, message]) => {
      if (state === 'receipt' && message) pendingReceipt.value = message;
    },
    { immediate: true },
  );

  // 🔴 A new selection discards an unacknowledged receipt. Without this a stale
  // result sits beside a fresh selection and reads as describing it. The rule
  // lives here rather than in each consumer: solved per-consumer, the fourth
  // one meets it from scratch and the first three each grew a variant.
  watch(
    () => props.count,
    (count, previous) => {
      if (count > 0 && count !== previous) pendingReceipt.value = null;
    },
  );

  const hasReceipt = computed(() => pendingReceipt.value !== null);

  // 🔴 Visibility hangs on the receipt as well as the count — never on the
  // count alone. See `message` in types.ts for why.
  const visible = computed(() => props.count > 0 || hasReceipt.value);

  const busy = computed(() => props.state === 'sending');

  function dismiss() {
    pendingReceipt.value = null;
    emit('clear');
  }

  // ── Scroll-container padding ──────────────────────────────────────────────
  // The bar is fixed and lays itself over the page, so the last row of the list
  // becomes unreachable. The component reserves that space itself: telling
  // consumers they MUST add padding is a workaround, and the self-contained
  // doctrine rules it out — the fourth consumer forgets.
  //
  // 🔴 The padding is tied to `visible`, not to the count. While only a receipt
  // is showing the bar is still on screen, so the space must stay reserved.
  const reservedSpace = ref('0px');

  function measure() {
    reservedSpace.value = barRef.value
      ? `${barRef.value.offsetHeight}px`
      : '0px';
  }

  function applyPadding(value: string) {
    if (typeof document === 'undefined') return;
    document.body.style.setProperty('--gt-bulk-action-bar-space', value);
  }

  watch(
    visible,
    async isVisible => {
      if (!isVisible) {
        applyPadding('0px');
        return;
      }
      await Promise.resolve();
      measure();
      applyPadding(reservedSpace.value);
    },
    { immediate: true },
  );

  onBeforeUnmount(() => applyPadding('0px'));
</script>

<template>
  <Transition :name="`${base}-slide`">
    <div
      v-if="visible"
      ref="barRef"
      :class="base"
      role="region"
      :aria-label="ariaLabel"
      :aria-busy="busy || undefined"
    >
      <div :class="`${base}__inner`">
        <p :class="`${base}__count`">{{ label }}</p>

        <!-- Actions scroll sideways rather than wrapping: a bar that grows in
             height eats the list it exists to operate on. -->
        <div :class="`${base}__actions`">
          <slot :busy="busy" />
        </div>

        <p v-if="hasReceipt" :class="`${base}__receipt`" role="status">
          {{ pendingReceipt }}
        </p>

        <button
          type="button"
          :class="`${base}__clear`"
          :disabled="busy"
          @click="dismiss"
        >
          {{ clearLabel }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-bulk-action-bar {
    position: fixed;
    inset-inline: 0;
    inset-block-end: 0;
    z-index: var(--z-sticky, 1020);

    // 95% opacity is the mechanism, not the blur: at that level the content
    // behind is muted enough that --color-text keeps its contrast whether a
    // dense table row or an empty surface sits underneath. The blur is polish
    // on top. light-dark() means ONE token, not a light/dark pair to keep in
    // sync — so no new colour is invented here.
    background: var(--color-surface-overlay);
    backdrop-filter: blur(var(--blur-overlay, 8px));
    color: var(--color-text);
    border-block-start: 1px solid var(--color-border-light);

    &__inner {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
    }

    &__count {
      margin: 0;
      font-weight: var(--font-weight-semibold);
      white-space: nowrap;
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      overflow-x: auto;
      flex: 1 1 auto;
    }

    &__receipt {
      margin: 0;
      color: var(--color-text-secondary);
      white-space: nowrap;
    }

    &__clear {
      flex: 0 0 auto;
    }
  }

  // The exit fires when the bar stops being visible — which is when the RECEIPT
  // is dismissed, not when the count reaches zero. Bound to the count, the bar
  // would animate away while showing a result nobody has read.
  .#{$prefix}-bulk-action-bar-slide-enter-active,
  .#{$prefix}-bulk-action-bar-slide-leave-active {
    transition: transform var(--duration-normal, 0.2s) var(--ease-out, ease-out);
  }

  .#{$prefix}-bulk-action-bar-slide-enter-from,
  .#{$prefix}-bulk-action-bar-slide-leave-to {
    transform: translateY(100%);
  }
</style>
