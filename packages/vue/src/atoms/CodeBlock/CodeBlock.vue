<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { CodeBlockProps } from './types';

  const props = withDefaults(defineProps<CodeBlockProps>(), {
    language: undefined,
    label: undefined,
    copyable: true,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-code-block`);
  const copied = ref(false);

  const hasHeader = computed(
    () => !!props.label || !!props.language || props.copyable,
  );

  async function copy() {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  }
</script>

<template>
  <div :class="base">
    <div v-if="hasHeader" :class="`${base}__header`">
      <span :class="`${base}__label`">{{ label || language }}</span>
      <button
        v-if="copyable"
        type="button"
        :class="`${base}__copy`"
        :aria-label="copied ? 'Kopieret' : 'Kopiér kode'"
        @click="copy"
      >
        {{ copied ? 'Kopieret!' : 'Kopiér' }}
      </button>
    </div>
    <pre
      :class="`${base}__pre`"
    ><code :class="`${base}__code`">{{ code }}</code></pre>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-code-block {
    // Theme-aware, token-anchored (no hardcoded colours per the design-system
    // doctrine). A recessed surface reads as "code" in both light and dark; a
    // constant-dark variant would need dedicated `code-*` tokens.
    background: tokens.color('surface-alt');
    border: 1px solid tokens.color('border-light');
    border-radius: tokens.radius('md');
    overflow: hidden;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: tokens.space('sm');
      padding: tokens.space('xs') tokens.space('sm');
      border-block-end: 1px solid tokens.color('border-light');
    }

    &__label {
      font-size: tokens.font-size('sm');
      color: tokens.color('text-secondary');
      font-family: tokens.font-family('mono');
    }

    &__copy {
      background: tokens.color('surface');
      border: 1px solid tokens.color('border-light');
      border-radius: tokens.radius('sm');
      color: tokens.color('text-secondary');
      font-size: tokens.font-size('sm');
      padding: tokens.space('xs') tokens.space('sm');
      cursor: pointer;

      &:hover {
        color: tokens.color('text');
        background: tokens.color('surface-raised');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus');
        outline-offset: 2px;
      }
    }

    &__pre {
      margin: 0;
      padding: tokens.space('md');
      overflow-x: auto;
    }

    &__code {
      font-family: tokens.font-family('mono');
      font-size: tokens.font-size('sm');
      line-height: tokens.line-height('normal');
      color: tokens.color('text');
      white-space: pre;
    }
  }
</style>
