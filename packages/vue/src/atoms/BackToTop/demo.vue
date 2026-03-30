<script setup lang="ts">
  import GTBackToTop from './BackToTop.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Back to Top</h3>
      <p class="body-text-sm text-secondary">
        Scroll ned på denne side for at se knappen i nederste højre hjørne. På
        mobil vises kun ikonet.
      </p>
      <GTBackToTop label="Til toppen" />
    </section>
  </div>
</template>
