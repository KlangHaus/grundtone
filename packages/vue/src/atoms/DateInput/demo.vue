<script setup lang="ts">
  import { ref } from 'vue';
  import GTDateInput from './DateInput.vue';

  const birthDate = ref({ day: '', month: '', year: '' });
  const passportDate = ref({ day: '05', month: '12', year: '2018' });
  const errorDate = ref({ day: '', month: '', year: '' });
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTDateInput
          v-model="birthDate"
          label="Fødselsdato"
          help-text="For eksempel: 27 03 1990"
          autocomplete="bday"
          required
        />
        <p class="body-text-sm text-secondary">
          Value: {{ birthDate.day }}/{{ birthDate.month }}/{{ birthDate.year }}
        </p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Pre-filled</h3>
      <div class="gt-demo__stack">
        <GTDateInput
          v-model="passportDate"
          label="Hvornår blev dit pas udstedt?"
          help-text="For eksempel: 05 12 2018"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Sizes</h3>
      <div class="gt-demo__stack">
        <GTDateInput v-model="birthDate" label="Small" size="sm" />
        <GTDateInput v-model="birthDate" label="Medium" size="md" />
        <GTDateInput v-model="birthDate" label="Large" size="lg" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Error state</h3>
      <div class="gt-demo__stack">
        <GTDateInput
          v-model="errorDate"
          label="Startdato"
          error-text="Datoen kan ikke være i fremtiden"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Disabled</h3>
      <div class="gt-demo__stack">
        <GTDateInput
          :model-value="{ day: '01', month: '01', year: '2020' }"
          label="Oprettelsesdato"
          disabled
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Custom labels</h3>
      <div class="gt-demo__stack">
        <GTDateInput
          v-model="birthDate"
          label="Date of birth"
          day-label="Day"
          month-label="Month"
          year-label="Year"
        />
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
  }
</style>
