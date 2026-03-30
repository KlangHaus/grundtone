<script setup lang="ts">
  import { ref } from 'vue';
  import GTSelect from './Select.vue';

  const region = ref('');
  const country = ref('');
  const errorValue = ref('');

  const regions = [
    { value: 'hovedstaden', label: 'Hovedstaden' },
    { value: 'midtjylland', label: 'Midtjylland' },
    { value: 'nordjylland', label: 'Nordjylland' },
    { value: 'sjaelland', label: 'Sjælland' },
    { value: 'syddanmark', label: 'Syddanmark' },
  ];

  const grouped = [
    {
      label: 'Norden',
      options: [
        { value: 'dk', label: 'Danmark' },
        { value: 'se', label: 'Sverige' },
        { value: 'no', label: 'Norge' },
        { value: 'fi', label: 'Finland' },
        { value: 'is', label: 'Island' },
      ],
    },
    {
      label: 'Baltikum',
      options: [
        { value: 'ee', label: 'Estland' },
        { value: 'lv', label: 'Letland' },
        { value: 'lt', label: 'Litauen' },
      ],
    },
  ];
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <GTSelect v-model="region" label="Region" :options="regions" required />
      <p v-if="region" class="text-sm text-secondary">Valgt: {{ region }}</p>
    </section>

    <section class="gt-demo__section">
      <h3>With help text</h3>
      <GTSelect
        :options="regions"
        label="Region"
        help-text="Vælg den region du bor i"
        optional-label="(valgfrit)"
      />
    </section>

    <section class="gt-demo__section">
      <h3>With error</h3>
      <GTSelect
        v-model="errorValue"
        :options="regions"
        label="Region"
        error-text="Du skal vælge en region"
        required
      />
    </section>

    <section class="gt-demo__section">
      <h3>Sizes</h3>
      <div class="flex flex-col gap-2">
        <GTSelect :options="regions" size="sm" placeholder="Small" />
        <GTSelect :options="regions" size="md" placeholder="Medium" />
        <GTSelect :options="regions" size="lg" placeholder="Large" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Grouped options</h3>
      <GTSelect
        v-model="country"
        label="Land"
        :options="grouped"
        placeholder="Vælg land..."
      />
      <p v-if="country" class="text-sm text-secondary">Valgt: {{ country }}</p>
    </section>

    <section class="gt-demo__section">
      <h3>Disabled</h3>
      <GTSelect
        :options="regions"
        label="Region"
        model-value="hovedstaden"
        disabled
      />
    </section>

    <section class="gt-demo__section">
      <h3>With disabled option</h3>
      <GTSelect
        :options="[
          { value: 'a', label: 'Available' },
          { value: 'b', label: 'Unavailable', disabled: true },
          { value: 'c', label: 'Also available' },
        ]"
        label="Choose"
      />
    </section>
  </div>
</template>
