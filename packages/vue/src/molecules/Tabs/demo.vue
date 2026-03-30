<script setup lang="ts">
  import { ref } from 'vue';
  import GTTabs from './Tabs.vue';
  import GTTabPanel from './TabPanel.vue';

  const activeUnderline = ref('overview');
  const activeSegment = ref('vue');
  const activePill = ref('all');
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Underline (default)</h3>
      <GTTabs
        v-model="activeUnderline"
        :tabs="[
          { id: 'overview', label: 'Oversigt' },
          { id: 'details', label: 'Detaljer' },
          { id: 'history', label: 'Historik' },
        ]"
      >
        <GTTabPanel id="overview">
          <p>Oversigt over systemets status og nøgletal.</p>
        </GTTabPanel>
        <GTTabPanel id="details">
          <p>Detaljeret visning af konfiguration og indstillinger.</p>
        </GTTabPanel>
        <GTTabPanel id="history">
          <p>Historik over ændringer og handlinger.</p>
        </GTTabPanel>
      </GTTabs>
    </section>

    <section class="gt-demo__section">
      <h3>Segment</h3>
      <GTTabs
        v-model="activeSegment"
        variant="segment"
        :tabs="[
          { id: 'vue', label: 'Vue' },
          { id: 'nuxt', label: 'Nuxt' },
          { id: 'rn', label: 'React Native' },
        ]"
      >
        <GTTabPanel id="vue">
          <p>Vue 3 komponentbibliotek med Composition API.</p>
        </GTTabPanel>
        <GTTabPanel id="nuxt">
          <p>Nuxt-modul med auto-import og CSS-injektion.</p>
        </GTTabPanel>
        <GTTabPanel id="rn">
          <p>React Native med tema-provider og native shadows.</p>
        </GTTabPanel>
      </GTTabs>
    </section>

    <section class="gt-demo__section">
      <h3>Pill</h3>
      <GTTabs
        v-model="activePill"
        variant="pill"
        :tabs="[
          { id: 'all', label: 'Alle' },
          { id: 'atoms', label: 'Atoms' },
          { id: 'molecules', label: 'Molecules' },
        ]"
      >
        <GTTabPanel id="all">
          <p>Viser alle komponenter i biblioteket.</p>
        </GTTabPanel>
        <GTTabPanel id="atoms">
          <p>Button, Badge, Input, Toggle, Select, Details, Autocomplete.</p>
        </GTTabPanel>
        <GTTabPanel id="molecules">
          <p>Accordion, Alert, AnchorLinks, Breadcrumb, Card, Tabs.</p>
        </GTTabPanel>
      </GTTabs>
    </section>

    <section class="gt-demo__section">
      <h3>With icons</h3>
      <GTTabs
        :tabs="[
          { id: 'search', label: 'Søg', icon: 'search' },
          { id: 'check', label: 'Godkendt', icon: 'check' },
          { id: 'close', label: 'Lukket', icon: 'close' },
        ]"
      >
        <GTTabPanel id="search">
          <p>Søgeresultater vises her.</p>
        </GTTabPanel>
        <GTTabPanel id="check">
          <p>Godkendte elementer.</p>
        </GTTabPanel>
        <GTTabPanel id="close">
          <p>Lukkede sager.</p>
        </GTTabPanel>
      </GTTabs>
    </section>
  </div>
</template>
