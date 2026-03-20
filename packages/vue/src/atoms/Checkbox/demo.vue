<script setup lang="ts">
  import { ref } from 'vue';
  import GTCheckbox from './Checkbox.vue';

  const accepted = ref(false);
  const newsletter = ref(true);
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTCheckbox v-model="accepted" label="Jeg accepterer vilkårene" />
        <p class="body-text-sm text-secondary">
          {{ accepted ? 'Accepteret' : 'Ikke accepteret' }}
        </p>
      </div>
    </section>
    <section class="gt-demo__section">
      <h3>With help text</h3>
      <div class="gt-demo__stack">
        <GTCheckbox
          v-model="newsletter"
          label="Modtag nyhedsbrev"
          help-text="Vi sender maks én email om ugen"
        />
      </div>
    </section>
    <section class="gt-demo__section">
      <h3>Disabled</h3>
      <div class="gt-demo__stack">
        <GTCheckbox :model-value="true" label="Locked option" disabled />
        <GTCheckbox :model-value="false" label="Disabled unchecked" disabled />
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
