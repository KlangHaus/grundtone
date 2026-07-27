<script setup lang="ts">
  const route = useRoute();
  const onStudio = computed(() => route.path.startsWith('/studio'));
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <!-- Sentry-mønsteret: relationen mellem OSS og tier kommunikeres som én
           diskret service-linje i footeren — begge veje. -->
      <p v-if="!onStudio" class="site-footer__upsell">
        Vil du bruge grundtone uden at røre koden?
        <NuxtLink to="/studio">→ grundtone Studio</NuxtLink>
      </p>
      <p v-else class="site-footer__upsell">
        Bygget på
        <NuxtLink to="/">grundtone open source →</NuxtLink>
      </p>

      <div class="site-footer__meta">
        <span>© {{ new Date().getFullYear() }} KlangHaus · MIT-licens</span>
        <span class="site-footer__meta-links">
          <a href="https://github.com/KlangHaus/grundtone">GitHub</a>
          <a href="https://docs.grundtone.com">Dokumentation</a>
          <a href="https://www.npmjs.com/package/@grundtone/vue">npm</a>
        </span>
      </div>
    </div>
  </footer>
</template>
