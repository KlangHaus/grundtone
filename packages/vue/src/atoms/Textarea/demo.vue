<script setup lang="ts">
  import { ref } from 'vue';
  import GTTextarea from './Textarea.vue';

  const comment = ref('');
  const limited = ref('');
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTTextarea
          v-model="comment"
          label="Kommentar"
          placeholder="Skriv din kommentar her..."
          help-text="Beskriv din situation så detaljeret som muligt"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Character limit</h3>
      <div class="gt-demo__stack">
        <GTTextarea
          v-model="limited"
          label="Kort beskrivelse"
          placeholder="Maks 60 tegn..."
          :max-chars="60"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Error state</h3>
      <div class="gt-demo__stack">
        <GTTextarea
          label="Begrundelse"
          error-text="Du skal angive en begrundelse"
          placeholder="Beskriv hvorfor..."
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Disabled</h3>
      <div class="gt-demo__stack">
        <GTTextarea
          label="Låst felt"
          model-value="Denne tekst kan ikke ændres"
          disabled
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Larger</h3>
      <div class="gt-demo__stack">
        <GTTextarea
          v-model="comment"
          label="Detaljeret beskrivelse"
          :rows="8"
          placeholder="Beskriv handlingsforløbet..."
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
