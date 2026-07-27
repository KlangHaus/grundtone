<script setup lang="ts">
  import { ref } from 'vue';
  import GTConfirmDialog from './ConfirmDialog.vue';
  import { GTButton } from '../../atoms/Button';

  const confirmOpen = ref(false);
  const deleteOpen = ref(false);
  const deleting = ref(false);

  function runDelete() {
    deleting.value = true;
    setTimeout(() => {
      deleting.value = false;
      deleteOpen.value = false;
    }, 1200);
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Standard bekræftelse</h3>
      <GTButton variant="primary" size="sm" @click="confirmOpen = true"
        >Publicér</GTButton
      >
      <GTConfirmDialog
        v-model:open="confirmOpen"
        title="Publicér ændringer?"
        message="Dine tokens går live på CDN'et med det samme."
        confirm-label="Publicér"
        @confirm="confirmOpen = false"
      />
    </section>

    <section class="gt-demo__section">
      <h3>Destruktiv (med async loading)</h3>
      <GTButton variant="negative" size="sm" @click="deleteOpen = true"
        >Slet nøgle</GTButton
      >
      <GTConfirmDialog
        v-model:open="deleteOpen"
        title="Slet API-nøgle?"
        message="Nøglen kan ikke bruges igen. Handlingen kan ikke fortrydes."
        confirm-label="Slet"
        destructive
        :loading="deleting"
        @confirm="runDelete"
      />
    </section>
  </div>
</template>
