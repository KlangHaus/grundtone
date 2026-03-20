<script setup lang="ts">
  import { GTBadge, GTCard } from '@grundtone/vue';

  const posts = [
    {
      id: 1,
      title: 'Semantiske farvetokens i praksis',
      badge: 'Design',
      date: '1. marts 2026',
      body: 'Hvordan semantiske farvetokens skaber konsistens på tværs af platforme og gør dark mode trivielt.',
    },
    {
      id: 2,
      title: 'WCAG 2.2 og komponentbiblioteker',
      badge: 'Tilgængelighed',
      date: '22. februar 2026',
      body: 'Hvad ændrer sig med WCAG 2.2, og hvordan bygger man tilgængelige komponenter fra start.',
    },
    {
      id: 3,
      title: 'Cross-platform design tokens',
      badge: 'Arkitektur',
      date: '14. februar 2026',
      body: 'Strukturerede shadow-objekter der virker på web, iOS og Android uden konvertering.',
    },
    {
      id: 4,
      title: 'Utility-first CSS uden Tailwind',
      badge: 'Frontend',
      date: '5. februar 2026',
      body: 'Hvorfor vi byggede vores eget utility-lag — og hvornår det giver mening.',
    },
    {
      id: 5,
      title: 'Spacing-skalaer og det visuelle hierarki',
      badge: 'Design',
      date: '28. januar 2026',
      body: 'En gennemgang af lineære vs. geometriske spacing-skalaer og hvordan de påvirker layout.',
    },
    {
      id: 6,
      title: 'Vanilla JS behaviors i v2.7',
      badge: 'Open Source',
      date: '15. januar 2026',
      body: 'Nye framework-agnostiske behavior-klasser gør accordion, tabs og toggle interaktive uden Vue.',
    },
  ];
</script>

<template>
  <main id="main" class="container-md p-4">
    <section>
      <h1 class="text-3xl font-bold mb-1">Blog</h1>
      <p class="text-secondary mb-5">
        Seneste artikler om design systems, tilgængelighed og
        frontend-arkitektur.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GTCard
          v-for="post in posts"
          :key="post.id"
          nav
          :href="`#/blog/${post.id}`"
          :title="post.title"
          image="/placeholder-640x360.png"
          image-alt=""
        >
          <div class="meta text-sm text-secondary">
            <GTBadge size="sm" variant="info">{{ post.badge }}</GTBadge>
            <time>{{ post.date }}</time>
          </div>
          <p>{{ post.body }}</p>
        </GTCard>
      </div>
    </section>
  </main>
</template>
