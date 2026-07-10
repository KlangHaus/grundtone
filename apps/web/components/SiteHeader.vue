<script setup lang="ts">
  // Sentry-model nav (jf. [cmo]-retningen 2026-07-10): OSS-identiteten ejer
  // navigationen — Docs/Komponenter/GitHub er de primære destinationer.
  // Studio står som den ENE fremhævede knap til højre (Sentrys
  // "Get Started"-plads), men med tier-sprog, ikke som konkurrerende produkt.
  const route = useRoute();
  const onStudio = computed(() => route.path.startsWith('/studio'));
</script>

<template>
  <header class="site-header">
    <nav class="site-header__inner" aria-label="Hovednavigation">
      <NuxtLink to="/" class="site-header__brand">
        grundtone<span v-if="onStudio" class="site-header__tier">Studio</span>
      </NuxtLink>

      <div class="site-header__links">
        <a href="https://docs.grundtone.com">Docs</a>
        <a href="https://docs.grundtone.com/vue/installation.html"
          >Komponenter</a
        >
        <a href="https://github.com/KlangHaus/grundtone">GitHub</a>
      </div>

      <div class="site-header__cta">
        <GTButton
          v-if="!onStudio"
          as="a"
          href="/studio"
          variant="outlined"
          size="sm"
        >
          Studio — uden kode
        </GTButton>
        <GTButton v-else as="a" href="/" variant="unstyled" size="sm">
          ← grundtone open source
        </GTButton>
      </div>
    </nav>
  </header>
</template>
