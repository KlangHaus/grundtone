<script setup lang="ts">
  import { ref, computed } from 'vue';
  import {
    GTStepper,
    GTInput,
    GTDateInput,
    GTSelect,
    GTRadioGroup,
    GTCheckbox,
    GTButton,
    GTCard,
    GTBadge,
    GTAlert,
    GTBackLink,
    GTSpinner,
    useField,
    useDateField,
    useFormValidation,
    useToast,
    required,
    email,
    minLength,
    date as dateValidator,
  } from '@grundtone/vue';

  const toast = useToast();
  const step = ref(0);
  const isSubmitting = ref(false);

  const steps = [
    { label: 'Kurv' },
    { label: 'Levering' },
    { label: 'Betaling' },
    { label: 'Bekræft' },
  ];

  // Cart items
  const cart = ref([
    {
      id: 1,
      title: 'Design Tokens Tee',
      size: 'M',
      price: 349,
      qty: 1,
      image: '/placeholder-200x200-product.png',
    },
    {
      id: 2,
      title: 'Spacing Scale Krus',
      size: '',
      price: 129,
      qty: 2,
      image: '/placeholder-200x200-product.png',
    },
  ]);

  const subtotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.qty, 0),
  );
  const shipping = computed(() => (subtotal.value >= 500 ? 0 : 49));
  const total = computed(() => subtotal.value + shipping.value);

  // Step 2: Delivery
  const nameField = useField({
    validators: [required('Navn er påkrævet'), minLength(2, 'Mindst 2 tegn')],
  });
  const emailField = useField({
    validators: [required('Email er påkrævet'), email('Ugyldig email')],
    validateOn: 'blur',
  });
  const addressField = useField({
    validators: [required('Adresse er påkrævet')],
  });
  const postalField = useField({
    validators: [required('Postnummer er påkrævet')],
  });
  const cityField = useField({
    validators: [required('By er påkrævet')],
  });

  const deliveryForm = useFormValidation({
    name: nameField,
    email: emailField,
    address: addressField,
    postal: postalField,
    city: cityField,
  });

  // Step 3: Payment
  const paymentMethod = ref('card');
  const acceptTerms = ref(false);

  function removeItem(id: number) {
    cart.value = cart.value.filter(item => item.id !== id);
  }

  function nextStep() {
    if (step.value === 1 && !deliveryForm.validateAll()) {
      toast.error('Udfyld venligst alle felter', { icon: 'alert-circle' });
      return;
    }
    if (step.value === 2 && !acceptTerms.value) {
      toast.warning('Du skal acceptere vilkårene', { icon: 'alert-triangle' });
      return;
    }
    if (step.value < steps.length - 1) {
      step.value++;
    }
  }

  function prevStep() {
    if (step.value > 0) step.value--;
  }

  function submitOrder() {
    isSubmitting.value = true;
    setTimeout(() => {
      isSubmitting.value = false;
      toast.success('Din ordre er bekræftet!', { icon: 'check-circle' });
      step.value = 0;
    }, 2000);
  }
</script>

