<script setup lang="ts">
  import GTSpinner from './Spinner.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Small (default)</h3>
      <div class="gt-demo__stack--row">
        <GTSpinner />
        <GTSpinner variant="light" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Large</h3>
      <div class="gt-demo__stack">
        <GTSpinner size="lg" />
        <GTSpinner size="lg" variant="light" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With text</h3>
      <div class="gt-demo__stack">
        <GTSpinner size="lg" text="Henter data…" />
        <div class="flex items-center gap-2">
          <GTSpinner text="Gemmer…" />
        </div>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Backdrop (large)</h3>
      <div class="gt-demo__backdrop-container">
        <p>Indhold bag spinneren med 25% synlighed.</p>
        <p>Flere linjer tekst for at demonstrere overlay-effekten.</p>
        <GTSpinner size="lg" backdrop text="Indlæser sektion…" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  .gt-demo {
    &__stack {
      display: flex;
      flex-direction: column;
      gap: tokens.space('sm');
      max-width: 400px;
    }

    &__stack--row {
      display: flex;
      gap: tokens.space('md');
      align-items: center;
      font-size: tokens.font-size('2xl');
    }

    &__backdrop-container {
      position: relative;
      padding: tokens.space('lg');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('md');
      min-height: 10rem;
    }
  }
</style>
