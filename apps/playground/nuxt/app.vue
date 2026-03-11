<script setup lang="ts">
  import { ref } from 'vue';
  import { iconRegistry } from '@grundtone/core';

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
    <h1>Grundtone Nuxt Playground</h1>

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
      <h2>Icons</h2>
      <div class="row">
        <GTIcon
          v-for="name in Object.keys(iconRegistry)"
          :key="name"
          :name="name"
        />
      </div>
    </section>

    <section>
      <h2>Icon sizes</h2>
      <div class="row">
        <GTIcon name="check" size="xs" />
        <GTIcon name="check" size="sm" />
        <GTIcon name="check" size="md" />
        <GTIcon name="check" size="lg" />
        <GTIcon name="check" size="xl" />
        <GTIcon name="check" size="2xl" />
      </div>
    </section>

    <section>
      <h2>Button with icon</h2>
      <div class="row">
        <GTButton variant="primary">
          <GTIcon name="check" size="sm" /> Confirm
        </GTButton>
        <GTButton variant="negative">
          <GTIcon name="close" size="sm" /> Delete
        </GTButton>
        <GTButton variant="outlined">
          <GTIcon name="search" size="sm" /> Search
        </GTButton>
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

<style>
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    padding: 2rem;
  }

  .playground h1 {
    margin-bottom: 2rem;
  }

  .playground h2 {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }

  .playground section {
    margin-bottom: 2rem;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }
</style>
