<script setup lang="ts">
  import { ref } from 'vue';
  import GTTag from './Tag.vue';

  const filters = ref<Record<string, boolean>>({
    design: true,
    vue: false,
    a11y: false,
    css: true,
  });

  const tags = ref(['Vue 3', 'TypeScript', 'SCSS']);
  function removeTag(val: string | undefined) {
    tags.value = tags.value.filter(t => t !== val);
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Display (metadata)</h3>
      <div class="flex flex-wrap gap-2">
        <GTTag label="Design" />
        <GTTag label="Tilgængelighed" />
        <GTTag label="Frontend" />
        <GTTag label="Open Source" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Dismissible</h3>
      <div class="flex flex-wrap gap-2">
        <GTTag
          v-for="tag in tags"
          :key="tag"
          :label="tag"
          :value="tag"
          dismissible
          @dismiss="removeTag"
        />
        <p v-if="tags.length === 0" class="body-text-sm text-secondary">
          Alle tags fjernet
        </p>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Selectable (filter)</h3>
      <div class="flex flex-wrap gap-2">
        <GTTag
          v-for="(active, key) in filters"
          :key="key"
          :label="String(key)"
          :selected="active"
          @update:selected="filters[key] = $event"
        />
      </div>
      <p class="body-text-sm text-secondary mt-2">
        Aktive:
        {{
          Object.entries(filters)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ') || '(ingen)'
        }}
      </p>
    </section>

    <section class="gt-demo__section">
      <h3>Sizes</h3>
      <div class="flex flex-wrap items-center gap-2">
        <GTTag label="Small" size="sm" />
        <GTTag label="Medium" size="md" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Disabled</h3>
      <div class="flex flex-wrap gap-2">
        <GTTag label="Disabled" disabled />
        <GTTag label="Disabled selected" selected disabled />
      </div>
    </section>
  </div>
</template>
