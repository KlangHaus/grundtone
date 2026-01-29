<template>
  <div class="code-block">
    <div v-if="title" class="code-block__header">
      <span class="code-block__title">{{ title }}</span>
      <button
        v-if="showCopy"
        class="code-block__copy"
        type="button"
        @click="copyToClipboard"
        :aria-label="`Copy ${title || 'code'} to clipboard`"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <pre
      class="code-block__pre"
      :class="`language-${language}`"
    ><code class="code-block__code" ref="codeElement">{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  interface Props {
    /** Code content */
    code: string;
    /** Programming language */
    language?:
      | 'typescript'
      | 'javascript'
      | 'scss'
      | 'css'
      | 'html'
      | 'vue'
      | 'json';
    /** Show line numbers */
    showLineNumbers?: boolean;
    /** Highlighted lines (1-indexed) */
    highlightLines?: number[];
    /** Code title/filename */
    title?: string;
    /** Show copy button */
    showCopy?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    language: 'typescript',
    showLineNumbers: false,
    showCopy: true,
  });

  const copied = ref(false);

  async function copyToClipboard() {
    try {
      // eslint-disable-next-line no-undef
      await navigator.clipboard.writeText(props.code);
      copied.value = true;
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch {
      // Silently fail if clipboard API is not available
    }
  }
</script>

<style lang="scss" scoped>
  .code-block {
    border-radius: 0.375rem;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    background-color: #f9fafb;
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .code-block__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
  }

  .code-block__title {
    font-weight: 500;
    color: #374151;
    font-size: 0.875rem;
  }

  .code-block__copy {
    padding: 0.375rem 0.75rem;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    color: #374151;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .code-block__pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
    background-color: #ffffff;
  }

  .code-block__code {
    display: block;
    color: #1f2937;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    white-space: pre;
    word-wrap: normal;
  }

  // Language-specific colors (basic)
  .language-typescript,
  .language-javascript {
    .code-block__code {
      color: #3730a3;
    }
  }

  .language-scss,
  .language-css {
    .code-block__code {
      color: #be185d;
    }
  }

  .language-html,
  .language-vue {
    .code-block__code {
      color: #b91c1c;
    }
  }

  .language-json {
    .code-block__code {
      color: #0369a1;
    }
  }
</style>
