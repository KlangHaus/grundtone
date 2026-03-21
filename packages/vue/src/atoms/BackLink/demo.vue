<script setup lang="ts">
  import GTBackLink from './BackLink.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTBackLink href="#/blog" label="Alle indlæg" />
        <GTBackLink href="#/shop" label="Tilbage til shop" />
        <GTBackLink href="#/" label="Back to overview" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  .gt-demo__stack {
    display: flex;
    flex-direction: column;
    gap: tokens.space('sm');
    max-width: 400px;
  }
</style>
