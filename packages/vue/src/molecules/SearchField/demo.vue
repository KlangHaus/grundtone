<script setup lang="ts">
  import { ref } from 'vue';
  import GTSearchField from './SearchField.vue';

  const query = ref('');
  const lastSubmit = ref('');
  const suggestQuery = ref('');

  const suggestions = [
    { value: 'design tokens', label: 'Design tokens' },
    { value: 'design system', label: 'Design system' },
    { value: 'dark mode', label: 'Dark mode' },
    { value: 'deployment', label: 'Deployment' },
  ];

  const filteredSuggestions = ref(suggestions);

  function onSuggestInput(val: string) {
    suggestQuery.value = val;
    filteredSuggestions.value = suggestions.filter(s =>
      s.label.toLowerCase().includes(val.toLowerCase()),
    );
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTSearchField v-model="query" @submit="lastSubmit = $event" />
        <p v-if="lastSubmit" class="body-text-sm text-secondary">
          Søgte efter: "{{ lastSubmit }}"
        </p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Large</h3>
      <div class="gt-demo__stack">
        <GTSearchField
          v-model="query"
          size="lg"
          placeholder="Søg i dokumentation..."
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With suggestions</h3>
      <div class="gt-demo__stack">
        <GTSearchField
          v-model="suggestQuery"
          :suggestions="filteredSuggestions"
          placeholder="Skriv 'design'..."
          @update:model-value="onSuggestInput"
          @submit="lastSubmit = $event"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Disabled</h3>
      <div class="gt-demo__stack">
        <GTSearchField model-value="Kan ikke redigeres" disabled />
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
