<script setup lang="ts">
  import GTBadge from './Badge.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Variants</h3>
      <div class="flex flex-wrap items-center gap-2">
        <GTBadge variant="neutral">Neutral</GTBadge>
        <GTBadge variant="info">Information</GTBadge>
        <GTBadge variant="success">Godkendt</GTBadge>
        <GTBadge variant="warning">Afventer</GTBadge>
        <GTBadge variant="error">Afvist</GTBadge>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With dot</h3>
      <div class="flex flex-wrap items-center gap-2">
        <GTBadge variant="success" dot>Aktiv</GTBadge>
        <GTBadge variant="warning" dot>Afventer</GTBadge>
        <GTBadge variant="error" dot>Offline</GTBadge>
        <GTBadge variant="info" dot>I gang</GTBadge>
        <GTBadge variant="neutral" dot>Kladde</GTBadge>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Sizes</h3>
      <div class="flex flex-wrap items-center gap-2">
        <GTBadge size="sm">Small</GTBadge>
        <GTBadge size="md">Medium</GTBadge>
        <GTBadge size="sm" variant="success" dot>Small dot</GTBadge>
        <GTBadge size="md" variant="success" dot>Medium dot</GTBadge>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With icon</h3>
      <div class="flex flex-wrap items-center gap-2">
        <GTBadge variant="success" icon="check">Bekræftet</GTBadge>
        <GTBadge variant="error" icon="close">Fjernet</GTBadge>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>In context (card metadata)</h3>
      <div class="meta text-sm text-secondary">
        <GTBadge size="sm" variant="info">Design</GTBadge>
        <time>19 March 2026</time>
        <span aria-hidden="true">&middot;</span>
        <span>6 min read</span>
      </div>
    </section>
  </div>
</template>
