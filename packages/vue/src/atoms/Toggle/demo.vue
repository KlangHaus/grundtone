<script setup lang="ts">
  import { ref } from 'vue';
  import GTToggle from './Toggle.vue';

  const notifications = ref(true);
  const darkMode = ref(false);
  const disabled = ref(false);
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTToggle v-model="notifications" label="Notifications" />
        <p>{{ notifications ? 'On' : 'Off' }}</p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Sizes</h3>
      <div class="gt-demo__stack">
        <GTToggle v-model="darkMode" size="sm" label="Small" />
        <GTToggle v-model="darkMode" size="md" label="Medium" />
        <GTToggle v-model="darkMode" size="lg" label="Large" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>States</h3>
      <div class="gt-demo__stack">
        <GTToggle :model-value="true" label="On" />
        <GTToggle :model-value="false" label="Off" />
        <GTToggle v-model="disabled" disabled label="Disabled" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Without label</h3>
      <GTToggle v-model="darkMode" />
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
