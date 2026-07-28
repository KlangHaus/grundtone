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
  });

  const EARLY_ACCESS_MAILTO =
    'mailto:hello@grundtone.com?subject=Tidlig%20adgang%20til%20grundtone%20Studio';
</script>

<template>
  <div>
    <section class="hero hero--studio">
      <GTTag class="hero__tag">En del af grundtone open source</GTTag>
      <h1 class="hero__title">Dit brand, overalt — uden at røre koden.</h1>
      <p class="hero__sub">
        Skift farver, typografi og logo på tværs af web, app og email i ét
        visuelt interface. Live på sekunder. Per brand, ikke per bruger.
      </p>
      <div class="hero__actions">
        <GTButton
          as="a"
          :href="EARLY_ACCESS_MAILTO"
          variant="primary"
          size="lg"
        >
          Få tidlig adgang →
        </GTButton>
      </div>
    </section>

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
        <GTCard heading="Bureauer">
          Én klient, ét brand. Slip for at vente på dev.
        </GTCard>
        <GTCard heading="SaaS der white-labeler">
          Per-tenant brand ud af kassen — umuligt at bygge med build-time
          theming.
        </GTCard>
        <GTCard heading="Produktteams">
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
        team der arbejder i dem. Konkrete priser annonceres ved launch.
      </p>
      <GTButton as="a" :href="EARLY_ACCESS_MAILTO" variant="primary" size="lg">
        Få tidlig adgang →
      </GTButton>
    </section>
  </div>
</template>
