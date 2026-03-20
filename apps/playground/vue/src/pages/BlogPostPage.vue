<script setup lang="ts">
  import {
    GTAccordion,
    GTAccordionItem,
    GTAnchorLinks,
    GTBadge,
    GTBreadcrumb,
    GTDetails,
  } from '@grundtone/vue';
</script>

<template>
  <main id="main" class="container-lg p-4">
    <GTBreadcrumb
      :items="[
        { label: 'Blog', href: '#/blog' },
        { label: 'Semantiske farvetokens i praksis' },
      ]"
    />

    <div class="mb-5 mt-4">
      <h1 class="text-3xl font-bold leading-tight">
        Semantiske farvetokens i praksis
      </h1>
      <div class="flex gap-2 items-center mt-2 text-sm text-secondary">
        <GTBadge size="sm" variant="info">Design</GTBadge>
        <time datetime="2026-03-01">1. marts 2026</time>
        <span aria-hidden="true">&middot;</span>
        <span>6 min læsetid</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
      <!-- Sidebar TOC -->
      <aside class="md:col-span-1">
        <GTAnchorLinks
          :items="[
            { label: 'Hvorfor semantiske tokens?', href: '#section-1' },
            { label: 'Implementering i praksis', href: '#section-2' },
            { label: 'Cross-platform shadows', href: '#section-3' },
            { label: 'Ofte stillede spørgsmål', href: '#faq' },
          ]"
          heading="Indhold"
        />
      </aside>

      <!-- Article -->
      <div class="md:col-span-3">
        <article>
          <div class="prose text-sm leading-normal">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum consequat lacus at nisi lobortis, vel malesuada felis
              tincidunt. Phasellus auctor libero in urna facilisis.
            </p>

            <h2 id="section-1">Hvorfor semantiske tokens?</h2>

            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <blockquote>
              <p>
                Tokens er kontrakter mellem design og implementering. Når vi
                navngiver dem efter funktion — ikke farve — kan vi ændre
                udseendet uden at røre en eneste komponent.
              </p>
            </blockquote>

            <GTDetails
              variant="subtle"
              summary="Hvad er forskellen på palette- og semantiske tokens?"
            >
              <p>
                <strong>Palette-tokens</strong> er rå farveværdier
                (<code>blue-600</code>).
                <strong>Semantiske tokens</strong> beskriver funktion
                (<code>color-primary</code>). Komponenter bør kun bruge
                semantiske tokens.
              </p>
            </GTDetails>

            <h2 id="section-2">Implementering i praksis</h2>

            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores.
            </p>

            <pre><code>:root {
  --color-primary: light-dark(#0059b3, #4dabf7);
  --color-surface: light-dark(#f8f9fa, #1e1e1e);
}</code></pre>

            <h2 id="section-3">Cross-platform shadows</h2>

            <p>
              Strukturerede <code>ShadowLayer</code>-objekter gør det muligt at
              bruge samme shadow-definition på web og React Native.
            </p>

            <ul>
              <li>
                Brug <code>var(--color-text)</code> i stedet for hårdkodede
                hex-værdier
              </li>
              <li>
                Brug <code>var(--shadow-md)</code> for konsistente skygger
              </li>
              <li>
                Hold farvenavne semantiske — <code>primary</code>, ikke
                <code>blue-600</code>
              </li>
            </ul>
          </div>

          <h2 id="faq" class="text-xl font-bold mt-5 mb-3">
            Ofte stillede spørgsmål
          </h2>
          <GTAccordion variant="bordered">
            <GTAccordionItem
              heading="Skal jeg bruge CSS custom properties eller SCSS-variabler?"
            >
              <p>
                Brug CSS custom properties — de er runtime-dynamiske og
                understøtter theming.
              </p>
            </GTAccordionItem>
            <GTAccordionItem heading="Hvordan virker dark mode?">
              <p>
                Sæt <code>data-theme="dark"</code> på <code>&lt;html&gt;</code>.
                Semantiske tokens bruger <code>light-dark()</code>.
              </p>
            </GTAccordionItem>
            <GTAccordionItem heading="Kan jeg tilføje mine egne tokens?">
              <p>
                Ja — overskriv eksisterende tokens via CSS custom properties på
                <code>:root</code>.
              </p>
            </GTAccordionItem>
          </GTAccordion>

          <div class="mt-4 p-4 bg-surface rounded-md flex gap-3 items-center">
            <div
              class="flex items-center justify-center bg-primary text-on-primary font-bold text-xl rounded-full"
              style="width: 3rem; height: 3rem"
              aria-hidden="true"
            >
              AH
            </div>
            <div>
              <div class="font-semibold">Allan Hansen</div>
              <div class="text-sm text-secondary">
                Designer og frontend-arkitekt. Bygger Grundtone.
              </div>
            </div>
          </div>
        </article>

        <a
          href="#/blog"
          class="back-link text-sm font-medium text-primary mt-4"
        >
          &larr; Alle indlæg
        </a>
      </div>
    </div>
  </main>
</template>
