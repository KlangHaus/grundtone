<script setup lang="ts">
  import { ref } from 'vue';
  import GTRadioGroup from './RadioGroup.vue';
  import { GTInput } from '../../atoms/Input';

  const subject = ref('');
  const contact = ref('');
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic</h3>
      <div class="gt-demo__stack">
        <GTRadioGroup
          v-model="subject"
          label="Sagen handler om"
          :options="[
            { value: 'insurance', label: 'Ulykkesforsikring' },
            { value: 'liability', label: 'Erstatningsansvar' },
            { value: 'company', label: 'Forsikringsselskab' },
          ]"
          required
        />
        <p class="body-text-sm text-secondary">
          Valgt: {{ subject || '(ingen)' }}
        </p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With hints</h3>
      <div class="gt-demo__stack">
        <GTRadioGroup
          v-model="subject"
          label="Størrelse"
          help-text="Vælg den størrelse der passer bedst"
          :options="[
            { value: 'sm', label: 'Small', hint: 'Til 1-2 brugere' },
            { value: 'md', label: 'Medium', hint: 'Til 3-10 brugere' },
            { value: 'lg', label: 'Large', hint: 'Til 10+ brugere' },
          ]"
        />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With collapse content</h3>
      <div class="gt-demo__stack">
        <GTRadioGroup
          v-model="contact"
          label="Kontaktmetode"
          :options="[
            { value: 'email', label: 'Email', content: true },
            { value: 'phone', label: 'Telefon', content: true },
            { value: 'none', label: 'Ingen kontakt' },
          ]"
        >
          <template #content-email>
            <GTInput label="Email" type="email" placeholder="din@email.dk" />
          </template>
          <template #content-phone>
            <GTInput label="Telefon" type="tel" placeholder="12345678" />
          </template>
        </GTRadioGroup>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Error state</h3>
      <div class="gt-demo__stack">
        <GTRadioGroup
          label="Vælg hvad sagen handler om"
          error-text="Du skal vælge en kategori"
          :options="[
            { value: 'a', label: 'Ulykkesforsikring' },
            { value: 'b', label: 'Erstatningsansvar' },
          ]"
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
