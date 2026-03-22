<script setup lang="ts">
  import { ref } from 'vue';
  import { iconRegistry } from '@grundtone/icons';

  const showDismissible = ref(true);
  const showCookie = ref(true);
  const showModal = ref(false);
  const showPersistentModal = ref(false);
  const isLoading = ref(false);
  const toggleValue = ref(false);
  const radioValue = ref('');
  const checkboxValues = ref<string[]>([]);
  const acceptTerms = ref(false);
  const dateValue = ref({ day: '', month: '', year: '' });
  const inputValue = ref('');
  const emailValue = ref('');
  const errorValue = ref('');
  const addressValue = ref('');
  const roadValue = ref('');

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
  <GTSkipLink>Spring til indhold</GTSkipLink>
  <main id="main" class="container py-6">
    <h1 class="mb-6">Grundtone Nuxt Playground</h1>

    <section class="mb-6">
      <h2>Cookie Message</h2>
      <GTCookieMessage
        v-if="showCookie"
        heading="Vi bruger cookies"
        reject-label="Afvis alle"
        settings-label="Cookie-indstillinger"
        :persistent="false"
        @accept="showCookie = false"
        @reject="showCookie = false"
      >
        <p>
          Vi bruger cookies til statistik og personalisering.
          <a href="#">Læs mere</a>.
        </p>
      </GTCookieMessage>
      <button v-else type="button" @click="showCookie = true">
        Vis cookie-besked igen
      </button>
    </section>

    <section class="mb-6">
      <h2>Accordion</h2>
      <h3>Default</h3>
      <GTAccordion>
        <GTAccordionItem heading="Hvad er design tokens?">
          <p>Navngivne værdier for farver, spacing, typografi og mere.</p>
        </GTAccordionItem>
        <GTAccordionItem heading="Dark mode?" :open="true">
          <p>Ja — via CSS custom properties.</p>
        </GTAccordionItem>
      </GTAccordion>
      <h3>Bordered</h3>
      <GTAccordion variant="bordered">
        <GTAccordionItem heading="Konfiguration">
          <p>Via <code>defineGrundtoneConfig()</code>.</p>
        </GTAccordionItem>
        <GTAccordionItem heading="Prefix-system">
          <p>Alle klasser prefixes med <code>gt-</code>.</p>
        </GTAccordionItem>
      </GTAccordion>
      <h3>Card</h3>
      <GTAccordion variant="card">
        <GTAccordionItem heading="Vue 3">
          <p>Fuld komponentbibliotek med Composition API.</p>
        </GTAccordionItem>
        <GTAccordionItem heading="React Native">
          <p>Native komponenter med tema-provider.</p>
        </GTAccordionItem>
      </GTAccordion>
    </section>

    <section class="mb-6">
      <h2>Badge</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTBadge variant="neutral">Neutral</GTBadge>
        <GTBadge variant="info">Information</GTBadge>
        <GTBadge variant="success">Godkendt</GTBadge>
        <GTBadge variant="warning">Afventer</GTBadge>
        <GTBadge variant="error">Afvist</GTBadge>
      </div>
      <h3>With dot</h3>
      <div class="flex flex-wrap items-center gap-2">
        <GTBadge variant="success" dot>Aktiv</GTBadge>
        <GTBadge variant="error" dot>Offline</GTBadge>
        <GTBadge variant="neutral" dot>Kladde</GTBadge>
      </div>
    </section>

    <section class="mb-6">
      <h2>Details</h2>
      <div class="flex flex-col gap-4">
        <GTDetails summary="Hvad er design tokens?">
          <p>Navngivne værdier for farver, spacing, typografi og mere.</p>
        </GTDetails>
        <GTDetails variant="subtle" summary="Læs mere om theming">
          <p>Tema-switching sker via CSS custom properties.</p>
        </GTDetails>
        <GTDetails variant="card" summary="Har jeg brug for @grundtone/core?">
          <p>Ja — core indeholder TypeScript-typer og theme-presets.</p>
        </GTDetails>
      </div>
    </section>

    <section class="mb-6">
      <h2>Alert</h2>
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
      <h2>Breadcrumb</h2>
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
      <h2>Card</h2>
      <div class="grid grid-cols-3 gap-4">
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
      <h2>Variants</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton variant="primary">Primary</GTButton>
        <GTButton variant="secondary">Secondary</GTButton>
        <GTButton variant="outlined">Outlined</GTButton>
        <GTButton variant="negative">Negative</GTButton>
        <GTButton variant="unstyled">Unstyled</GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2>Sizes</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton size="sm">Small</GTButton>
        <GTButton size="md">Medium</GTButton>
        <GTButton size="lg">Large</GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2>Rounded</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton rounded="none">none</GTButton>
        <GTButton rounded="sm">sm</GTButton>
        <GTButton>md (default)</GTButton>
        <GTButton rounded="lg">lg</GTButton>
        <GTButton rounded="full">full</GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2>States</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton disabled>Disabled</GTButton>
        <GTButton :loading="isLoading" @click="simulateLoad">
          {{ isLoading ? 'Saving...' : 'Click to load' }}
        </GTButton>
        <GTButton block>Block (full width)</GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2>Icons</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTIcon
          v-for="name in Object.keys(iconRegistry)"
          :key="name"
          :name="name"
        />
      </div>
    </section>

    <section class="mb-6">
      <h2>Icon sizes</h2>
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
      <h2>Button with icon</h2>
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
      <h2>Date Input</h2>
      <div class="flex flex-col gap-4">
        <GTDateInput
          v-model="dateValue"
          label="Fødselsdato"
          help-text="For eksempel: 27 03 1990"
          autocomplete="bday"
          required
        />
        <p class="body-text-sm text-secondary">
          Value: {{ dateValue.day }}/{{ dateValue.month }}/{{ dateValue.year }}
        </p>
        <GTDateInput
          v-model="dateValue"
          label="With error"
          error-text="Datoen kan ikke være i fremtiden"
        />
        <GTDateInput
          :model-value="{ day: '01', month: '01', year: '2020' }"
          label="Disabled"
          disabled
        />
      </div>
    </section>

    <section class="mb-6">
      <h2>Input sizes</h2>
      <div class="flex flex-col gap-2">
        <GTInput v-model="inputValue" size="sm" placeholder="Small input" />
        <GTInput v-model="inputValue" size="md" placeholder="Medium input" />
        <GTInput v-model="inputValue" size="lg" placeholder="Large input" />
      </div>
    </section>

    <section class="mb-6">
      <h2>Input with label &amp; help</h2>
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
      <h2>Input states</h2>
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
      <h2>Prefix &amp; suffix</h2>
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
      <h2>Field widths</h2>
      <div class="flex flex-col gap-2">
        <GTInput label="Postal code" :char-width="4" placeholder="8000" />
        <GTInput label="Phone" :char-width="8" placeholder="12345678" />
        <GTInput label="Street" :char-width="27" placeholder="Vestergade" />
        <GTInput label="Short" width="xs" placeholder="16rem" />
        <GTInput label="Medium" width="m" placeholder="32rem (default)" />
      </div>
    </section>

    <section class="mb-6">
      <h2>Optional fields</h2>
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
      <h2>Input types</h2>
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
      <h2>Validation (useField + useFormValidation)</h2>
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
      <h2>Select</h2>
      <div class="flex flex-col gap-4">
        <GTSelect
          label="Region"
          :options="[
            { value: 'hovedstaden', label: 'Hovedstaden' },
            { value: 'midtjylland', label: 'Midtjylland' },
            { value: 'sjaelland', label: 'Sjælland' },
            { value: 'syddanmark', label: 'Syddanmark' },
          ]"
          required
        />
        <GTSelect
          label="Land"
          :options="[
            {
              label: 'Norden',
              options: [
                { value: 'dk', label: 'Danmark' },
                { value: 'se', label: 'Sverige' },
              ],
            },
          ]"
          placeholder="Vælg land..."
        />
      </div>
    </section>

    <section class="mb-6">
      <h2>Tabs</h2>
      <GTTabs
        :tabs="[
          { id: 'a', label: 'Oversigt' },
          { id: 'b', label: 'Detaljer' },
        ]"
      >
        <GTTabPanel id="a"><p>Oversigt.</p></GTTabPanel>
        <GTTabPanel id="b"><p>Detaljer.</p></GTTabPanel>
      </GTTabs>
      <GTTabs
        variant="segment"
        :tabs="[
          { id: 'vue', label: 'Vue' },
          { id: 'nuxt', label: 'Nuxt' },
        ]"
        style="margin-top: 1rem"
      >
        <GTTabPanel id="vue"><p>Vue 3.</p></GTTabPanel>
        <GTTabPanel id="nuxt"><p>Nuxt module.</p></GTTabPanel>
      </GTTabs>
      <GTTabs
        variant="pill"
        :tabs="[
          { id: 'all', label: 'Alle' },
          { id: 'atoms', label: 'Atoms' },
        ]"
        style="margin-top: 1rem"
      >
        <GTTabPanel id="all"><p>Alle komponenter.</p></GTTabPanel>
        <GTTabPanel id="atoms"><p>Badge, Button, Input...</p></GTTabPanel>
      </GTTabs>
    </section>

    <section class="mb-6">
      <h2>Address Input</h2>
      <div class="flex flex-col gap-4">
        <GTAddressInput
          v-model="addressValue"
          label="Adresse"
          help-text="Begynd at skrive din adresse"
          required
        />
        <GTAddressInput
          v-model="roadValue"
          label="Vejnavn"
          type="vejnavn"
          placeholder="Søg vejnavn..."
        />
      </div>
    </section>

    <section class="mb-6">
      <h2>Toggle</h2>
      <div class="flex flex-col gap-2">
        <GTToggle v-model="toggleValue" label="Notifications" />
        <GTToggle v-model="toggleValue" size="sm" label="Small" />
        <GTToggle v-model="toggleValue" size="lg" label="Large" />
        <GTToggle :model-value="true" disabled label="Disabled" />
      </div>
    </section>

    <section class="mb-6">
      <h2>As link</h2>
      <div class="flex flex-wrap items-center gap-2">
        <GTButton as="a" href="#link">Link button</GTButton>
        <GTButton as="a" href="#link" variant="outlined">
          Outlined link
        </GTButton>
      </div>
    </section>

    <section class="mb-6">
      <h2>Spinner</h2>
      <div class="flex items-center gap-4" style="font-size: 1.5rem">
        <GTSpinner />
        <GTSpinner variant="light" />
      </div>
      <h3>Large with text</h3>
      <GTSpinner size="lg" text="Henter data…" />
      <h3>Backdrop</h3>
      <div
        style="
          position: relative;
          min-height: 8rem;
          border: 1px solid var(--color-border-medium);
          border-radius: var(--radius-md);
          padding: 1rem;
        "
      >
        <p>Indhold bag spinneren.</p>
        <GTSpinner size="lg" backdrop text="Indlæser sektion…" />
      </div>
    </section>

    <section class="mb-6">
      <h2>Tooltip</h2>
      <div class="flex flex-col gap-3" style="max-width: 400px">
        <GTTooltip content="CPR bruges til at verificere din identitet.">
          <GTInput label="CPR" placeholder="000000-0000" />
        </GTTooltip>
      </div>
    </section>

    <section class="mb-6">
      <h2>Toast</h2>
      <div class="flex flex-wrap gap-2">
        <GTButton
          size="sm"
          variant="primary"
          @click="useToast().success('Afsendt', { icon: 'check-circle' })"
          >Success</GTButton
        >
        <GTButton
          size="sm"
          variant="negative"
          @click="useToast().error('Fejl', { icon: 'alert-circle' })"
          >Error</GTButton
        >
        <GTButton
          size="sm"
          @click="useToast().info('Ny besked', { icon: 'info-circle' })"
          >Info</GTButton
        >
        <GTButton
          size="sm"
          variant="secondary"
          @click="useToast().warning('Advarsel', { icon: 'alert-triangle' })"
          >Warning</GTButton
        >
      </div>
      <GTToastContainer position="bottom-right" />
    </section>

    <section class="mb-6">
      <h2>Textarea</h2>
      <div class="flex flex-col gap-2" style="max-width: 400px">
        <GTTextarea label="Kommentar" placeholder="Skriv her..." />
        <GTTextarea label="Med begrænsning" :max-chars="60" />
      </div>
    </section>

    <section class="mb-6">
      <h2>Tag</h2>
      <div class="flex flex-wrap gap-2">
        <GTTag label="Design" />
        <GTTag label="Vue 3" dismissible />
        <GTTag label="Aktiv" :selected="true" />
        <GTTag label="Inaktiv" :selected="false" />
      </div>
    </section>

    <section class="mb-6">
      <h2>Search Field</h2>
      <div class="flex flex-col gap-2" style="max-width: 400px">
        <GTSearchField placeholder="Søg..." />
        <GTSearchField size="lg" placeholder="Søg i dokumentation..." />
      </div>
    </section>

    <section class="mb-6">
      <h2>Overflow Menu</h2>
      <div class="flex flex-wrap gap-4">
        <GTOverflowMenu
          :items="[
            { label: 'Redigér', value: 'edit' },
            { label: 'Dupliker', value: 'duplicate' },
            { label: 'Slet', value: 'delete', danger: true },
          ]"
        />
        <GTOverflowMenu
          label="Sortér"
          align="left"
          :items="[
            { label: 'Nyeste først', active: true },
            { label: 'Ældste først' },
          ]"
        />
      </div>
    </section>

    <section class="mb-6">
      <h2>Radio &amp; Checkbox</h2>
      <GTRadioGroup
        v-model="radioValue"
        label="Sagen handler om"
        :options="[
          { value: 'insurance', label: 'Ulykkesforsikring' },
          { value: 'liability', label: 'Erstatningsansvar' },
        ]"
        required
      />
      <GTCheckboxGroup
        v-model="checkboxValues"
        label="Nationalitet"
        :options="[
          { value: 'dk', label: 'Dansk' },
          { value: 'se', label: 'Svensk' },
        ]"
        class="mt-3"
      />
      <GTCheckbox
        v-model="acceptTerms"
        label="Jeg accepterer vilkårene"
        class="mt-3"
      />
    </section>

    <section class="mb-6">
      <h2>Modal</h2>
      <div class="flex flex-wrap gap-2">
        <GTButton size="sm" variant="primary" @click="showModal = true"
          >Standard modal</GTButton
        >
        <GTButton
          size="sm"
          variant="negative"
          @click="showPersistentModal = true"
          >Persistent modal</GTButton
        >
      </div>
      <GTModal v-model:open="showModal" title="Bekræft handling">
        <p>Er du sikker på at du vil fortsætte?</p>
        <template #footer>
          <GTButton variant="outlined" size="sm" @click="showModal = false"
            >Annuller</GTButton
          >
          <GTButton variant="primary" size="sm" @click="showModal = false"
            >Bekræft</GTButton
          >
        </template>
      </GTModal>
      <GTModal
        v-model:open="showPersistentModal"
        title="Slet konto?"
        persistent
      >
        <p>Denne handling kan ikke fortrydes.</p>
        <template #footer>
          <GTButton
            variant="outlined"
            size="sm"
            @click="showPersistentModal = false"
            >Annuller</GTButton
          >
          <GTButton
            variant="negative"
            size="sm"
            @click="showPersistentModal = false"
            >Slet</GTButton
          >
        </template>
      </GTModal>
    </section>

    <!-- ─── Blog ─── -->
    <section class="mb-6">
      <h2>Blog</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GTCard
          nav
          href="#"
          title="Semantiske farvetokens i praksis"
          subheading="Design"
          image="/placeholder-640x360.png"
          image-alt=""
        >
          <div class="meta text-sm text-secondary">
            <GTBadge size="sm" variant="info">Design</GTBadge>
            <time>1. marts 2026</time>
          </div>
          <p>
            Hvordan semantiske farvetokens skaber konsistens på tværs af
            platforme.
          </p>
        </GTCard>
        <GTCard
          nav
          href="#"
          title="WCAG 2.2 og komponentbiblioteker"
          image="/placeholder-640x360.png"
          image-alt=""
        >
          <div class="meta text-sm text-secondary">
            <GTBadge size="sm" variant="success">Tilgængelighed</GTBadge>
            <time>22. februar 2026</time>
          </div>
          <p>
            Hvad ændrer sig med WCAG 2.2, og hvordan bygger man tilgængelige
            komponenter.
          </p>
        </GTCard>
      </div>
    </section>

    <!-- ─── Shop ─── -->
    <section class="mb-6">
      <h2>Shop</h2>
      <GTTabs
        variant="pill"
        :tabs="[
          { id: 'all', label: 'Alle' },
          { id: 'tshirts', label: 'T-shirts' },
        ]"
      >
        <GTTabPanel id="all">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
          >
            <GTCard
              nav
              href="#"
              title="Design Tokens Tee"
              subheading="T-shirt"
              image="/placeholder-640x360.png"
              image-alt="Design Tokens Tee"
            >
              <p>Økologisk bomuld med semantisk farveprint.</p>
              <template #footer><span class="font-bold">349 kr</span></template>
            </GTCard>
            <GTCard
              nav
              href="#"
              title="Color System Plakat"
              subheading="Plakat"
              image="/placeholder-640x360.png"
              image-alt="Color System Plakat"
            >
              <p>A2-format, 200g mat papir med fuld farveskala.</p>
              <template #footer>
                <span class="font-bold">199 kr</span>
                <span class="text-sm text-tertiary line-through ml-1"
                  >299 kr</span
                >
              </template>
            </GTCard>
            <GTCard
              nav
              href="#"
              title="Spacing Scale Krus"
              subheading="Accessories"
              image="/placeholder-640x360.png"
              image-alt="Spacing Scale Krus"
            >
              <p>Keramik krus med spacing-skala visualisering.</p>
              <template #footer><span class="font-bold">129 kr</span></template>
            </GTCard>
          </div>
        </GTTabPanel>
        <GTTabPanel id="tshirts">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <GTCard
              nav
              href="#"
              title="Design Tokens Tee"
              subheading="T-shirt"
              image="/placeholder-640x360.png"
              image-alt=""
            >
              <p>Økologisk bomuld med semantisk farveprint.</p>
              <template #footer><span class="font-bold">349 kr</span></template>
            </GTCard>
          </div>
        </GTTabPanel>
      </GTTabs>
    </section>
  </main>

  <footer class="footer text-xs text-tertiary text-center">
    <p>&copy; 2026 Grundtone. Bygget med semantiske design tokens.</p>
  </footer>
</template>
