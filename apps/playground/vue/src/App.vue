<script setup lang="ts">
  import { ref } from 'vue';
  import { GTButton } from '@grundtone/vue';

  const isLoading = ref(false);

  function simulateLoad() {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
</script>

<template>
  <div class="playground">
    <h1>Grundtone Vue Playground</h1>

    <section>
      <h2>Variants</h2>
      <div class="row">
        <GTButton variant="primary">Primary</GTButton>
        <GTButton variant="secondary">Secondary</GTButton>
        <GTButton variant="outlined">Outlined</GTButton>
        <GTButton variant="negative">Negative</GTButton>
        <GTButton variant="unstyled">Unstyled</GTButton>
      </div>
    </section>

    <section>
      <h2>Sizes</h2>
      <div class="row">
        <GTButton size="sm">Small</GTButton>
        <GTButton size="md">Medium</GTButton>
        <GTButton size="lg">Large</GTButton>
      </div>
    </section>

    <section>
      <h2>Rounded</h2>
      <div class="row">
        <GTButton rounded="none">none</GTButton>
        <GTButton rounded="sm">sm</GTButton>
        <GTButton>md (default)</GTButton>
        <GTButton rounded="lg">lg</GTButton>
        <GTButton rounded="full">full</GTButton>
      </div>
    </section>

    <section>
      <h2>States</h2>
      <div class="row">
        <GTButton disabled>Disabled</GTButton>
        <GTButton :loading="isLoading" @click="simulateLoad">
          {{ isLoading ? 'Saving...' : 'Click to load' }}
        </GTButton>
        <GTButton block>Block (full width)</GTButton>
      </div>
    </section>

    <section>
      <h2>As link</h2>
      <div class="row">
        <GTButton as="a" href="#link">Link button</GTButton>
        <GTButton as="a" href="#link" variant="outlined">
          Outlined link
        </GTButton>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
    font-family: tokens.font-family('base');
    background: tokens.color('background');
    color: tokens.color('text');
  }

  .playground {
    max-width: 800px;
    margin: 0 auto;
    padding: tokens.space('xl');

    h1 {
      margin-bottom: tokens.space('xl');
    }

    h2 {
      margin-bottom: tokens.space('sm');
      font-size: tokens.font-size('lg');
    }

    section {
      margin-bottom: tokens.space('xl');
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: tokens.space('sm');
    }
  }
</style>
