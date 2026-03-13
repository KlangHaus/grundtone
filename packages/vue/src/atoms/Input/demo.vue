<script setup lang="ts">
  import { ref } from 'vue';
  import GTInput from './Input.vue';

  const name = ref('');
  const email = ref('');
  const errorValue = ref('');
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Sizes</h3>
      <div class="gt-demo__stack">
        <GTInput v-model="name" size="sm" placeholder="Small input" />
        <GTInput v-model="name" size="md" placeholder="Medium input" />
        <GTInput v-model="name" size="lg" placeholder="Large input" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With label &amp; help text</h3>
      <div class="gt-demo__stack">
        <GTInput
          v-model="name"
          label="Full name"
          placeholder="John Doe"
          help-text="Enter your full legal name"
          required
        />
        <GTInput
          v-model="email"
          type="email"
          label="Email"
          placeholder="john@example.com"
          autocomplete="email"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>States</h3>
      <div class="gt-demo__stack">
        <GTInput label="Disabled" disabled model-value="Cannot edit" />
        <GTInput label="Readonly" readonly model-value="Read only value" />
        <GTInput
          v-model="errorValue"
          label="With error"
          error-text="This field is required"
          placeholder="Type something..."
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Rounded</h3>
      <div class="gt-demo__stack">
        <GTInput rounded="none" placeholder="none" />
        <GTInput rounded="sm" placeholder="sm" />
        <GTInput placeholder="md (default)" />
        <GTInput rounded="full" placeholder="full" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Input types</h3>
      <div class="gt-demo__stack">
        <GTInput
          type="password"
          label="Password"
          placeholder="Enter password"
        />
        <GTInput type="search" label="Search" placeholder="Search..." />
        <GTInput type="number" label="Amount" placeholder="0" />
      </div>
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
