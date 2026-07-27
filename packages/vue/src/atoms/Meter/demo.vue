<script setup lang="ts">
  import GTMeter from './Meter.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Determinate (burndown)</h3>
      <GTMeter :value="65" label="Burndown" />
    </section>

    <section class="gt-demo__section">
      <h3>Accent (album-farve)</h3>
      <GTMeter :value="40" variant="accent" accent="#8e44ad" label="Album" />
    </section>

    <section class="gt-demo__section">
      <h3>Threshold asc (capacity: høj = dårlig)</h3>
      <GTMeter
        :value="55"
        variant="threshold"
        tone="success"
        :thresholds="[
          { at: 70, tone: 'warning' },
          { at: 90, tone: 'error' },
        ]"
        label="Kapacitet 55%"
      />
      <GTMeter
        :value="95"
        variant="threshold"
        tone="success"
        :thresholds="[
          { at: 70, tone: 'warning' },
          { at: 90, tone: 'error' },
        ]"
        label="Kapacitet 95%"
        style="margin-top: 0.5rem"
      />
    </section>

    <section class="gt-demo__section">
      <h3>Threshold desc (success-rate: lav = dårlig)</h3>
      <GTMeter
        :value="45"
        variant="threshold"
        direction="desc"
        tone="success"
        :thresholds="[
          { at: 50, tone: 'error' },
          { at: 80, tone: 'warning' },
        ]"
        label="Success-rate 45%"
      />
    </section>
  </div>
</template>
