<script setup lang="ts">
  import { ref } from 'vue';
  import {
    GTButton,
    GTIcon,
    GTInput,
    useField,
    useFormValidation,
  } from '@grundtone/vue';
  import { iconRegistry } from '@grundtone/core';
  import { required, email, minLength } from '@grundtone/utils';

  const isLoading = ref(false);
  const inputValue = ref('');
  const emailValue = ref('');
  const errorValue = ref('');

  // Validation demo
  const nameField = useField({
    validators: [
      required('Name is required'),
      minLength(2, 'At least 2 characters'),
    ],
  });
  const emailField = useField({
    validators: [required('Email is required'), email()],
    validateOn: 'blur',
  });
  const form = useFormValidation({ name: nameField, email: emailField });

  const formResult = ref('');
  function onValidationSubmit() {
    if (!form.validateAll()) {
      formResult.value = 'Validation failed';
      return;
    }
    formResult.value = `Valid! Name: ${nameField.value.value}, Email: ${emailField.value.value}`;
  }

  function simulateLoad() {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
</script>

<template>
  <div class="playground">
    <h1>Grundtone Vue Playground</h1>

    <section>
      <h2>Variants</h2>
      <div class="row">
        <GTButton variant="primary">Primary</GTButton>
        <GTButton variant="secondary">Secondary</GTButton>
        <GTButton variant="outlined">Outlined</GTButton>
        <GTButton variant="negative">Negative</GTButton>
        <GTButton variant="unstyled">Unstyled</GTButton>
      </div>
    </section>

    <section>
      <h2>Sizes</h2>
      <div class="row">
        <GTButton size="sm">Small</GTButton>
        <GTButton size="md">Medium</GTButton>
        <GTButton size="lg">Large</GTButton>
      </div>
    </section>

    <section>
      <h2>Rounded</h2>
      <div class="row">
        <GTButton rounded="none">none</GTButton>
        <GTButton rounded="sm">sm</GTButton>
        <GTButton>md (default)</GTButton>
        <GTButton rounded="lg">lg</GTButton>
        <GTButton rounded="full">full</GTButton>
      </div>
    </section>

    <section>
      <h2>States</h2>
      <div class="row">
        <GTButton disabled>Disabled</GTButton>
        <GTButton :loading="isLoading" @click="simulateLoad">
          {{ isLoading ? 'Saving...' : 'Click to load' }}
        </GTButton>
        <GTButton block>Block (full width)</GTButton>
      </div>
    </section>

    <section>
      <h2>Icons</h2>
      <div class="row">
        <GTIcon
          v-for="name in Object.keys(iconRegistry)"
          :key="name"
          :name="name"
        />
      </div>
    </section>

    <section>
      <h2>Icon sizes</h2>
      <div class="row">
        <GTIcon name="check" size="xs" />
        <GTIcon name="check" size="sm" />
        <GTIcon name="check" size="md" />
        <GTIcon name="check" size="lg" />
        <GTIcon name="check" size="xl" />
        <GTIcon name="check" size="2xl" />
      </div>
    </section>

    <section>
      <h2>Button with icon</h2>
      <div class="row">
        <GTButton variant="primary">
          <GTIcon name="check" size="sm" /> Confirm
        </GTButton>
        <GTButton variant="negative">
          <GTIcon name="close" size="sm" /> Delete
        </GTButton>
        <GTButton variant="outlined">
          <GTIcon name="search" size="sm" /> Search
        </GTButton>
      </div>
    </section>

    <section>
      <h2>Input sizes</h2>
      <div class="stack">
        <GTInput v-model="inputValue" size="sm" placeholder="Small input" />
        <GTInput v-model="inputValue" size="md" placeholder="Medium input" />
        <GTInput v-model="inputValue" size="lg" placeholder="Large input" />
      </div>
    </section>

    <section>
      <h2>Input with label &amp; help</h2>
      <div class="stack">
        <GTInput
          v-model="inputValue"
          label="Full name"
          placeholder="John Doe"
          help-text="Enter your full legal name"
          required
        />
        <GTInput
          v-model="emailValue"
          type="email"
          label="Email"
          placeholder="john@example.com"
          autocomplete="email"
        />
      </div>
    </section>

    <section>
      <h2>Input states</h2>
      <div class="stack">
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

    <section>
      <h2>Input rounded</h2>
      <div class="stack">
        <GTInput rounded="none" placeholder="none" />
        <GTInput rounded="sm" placeholder="sm" />
        <GTInput placeholder="md (default)" />
        <GTInput rounded="full" placeholder="full" />
      </div>
    </section>

    <section>
      <h2>Input types</h2>
      <div class="stack">
        <GTInput
          type="password"
          label="Password"
          placeholder="Enter password"
        />
        <GTInput type="search" label="Search" placeholder="Search..." />
        <GTInput type="number" label="Amount" placeholder="0" />
      </div>
    </section>

    <section>
      <h2>Validation (useField + useFormValidation)</h2>
      <form class="stack" @submit.prevent="onValidationSubmit">
        <GTInput
          v-model="nameField.value.value"
          :error-text="nameField.errorText.value"
          v-on="nameField.handlers"
          label="Name"
          placeholder="Enter your name"
          required
        />
        <GTInput
          v-model="emailField.value.value"
          :error-text="emailField.errorText.value"
          v-on="emailField.handlers"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <div class="row">
          <GTButton type="submit" variant="primary">Submit</GTButton>
          <GTButton type="button" variant="outlined" @click="form.resetAll()"
            >Reset</GTButton
          >
        </div>
        <p v-if="formResult">{{ formResult }}</p>
      </form>
    </section>

    <section>
      <h2>As link</h2>
      <div class="row">
        <GTButton as="a" href="#link">Link button</GTButton>
        <GTButton as="a" href="#link" variant="outlined">
          Outlined link
        </GTButton>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
    font-family: tokens.font-family('base');
    background: tokens.color('background');
    color: tokens.color('text');
  }

  .playground {
    max-width: 800px;
    margin: 0 auto;
    padding: tokens.space('xl');

    h1 {
      margin-bottom: tokens.space('xl');
    }

    h2 {
      margin-bottom: tokens.space('sm');
      font-size: tokens.font-size('lg');
    }

    section {
      margin-bottom: tokens.space('xl');
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: tokens.space('sm');
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: tokens.space('sm');
    }
  }
</style>
