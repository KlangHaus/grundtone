<script setup lang="ts">
  import GTSummaryList from './SummaryList.vue';
  import GTSummaryItem from './SummaryItem.vue';
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4>Default</h4>
      <GTSummaryList>
        <GTSummaryItem label="Navn" action="Redigér" action-label="navn">
          Alice Jensen
        </GTSummaryItem>
        <GTSummaryItem label="Email" action="Redigér" action-label="email">
          alice@example.com
        </GTSummaryItem>
        <GTSummaryItem label="Adresse" action="Redigér" action-label="adresse">
          Vestergade 1, 8000 Aarhus C
        </GTSummaryItem>
      </GTSummaryList>
    </div>

    <div>
      <h4>Borderless</h4>
      <GTSummaryList variant="borderless">
        <GTSummaryItem label="Ordrenummer">2026-0042</GTSummaryItem>
        <GTSummaryItem label="Dato">23. marts 2026</GTSummaryItem>
        <GTSummaryItem label="Status">Sendt</GTSummaryItem>
      </GTSummaryList>
    </div>

    <div>
      <h4>Card</h4>
      <GTSummaryList variant="card" title="Kontaktoplysninger">
        <GTSummaryItem label="Navn" action="Redigér" action-label="navn">
          Alice Jensen
        </GTSummaryItem>
        <GTSummaryItem label="Telefon" action="Redigér" action-label="telefon">
          +45 12 34 56 78
        </GTSummaryItem>
        <GTSummaryItem label="Email" action="Redigér" action-label="email">
          alice@example.com
        </GTSummaryItem>
      </GTSummaryList>
    </div>

    <div>
      <h4>Without actions (read-only)</h4>
      <GTSummaryList>
        <GTSummaryItem label="CPR">010190-1234</GTSummaryItem>
        <GTSummaryItem label="Nationalitet">Dansk</GTSummaryItem>
        <GTSummaryItem label="Kommune">Aarhus</GTSummaryItem>
      </GTSummaryList>
    </div>
  </div>
</template>
