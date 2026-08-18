<script setup lang="ts">
  // studio.grundtone.com — tier/upgrade-siden (Sentry-model: en del af
  // grundtone-huset, ikke et frit svævende brand). Ingen priser (ikke sat) —
  // kun "per brand, ikke per bruger"-princippet + early access-CTA.
  //
  // Early access-CTA er en mailto indtil en waitlist-endpoint findes.
  // hello@grundtone.com er nu fuldt live (MX på Proton, SPF/DKIM/DMARC grønt,
  // domænet verificeret — bekræftet af [infra] 2026-07-28). Vi bruger
  // brand-domænets adresse frem for @klanghaus.dk, så en grundtone-flade ikke
  // eksponerer det interne org-navn.
  useHead({
    title: 'grundtone Studio — dit brand, overalt, uden at røre koden',
    // Sitets globale lang er "en" (nuxt.config), men denne side består på
    // dansk til [cmo] leverer Side 2-kanonen — uden override læser
    // skærmlæsere dansk tekst med engelsk stemme.
    htmlAttrs: { lang: 'da' },
  });

  const EARLY_ACCESS_MAILTO =
    'mailto:hello@grundtone.com?subject=Tidlig%20adgang%20til%20grundtone%20Studio';
</script>

<template>
  <div>
    <!-- GTHero (#128) — landing.css' lokale .hero-styles er fjernet; begge
         sider konsumerer nu samme organism. Dansk copy her består indtil
         [cmo] leverer engelsk kanon for /studio (Side 2 i briefen). -->
    <GTHero
      title="Dit brand, overalt — uden at røre koden."
      subtitle="Skift farver, typografi og logo på tværs af web, app og email i ét visuelt interface. Live på sekunder. Per brand, ikke per bruger."
      align="center"
      background="gradient-mesh"
    >
      <template #eyebrow>
        <GTTag label="En del af grundtone open source" />
      </template>
      <template #actions>
        <GTButton
          as="a"
          :href="EARLY_ACCESS_MAILTO"
          variant="primary"
          size="lg"
        >
          Få tidlig adgang →
        </GTButton>
      </template>
    </GTHero>

    <section class="section" aria-labelledby="problem-heading">
      <h2 id="problem-heading" class="visually-hidden">Problemet</h2>
      <p class="section__statement">
        Et logo-skift plejede at betyde en sprint med din udvikler.<br />
        Nu tager det et minut.
      </p>
    </section>

    <section class="section" aria-labelledby="demo-heading">
      <h2 id="demo-heading">Sådan virker det</h2>
      <p class="section__lead">
        Træk i en farveskyder — se komponenterne opdatere live. Publicér — og
        det rammer web, app og email-skabeloner på én gang.
      </p>
      <!-- Demo-sektion: interaktiv demo/screencast koordineres med [designer]
           (brief-krav). Pladsholderen holder layoutet ærligt indtil da. -->
      <div
        class="demo-placeholder"
        role="img"
        aria-label="Demo af token-editoren — på vej"
      >
        <p>Editor-demo på vej</p>
      </div>
    </section>

    <section class="section" aria-labelledby="who-heading">
      <h2 id="who-heading">Hvem er det til?</h2>
      <div class="cards">
        <GTCard title="Bureauer">
          Én klient, ét brand. Slip for at vente på dev.
        </GTCard>
        <GTCard title="SaaS der white-labeler">
          Per-tenant brand ud af kassen — umuligt at bygge med build-time
          theming.
        </GTCard>
        <GTCard title="Produktteams">
          Design-beslutninger ét sted. Ingen token-drift på tværs af kodebaser.
        </GTCard>
      </div>
    </section>

    <section class="section section--pricing" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading">Prisprincippet</h2>
      <p class="section__statement">
        Vi priser <strong>per aktivt brand</strong> — ikke per bruger, ikke per
        seat.
      </p>
      <p class="section__lead">
        Har du 8 klienter, betaler du for 8 brands — uanset hvor mange på dit
        team der arbejder i dem.
      </p>
      <!-- Priserne er LÅSTE (Beslutning AI) og spejler landing-page-v2-
           forlægget. Teksten her sagde tidligere "annonceres ved launch" —
           en side der modsiger en låst beslutning er værre end ingen tal. -->
      <div class="section__grid" role="list" aria-label="Prisplaner">
        <GTCard role="listitem" heading="Free — 0 kr">
          2 projekter. Kom i gang, ingen kort.
        </GTCard>
        <GTCard role="listitem" heading="Solo — 29 €/md">
          3 brands (hård grænse).
        </GTCard>
        <GTCard role="listitem" heading="Studio — 59 €/md">
          10 brands, +8 € pr. ekstra.
        </GTCard>
        <GTCard role="listitem" heading="Scale — 179 €/md">
          50 brands, +5 € pr. ekstra.
        </GTCard>
        <GTCard role="listitem" heading="Enterprise — kontakt os">
          SSO/SCIM, ubegrænsede brands.
        </GTCard>
      </div>
      <p class="section__lead">
        12-måneders intro-pris-garanti på alle betalte planer.
      </p>
      <GTButton as="a" :href="EARLY_ACCESS_MAILTO" variant="primary" size="lg">
        Få tidlig adgang →
      </GTButton>
    </section>
  </div>
</template>
