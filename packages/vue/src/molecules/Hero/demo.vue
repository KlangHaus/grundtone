<script setup lang="ts">
  import GTHero from './Hero.vue';
  import { GTButton } from '../../atoms/Button';
  import { GTBadge } from '../../atoms/Badge';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Center + gradient-mesh (landing page)</h3>
      <GTHero
        subtitle="Runtime-tokens via CDN — kørende apps opdaterer uden ny deploy."
        background="gradient-mesh"
        :heading-level="2"
      >
        <template #eyebrow>
          <GTBadge variant="neutral">Open source</GTBadge>
          <GTBadge variant="success" dot>v2 stabil</GTBadge>
        </template>
        <template #title>Ét designsystem, <mark>alle flader</mark></template>
        <template #actions>
          <GTButton variant="primary" size="lg">Kom i gang</GTButton>
          <GTButton variant="secondary" size="lg">Se Studio</GTButton>
        </template>
      </GTHero>
    </section>

    <section class="gt-demo__section">
      <h3>Left + dot-grid + visual-slot</h3>
      <GTHero
        title="Design-tokens uden deploy"
        subtitle="Publicér et token-sæt og se det slå igennem med det samme."
        align="left"
        background="dot-grid"
        :heading-level="2"
      >
        <template #actions>
          <GTButton variant="outlined">Læs dokumentationen</GTButton>
        </template>
        <template #visual>
          <div
            style="
              height: 160px;
              display: grid;
              place-items: center;
              background: var(--color-surface-raised);
              border: 1px solid var(--color-border-light);
              border-radius: var(--radius-xl);
            "
          >
            demo-widget bor hos konsumenten
          </div>
        </template>
      </GTHero>
    </section>
  </div>
</template>
