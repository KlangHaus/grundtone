<script setup lang="ts">
  import { ref, computed } from 'vue';
  import {
    GTAlert,
    GTButton,
    GTCard,
    GTIcon,
    GTInput,
    GTToggle,
    GTBreadcrumb,
    GTCookieMessage,
    GTAnchorLinks,
    useTheme,
    useField,
    useFormValidation,
    required,
    email,
    minLength,
  } from '@grundtone/vue';
  import { iconRegistry } from '@grundtone/icons';

  const { isDark, mode, setMode, toggleMode } = useTheme();
  const darkToggle = computed({
    get: () => isDark.value,
    set: () => toggleMode(),
  });

  const showDismissible = ref(true);
  const showCookie = ref(true);
  const isLoading = ref(false);
  const toggleValue = ref(false);
  const toggleDisabled = ref(true);
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
    <h1 class="mb-6">Grundtone Vue Playground</h1>

    <div class="grid-sidebar-left items-start">
      <aside class="sticky-top">
        <GTAnchorLinks
          :items="[
            { label: 'Theme mode', href: '#pg-theme' },
            { label: 'Alert', href: '#pg-alert' },
            { label: 'Breadcrumb', href: '#pg-breadcrumb' },
            { label: 'Card', href: '#pg-card' },
            { label: 'Button', href: '#pg-button' },
            { label: 'Icons', href: '#pg-icons' },
            { label: 'Input', href: '#pg-input' },
            { label: 'Toggle', href: '#pg-toggle' },
          ]"
        />
      </aside>

      <main>
        <section class="mb-6">
          <h2 id="pg-theme" style="scroll-margin-top: 1rem">Theme mode</h2>
          <div class="flex flex-wrap items-center gap-2">
            <GTToggle v-model="darkToggle" label="Dark mode" />
            <div class="flex gap-2">
              <GTButton
                size="sm"
                :variant="mode === 'light' ? 'primary' : 'outlined'"
                @click="setMode('light')"
              >
                Light
              </GTButton>
              <GTButton
                size="sm"
                :variant="mode === 'dark' ? 'primary' : 'outlined'"
                @click="setMode('dark')"
              >
                Dark
              </GTButton>
              <GTButton
                size="sm"
                :variant="mode === 'auto' ? 'primary' : 'outlined'"
                @click="setMode('auto')"
              >
                Auto
              </GTButton>
            </div>
          </div>
        </section>

        <GTCookieMessage
          v-if="showCookie"
          heading="Vi bruger cookies"
          reject-label="Afvis alle"
          settings-label="Cookie-indstillinger"
          @accept="showCookie = false"
          @reject="showCookie = false"
        >
          <p>
            Vi bruger cookies til statistik og personalisering.
            <a href="#">Læs mere</a>.
          </p>
          <template #settings>
            <div class="flex flex-col gap-2">
              <GTToggle v-model="toggleValue" label="Statistik" />
              <GTToggle v-model="toggleDisabled" label="Marketing" />
            </div>
          </template>
        </GTCookieMessage>

        <GTButton
          v-if="!showCookie"
          variant="primary"
          size="sm"
          aria-label="Cookie-indstillinger"
          style="position: fixed; bottom: 1rem; left: 1rem; z-index: 1030"
          @click="showCookie = true"
        >
          <GTIcon name="cookie" size="sm" />
        </GTButton>

        <section class="mb-6">
          <h2 id="pg-alert" style="scroll-margin-top: 1rem">Alert</h2>
          <div class="flex flex-col gap-2">
            <GTAlert variant="info" icon="info-circle">
              <p>This is an informational message.</p>
            </GTAlert>
            <GTAlert variant="success" icon="check-circle">
              <p>Your changes have been saved.</p>
            </GTAlert>
            <GTAlert
              variant="warning"
              icon="alert-triangle"
              heading="Attention"
            >
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
          <h2 id="pg-breadcrumb" style="scroll-margin-top: 1rem">Breadcrumb</h2>
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
          <h2 id="pg-card" style="scroll-margin-top: 1rem">Card</h2>

          <!-- Row 1: 3-col grid — variants -->
          <div class="grid grid-cols-3 gap-4">
            <GTCard
              title="Design Tokens"
              subheading="Guide"
              image="/placeholder-640x360.png"
              image-alt="Placeholder"
            >
              <p>Learn how design tokens power the entire Grundtone system.</p>
            </GTCard>
            <GTCard
              nav
              href="#"
              title="Getting Started"
              subheading="Documentation"
              image="/placeholder-640x360.png"
              image-alt="Placeholder"
            >
              <p>Set up Grundtone in your project in under 5 minutes.</p>
            </GTCard>
            <GTCard variant="bordered" title="Bordered Card">
              <p>A card with a subtle border instead of elevation.</p>
              <template #footer>
                <a href="#">Read more</a>
              </template>
            </GTCard>
          </div>

          <!-- Row 2: 2-col — flat + with buttons -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <GTCard variant="flat" title="Flat Card" subheading="Minimal">
              <p>No background, no border — just structure and spacing.</p>
            </GTCard>
            <GTCard
              title="Introduction to Design Tokens"
              subheading="Course"
              image="/placeholder-640x360.png"
              image-alt="Course image"
            >
              <p>
                Learn the fundamentals of design tokens and how to apply them.
              </p>
              <template #footer>
                <div class="flex gap-xs">
                  <GTButton size="sm" variant="primary">Enrol</GTButton>
                  <GTButton size="sm" variant="outlined" as="a" href="#"
                    >Read more</GTButton
                  >
                </div>
              </template>
            </GTCard>
          </div>

          <!-- Row 3: Full-width horizontal -->
          <div class="mt-4">
            <GTCard
              horizontal
              title="Horizontal Layout"
              subheading="Feature"
              image="/placeholder-400x300.png"
              image-alt="Placeholder"
            >
              <p>Image on the left, content on the right.</p>
            </GTCard>
          </div>

          <!-- Row 4: 3-col grid — article cards with meta -->
          <div class="grid grid-cols-3 gap-4 mt-4">
            <GTCard
              nav
              href="#"
              title="Design Tokens in Practice"
              image="/placeholder-640x360.png"
              image-alt="Article image"
            >
              <div class="meta text-sm text-secondary">
                <span class="tag text-xs">Design</span>
                <time>1 March 2026</time>
                <span aria-hidden="true">&middot;</span>
                <span>6 min read</span>
              </div>
              <p>How to leverage design tokens across platforms.</p>
            </GTCard>
            <GTCard
              nav
              href="#"
              title="Building Accessible Components"
              image="/placeholder-640x360.png"
              image-alt="Article image"
            >
              <div class="meta text-sm text-secondary">
                <span class="tag text-xs">A11y</span>
                <time>15 February 2026</time>
                <span aria-hidden="true">&middot;</span>
                <span>4 min read</span>
              </div>
              <p>Best practices for WCAG-compliant component libraries.</p>
            </GTCard>
            <GTCard
              nav
              external
              href="https://example.com"
              title="External Resource"
            >
              <div class="meta text-sm text-secondary">
                <span class="tag text-xs">External</span>
              </div>
              <p>Opens in a new tab with noopener noreferrer.</p>
            </GTCard>
          </div>
        </section>

        <section class="mb-6">
          <h2 id="pg-button" style="scroll-margin-top: 1rem">Button</h2>
          <div class="flex flex-wrap items-center gap-2">
            <GTButton variant="primary">Primary</GTButton>
            <GTButton variant="secondary">Secondary</GTButton>
            <GTButton variant="outlined">Outlined</GTButton>
            <GTButton variant="negative">Negative</GTButton>
            <GTButton variant="unstyled">Unstyled</GTButton>
          </div>
        </section>

        <section class="mb-6">
          <h3>Sizes</h3>
          <div class="flex flex-wrap items-center gap-2">
            <GTButton size="sm">Small</GTButton>
            <GTButton size="md">Medium</GTButton>
            <GTButton size="lg">Large</GTButton>
          </div>
        </section>

        <section class="mb-6">
          <h3>Rounded</h3>
          <div class="flex flex-wrap items-center gap-2">
            <GTButton rounded="none">none</GTButton>
            <GTButton rounded="sm">sm</GTButton>
            <GTButton>md (default)</GTButton>
            <GTButton rounded="lg">lg</GTButton>
            <GTButton rounded="full">full</GTButton>
          </div>
        </section>

        <section class="mb-6">
          <h3>States</h3>
          <div class="flex flex-wrap items-center gap-2">
            <GTButton disabled>Disabled</GTButton>
            <GTButton :loading="isLoading" @click="simulateLoad">
              {{ isLoading ? 'Saving...' : 'Click to load' }}
            </GTButton>
            <GTButton block>Block (full width)</GTButton>
          </div>
        </section>

        <section class="mb-6">
          <h2 id="pg-icons" style="scroll-margin-top: 1rem">Icons</h2>
          <div class="flex flex-wrap items-center gap-2">
            <GTIcon
              v-for="name in Object.keys(iconRegistry)"
              :key="name"
              :name="name"
            />
          </div>
        </section>

        <section class="mb-6">
          <h3>Icon sizes</h3>
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
          <h3>Button with icon</h3>
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
          <h2 id="pg-input" style="scroll-margin-top: 1rem">Input</h2>
          <div class="flex flex-col gap-2">
            <GTInput v-model="inputValue" size="sm" placeholder="Small input" />
            <GTInput
              v-model="inputValue"
              size="md"
              placeholder="Medium input"
            />
            <GTInput v-model="inputValue" size="lg" placeholder="Large input" />
          </div>
        </section>

        <section class="mb-6">
          <h3>Input with label &amp; help</h3>
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
          <h3>Input states</h3>
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
          <h3>Prefix &amp; suffix</h3>
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
          <h3>Field widths</h3>
          <div class="flex flex-col gap-2">
            <GTInput label="Postal code" :char-width="4" placeholder="8000" />
            <GTInput label="Phone" :char-width="8" placeholder="12345678" />
            <GTInput label="Street" :char-width="27" placeholder="Vestergade" />
            <GTInput label="Short" width="xs" placeholder="16rem" />
            <GTInput label="Medium" width="m" placeholder="32rem (default)" />
          </div>
        </section>

        <section class="mb-6">
          <h3>Optional fields</h3>
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
          <h3>Input rounded</h3>
          <div class="flex flex-col gap-2">
            <GTInput rounded="none" placeholder="none" />
            <GTInput rounded="sm" placeholder="sm" />
            <GTInput placeholder="md (default)" />
            <GTInput rounded="full" placeholder="full" />
          </div>
        </section>

        <section class="mb-6">
          <h3>Input types</h3>
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
          <h3>Validation (useField + useFormValidation)</h3>
          <form
            class="flex flex-col gap-2"
            @submit.prevent="onValidationSubmit"
          >
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
              <GTButton
                type="button"
                variant="outlined"
                @click="form.resetAll()"
                >Reset</GTButton
              >
            </div>
            <p v-if="formResult">{{ formResult }}</p>
          </form>
        </section>

        <section class="mb-6">
          <h2 id="pg-toggle" style="scroll-margin-top: 1rem">Toggle</h2>
          <div class="flex flex-col gap-2">
            <GTToggle v-model="toggleValue" label="Notifications" />
            <p>{{ toggleValue ? 'On' : 'Off' }}</p>
          </div>
        </section>

        <section class="mb-6">
          <h3>Toggle sizes</h3>
          <div class="flex flex-col gap-2">
            <GTToggle v-model="toggleValue" size="sm" label="Small" />
            <GTToggle v-model="toggleValue" size="md" label="Medium" />
            <GTToggle v-model="toggleValue" size="lg" label="Large" />
          </div>
        </section>

        <section class="mb-6">
          <h3>Toggle states</h3>
          <div class="flex flex-col gap-2">
            <GTToggle :model-value="true" label="Always on" />
            <GTToggle :model-value="false" label="Always off" />
            <GTToggle v-model="toggleDisabled" disabled label="Disabled" />
          </div>
        </section>

        <section class="mb-6">
          <h3>As link</h3>
          <div class="flex flex-wrap items-center gap-2">
            <GTButton as="a" href="#link">Link button</GTButton>
            <GTButton as="a" href="#link" variant="outlined">
              Outlined link
            </GTButton>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
