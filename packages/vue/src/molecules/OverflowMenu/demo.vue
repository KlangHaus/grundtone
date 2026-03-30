<script setup lang="ts">
  import { ref } from 'vue';
  import GTOverflowMenu from './OverflowMenu.vue';

  const lastAction = ref('');
  const currentSort = ref('newest');

  const sortItems = [
    { label: 'Nyeste først', value: 'newest' },
    { label: 'Ældste først', value: 'oldest' },
    { label: 'Navn (A-Å)', value: 'name-asc' },
    { label: 'Navn (Å-A)', value: 'name-desc' },
  ];
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Standard (actions)</h3>
      <div class="flex items-center gap-2">
        <GTOverflowMenu
          :items="[
            { label: 'Redigér', value: 'edit' },
            { label: 'Dupliker', value: 'duplicate' },
            { label: 'Arkivér', value: 'archive' },
            { label: 'Slet', value: 'delete', danger: true },
          ]"
          @select="lastAction = $event.label"
        />
        <p v-if="lastAction" class="body-text-sm text-secondary">
          Sidst valgt: {{ lastAction }}
        </p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With label</h3>
      <GTOverflowMenu
        label="Handlinger"
        :items="[
          { label: 'Eksportér CSV', value: 'csv' },
          { label: 'Eksportér PDF', value: 'pdf' },
          { label: 'Print', value: 'print' },
        ]"
        @select="lastAction = $event.label"
      />
    </section>

    <section class="gt-demo__section">
      <h3>Sorting</h3>
      <GTOverflowMenu
        label="Sortér"
        align="left"
        :items="
          sortItems.map(item => ({
            ...item,
            active: item.value === currentSort,
          }))
        "
        @select="currentSort = $event.value ?? currentSort"
      />
      <p class="body-text-sm text-secondary mt-2">
        Aktiv sortering: {{ currentSort }}
      </p>
    </section>

    <section class="gt-demo__section">
      <h3>Left aligned</h3>
      <GTOverflowMenu
        align="left"
        :items="[
          { label: 'Profil', value: 'profile' },
          { label: 'Indstillinger', value: 'settings' },
          { label: 'Log ud', value: 'logout', danger: true },
        ]"
      />
    </section>
  </div>
</template>
