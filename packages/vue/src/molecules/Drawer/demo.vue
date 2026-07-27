<script setup lang="ts">
  import { ref } from 'vue';
  import GTDrawer from './Drawer.vue';
  import { GTButton } from '../../atoms/Button';

  const navOpen = ref(false);
  const detailOpen = ref(false);
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Modal drawer (venstre nav)</h3>
      <GTButton variant="primary" size="sm" @click="navOpen = true"
        >Åbn nav</GTButton
      >
      <GTDrawer v-model:open="navOpen" side="left" aria-label="Navigation">
        <nav aria-label="Navigation" style="padding: 1rem">
          <p>Scrim + fokus-trap. Luk med Escape eller klik udenfor.</p>
        </nav>
      </GTDrawer>
    </section>

    <section class="gt-demo__section">
      <h3>Non-modal drawer (højre detalje-panel)</h3>
      <GTButton variant="outlined" size="sm" @click="detailOpen = true"
        >Åbn detalje</GTButton
      >
      <GTDrawer
        v-model:open="detailOpen"
        side="right"
        :modal="false"
        aria-label="Detaljer"
      >
        <div style="padding: 1rem">
          <p>Ingen scrim — siden bagved er stadig interaktiv.</p>
          <GTButton variant="secondary" size="sm" @click="detailOpen = false"
            >Luk</GTButton
          >
        </div>
      </GTDrawer>
    </section>
  </div>
</template>
