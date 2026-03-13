<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { iconRegistry, iconCategories } from '@grundtone/core';
  import { GTIcon } from '../../../../../packages/vue/src/atoms/Icon';

  const copied = ref<string | null>(null);

  const grouped = computed(() => {
    const map: Record<string, string[]> = {};
    for (const cat of iconCategories) {
      map[cat] = [];
    }
    for (const [name, def] of Object.entries(iconRegistry)) {
      const cat = def.category;
      if (!map[cat]) map[cat] = [];
      map[cat].push(name);
    }
    return map;
  });

  const totalCount = Object.keys(iconRegistry).length;

  function copyName(name: string) {
    navigator.clipboard.writeText(name);
    copied.value = name;
    setTimeout(() => {
      copied.value = null;
    }, 1500);
  }
</script>

<template>
  <div
    v-for="(icons, category) in grouped"
    :key="category"
    class="icon-gallery__category"
  >
    <h4 class="icon-gallery__heading">{{ category }}</h4>
    <div class="icon-gallery__grid">
      <div
        v-for="name in icons"
        :key="name"
        class="icon-gallery__card"
        :title="`Click to copy: ${name}`"
        @click="copyName(name)"
      >
        <GTIcon :name="name" size="lg" />
        <span class="icon-gallery__name">{{ name }}</span>
        <span v-if="copied === name" class="icon-gallery__copied">copied!</span>
      </div>
    </div>
  </div>
  <p class="icon-gallery__count">
    {{ totalCount }} icons in {{ iconCategories.length }} categories
  </p>
</template>

<style scoped>
  .icon-gallery__category {
    margin-bottom: 20px;
  }

  .icon-gallery__heading {
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .icon-gallery__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }

  .icon-gallery__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 16px 8px 12px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    cursor: pointer;
    transition:
      border-color 0.2s,
      background-color 0.2s;
    position: relative;
  }

  .icon-gallery__card:hover {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-bg-soft);
  }

  .icon-gallery__name {
    font-size: 11px;
    font-family: var(--vp-font-family-mono);
    color: var(--vp-c-text-2);
    text-align: center;
    word-break: break-all;
  }

  .icon-gallery__copied {
    position: absolute;
    top: 4px;
    right: 6px;
    font-size: 10px;
    color: var(--vp-c-brand-1);
    font-weight: 600;
  }

  .icon-gallery__count {
    font-size: 13px;
    color: var(--vp-c-text-3);
    margin-top: 8px;
  }
</style>
