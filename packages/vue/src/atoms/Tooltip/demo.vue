<script setup lang="ts">
  import GTTooltip from './Tooltip.vue';
  import { GTInput } from '../Input';
  import { GTButton } from '../Button';
  import { GTIcon } from '../Icon';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Click tooltip (default)</h3>
      <div class="gt-demo__stack">
        <GTTooltip
          content="CPR-nummeret bruges til at verificere din identitet."
        >
          <GTInput label="CPR-nummer" placeholder="000000-0000" />
        </GTTooltip>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Position bottom</h3>
      <div class="gt-demo__stack">
        <GTTooltip content="Denne information er vigtig." position="bottom">
          <GTInput label="Email" type="email" />
        </GTTooltip>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Hover tooltip (icons)</h3>
      <div class="flex gap-2">
        <GTTooltip content="Slet" trigger="hover">
          <GTButton variant="outlined" size="sm">
            <GTIcon name="close" size="sm" />
          </GTButton>
        </GTTooltip>
        <GTTooltip content="Søg" trigger="hover">
          <GTButton variant="outlined" size="sm">
            <GTIcon name="search" size="sm" />
          </GTButton>
        </GTTooltip>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  .gt-demo__stack {
    display: flex;
    flex-direction: column;
    gap: tokens.space('sm');
    max-width: 400px;
  }
</style>
