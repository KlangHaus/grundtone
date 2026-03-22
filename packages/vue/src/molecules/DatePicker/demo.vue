<script setup lang="ts">
  import { ref } from 'vue';
  import GTDatePicker from './DatePicker.vue';

  const appointment = ref('');
  const limited = ref('');
  const prefilled = ref('2025-12-15');
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTDatePicker v-model="appointment" label="Dato for aftale" />
        <p class="body-text-sm text-secondary">
          ISO: {{ appointment || '(ingen)' }}
        </p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With min/max</h3>
      <div class="gt-demo__stack">
        <GTDatePicker
          v-model="limited"
          label="Booking"
          help-text="Kun datoer i december 2025"
          min="2025-12-01"
          max="2025-12-31"
          initial-date="2025-12-01"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Pre-filled</h3>
      <div class="gt-demo__stack">
        <GTDatePicker v-model="prefilled" label="Valgt dato" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Error</h3>
      <div class="gt-demo__stack">
        <GTDatePicker
          label="Startdato"
          error-text="Vælg venligst en dato"
          required
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Disabled</h3>
      <div class="gt-demo__stack">
        <GTDatePicker label="Dato" model-value="2025-06-15" disabled />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  .gt-demo__stack {
    display: flex;
    flex-direction: column;
    gap: tokens.space('sm');
    max-width: 300px;
  }
</style>
