<script setup lang="ts">
  import { ref } from 'vue';
  import GTAlert from './Alert.vue';

  const showDismissible = ref(true);
  function resetDismissible() {
    showDismissible.value = true;
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Info</h3>
      <GTAlert variant="info" icon="info-circle">
        <p>This is an informational message.</p>
      </GTAlert>
    </section>

    <section class="gt-demo__section">
      <h3>Success</h3>
      <GTAlert variant="success" icon="check-circle">
        <p>Your changes have been saved successfully.</p>
      </GTAlert>
    </section>

    <section class="gt-demo__section">
      <h3>Warning with heading</h3>
      <GTAlert variant="warning" icon="alert-triangle" heading="Attention">
        <p>Your session will expire in 5 minutes.</p>
      </GTAlert>
    </section>

    <section class="gt-demo__section">
      <h3>Error with heading</h3>
      <GTAlert variant="error" icon="alert-circle" heading="Form errors">
        <p>Please fix the following errors before submitting.</p>
      </GTAlert>
    </section>

    <section class="gt-demo__section">
      <h3>With footer</h3>
      <GTAlert variant="error" icon="alert-circle" heading="2 errors">
        <ul style="margin: 0; padding-left: 1rem">
          <li>Name is required</li>
          <li>Email is not valid</li>
        </ul>
        <template #footer>
          <p>Fix the errors and try again.</p>
        </template>
      </GTAlert>
    </section>

    <section class="gt-demo__section">
      <h3>Dismissible</h3>
      <GTAlert
        v-if="showDismissible"
        variant="info"
        icon="info-circle"
        dismissible
        @dismiss="showDismissible = false"
      >
        <p>This alert can be dismissed.</p>
      </GTAlert>
      <button v-else type="button" @click="resetDismissible">
        Show alert again
      </button>
    </section>
  </div>
</template>
