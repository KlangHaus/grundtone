<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import GTModal from '../Modal/Modal.vue';
  import { GTButton } from '../../atoms/Button';
  import type { ConfirmDialogProps } from './types';

  withDefaults(defineProps<ConfirmDialogProps>(), {
    message: undefined,
    confirmLabel: 'Bekræft',
    cancelLabel: 'Annuller',
    destructive: false,
    loading: false,
  });

  const emit = defineEmits<{
    'update:open': [value: boolean];
    confirm: [];
    cancel: [];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-confirm-dialog`);

  function close() {
    emit('update:open', false);
  }

  function onCancel() {
    emit('cancel');
    close();
  }

  // Confirm does NOT auto-close — the parent decides when to close (e.g. after
  // an async action resolves). Bind `:loading` while it runs.
  function onConfirm() {
    emit('confirm');
  }
</script>

<template>
  <GTModal
    :open="open"
    :title="title"
    transition="scale"
    @update:open="(v: boolean) => emit('update:open', v)"
    @close="onCancel"
  >
    <p v-if="message" :class="`${base}__message`">{{ message }}</p>
    <slot />
    <template #footer>
      <GTButton
        variant="secondary"
        size="sm"
        :disabled="loading"
        @click="onCancel"
      >
        {{ cancelLabel }}
      </GTButton>
      <GTButton
        :variant="destructive ? 'negative' : 'primary'"
        size="sm"
        :loading="loading"
        @click="onConfirm"
      >
        {{ confirmLabel }}
      </GTButton>
    </template>
  </GTModal>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-confirm-dialog {
    &__message {
      margin: 0;
      color: tokens.color('text-secondary');
    }
  }
</style>
