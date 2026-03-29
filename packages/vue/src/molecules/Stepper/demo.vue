<script setup lang="ts">
  import { ref } from 'vue';
  import GTStepper from './Stepper.vue';
  import { GTButton } from '../../atoms/Button';

  const step = ref(0);
  const steps = [
    { label: 'Kontaktinfo', info: 'Navn og email' },
    { label: 'Adresse', info: 'Leveringsadresse' },
    { label: 'Betaling', info: 'Betalingsmetode' },
    { label: 'Opsummering' },
  ];
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Standard</h3>
      <GTStepper v-model:active-step="step" :steps="steps" />
      <div class="flex gap-2 mt-3">
        <GTButton
          size="sm"
          variant="outlined"
          :disabled="step === 0"
          @click="step--"
        >
          Tilbage
        </GTButton>
        <GTButton
          size="sm"
          variant="primary"
          :disabled="step === steps.length - 1"
          @click="step++"
        >
          Næste
        </GTButton>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Alle klikbare</h3>
      <GTStepper v-model:active-step="step" :steps="steps" all-clickable />
    </section>

    <section class="gt-demo__section">
      <h3>Med fejl</h3>
      <GTStepper
        :active-step="2"
        :steps="[
          { label: 'Kontaktinfo', error: true },
          { label: 'Adresse' },
          { label: 'Betaling' },
        ]"
      />
    </section>

    <section class="gt-demo__section">
      <h3>Simpel</h3>
      <GTStepper :steps="steps" :active-step="step" simple />
    </section>
  </div>
</template>
