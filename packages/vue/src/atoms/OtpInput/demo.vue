<script setup lang="ts">
  import { ref } from 'vue';
  import GTOtpInput from './OtpInput.vue';

  const code = ref('');
  const shortCode = ref('');
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>6-digit (default)</h3>
      <div class="gt-demo__stack">
        <GTOtpInput
          v-model="code"
          label="Bekræftelseskode"
          help-text="Indtast koden fra din SMS"
        />
        <p class="body-text-sm text-secondary">Kode: {{ code || '(tom)' }}</p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>4-digit</h3>
      <div class="gt-demo__stack">
        <GTOtpInput v-model="shortCode" :length="4" label="PIN" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Error</h3>
      <div class="gt-demo__stack">
        <GTOtpInput
          label="Kode"
          error-text="Forkert bekræftelseskode"
          model-value="12"
          :length="6"
        />
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
