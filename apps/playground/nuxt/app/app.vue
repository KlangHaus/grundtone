<script setup lang="ts">
  import { ref } from 'vue';
  import { iconRegistry } from '@grundtone/icons';

  const showDismissible = ref(true);
  const isLoading = ref(false);
  const toggleValue = ref(false);
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
  <div class="container py-6">
    <h1 class="mb-6">Grundtone Nuxt Playground</h1>

    <section class="mb-6">
      <h2 class="mb-2">Alert</h2>
      <div class="flex flex-col gap-2">
        <GTAlert variant="info" icon="info-circle">
          <p>This is an informational message.</p>
        </GTAlert>
        <GTAlert variant="success" icon="check-circle">
          <p>Your changes have been saved.</p>
        </GTAlert>
        <GTAlert variant="warning" icon="alert-triangle" heading="Attention">
          <p>Your session will expire in 5 minutes.</p>
        </GTAlert>
        <GTAlert variant="error" icon="alert-circle" heading="Form errors">
          <p>Please fix the errors before submitting.</p>
        </GTAlert>
        <GTAlert
          v-if="showDismissible"
          variant="info"
          icon="info-circle"
          dismissible
          @dismiss="showDismissible = false"
        >
          <p>This alert can be dismissed.</p>
        </GTAlert>
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Breadcrumb</h2>
      <div class="flex flex-col gap-2">
        <GTBreadcrumb
          :items="[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Current Post' },
          ]"
        />
        <GTBreadcrumb
          separator="→"
          :items="[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Settings', href: '/settings' },
            { label: 'Profile' },
          ]"
        />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Card</h2>
      <div class="grid grid-cols-3 gap-md">
        <GTCard title="Standard Card" subheading="Raised">
          <p>Default raised variant with surface background.</p>
        </GTCard>
        <GTCard nav href="#" title="Navigation Card" subheading="Clickable">
          <p>Entire card is a link with hover elevation.</p>
        </GTCard>
        <GTCard variant="bordered" title="Bordered Card">
          <p>Subtle border instead of elevation.</p>
          <template #footer>
            <a href="#">Read more</a>
          </template>
        </GTCard>
      </div>
      <div class="mt-2 max-w-xl">
        <GTCard
          horizontal
          title="Horizontal Card"
          subheading="Feature"
          image="/placeholder-400x300.png"
          image-alt="Placeholder"
        >
          <p>Image on the left, content on the right.</p>
        </GTCard>
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Variants</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton variant="primary">Primary</GTButton>
        <GTButton variant="secondary">Secondary</GTButton>
        <GTButton variant="outlined">Outlined</GTButton>
        <GTButton variant="negative">Negative</GTButton>
        <GTButton variant="unstyled">Unstyled</GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Sizes</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton size="sm">Small</GTButton>
        <GTButton size="md">Medium</GTButton>
        <GTButton size="lg">Large</GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Rounded</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton rounded="none">none</GTButton>
        <GTButton rounded="sm">sm</GTButton>
        <GTButton>md (default)</GTButton>
        <GTButton rounded="lg">lg</GTButton>
        <GTButton rounded="full">full</GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">States</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton disabled>Disabled</GTButton>
        <GTButton :loading="isLoading" @click="simulateLoad">
          {{ isLoading ? 'Saving...' : 'Click to load' }}
        </GTButton>
        <GTButton block>Block (full width)</GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Icons</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTIcon
          v-for="name in Object.keys(iconRegistry)"
          :key="name"
          :name="name"
        />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Icon sizes</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTIcon name="check" size="xs" />
        <GTIcon name="check" size="sm" />
        <GTIcon name="check" size="md" />
        <GTIcon name="check" size="lg" />
        <GTIcon name="check" size="xl" />
        <GTIcon name="check" size="2xl" />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Button with icon</h2>
      <div class="flex flex-wrap items-center gap-2">
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

    <section class="mb-6">
      <h2 class="mb-2">Input sizes</h2>
      <div class="flex flex-col gap-2">
        <GTInput v-model="inputValue" size="sm" placeholder="Small input" />
        <GTInput v-model="inputValue" size="md" placeholder="Medium input" />
        <GTInput v-model="inputValue" size="lg" placeholder="Large input" />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Input with label &amp; help</h2>
      <div class="flex flex-col gap-2">
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

    <section class="mb-6">
      <h2 class="mb-2">Input states</h2>
      <div class="flex flex-col gap-2">
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

    <section class="mb-6">
      <h2 class="mb-2">Prefix &amp; suffix</h2>
      <div class="flex flex-col gap-2">
        <GTInput
          label="Amount"
          prefix="kr."
          placeholder="0,00"
          help-text="Enter amount in DKK"
        />
        <GTInput label="Weight" suffix="kg" placeholder="0" type="number" />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Field widths</h2>
      <div class="flex flex-col gap-2">
        <GTInput label="Postal code" :char-width="4" placeholder="8000" />
        <GTInput label="Phone" :char-width="8" placeholder="12345678" />
        <GTInput label="Street" :char-width="27" placeholder="Vestergade" />
        <GTInput label="Short" width="xs" placeholder="16rem" />
        <GTInput label="Medium" width="m" placeholder="32rem (default)" />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Optional fields</h2>
      <div class="flex flex-col gap-2">
        <GTInput label="Name" placeholder="John Doe" required />
        <GTInput
          label="Phone"
          optional-label="(valgfrit)"
          placeholder="12345678"
          type="tel"
        />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Input types</h2>
      <div class="flex flex-col gap-2">
        <GTInput
          type="password"
          label="Password"
          placeholder="Enter password"
        />
        <GTInput type="search" label="Search" placeholder="Search..." />
        <GTInput type="number" label="Amount" placeholder="0" />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Validation (useField + useFormValidation)</h2>
      <form class="flex flex-col gap-2" @submit.prevent="onValidationSubmit">
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
        <div class="flex flex-wrap items-center gap-2">
          <GTButton type="submit" variant="primary">Submit</GTButton>
          <GTButton type="button" variant="outlined" @click="form.resetAll()"
            >Reset</GTButton
          >
        </div>
        <p v-if="formResult">{{ formResult }}</p>
      </form>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">Toggle</h2>
      <div class="flex flex-col gap-2">
        <GTToggle v-model="toggleValue" label="Notifications" />
        <GTToggle v-model="toggleValue" size="sm" label="Small" />
        <GTToggle v-model="toggleValue" size="lg" label="Large" />
        <GTToggle :model-value="true" disabled label="Disabled" />
      </div>
    </section>

    <section class="mb-6">
      <h2 class="mb-2">As link</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton as="a" href="#link">Link button</GTButton>
        <GTButton as="a" href="#link" variant="outlined">
          Outlined link
        </GTButton>
      </div>
    </section>
  </div>
</template>
