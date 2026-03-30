<script setup lang="ts">
  import type { SkipLinkProps } from './types';

  const props = withDefaults(defineProps<SkipLinkProps>(), {
    href: '#main',
  });

  function handleClick() {
    const target = document.querySelector(props.href);
    if (!target) return;

    // Ensure non-interactive targets can receive focus
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }

    (target as HTMLElement).focus();
  }
</script>

<template>
  <a :href="href" class="skip-link" @click="handleClick">
    <slot />
  </a>
</template>
