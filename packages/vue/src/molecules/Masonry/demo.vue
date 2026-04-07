<script setup lang="ts">
  import GTMasonry from './Masonry.vue';
  import { GTCard } from '../Card';

  const items = [
    {
      title: 'Design Tokens',
      body: 'Learn how design tokens power the entire Grundtone system across platforms.',
      image: '/placeholder-640x360.png',
    },
    {
      title: 'Typography Scale',
      body: 'A short note on type.',
    },
    {
      title: 'Color System',
      body: 'Semantic color tokens adapt to light and dark mode automatically, ensuring consistent contrast.',
      image: '/placeholder-640x360.png',
    },
    {
      title: 'Spacing',
      body: 'An 8-step spacing scale that keeps layouts consistent.',
    },
    {
      title: 'Component Architecture',
      body: 'Atoms, molecules, and organisms — a layered approach to building complex interfaces from simple parts.',
      image: '/placeholder-640x360.png',
    },
    {
      title: 'Accessibility',
      body: 'Every component ships with WCAG 2.1 AA compliance built in.',
    },
    {
      title: 'Theming',
      body: 'Create custom themes with createTheme() and override any token.',
    },
    {
      title: 'Responsive Utilities',
      body: 'Breakpoint-prefixed utility classes for spacing, display, flex, grid, and more.',
      image: '/placeholder-640x360.png',
    },
  ];
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Default masonry grid</h3>
      <GTMasonry :items="items" :gap="24" :column-width="280">
        <template #default="{ item }">
          <GTCard
            :title="(item as any).title"
            :image="(item as any).image"
            image-alt="Placeholder"
            variant="bordered"
          >
            <p>{{ (item as any).body }}</p>
          </GTCard>
        </template>
      </GTMasonry>
    </section>

    <section class="gt-demo__section">
      <h3>Wide columns (columnWidth: 400)</h3>
      <GTMasonry :items="items.slice(0, 4)" :gap="16" :column-width="400">
        <template #default="{ item }">
          <GTCard :title="(item as any).title" variant="flat">
            <p>{{ (item as any).body }}</p>
          </GTCard>
        </template>
      </GTMasonry>
    </section>

    <section class="gt-demo__section">
      <h3>Tight gap (8px)</h3>
      <GTMasonry :items="items.slice(0, 6)" :gap="8" :column-width="200">
        <template #default="{ item }">
          <GTCard
            :title="(item as any).title"
            :image="(item as any).image"
            image-alt="Placeholder"
          >
            <p>{{ (item as any).body }}</p>
          </GTCard>
        </template>
      </GTMasonry>
    </section>
  </div>
</template>
