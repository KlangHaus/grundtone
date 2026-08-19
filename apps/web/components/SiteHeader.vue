<script setup lang="ts">
  // Sentry-model nav (jf. [cmo]-retningen 2026-07-10): OSS-identiteten ejer
  // navigationen — Docs/Components/GitHub er de primære destinationer.
  // Studio står som den ENE fremhævede knap til højre (Sentrys
  // "Get Started"-plads), men med tier-sprog, ikke som konkurrerende produkt.
  // Engelsk chrome (Allan-direktiv 2026-08-04; cmo gjorde engelsk kanonisk).
  const route = useRoute();
  const onStudio = computed(() => route.path.startsWith('/studio'));
</script>

<template>
  <header class="site-header">
    <nav class="site-header__inner" aria-label="Main navigation">
      <!-- Official wordmark (KlangHaus/public "Grundtone logo/Wordmark") — light/dark
           variant via <picture> so the mark reads on both themes without JS. -->
      <NuxtLink to="/" class="site-header__brand" aria-label="grundtone — home">
        <picture>
          <source
            srcset="/wordmark-white.svg"
            media="(prefers-color-scheme: dark)"
          />
          <img
            src="/wordmark.svg"
            alt="grundtone"
            class="site-header__wordmark"
            width="140"
            height="30"
          />
        </picture>
        <span v-if="onStudio" class="site-header__tier">Studio</span>
      </NuxtLink>

      <div class="site-header__links">
        <a href="https://docs.grundtone.com">Docs</a>
        <a href="https://docs.grundtone.com/vue/installation.html"
          >Components</a
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
          Studio — no code
        </GTButton>
        <GTButton v-else as="a" href="/" variant="unstyled" size="sm">
          ← grundtone open source
        </GTButton>
      </div>
    </nav>
  </header>
</template>
