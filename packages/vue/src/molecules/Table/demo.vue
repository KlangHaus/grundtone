<script setup lang="ts">
  import { ref } from 'vue';
  import GTTable from './Table.vue';
  import { GTBadge } from '../../atoms/Badge';
  import type { TableColumn } from './types';

  const columns: TableColumn[] = [
    { key: 'name', label: 'Navn', sortable: true },
    { key: 'role', label: 'Rolle' },
    { key: 'status', label: 'Status' },
    { key: 'salary', label: 'Løn', numeric: true, sortable: true },
  ];

  const rows = [
    { name: 'Alice Jensen', role: 'Designer', status: 'active', salary: 42000 },
    { name: 'Bob Nielsen', role: 'Developer', status: 'active', salary: 48000 },
    {
      name: 'Carol Sørensen',
      role: 'Manager',
      status: 'inactive',
      salary: 55000,
    },
    {
      name: 'Dan Christensen',
      role: 'Developer',
      status: 'active',
      salary: 46000,
    },
  ];

  const selectedRows = ref<number[]>([]);

  const statusVariant = (s: string) => (s === 'active' ? 'success' : 'neutral');
  const statusLabel = (s: string) => (s === 'active' ? 'Aktiv' : 'Inaktiv');
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4>Default</h4>
      <GTTable :columns="columns" :rows="rows" caption="Medarbejdere" />
    </div>

    <div>
      <h4>Borderless</h4>
      <GTTable
        :columns="columns"
        :rows="rows"
        variant="borderless"
        caption="Medarbejdere (borderless)"
      />
    </div>

    <div>
      <h4>Zebra</h4>
      <GTTable
        :columns="columns"
        :rows="rows"
        striped
        caption="Medarbejdere (zebra)"
      />
    </div>

    <div>
      <h4>Compact</h4>
      <GTTable
        :columns="columns"
        :rows="rows"
        density="compact"
        caption="Medarbejdere (compact)"
      />
    </div>

    <div>
      <h4>Sortable (interactive)</h4>
      <GTTable :columns="columns" :rows="rows" caption="Sortable table" />
    </div>

    <div>
      <h4>Selectable (interactive)</h4>
      <GTTable
        v-model="selectedRows"
        :columns="columns"
        :rows="rows"
        selectable
        caption="Selectable table"
      />
      <p class="text-sm text-secondary mt-1">
        Valgte: {{ selectedRows.length }} rækker
      </p>
    </div>

    <div>
      <h4>Custom cell slot with Badge</h4>
      <GTTable :columns="columns" :rows="rows" caption="Custom cell demo">
        <template #cell-status="{ value }">
          <GTBadge :variant="statusVariant(value as string)" size="sm" dot>
            {{ statusLabel(value as string) }}
          </GTBadge>
        </template>
        <template #cell-salary="{ value }">
          {{ (value as number).toLocaleString('da-DK') }} kr
        </template>
      </GTTable>
    </div>
  </div>
</template>
