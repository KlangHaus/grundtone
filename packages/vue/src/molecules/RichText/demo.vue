<script setup lang="ts">
  import { ref } from 'vue';
  import GTRichText from './RichText.vue';
  import type { JSONContent } from '@tiptap/vue-3';

  const doc = ref<JSONContent | null>({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Skriv løs — ' },
          { type: 'text', marks: [{ type: 'bold' }], text: 'fed' },
          { type: 'text', text: ' og ' },
          { type: 'text', marks: [{ type: 'italic' }], text: 'kursiv' },
          { type: 'text', text: '.' },
        ],
      },
    ],
  });
  const html = ref('');
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Fuldt feature-sæt (v-model = JSON, HTML output-only)</h3>
      <GTRichText
        v-model="doc"
        aria-label="Brødtekst"
        placeholder="Skriv noget…"
        @update:html="(v: string) => (html = v)"
      />
      <details style="margin-top: 0.5rem">
        <summary>Afledt HTML (output-only)</summary>
        <pre>{{ html }}</pre>
      </details>
    </section>

    <section class="gt-demo__section">
      <h3>Begrænset feature-sæt (kun bold/italic/link)</h3>
      <GTRichText
        :model-value="doc"
        :features="['bold', 'italic', 'link']"
        aria-label="Note"
      />
    </section>

    <section class="gt-demo__section">
      <h3>Readonly (ren statisk HTML — SSR-sti)</h3>
      <GTRichText :model-value="doc" readonly />
    </section>
  </div>
</template>
