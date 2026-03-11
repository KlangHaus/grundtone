<script setup lang="ts">
  import { iconRegistry } from '@grundtone/core';
  import GTIcon from './Icon.vue';

  const allIcons = Object.keys(iconRegistry);
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>All Custom Icons</h3>
      <div class="gt-demo__grid">
        <div v-for="name in allIcons" :key="name" class="gt-demo__icon-card">
          <GTIcon :name="name" size="lg" />
          <span class="gt-demo__icon-name">{{ name }}</span>
        </div>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Sizes</h3>
      <div class="gt-demo__row">
        <GTIcon name="check" size="xs" />
        <GTIcon name="check" size="sm" />
        <GTIcon name="check" size="md" />
        <GTIcon name="check" size="lg" />
        <GTIcon name="check" size="xl" />
        <GTIcon name="check" size="2xl" />
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Inherits color</h3>
      <div class="gt-demo__row">
        <span style="color: var(--color-primary)">
          <GTIcon name="check" />
        </span>
        <span style="color: var(--color-error)">
          <GTIcon name="close" />
        </span>
        <span style="color: var(--color-text-secondary)">
          <GTIcon name="search" />
        </span>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Accessible (with label)</h3>
      <div class="gt-demo__row">
        <GTIcon name="search" label="Search" />
        <GTIcon name="close" label="Close dialog" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  .gt-demo {
    &__section {
      margin-bottom: tokens.space('lg');

      h3 {
        margin-bottom: tokens.space('sm');
        font-family: tokens.font-family('base');
        font-size: tokens.font-size('base');
        font-weight: tokens.font-weight('semibold');
      }
    }

    &__row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: tokens.space('md');
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: tokens.space('sm');
    }

    &__icon-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: tokens.space('xs');
      padding: tokens.space('sm');
      border: 1px solid tokens.color('border');
      border-radius: tokens.radius('md');

      &:hover {
        background: tokens.color('surface');
      }
    }

    &__icon-name {
      font-size: tokens.font-size('xs');
      color: tokens.color('text-secondary');
      font-family: tokens.font-family('mono');
    }
  }
</style>
