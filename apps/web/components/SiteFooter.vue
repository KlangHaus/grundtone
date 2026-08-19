<script setup lang="ts">
  const route = useRoute();
  const onStudio = computed(() => route.path.startsWith('/studio'));
  const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <!-- Sentry-mønsteret: relationen mellem OSS og tier kommunikeres som én
           diskret service-linje i footeren — begge veje. -->
      <p v-if="!onStudio" class="site-footer__upsell">
        Want to edit tokens visually, without code?
        <NuxtLink to="/studio">→ grundtone Studio</NuxtLink>
      </p>
      <p v-else class="site-footer__upsell">
        Built on
        <NuxtLink to="/">grundtone open source →</NuxtLink>
      </p>

      <!-- Full lockup incl. "-a part of klanghaus" — the endorsed-brand relation
           belongs in the footer, once, as the identity itself says it. -->
      <picture class="site-footer__lockup">
        <source
          srcset="/lockup-full-white.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="/lockup-full.svg"
          alt="grundtone — a part of klanghaus"
          width="220"
          height="84"
        />
      </picture>
      <div class="site-footer__meta">
        <span>© {{ year }} KlangHaus · MIT license</span>
        <span class="site-footer__meta-links">
          <a href="https://github.com/KlangHaus/grundtone">GitHub</a>
          <a href="https://docs.grundtone.com">Documentation</a>
          <a href="https://www.npmjs.com/package/@grundtone/vue">npm</a>
          <a href="mailto:hello@grundtone.com">hello@grundtone.com</a>
        </span>
      </div>
      <!-- E-handelslovens identifikationskrav ([jura], landing-forlæggets
           runde 3): navn · geografisk adresse · e-mail · CVR. E-mailen står i
           link-rækken ovenfor. Pre-launch: verificér at hello@ faktisk
           modtager post (MX er verificeret, postkassen er ikke). -->
      <p class="site-footer__legal">
        Asp Productions ApS · CVR 36708077 · Raffinaderivej 20, 2300 København S
      </p>
    </div>
  </footer>
</template>
