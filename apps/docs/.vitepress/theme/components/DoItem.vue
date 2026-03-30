<template>
  <div class="dos-donts-item dos-donts-item--do">
    <div class="dos-donts-item__header">
      <span class="dos-donts-item__icon">✓</span>
      <span class="dos-donts-item__label">Do</span>
    </div>
    <div class="dos-donts-item__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .dos-donts-item--do {
    border-left: 3px solid var(--color-success, #16a34a);
    background: color-mix(
      in srgb,
      var(--color-success, #16a34a) 6%,
      transparent
    );
  }

  .dos-donts-item--do .dos-donts-item__icon {
    color: var(--color-success, #16a34a);
  }

  .dos-donts-item--do .dos-donts-item__label {
    color: var(--color-success, #16a34a);
  }
</style>
