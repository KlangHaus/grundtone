<script setup lang="ts">
  import { ref } from 'vue';
  import GTModal from './Modal.vue';
  import { GTButton } from '../../atoms/Button';

  const showStandard = ref(false);
  const showPersistent = ref(false);
  const showSlideUp = ref(false);
  const showFade = ref(false);
  const showSlideDown = ref(false);
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Standard (scale)</h3>
      <GTButton variant="primary" size="sm" @click="showStandard = true">
        Åbn modal
      </GTButton>
      <GTModal v-model:open="showStandard" title="Standard modal">
        <p>
          Denne modal kan lukkes med Escape, klik på baggrund, eller
          luk-knappen.
        </p>
        <template #footer>
          <GTButton variant="outlined" size="sm" @click="showStandard = false"
            >Annuller</GTButton
          >
          <GTButton variant="primary" size="sm" @click="showStandard = false"
            >Bekræft</GTButton
          >
        </template>
      </GTModal>
    </section>

    <section class="gt-demo__section">
      <h3>Persistent (kræver handling)</h3>
      <GTButton variant="negative" size="sm" @click="showPersistent = true">
        Slet konto
      </GTButton>
      <GTModal v-model:open="showPersistent" title="Slet konto?" persistent>
        <p>
          Er du sikker på at du vil slette din konto? Denne handling kan ikke
          fortrydes.
        </p>
        <template #footer>
          <GTButton variant="outlined" size="sm" @click="showPersistent = false"
            >Annuller</GTButton
          >
          <GTButton variant="negative" size="sm" @click="showPersistent = false"
            >Slet konto</GTButton
          >
        </template>
      </GTModal>
    </section>

    <section class="gt-demo__section">
      <h3>Transitions</h3>
      <div class="gt-demo__stack--row">
        <GTButton size="sm" @click="showFade = true">Fade</GTButton>
        <GTButton size="sm" @click="showSlideUp = true">Slide up</GTButton>
        <GTButton size="sm" @click="showSlideDown = true">Slide down</GTButton>
      </div>
      <GTModal v-model:open="showFade" title="Fade" transition="fade">
        <p>Fade transition.</p>
        <template #footer>
          <GTButton variant="primary" size="sm" @click="showFade = false"
            >OK</GTButton
          >
        </template>
      </GTModal>
      <GTModal
        v-model:open="showSlideUp"
        title="Slide Up"
        transition="slide-up"
      >
        <p>Slide up transition — bottom sheet feel.</p>
        <template #footer>
          <GTButton variant="primary" size="sm" @click="showSlideUp = false"
            >OK</GTButton
          >
        </template>
      </GTModal>
      <GTModal
        v-model:open="showSlideDown"
        title="Slide Down"
        transition="slide-down"
      >
        <p>Slide down transition.</p>
        <template #footer>
          <GTButton variant="primary" size="sm" @click="showSlideDown = false"
            >OK</GTButton
          >
        </template>
      </GTModal>
    </section>
  </div>
</template>

<style lang="scss">
  .gt-demo {
    &__stack--row {
      display: flex;
      gap: tokens.space('sm');
    }
  }
</style>
