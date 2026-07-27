<script setup lang="ts">
  import { ref } from 'vue';
  import GTAppShell from './AppShell.vue';
  import { GTButton } from '../../atoms/Button';

  const collapsed = ref(false);
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>App-shell (resize under 48rem → drawer)</h3>
      <div
        style="
          block-size: 24rem;
          border: 1px solid var(--color-border-light);
          overflow: hidden;
        "
      >
        <GTAppShell v-model:collapsed="collapsed" :toasts="false">
          <template #sidebar="{ collapsed: isCollapsed, toggleCollapsed }">
            <a href="#" style="display: block; padding: 0.5rem">
              {{ isCollapsed ? 'P' : 'Projekter' }}
            </a>
            <a href="#" style="display: block; padding: 0.5rem">
              {{ isCollapsed ? 'I' : 'Indstillinger' }}
            </a>
            <GTButton variant="unstyled" size="sm" @click="toggleCollapsed">
              {{ isCollapsed ? '»' : '« Fold sammen' }}
            </GTButton>
          </template>
          <template #topbar>
            <span>Overblik</span>
            <span>👤</span>
          </template>
          <p>Hovedindhold — den eneste scroll-region.</p>
        </GTAppShell>
      </div>
    </section>
  </div>
</template>
