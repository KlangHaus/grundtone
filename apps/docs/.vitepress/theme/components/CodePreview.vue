<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { gridExamples } from '../grid-examples';

  const props = defineProps<{
    name?: keyof typeof gridExamples;
    code?: string;
  }>();

  const code = computed(() => {
    if (props.code !== undefined && props.code !== '') {
      return props.code;
    }
    if (props.name !== undefined && props.name in gridExamples) {
      return gridExamples[props.name];
    }
    return '';
  });

  const activeTab = ref<'code' | 'preview'>('preview');
</script>

<template>
  <div class="code-preview">
    <div class="code-preview__tabs">
      <button
        :class="['code-preview__tab', { active: activeTab === 'code' }]"
        @click="activeTab = 'code'"
      >
        Code
      </button>
      <button
        :class="['code-preview__tab', { active: activeTab === 'preview' }]"
        @click="activeTab = 'preview'"
      >
        Preview
      </button>
    </div>

    <div v-show="activeTab === 'code'" class="code-preview__code">
      <pre><code>{{ code }}</code></pre>
    </div>

    <div v-show="activeTab === 'preview'" class="code-preview__preview">
      <div v-html="code" class="code-preview__result"></div>
    </div>
  </div>
</template>

<style scoped>
  .code-preview {
    margin: 1.25rem 0;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    overflow: hidden;
  }

  .code-preview__tabs {
    display: flex;
    gap: 0;
    padding: 0;
    background: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .code-preview__tab {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    background: none;
    border: none;
    color: var(--vp-c-text-2);
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  .code-preview__tab:hover {
    color: var(--vp-c-text-1);
  }

  .code-preview__tab.active {
    color: var(--vp-c-brand-1);
    border-bottom-color: var(--vp-c-brand-1);
  }

  .code-preview__code,
  .code-preview__preview {
    padding: 1rem;
    min-height: 80px;
  }

  .code-preview__code {
    background: var(--vp-code-block-bg);
    overflow-x: auto;
  }

  .code-preview__code pre {
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.5;
  }

  .code-preview__code code {
    font-family: var(--vp-font-family-mono);
    color: var(--vp-c-text-1);
  }

  .code-preview__preview {
    background: var(--vp-c-bg-soft);
  }

  .code-preview__result {
    font-size: 0.875rem;
  }

  .code-preview__result :deep(.grid) > *,
  .code-preview__result :deep(.grid-auto-fit) > * {
    padding: 0.5rem 0.75rem;
    background: var(--vp-c-bg-soft);
    border: 1px dashed var(--vp-c-divider);
    border-radius: 4px;
  }

  .code-preview__result :deep(.grid-cards) .card {
    padding: 0.75rem 1rem;
    background: var(--vp-c-bg-soft);
    border: 1px dashed var(--vp-c-divider);
    border-radius: 6px;
  }

  .code-preview__result :deep(.grid-sidebar-left) > *,
  .code-preview__result :deep(.grid-sidebar-right) > * {
    padding: 0.5rem 0.75rem;
    background: var(--vp-c-bg-soft);
    border: 1px dashed var(--vp-c-divider);
    border-radius: 4px;
  }

  .code-preview__result :deep(.grid-holy-grail) {
    min-height: 180px;
  }

  .code-preview__result :deep(header),
  .code-preview__result :deep(footer) {
    padding: 0.5rem 0.75rem;
    background: var(--vp-c-bg-soft);
    border: 1px dashed var(--vp-c-divider);
    border-radius: 4px;
  }

  .code-preview__result :deep(nav),
  .code-preview__result :deep(aside) {
    padding: 0.5rem 0.75rem;
    background: var(--vp-c-bg-soft);
    border: 1px dashed var(--vp-c-divider);
    border-radius: 4px;
  }

  .code-preview__result :deep(main) {
    padding: 0.75rem 1rem;
    background: var(--vp-c-bg-soft);
    border: 1px dashed var(--vp-c-divider);
    border-radius: 4px;
  }
</style>
