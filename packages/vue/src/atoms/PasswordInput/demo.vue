<script setup lang="ts">
  import { ref } from 'vue';
  import GTPasswordInput from './PasswordInput.vue';

  const password = ref('');
  const newPassword = ref('');
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Login</h3>
      <div class="gt-demo__stack">
        <GTPasswordInput
          v-model="password"
          label="Adgangskode"
          autocomplete="current-password"
          required
        />
      </div>
    </section>
    <section class="gt-demo__section">
      <h3>Create password</h3>
      <div class="gt-demo__stack">
        <GTPasswordInput
          v-model="newPassword"
          label="Ny adgangskode"
          help-text="Mindst 8 tegn med bogstaver og tal"
          autocomplete="new-password"
          required
        />
      </div>
    </section>
    <section class="gt-demo__section">
      <h3>Error</h3>
      <div class="gt-demo__stack">
        <GTPasswordInput
          label="Adgangskode"
          error-text="Forkert adgangskode"
          autocomplete="current-password"
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
