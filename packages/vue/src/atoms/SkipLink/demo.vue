<script setup lang="ts">
  import GTSkipLink from './SkipLink.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Default (href="#main")</h3>
      <div class="gt-demo__preview">
        <GTSkipLink>Spring til indhold</GTSkipLink>
      </div>
      <p class="body-text-sm text-secondary">
        Tab into the preview area above to see the skip link appear.
      </p>
    </section>

    <section class="gt-demo__section">
      <h3>Custom target</h3>
      <div class="gt-demo__preview">
        <GTSkipLink href="#search">Spring til søgning</GTSkipLink>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  .gt-demo__preview {
    position: relative;
    height: 3.5rem;
    overflow: hidden;
    background: tokens.color('surface');
    border-radius: tokens.radius('md');
  }
</style>
