<script setup lang="ts">
  import { ref } from 'vue';
  import GTCheckboxGroup from './CheckboxGroup.vue';

  const nationalities = ref<string[]>([]);
  const prefs = ref<string[]>([]);
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTCheckboxGroup
          v-model="nationalities"
          label="Hvad er din nationalitet?"
          help-text="Angiv om du er dansk, svensk eller anden nationalitet"
          :options="[
            { value: 'dk', label: 'Dansk' },
            { value: 'se', label: 'Svensk' },
            { value: 'other', label: 'Anden nationalitet' },
          ]"
        />
        <p class="body-text-sm text-secondary">
          Valgt:
          {{ nationalities.length ? nationalities.join(', ') : '(ingen)' }}
        </p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With hints</h3>
      <div class="gt-demo__stack">
        <GTCheckboxGroup
          v-model="prefs"
          label="Præferencer"
          :options="[
            {
              value: 'news',
              label: 'Nyhedsbrev',
              hint: 'Maks én email om ugen',
            },
            {
              value: 'push',
              label: 'Push-notifikationer',
              hint: 'Vigtige opdateringer',
            },
            {
              value: 'sms',
              label: 'SMS-påmindelser',
              hint: 'Kun ved deadlines',
            },
          ]"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Error state</h3>
      <div class="gt-demo__stack">
        <GTCheckboxGroup
          label="Nationalitet"
          error-text="Angiv mindst én nationalitet"
          :options="[
            { value: 'dk', label: 'Dansk' },
            { value: 'se', label: 'Svensk' },
          ]"
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
