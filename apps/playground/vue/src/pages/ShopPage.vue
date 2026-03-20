<script setup lang="ts">
  import { GTCard, GTTabs, GTTabPanel } from '@grundtone/vue';

  const products = [
    {
      id: 1,
      title: 'Design Tokens Tee',
      category: 'T-shirt',
      body: 'Økologisk bomuld med semantisk farveprint.',
      price: '349 kr',
    },
    {
      id: 2,
      title: 'Color System Plakat',
      category: 'Plakat',
      body: 'A2-format, 200g mat papir med fuld farveskala.',
      price: '199 kr',
      oldPrice: '299 kr',
    },
    {
      id: 3,
      title: 'Spacing Scale Krus',
      category: 'Accessories',
      body: 'Keramik krus med spacing-skala visualisering.',
      price: '129 kr',
    },
    {
      id: 4,
      title: 'Design Systems Handbook',
      category: 'Bog',
      body: '256 sider om at bygge skalerbare design systemer.',
      price: '449 kr',
    },
    {
      id: 5,
      title: 'Utility-First Hoodie',
      category: 'T-shirt',
      body: 'Blød fleece med broderet .flex .items-center motiv.',
      price: '599 kr',
    },
    {
      id: 6,
      title: 'Token Sticker Pack',
      category: 'Accessories',
      body: '12 vinyl stickers med CSS custom property navne.',
      price: '79 kr',
    },
    {
      id: 7,
      title: 'Typography Scale Plakat',
      category: 'Plakat',
      body: 'A3-format med komplet typografi-skala visualisering.',
      price: '149 kr',
    },
    {
      id: 8,
      title: 'Grid System Notesbog',
      category: 'Accessories',
      body: 'A5 dot-grid notesbog med 12-kolonne layout.',
      price: '89 kr',
    },
  ];
</script>

<template>
  <main id="main" class="container-lg p-4">
    <section>
      <h1 class="text-3xl font-bold mb-1">Shop</h1>
      <p class="text-secondary mb-4">
        Udforsk vores kollektion af design-system merchandise og accessories.
      </p>

      <GTTabs
        variant="pill"
        :tabs="[
          { id: 'all', label: 'Alle' },
          { id: 'tshirts', label: 'T-shirts' },
          { id: 'posters', label: 'Plakater' },
          { id: 'accessories', label: 'Accessories' },
        ]"
      >
        <GTTabPanel id="all">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
          >
            <GTCard
              v-for="product in products"
              :key="product.id"
              nav
              :href="`#/shop/${product.id}`"
              :title="product.title"
              :subheading="product.category"
              image="/placeholder-640x360.png"
              :image-alt="product.title"
            >
              <p>{{ product.body }}</p>
              <template #footer>
                <span class="font-bold">{{ product.price }}</span>
                <span
                  v-if="product.oldPrice"
                  class="text-sm text-tertiary line-through ml-1"
                  >{{ product.oldPrice }}</span
                >
              </template>
            </GTCard>
          </div>
        </GTTabPanel>
        <GTTabPanel id="tshirts">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
          >
            <GTCard
              v-for="product in products.filter(p => p.category === 'T-shirt')"
              :key="product.id"
              nav
              :href="`#/shop/${product.id}`"
              :title="product.title"
              :subheading="product.category"
              image="/placeholder-640x360.png"
              :image-alt="product.title"
            >
              <p>{{ product.body }}</p>
              <template #footer>
                <span class="font-bold">{{ product.price }}</span>
              </template>
            </GTCard>
          </div>
        </GTTabPanel>
        <GTTabPanel id="posters">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
          >
            <GTCard
              v-for="product in products.filter(p => p.category === 'Plakat')"
              :key="product.id"
              nav
              :href="`#/shop/${product.id}`"
              :title="product.title"
              :subheading="product.category"
              image="/placeholder-640x360.png"
              :image-alt="product.title"
            >
              <p>{{ product.body }}</p>
              <template #footer>
                <span class="font-bold">{{ product.price }}</span>
              </template>
            </GTCard>
          </div>
        </GTTabPanel>
        <GTTabPanel id="accessories">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
          >
            <GTCard
              v-for="product in products.filter(
                p => p.category === 'Accessories',
              )"
              :key="product.id"
              nav
              :href="`#/shop/${product.id}`"
              :title="product.title"
              :subheading="product.category"
              image="/placeholder-640x360.png"
              :image-alt="product.title"
            >
              <p>{{ product.body }}</p>
              <template #footer>
                <span class="font-bold">{{ product.price }}</span>
              </template>
            </GTCard>
          </div>
        </GTTabPanel>
      </GTTabs>
    </section>
  </main>
</template>
