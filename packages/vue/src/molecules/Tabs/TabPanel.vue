<script setup lang="ts">
  import { computed, inject, type Ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { TabPanelProps } from './types';

  const props = defineProps<TabPanelProps>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-tabs`);

  const activeTab = inject<Ref<string>>(
    'gt-tabs-active',
    computed(() => ''),
  );
  const slideDirection = inject<Ref<'left' | 'right'>>(
    'gt-tabs-direction',
    computed(() => 'right'),
  );
  const isActive = computed(() => activeTab.value === props.id);
</script>

<template>
  <Transition :name="`${base}__slide-${slideDirection}`" mode="out-in">
    <div
      v-if="isActive"
      :key="id"
      :id="`panel-${id}`"
      :class="`${base}__panel`"
      role="tabpanel"
      :aria-labelledby="`tab-${id}`"
      tabindex="0"
    >
      <slot />
    </div>
  </Transition>
</template>
