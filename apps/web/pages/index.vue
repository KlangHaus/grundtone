<script setup lang="ts">
  // grundtone.com — OSS-hjemstedet (Sentry-model: OSS ER identiteten).
  // Copy er [cmo]-briefens udgangspunkt (2026-06-25 + retning 2026-07-10);
  // [cmo] skriver final copy. NB: briefen nævnte "React" — der findes ingen
  // React-web-pakke; showcasen viser de faktiske overflader (Vue / React
  // Native / Email) — flagget til [cmo].
  useHead({
    title: 'grundtone — skift dit brand ét sted, se det live overalt',
  });

  const activeTab = ref('vue');
  const showcaseTabs = [
    { id: 'vue', label: 'Vue' },
    { id: 'react-native', label: 'React Native' },
    { id: 'email', label: 'Email' },
  ];

  const tokenSnippet = `import { createTheme } from '@grundtone/core';

export const theme = createTheme({
  light: { primary: '#0059b3' },   // ← skift ét tal
  dark:  { primary: '#4dabf7' },
});`;

  const snippets: Record<string, string> = {
    vue: `<script setup>
  import { GTButton } from '@grundtone/vue';
${'<'}/script>

<template>
  <!-- Følger theme.primary — live, uden rebuild -->
  <GTButton variant="primary">Køb billet</GTButton>
</template>`,
    'react-native': `import { Button } from '@grundtone/react-native';

// Samme token-sæt, native styling
export const Checkout = () => (
  <Button variant="primary">Køb billet</Button>
);`,
    email: `import { createBlocks, resolveEmailTheme } from '@grundtone/email';

// Samme tokens — compileret til bulletproof inlined HTML
const b = createBlocks(resolveEmailTheme());
b.button({ label: 'Køb billet', href: '{{url}}' });`,
  };
</script>

<template>
  <div>
    <section class="hero">
      <h1 class="hero__title">
        Skift dit brand ét sted.<br />
        Se det live overalt — uden rebuild.
      </h1>
      <p class="hero__sub">
        Open source design system der fungerer i Vue, React Native og email på
        samme tid. Token-native. Framework-agnostisk.
      </p>
      <div class="hero__actions">
        <GTButton
          as="a"
          href="https://github.com/KlangHaus/grundtone"
          variant="primary"
          size="lg"
        >
          Se på GitHub →
        </GTButton>
        <GTButton
          as="a"
          href="https://docs.grundtone.com"
          variant="outlined"
          size="lg"
        >
          Læs dokumentationen
        </GTButton>
      </div>
    </section>

    <section class="section" aria-labelledby="showcase-heading">
      <h2 id="showcase-heading">Virker det i min stack?</h2>
      <p class="section__lead">
        Ét token-sæt. Alle overflader. Du skifter ét tal — alt opdaterer, uden
        rebuild.
      </p>
      <div class="showcase">
        <pre class="showcase__tokens"><code>{{ tokenSnippet }}</code></pre>
        <div class="showcase__frameworks">
          <GTTabs
            v-model="activeTab"
            :tabs="showcaseTabs"
            variant="underline"
            aria-label="Framework-eksempler"
          >
            <GTTabPanel v-for="tab in showcaseTabs" :key="tab.id" :id="tab.id">
              <pre><code>{{ snippets[tab.id] }}</code></pre>
            </GTTabPanel>
          </GTTabs>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="tokens-heading">
      <h2 id="tokens-heading">Hvad får jeg?</h2>
      <div class="cards">
        <GTCard heading="Design-beslutninger lever ét sted">
          Tokens — ikke klasser, ikke spredte CSS-variabler. Én kilde til
          farver, typografi og spacing, som hver overflade læser fra.
        </GTCard>
        <GTCard heading="Runtime-distribution via CDN">
          Publicér et token-sæt, og kørende apps opdaterer uden deploy. Emails
          compileres fra samme tokens.
        </GTCard>
        <GTCard heading="Ingen lock-in">
          MIT-licens. Du ejer din kode, dine tokens og din pipeline — grundtone
          er infrastruktur, ikke en platform du sidder fast i.
        </GTCard>
      </div>
    </section>

    <section class="section" aria-labelledby="proof-heading">
      <h2 id="proof-heading">Hvem bruger det?</h2>
      <p class="section__lead">
        Bygget og battle-tested i produktion af KlangHaus — på tværs af
        Backstage, Etude, Studio og transaktionel email.
      </p>
    </section>
  </div>
</template>
