<script setup lang="ts">
  import GTAccordion from './Accordion.vue';
  import GTAccordionItem from './AccordionItem.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Default (separators)</h3>
      <GTAccordion>
        <GTAccordionItem heading="Hvad er design tokens?">
          <p>
            Design tokens er de mindste byggesten i et designsystem — navngivne
            værdier for farver, typografi, spacing, radier og shadows.
          </p>
        </GTAccordionItem>
        <GTAccordionItem
          heading="Hvordan installerer jeg Grundtone?"
          summary="Hurtig guide"
        >
          <p>
            Installér med <code>pnpm add @grundtone/vue</code> og importér
            komponenterne i dit projekt.
          </p>
        </GTAccordionItem>
        <GTAccordionItem
          heading="Understøtter Grundtone dark mode?"
          :open="true"
        >
          <p>
            Ja. Tema-switching sker via CSS custom properties. Alle farver
            defineres som semantiske tokens der automatisk skifter mellem lys og
            mørk palette.
          </p>
        </GTAccordionItem>
      </GTAccordion>
    </section>

    <section class="gt-demo__section">
      <h3>Bordered</h3>
      <GTAccordion variant="bordered">
        <GTAccordionItem heading="Konfiguration">
          <p>
            Grundtone konfigureres via <code>defineGrundtoneConfig()</code> i
            core-pakken.
          </p>
        </GTAccordionItem>
        <GTAccordionItem heading="Prefix-system">
          <p>
            Alle klasser prefixes med <code>gt-</code> som default. Kan
            overrides via config.
          </p>
        </GTAccordionItem>
        <GTAccordionItem heading="Icon-system">
          <p>SVG-ikoner registreres i core og bruges via GTIcon-komponenten.</p>
        </GTAccordionItem>
      </GTAccordion>
    </section>

    <section class="gt-demo__section">
      <h3>Card</h3>
      <GTAccordion variant="card">
        <GTAccordionItem heading="Vue 3">
          <p>
            Fuld Vue 3 komponentbibliotek med Composition API, TypeScript og
            Vite-baseret build.
          </p>
        </GTAccordionItem>
        <GTAccordionItem heading="Nuxt 3">
          <p>Nuxt-modul der auto-importerer komponenter og injicerer CSS.</p>
        </GTAccordionItem>
        <GTAccordionItem heading="React Native">
          <p>
            Native komponenter med tema-provider og platform-specifikke shadows
            og spacing.
          </p>
        </GTAccordionItem>
      </GTAccordion>
    </section>

    <section class="gt-demo__section">
      <h3>Transitions</h3>
      <div class="flex flex-col gap-4">
        <div>
          <p class="text-xs text-secondary">transition="slide" (default)</p>
          <GTAccordion
            variant="bordered"
            transition="slide"
            :show-toggle-all="false"
          >
            <GTAccordionItem heading="Smooth height animation">
              <p>Panelet glider op og ned med CSS grid-trick.</p>
            </GTAccordionItem>
          </GTAccordion>
        </div>
        <div>
          <p class="text-xs text-secondary">transition="fade"</p>
          <GTAccordion
            variant="bordered"
            transition="fade"
            :show-toggle-all="false"
          >
            <GTAccordionItem heading="Opacity fade">
              <p>Panelet fader ind og ud.</p>
            </GTAccordionItem>
          </GTAccordion>
        </div>
        <div>
          <p class="text-xs text-secondary">transition="none"</p>
          <GTAccordion
            variant="bordered"
            transition="none"
            :show-toggle-all="false"
          >
            <GTAccordionItem heading="Instant toggle">
              <p>Ingen animation — instant vis/skjul.</p>
            </GTAccordionItem>
          </GTAccordion>
        </div>
      </div>
    </section>
  </div>
</template>
