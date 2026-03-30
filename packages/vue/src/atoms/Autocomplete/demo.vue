<script setup lang="ts">
  import { ref } from 'vue';
  import GTAutocomplete from './Autocomplete.vue';
  import type { AutocompleteSuggestion } from './types';

  const query = ref('');
  const selected = ref<AutocompleteSuggestion | null>(null);

  // Static demo suggestions
  const allFruits = [
    { value: 'apple', label: 'Æble', description: 'Grøn eller rød' },
    { value: 'banana', label: 'Banan', description: 'Gul og krum' },
    { value: 'cherry', label: 'Kirsebær', description: 'Lille og rød' },
    { value: 'grape', label: 'Vindrue', description: 'I klaser' },
    { value: 'mango', label: 'Mango', description: 'Tropisk frugt' },
    { value: 'orange', label: 'Appelsin', description: 'Citrusfrugt' },
    { value: 'pear', label: 'Pære', description: 'Sød og saftig' },
    { value: 'strawberry', label: 'Jordbær', description: 'Sommerens favorit' },
  ];

  const filtered = ref<AutocompleteSuggestion[]>([]);

  function onSearch(q: string) {
    if (q.length < 2) {
      filtered.value = [];
      return;
    }
    const lower = q.toLowerCase();
    filtered.value = allFruits.filter(
      f =>
        f.label.toLowerCase().includes(lower) ||
        f.description?.toLowerCase().includes(lower),
    );
  }

  function onSelect(suggestion: AutocompleteSuggestion) {
    selected.value = suggestion;
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Autocomplete (static data)</h3>
      <GTAutocomplete
        v-model="query"
        :suggestions="filtered"
        label="Frugt"
        placeholder="Søg efter en frugt..."
        help-text="Prøv at skrive 'banan' eller 'æble'"
        @search="onSearch"
        @select="onSelect"
      />
      <p v-if="selected" class="text-sm text-secondary">
        Valgt: {{ selected.label }} ({{ selected.description }})
      </p>
    </section>
  </div>
</template>
