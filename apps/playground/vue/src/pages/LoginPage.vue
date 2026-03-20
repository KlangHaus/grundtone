<script setup lang="ts">
  import { ref } from 'vue';
  import {
    GTButton,
    GTInput,
    useField,
    useFormValidation,
    required,
    email,
  } from '@grundtone/vue';

  const emailField = useField({
    validators: [required('Email er påkrævet'), email('Ugyldig email')],
    validateOn: 'blur',
  });
  const passwordField = useField({
    validators: [required('Adgangskode er påkrævet')],
  });

  const form = useFormValidation({
    email: emailField,
    password: passwordField,
  });

  const formResult = ref('');

  function onSubmit() {
    if (!form.validateAll()) {
      formResult.value = '';
      return;
    }
    formResult.value = `Logget ind som ${emailField.value.value}`;
  }
</script>

<template>
  <main id="main" class="container-xs p-4" style="max-width: 28rem">
    <h1 class="text-3xl font-bold mb-1">Log ind</h1>
    <p class="text-secondary mb-5">Log ind på din Grundtone-konto.</p>

    <form novalidate @submit.prevent="onSubmit">
      <div class="flex flex-col gap-3">
        <GTInput
          v-model="emailField.value.value"
          :error-text="emailField.errorText.value"
          v-on="emailField.handlers"
          label="Email"
          type="email"
          placeholder="anders@example.dk"
          autocomplete="email"
          required
        />
        <GTInput
          v-model="passwordField.value.value"
          :error-text="passwordField.errorText.value"
          v-on="passwordField.handlers"
          label="Adgangskode"
          type="password"
          placeholder="Din adgangskode"
          autocomplete="current-password"
          required
        />
      </div>

      <GTButton type="submit" variant="primary" size="md" block class="mt-4">
        Log ind
      </GTButton>

      <p v-if="formResult" class="mt-3 text-sm font-medium text-success">
        {{ formResult }}
      </p>
    </form>

    <p class="text-sm text-secondary mt-4">
      Har du ikke en konto?
      <a href="#/signup" class="text-primary font-medium">Opret konto</a>
    </p>
  </main>
</template>
