<script setup lang="ts">
  import GTAnchorLinks from './AnchorLinks.vue';

  const items = [
    { label: 'Introduktion', href: '#demo-intro' },
    { label: 'Funktioner', href: '#demo-features' },
    { label: 'Installation', href: '#demo-install' },
    { label: 'Konfiguration', href: '#demo-config' },
  ];
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Anchor Links</h3>
      <GTAnchorLinks :items="items" />

      <div style="margin-top: 2rem">
        <h4 id="demo-intro" style="scroll-margin-top: 80px">Introduktion</h4>
        <p>
          Anchor links giver brugeren hurtig adgang til specifikke sektioner på
          en lang side. De fungerer som en indholdsfortegnelse placeret i
          toppen.
        </p>

        <h4
          id="demo-features"
          style="scroll-margin-top: 80px; margin-top: 2rem"
        >
          Funktioner
        </h4>
        <p>
          Komponenten understøtter aktiv markering via IntersectionObserver,
          smooth scroll, og tilgængelighed med aria-current.
        </p>

        <h4 id="demo-install" style="scroll-margin-top: 80px; margin-top: 2rem">
          Installation
        </h4>
        <p>Installér med <code>pnpm add @grundtone/vue</code>.</p>

        <h4 id="demo-config" style="scroll-margin-top: 80px; margin-top: 2rem">
          Konfiguration
        </h4>
        <p>Konfigurér komponenten via props — se dokumentationen.</p>
      </div>
    </section>
  </div>
</template>
