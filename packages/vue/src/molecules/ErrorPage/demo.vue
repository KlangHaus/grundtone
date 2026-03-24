<script setup lang="ts">
  import { ref } from 'vue';
  import GTErrorPage from './ErrorPage.vue';

  const activeCode = ref(404);
  const codes = [400, 403, 404, 500, 502, 503];
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4>Vælg fejlkode</h4>
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="c in codes"
          :key="c"
          type="button"
          :class="[
            'gt-btn gt-btn--sm',
            activeCode === c ? 'gt-btn--primary' : 'gt-btn--outlined',
          ]"
          @click="activeCode = c"
        >
          {{ c }}
        </button>
      </div>
    </div>

    <div
      style="
        border: 1px solid var(--color-border-light);
        border-radius: var(--radius-lg);
        overflow: hidden;
      "
    >
      <GTErrorPage :code="activeCode" :show-home-link="false" />
    </div>
  </div>
</template>
