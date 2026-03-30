<script setup lang="ts">
  import { ref } from 'vue';
  import GTButton from './Button.vue';

  const isLoading = ref(false);

  function simulateLoad() {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Variants</h3>
      <div class="gt-demo__row">
        <GTButton variant="primary">Primary</GTButton>
        <GTButton variant="secondary">Secondary</GTButton>
        <GTButton variant="outlined">Outlined</GTButton>
        <GTButton variant="negative">Negative</GTButton>
        <GTButton variant="unstyled">Unstyled</GTButton>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Sizes</h3>
      <div class="gt-demo__row">
        <GTButton size="sm">Small</GTButton>
        <GTButton size="md">Medium</GTButton>
        <GTButton size="lg">Large</GTButton>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>States</h3>
      <div class="gt-demo__row">
        <GTButton disabled>Disabled</GTButton>
        <GTButton :loading="isLoading" @click="simulateLoad">
          {{ isLoading ? 'Saving...' : 'Click to load' }}
        </GTButton>
        <GTButton block>Block (full width)</GTButton>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Rounded</h3>
      <div class="gt-demo__row">
        <GTButton rounded="none">none</GTButton>
        <GTButton rounded="sm">sm</GTButton>
        <GTButton>md (default)</GTButton>
        <GTButton rounded="lg">lg</GTButton>
        <GTButton rounded="xl">xl</GTButton>
        <GTButton rounded="full">full</GTButton>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>As link</h3>
      <div class="gt-demo__row">
        <GTButton as="a" href="#polymorphic">Link button</GTButton>
        <GTButton as="a" href="#polymorphic" variant="outlined"
          >Outlined link</GTButton
        >
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  .gt-demo {
    &__section {
      margin-bottom: tokens.space('lg');

      h3 {
        margin-bottom: tokens.space('sm');
        font-family: tokens.font-family('base');
        font-size: tokens.font-size('base');
        font-weight: tokens.font-weight('semibold');
      }
    }

    &__row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: tokens.space('sm');
    }
  }
</style>
