<script setup lang="ts">
  import { ref } from 'vue';
  import {
    GTAlert,
    GTButton,
    GTDateInput,
    GTInput,
    GTSelect,
    GTTabs,
    GTTabPanel,
    GTToggle,
    useField,
    useDateField,
    useFormValidation,
    required,
    email,
    minLength,
    date as dateValidator,
  } from '@grundtone/vue';

  const nameField = useField({
    validators: [required('Navn er påkrævet'), minLength(2, 'Mindst 2 tegn')],
  });
  const emailField = useField({
    validators: [required('Email er påkrævet'), email('Ugyldig email')],
    validateOn: 'blur',
  });
  const passwordField = useField({
    validators: [
      required('Adgangskode er påkrævet'),
      minLength(8, 'Mindst 8 tegn'),
    ],
  });
  const birthDate = useDateField({
    validators: [dateValidator('Ugyldig dato')],
    validateOn: 'blur',
  });

  const form = useFormValidation({
    name: nameField,
    email: emailField,
    password: passwordField,
    birthDate,
  });

  const newsletter = ref(true);
  const pushNotifications = ref(false);
  const formResult = ref('');

  function onSubmit() {
    if (!form.validateAll()) {
      formResult.value = 'Ret venligst fejlene ovenfor.';
      return;
    }
    formResult.value = `Konto oprettet for ${nameField.value.value}!`;
  }
</script>

<template>
  <main id="main" class="container-sm p-4">
    <h1 class="text-3xl font-bold mb-1">Opret konto</h1>
    <p class="text-secondary mb-5">
      Tilmeld dig for at få adgang til alle funktioner.
    </p>

    <form novalidate @submit.prevent="onSubmit">
      <!-- Account type tabs -->
      <GTTabs
        variant="segment"
        :tabs="[
          { id: 'personal', label: 'Personlig' },
          { id: 'business', label: 'Virksomhed' },
        ]"
      >
        <GTTabPanel id="personal">
          <div class="flex flex-col gap-3 mt-3">
            <GTInput
              v-model="nameField.value.value"
              :error-text="nameField.errorText.value"
              v-on="nameField.handlers"
              label="Fulde navn"
              placeholder="Anders Andersen"
              required
            />
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
              placeholder="Minimum 8 tegn"
              help-text="Brug mindst 8 tegn med bogstaver og tal"
              required
            />
          </div>
        </GTTabPanel>
        <GTTabPanel id="business">
          <div class="flex flex-col gap-3 mt-3">
            <GTInput label="Virksomhedsnavn" placeholder="Firma ApS" required />
            <GTInput label="CVR-nummer" placeholder="12345678" />
            <GTInput
              label="Kontaktperson"
              placeholder="Anders Andersen"
              required
            />
            <GTInput
              label="Email"
              type="email"
              placeholder="info@firma.dk"
              required
            />
            <GTInput
              label="Adgangskode"
              type="password"
              placeholder="Minimum 8 tegn"
              required
            />
          </div>
        </GTTabPanel>
      </GTTabs>

      <!-- Birth date -->
      <div class="mt-4 mb-4">
        <GTDateInput
          v-model="birthDate.dateValue.value"
          :error-text="birthDate.errorText.value"
          v-on="birthDate.handlers"
          label="Fødselsdato"
          help-text="For eksempel: 27 03 1990"
          autocomplete="bday"
        />
      </div>

      <!-- Region -->
      <div class="mb-4">
        <GTSelect
          label="Region"
          :options="[
            { value: 'hovedstaden', label: 'Hovedstaden' },
            { value: 'midtjylland', label: 'Midtjylland' },
            { value: 'nordjylland', label: 'Nordjylland' },
            { value: 'sjaelland', label: 'Sjælland' },
            { value: 'syddanmark', label: 'Syddanmark' },
          ]"
        />
      </div>

      <!-- Preferences -->
      <fieldset class="mb-4">
        <legend class="text-base font-semibold mb-3">Præferencer</legend>
        <div class="flex flex-col gap-3">
          <GTToggle v-model="newsletter" label="Modtag nyhedsbrev" />
          <GTToggle
            v-model="pushNotifications"
            label="Tillad push-notifikationer"
          />
        </div>
      </fieldset>

      <!-- Info alert -->
      <GTAlert variant="info" icon="info-circle" class="mb-4">
        <p>
          Gratis i 30 dage. Du kan altid opgradere eller annullere. Ingen
          kreditkort påkrævet.
        </p>
      </GTAlert>

      <!-- Submit -->
      <GTButton type="submit" variant="primary" size="md" block>
        Opret konto
      </GTButton>

      <p v-if="formResult" class="mt-3 text-sm font-medium">
        {{ formResult }}
      </p>
    </form>

    <p class="text-sm text-secondary mt-4">
      Har du allerede en konto?
      <a href="#/login" class="text-primary font-medium">Log ind</a>
    </p>
  </main>
</template>
