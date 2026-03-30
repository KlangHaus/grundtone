<script setup lang="ts">
  import { ref } from 'vue';
  import GTAddressInput from './AddressInput.vue';
  import type { DawaResult } from '../../composables/useDawaAutocomplete';

  const address = ref('');
  const selectedAddress = ref<DawaResult | null>(null);

  function onSelect(result: DawaResult) {
    selectedAddress.value = result;
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Address autocomplete (DAWA)</h3>
      <GTAddressInput
        v-model="address"
        label="Adresse"
        help-text="Begynd at skrive din adresse"
        required
        @select="onSelect"
      />
      <div v-if="selectedAddress" class="mt-2 text-sm text-secondary">
        <p><strong>Valgt:</strong> {{ selectedAddress.forslagstekst }}</p>
        <p><strong>Vejnavn:</strong> {{ selectedAddress.data.vejnavn }}</p>
        <p>
          <strong>Postnr:</strong> {{ selectedAddress.data.postnr }}
          {{ selectedAddress.data.postnrnavn }}
        </p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Address search (roads only)</h3>
      <GTAddressInput
        label="Vejnavn"
        type="vejnavn"
        placeholder="Søg vejnavn..."
      />
    </section>

    <section class="gt-demo__section">
      <h3>With error</h3>
      <GTAddressInput
        label="Adresse"
        error-text="Du skal vælge en gyldig adresse"
        required
      />
    </section>
  </div>
</template>
