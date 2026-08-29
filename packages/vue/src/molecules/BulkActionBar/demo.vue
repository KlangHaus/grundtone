<script setup lang="ts">
  import { ref } from 'vue';
  import GTBulkActionBar from './BulkActionBar.vue';
  import { GTButton } from '../../atoms/Button';
  import type { BulkActionState } from './types';

  const selected = ref<number[]>([]);
  const state = ref<BulkActionState>('idle');
  const message = ref<string | undefined>(undefined);
  const rows = [1, 2, 3, 4, 5, 6];

  function toggle(id: number) {
    const i = selected.value.indexOf(id);
    if (i === -1) selected.value.push(id);
    else selected.value.splice(i, 1);
  }

  // Demonstrerer den delvise succes: markeringen ryddes IKKE, saa de missede
  // kan proeves igen. Ved fuld succes ryddes den, og baren bliver staaende med
  // kvitteringen indtil den lukkes.
  async function move(partial: boolean) {
    state.value = 'sending';
    message.value = undefined;
    await new Promise(r => setTimeout(r, 600));

    const total = selected.value.length;
    const moved = partial ? Math.max(1, total - 2) : total;
    message.value = `${moved} af ${total} flyttet`;
    state.value = 'receipt';
    if (!partial) selected.value = [];
  }

  function onClear() {
    selected.value = [];
    state.value = 'idle';
    message.value = undefined;
  }
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Markér rækker</h3>
      <ul style="list-style: none; padding: 0">
        <li v-for="id in rows" :key="id">
          <label>
            <input
              type="checkbox"
              :checked="selected.includes(id)"
              @change="toggle(id)"
            />
            Række {{ id }}
          </label>
        </li>
      </ul>

      <p v-if="!selected.length && !message">Markér noget for at se baren.</p>

      <GTBulkActionBar
        :count="selected.length"
        :label="`${selected.length} markeret`"
        :state="state"
        :message="message"
        clear-label="Ryd"
        aria-label="Massehandlinger"
        @clear="onClear"
      >
        <template #default="{ busy }">
          <GTButton
            variant="primary"
            size="sm"
            :disabled="busy"
            @click="move(false)"
          >
            Flyt alle
          </GTButton>
          <GTButton
            variant="secondary"
            size="sm"
            :disabled="busy"
            @click="move(true)"
          >
            Flyt (delvis)
          </GTButton>
        </template>
      </GTBulkActionBar>
    </section>
  </div>
</template>
