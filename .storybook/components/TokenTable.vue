<template>
  <div class="token-table">
    <div v-if="title || filterable" class="token-table__header">
      <h3 v-if="title" class="token-table__title">{{ title }}</h3>
      <input
        v-if="filterable"
        v-model="filterText"
        type="text"
        placeholder="Search tokens..."
        class="token-table__filter"
        aria-label="Filter tokens"
      />
    </div>
    <div class="token-table__wrapper">
      <table class="token-table__table">
        <thead class="token-table__thead">
          <tr>
            <th
              v-for="column in displayColumns"
              :key="column.key"
              :style="{ width: column.width }"
              class="token-table__th"
              @click="sortable && sortByColumn(column.key)"
              :class="{ 'token-table__th--sortable': sortable }"
            >
              {{ column.label }}
              <span
                v-if="sortable && sortColumn === column.key"
                class="token-table__sort-indicator"
              >
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="token-table__tbody">
          <tr
            v-for="(token, index) in filteredAndSortedTokens"
            :key="index"
            class="token-table__tr"
          >
            <td class="token-table__td token-table__td--name">
              <code>{{ token.name }}</code>
            </td>
            <td class="token-table__td token-table__td--value">
              <code>{{ token.value }}</code>
              <button
                class="token-table__copy"
                @click="copyValue(token.value)"
                :aria-label="`Copy ${token.value}`"
                type="button"
              >
                {{ copiedValue === token.value ? '✓' : '📋' }}
              </button>
            </td>
            <td
              v-if="hasDescription"
              class="token-table__td token-table__td--description"
            >
              {{ token.description }}
            </td>
            <td
              v-if="hasExample"
              class="token-table__td token-table__td--example"
            >
              <span v-html="token.example"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="filteredAndSortedTokens.length === 0" class="token-table__empty">
      No tokens found matching "{{ filterText }}"
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  interface TokenItem {
    name: string;
    value: string;
    description?: string;
    example?: string;
  }

  interface Column {
    key: string;
    label: string;
    width?: string;
  }

  interface Props {
    /** Table title */
    title?: string;
    /** Token data */
    tokens: TokenItem[];
    /** Column configuration */
    columns?: Column[];
    /** Allow filtering */
    filterable?: boolean;
    /** Allow sorting */
    sortable?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    filterable: false,
    sortable: false,
  });

  const filterText = ref('');
  const sortColumn = ref('name');
  const sortDirection = ref<'asc' | 'desc'>('asc');
  const copiedValue = ref<string>('');

  const hasDescription = computed(() => props.tokens.some(t => t.description));
  const hasExample = computed(() => props.tokens.some(t => t.example));

  const displayColumns = computed(() => {
    if (props.columns) return props.columns;

    const cols: Column[] = [
      { key: 'name', label: 'Name', width: '25%' },
      { key: 'value', label: 'Value', width: '25%' },
    ];

    if (hasDescription.value) {
      cols.push({ key: 'description', label: 'Description', width: '40%' });
    }

    if (hasExample.value) {
      cols.push({ key: 'example', label: 'Preview', width: '10%' });
    }

    return cols;
  });

  const filteredAndSortedTokens = computed(() => {
    let result = [...props.tokens];

    // Filter
    if (filterText.value) {
      const filter = filterText.value.toLowerCase();
      result = result.filter(
        token =>
          token.name.toLowerCase().includes(filter) ||
          token.value.toLowerCase().includes(filter) ||
          (token.description &&
            token.description.toLowerCase().includes(filter)),
      );
    }

    // Sort
    if (props.sortable && sortColumn.value) {
      result.sort((a, b) => {
        const aValue = String(a[sortColumn.value as keyof TokenItem] || '');
        const bValue = String(b[sortColumn.value as keyof TokenItem] || '');

        const comparison = aValue.localeCompare(bValue);
        return sortDirection.value === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  });

  function sortByColumn(columnKey: string) {
    if (!props.sortable) return;

    if (sortColumn.value === columnKey) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.value = columnKey;
      sortDirection.value = 'asc';
    }
  }

  async function copyValue(value: string) {
    try {
      // eslint-disable-next-line no-undef
      await navigator.clipboard.writeText(value);
      copiedValue.value = value;
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        copiedValue.value = '';
      }, 2000);
    } catch {
      // Silently fail if clipboard API is not available
    }
  }
</script>

<style lang="scss" scoped>
  .token-table {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #ffffff;
  }

  .token-table__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f9fafb;
    gap: 1rem;
  }

  .token-table__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
  }

  .token-table__filter {
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #374151;
    min-width: 200px;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  .token-table__wrapper {
    overflow-x: auto;
  }

  .token-table__table {
    width: 100%;
    border-collapse: collapse;
  }

  .token-table__thead {
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
  }

  .token-table__th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    white-space: nowrap;

    &--sortable {
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #f3f4f6;
      }
    }
  }

  .token-table__sort-indicator {
    margin-left: 0.5rem;
    color: #3b82f6;
  }

  .token-table__tbody {
    tr:not(:last-child) {
      border-bottom: 1px solid #f3f4f6;
    }
  }

  .token-table__tr {
    &:hover {
      background-color: #f9fafb;
    }
  }

  .token-table__td {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: #374151;

    code {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.8125rem;
      color: #1f2937;
      background-color: #f3f4f6;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
    }

    &--name {
      font-weight: 500;
    }

    &--value {
      position: relative;
    }

    &--description {
      color: #6b7280;
    }

    &--example {
      text-align: center;
    }
  }

  .token-table__copy {
    margin-left: 0.5rem;
    padding: 0.25rem 0.5rem;
    background: none;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.75rem;
    opacity: 0;
    transition: all 0.15s ease;

    .token-table__tr:hover & {
      opacity: 1;
    }

    &:hover {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .token-table__empty {
    padding: 2rem;
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .token-table__header {
      flex-direction: column;
      align-items: stretch;
    }

    .token-table__filter {
      min-width: auto;
      width: 100%;
    }

    .token-table__td {
      padding: 0.5rem 0.75rem;
      font-size: 0.8125rem;
    }

    .token-table__copy {
      opacity: 1;
    }
  }
</style>
