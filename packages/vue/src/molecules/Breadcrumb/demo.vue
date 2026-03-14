<script setup lang="ts">
  import GTBreadcrumb from './Breadcrumb.vue';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Basic (3 levels)</h3>
      <GTBreadcrumb
        :items="[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: 'Current Post' },
        ]"
      />
    </section>

    <section class="gt-demo__section">
      <h3>Deep hierarchy (5 levels)</h3>
      <GTBreadcrumb
        :items="[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Clothing', href: '/products/clothing' },
          { label: 'T-shirts', href: '/products/clothing/t-shirts' },
          { label: 'Design Tokens Tee' },
        ]"
      />
    </section>

    <section class="gt-demo__section">
      <h3>Custom separator</h3>
      <GTBreadcrumb
        separator="→"
        :items="[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings', href: '/settings' },
          { label: 'Profile' },
        ]"
      />
    </section>
  </div>
</template>