<template>
  <main id="main" class="container-md p-4">
    <GTBackLink href="#/shop" label="Tilbage til shop" />

    <h1 class="text-3xl font-bold mt-4 mb-2">Checkout</h1>

    <GTStepper v-model:active-step="step" :steps="steps" all-clickable class="mb-5" />

    <!-- Step 1: Cart -->
    <div v-if="step === 0">
      <h2 class="text-xl font-semibold mb-3">Din kurv</h2>

      <GTAlert v-if="cart.length === 0" variant="info" icon="info-circle">
        <p>Din kurv er tom.</p>
      </GTAlert>

      <div v-else class="flex flex-col gap-3">
        <GTCard
          v-for="item in cart"
          :key="item.id"
          variant="bordered"
          :title="item.title"
          horizontal
          :image="item.image"
          :image-alt="item.title"
        >
          <div class="flex items-center gap-2">
            <GTBadge v-if="item.size" variant="neutral" size="sm">
              {{ item.size }}
            </GTBadge>
            <span class="text-secondary text-sm">Antal: {{ item.qty }}</span>
          </div>
          <template #footer>
            <div class="flex justify-between items-center w-full">
              <span class="font-bold">{{ item.price * item.qty }} kr</span>
              <GTButton
                variant="outlined"
                size="sm"
                @click="removeItem(item.id)"
              >
                Fjern
              </GTButton>
            </div>
          </template>
        </GTCard>

        <div class="flex flex-col gap-1 mt-2">
          <div class="flex justify-between body-text">
            <span>Subtotal</span>
            <span>{{ subtotal }} kr</span>
          </div>
          <div class="flex justify-between body-text">
            <span>Levering</span>
            <span>{{ shipping === 0 ? 'Gratis' : `${shipping} kr` }}</span>
          </div>
          <hr class="my-2" />
          <div class="flex justify-between body-text font-bold">
            <span>Total</span>
            <span>{{ total }} kr</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Delivery -->
    <div v-if="step === 1">
      <h2 class="text-xl font-semibold mb-3">Leveringsoplysninger</h2>

      <div class="flex flex-col gap-3" >
        <div class="grid grid-cols-2 gap-3">
          <GTInput
            v-model="nameField.value.value"
            :error-text="nameField.errorText.value"
            v-on="nameField.handlers"
            label="Fulde navn"
            placeholder="Anders Andersen"
            autocomplete="name"
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
        </div>

        <GTInput
          v-model="addressField.value.value"
          :error-text="addressField.errorText.value"
          v-on="addressField.handlers"
          label="Adresse"
          placeholder="Vestergade 1, 2. th."
          autocomplete="street-address"
          required
        />

        <div class="grid grid-cols-2 gap-3">
          <GTInput
            v-model="postalField.value.value"
            :error-text="postalField.errorText.value"
            v-on="postalField.handlers"
            label="Postnummer"
            placeholder="8000"
            :char-width="4"
            autocomplete="postal-code"
            required
          />
          <GTInput
            v-model="cityField.value.value"
            :error-text="cityField.errorText.value"
            v-on="cityField.handlers"
            label="By"
            placeholder="Aarhus C"
            autocomplete="address-level2"
            required
          />
        </div>

        <GTSelect
          label="Land"
          :options="[
            { value: 'dk', label: 'Danmark' },
            { value: 'se', label: 'Sverige' },
            { value: 'no', label: 'Norge' },
          ]"
          model-value="dk"
        />
      </div>
    </div>

    <!-- Step 3: Payment -->
    <div v-if="step === 2">
      <h2 class="text-xl font-semibold mb-3">Betaling</h2>

      <GTRadioGroup
        v-model="paymentMethod"
        label="Betalingsmetode"
        :options="[
          { value: 'card', label: 'Kredit-/debitkort' },
          { value: 'mobilepay', label: 'MobilePay' },
          { value: 'invoice', label: 'Faktura (virksomheder)' },
        ]"
        class="mb-4"
      />

      <div v-if="paymentMethod === 'card'" class="flex flex-col gap-3 mb-4">
        <GTInput
          label="Kortnummer"
          placeholder="1234 5678 9012 3456"
          :char-width="27"
          autocomplete="cc-number"
        />
        <div class="grid grid-cols-2 gap-3">
          <GTInput
            label="Udløbsdato"
            placeholder="MM/ÅÅ"
            :char-width="4"
            autocomplete="cc-exp"
          />
          <GTInput
            label="CVV"
            placeholder="123"
            :char-width="4"
            autocomplete="cc-csc"
          />
        </div>
      </div>

      <GTCheckbox
        v-model="acceptTerms"
        label="Jeg accepterer handelsbetingelserne"
        help-text="Læs betingelserne inden du fortsætter"
      />
    </div>

    <!-- Step 4: Confirm -->
    <div v-if="step === 3">
      <h2 class="text-xl font-semibold mb-3">Bekræft din ordre</h2>

      <div class="flex flex-col gap-4">
        <GTCard variant="bordered" title="Leveringsadresse">
          <p class="body-text-sm">
            {{ nameField.value.value }}<br />
            {{ addressField.value.value }}<br />
            {{ postalField.value.value }} {{ cityField.value.value }}<br />
            {{ emailField.value.value }}
          </p>
        </GTCard>

        <GTCard variant="bordered" title="Betaling">
          <div class="flex items-center gap-2">
            <GTBadge variant="info" size="sm">
              {{ paymentMethod === 'card' ? 'Kort' : paymentMethod === 'mobilepay' ? 'MobilePay' : 'Faktura' }}
            </GTBadge>
          </div>
        </GTCard>

        <GTCard variant="bordered" title="Ordresammenfatning">
          <div class="flex flex-col gap-1">
            <div
              v-for="item in cart"
              :key="item.id"
              class="flex justify-between body-text-sm"
            >
              <span>{{ item.title }} × {{ item.qty }}</span>
              <span>{{ item.price * item.qty }} kr</span>
            </div>
            <hr class="my-2" />
            <div class="flex justify-between body-text font-bold">
              <span>Total</span>
              <span>{{ total }} kr</span>
            </div>
          </div>
        </GTCard>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between items-center mt-5 mb-5">
      <GTButton
        v-if="step > 0"
        variant="outlined"
        size="md"
        @click="prevStep"
      >
        Tilbage
      </GTButton>
      <span v-else />

      <GTButton
        v-if="step < steps.length - 1"
        variant="primary"
        size="md"
        @click="nextStep"
      >
        Fortsæt
      </GTButton>
      <GTButton
        v-else
        variant="primary"
        size="md"
        :loading="isSubmitting"
        @click="submitOrder"
      >
        {{ isSubmitting ? 'Behandler...' : 'Bekræft ordre' }}
      </GTButton>
    </div>
  </main>
</template>
