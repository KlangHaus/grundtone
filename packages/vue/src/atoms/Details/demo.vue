<script setup lang="ts">
  import GTDetails from './Details.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Default (border-left accent)</h3>
      <GTDetails summary="Hvad er design tokens?">
        <p>
          Design tokens er de mindste byggesten i et designsystem — navngivne
          værdier for farver, typografi, spacing, radier og shadows. De sikrer
          konsistens på tværs af platforme og gør det muligt at ændre hele
          systemets udseende fra ét centralt sted.
        </p>
      </GTDetails>
    </section>

    <section class="gt-demo__section">
      <h3>Default (open)</h3>
      <GTDetails summary="Hvordan installerer jeg Grundtone?" :open="true">
        <p>
          Installér med <code>pnpm add @grundtone/vue</code> og importér
          komponenterne i dit projekt. Se installationsguiden for detaljer.
        </p>
      </GTDetails>
    </section>

    <section class="gt-demo__section">
      <h3>Subtle (inline, minimal)</h3>
      <p>
        Grundtone understøtter både lys og mørk tilstand via CSS custom
        properties.
        <GTDetails variant="subtle" summary="Læs mere om theming">
          <p>
            Tema-switching sker via klasser på rod-elementet. Alle farver
            defineres som semantiske tokens der automatisk skifter mellem lys og
            mørk palette.
          </p>
        </GTDetails>
      </p>
    </section>

    <section class="gt-demo__section">
      <h3>Card (boxed, standalone)</h3>
      <div class="flex flex-col gap-2">
        <GTDetails variant="card" summary="Har jeg brug for @grundtone/core?">
          <p>
            Ja — core indeholder TypeScript-typer, theme-presets, og
            ikonregistryet. Alle andre pakker afhænger af core.
          </p>
        </GTDetails>
        <GTDetails variant="card" summary="Kan jeg bruge Grundtone med Nuxt?">
          <p>
            Absolut. <code>@grundtone/nuxt</code> modulet auto-importerer
            komponenter og injicerer design-system CSS automatisk.
          </p>
        </GTDetails>
      </div>
    </section>
  </div>
</template>
