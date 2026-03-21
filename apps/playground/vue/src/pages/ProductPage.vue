<script setup lang="ts">
  import {
    GTAccordion,
    GTAccordionItem,
    GTBackLink,
    GTBadge,
    GTBreadcrumb,
    GTButton,
    GTCard,
    GTTabs,
    GTTabPanel,
  } from '@grundtone/vue';
</script>

<template>
  <main id="main" class="container-lg p-4">
    <GTBreadcrumb
      :items="[
        { label: 'Shop', href: '#/shop' },
        { label: 'T-shirts', href: '#/shop' },
        { label: 'Design Tokens Tee' },
      ]"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-4">
      <!-- Product image -->
      <div>
        <GTCard variant="bordered">
          <template #default>
            <img
              src="/placeholder-640x360.png"
              alt="Design Tokens Tee — forside"
              class="w-full"
            />
          </template>
        </GTCard>
        <div class="grid grid-cols-4 gap-2 mt-2">
          <div
            v-for="label in ['Forside', 'Bagside', 'Detalje', 'Model']"
            :key="label"
            class="card card--bordered rounded-md overflow-hidden"
          >
            <img src="/placeholder-640x360.png" :alt="label" class="w-full" />
          </div>
        </div>
      </div>

      <!-- Product info -->
      <div class="flex flex-col gap-3">
        <div>
          <GTBadge variant="neutral" size="sm">T-shirt</GTBadge>
          <h1 class="text-3xl font-bold leading-tight mt-1 mb-1">
            Design Tokens Tee
          </h1>
          <p class="text-secondary leading-relaxed text-sm">
            Økologisk bomuld t-shirt med semantisk farveprint. Designet til
            udviklere og designere der tænker i systemer.
          </p>
        </div>

        <div>
          <div class="text-2xl font-bold">349 kr</div>
          <p class="text-xs text-tertiary mt-1">
            Inkl. moms. Fri fragt over 500 kr.
          </p>
        </div>

        <hr />

        <!-- Size selector -->
        <div>
          <p class="text-sm font-semibold mb-2">Størrelse</p>
          <GTTabs
            variant="pill"
            :tabs="[
              { id: 'xs', label: 'XS' },
              { id: 's', label: 'S' },
              { id: 'm', label: 'M' },
              { id: 'l', label: 'L' },
              { id: 'xl', label: 'XL' },
            ]"
            model-value="s"
          >
            <GTTabPanel id="xs" />
            <GTTabPanel id="s" />
            <GTTabPanel id="m" />
            <GTTabPanel id="l" />
            <GTTabPanel id="xl" />
          </GTTabs>
          <p class="text-xs text-tertiary mt-1">XXL er midlertidigt udsolgt.</p>
        </div>

        <GTButton variant="primary" size="md">Læg i kurv</GTButton>

        <hr />

        <!-- Product details -->
        <GTAccordion variant="bordered">
          <GTAccordionItem heading="Produktdetaljer" :open="true">
            <dl class="flex flex-col gap-1 text-sm">
              <div class="flex gap-3">
                <dt class="font-medium" style="min-width: 8rem">Materiale</dt>
                <dd class="text-secondary">100% økologisk bomuld, 180g/m²</dd>
              </div>
              <div class="flex gap-3">
                <dt class="font-medium" style="min-width: 8rem">Pasform</dt>
                <dd class="text-secondary">Regular fit, unisex</dd>
              </div>
              <div class="flex gap-3">
                <dt class="font-medium" style="min-width: 8rem">Print</dt>
                <dd class="text-secondary">Vandbaseret serigrafisk tryk</dd>
              </div>
              <div class="flex gap-3">
                <dt class="font-medium" style="min-width: 8rem">Pleje</dt>
                <dd class="text-secondary">
                  Maskinvask 30°, tørretumbling frarådes
                </dd>
              </div>
            </dl>
          </GTAccordionItem>
          <GTAccordionItem heading="Levering og returnering">
            <p class="text-sm text-secondary">
              Fri fragt over 500 kr. Levering 2–5 hverdage. 30 dages fuld
              returret.
            </p>
          </GTAccordionItem>
        </GTAccordion>
      </div>
    </div>

    <!-- Description -->
    <section class="mb-5">
      <h2 class="text-xl font-semibold mb-3">Beskrivelse</h2>
      <div class="prose text-sm">
        <p>
          Design Tokens Tee er mere end bare en t-shirt — det er en statement om
          at designsystemer starter med de rigtige abstraktioner.
        </p>
        <blockquote>
          <p>
            Navngiv tokens efter funktion, ikke farve.
            <code>--color-primary</code>, ikke <code>--color-blue-600</code>.
          </p>
        </blockquote>
        <ul>
          <li>Forvask for minimal krympning</li>
          <li>Dobbelt-syet hals og ærmer</li>
          <li>Nakkelabel med størrelsesguide i CSS-syntax</li>
          <li>Leveres i genanvendelig emballage</li>
        </ul>
      </div>
    </section>

    <hr class="mb-4" />

    <!-- Related products -->
    <section class="mb-5">
      <h2 class="text-xl font-semibold mb-3">Relaterede produkter</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GTCard
          v-for="item in [
            { title: 'Utility-First Hoodie', price: '599 kr' },
            { title: 'Color System Plakat', price: '199 kr' },
            { title: 'Spacing Scale Krus', price: '129 kr' },
            { title: 'Token Sticker Pack', price: '79 kr' },
          ]"
          :key="item.title"
          nav
          href="#/shop/1"
          :title="item.title"
          image="/placeholder-640x360.png"
          :image-alt="item.title"
        >
          <template #footer>
            <span class="font-bold text-sm">{{ item.price }}</span>
          </template>
        </GTCard>
      </div>
    </section>

    <GTBackLink href="#/shop" label="Tilbage til shop" />
  </main>
</template>
