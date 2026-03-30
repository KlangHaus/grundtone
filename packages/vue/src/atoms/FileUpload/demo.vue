<script setup lang="ts">
  import GTFileUpload from './FileUpload.vue';
  import { useToast } from '../../composables/useToast';

  const toast = useToast();

  function onError(msg: string) {
    toast.error(msg, { icon: 'alert-circle' });
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTFileUpload
          label="Vedhæft fil"
          help-text="PDF, JPG eller PNG. Maks 5MB."
          accept=".pdf,.jpg,.jpeg,.png"
          :max-size="5 * 1024 * 1024"
          @error="onError"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Multiple</h3>
      <div class="gt-demo__stack">
        <GTFileUpload
          label="Dokumenter"
          help-text="Upload op til 10 filer"
          multiple
          :max-size="10 * 1024 * 1024"
          @error="onError"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Error</h3>
      <div class="gt-demo__stack">
        <GTFileUpload
          label="Bilag"
          error-text="Du skal vedhæfte mindst én fil"
          required
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Disabled</h3>
      <div class="gt-demo__stack">
        <GTFileUpload label="Fil" disabled />
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
