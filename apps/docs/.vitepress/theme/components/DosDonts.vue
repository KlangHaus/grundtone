<template>
  <div class="dos-donts-grid">
    <slot />
  </div>
</template>

<style scoped>
  .dos-donts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  @media (max-width: 640px) {
    .dos-donts-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
