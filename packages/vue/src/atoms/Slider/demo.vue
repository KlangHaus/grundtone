<script setup lang="ts">
  import { ref } from 'vue';
  import GTSlider from './Slider.vue';

  const volume = ref(60);
  const price = ref<[number, number]>([200, 800]);
  const opacity = ref(75);
  const stepped = ref(50);
</script>

<template>
  <div class="flex flex-col gap-6" style="max-width: 400px">
    <div>
      <h4>Default</h4>
      <GTSlider v-model="volume" label="Volumen" show-value />
    </div>

    <div>
      <h4>Range (dual thumb)</h4>
      <GTSlider
        v-model="price"
        :min="0"
        :max="1000"
        :step="50"
        range
        label="Pris (kr)"
        show-value
      />
    </div>

    <div>
      <h4>With steps</h4>
      <GTSlider
        v-model="stepped"
        :min="0"
        :max="100"
        :step="10"
        label="Trin af 10"
        show-value
      />
    </div>

    <div>
      <h4>Disabled</h4>
      <GTSlider :model-value="40" label="Deaktiveret" show-value disabled />
    </div>

    <div>
      <h4>Vertical</h4>
      <GTSlider
        v-model="opacity"
        orientation="vertical"
        label="Opacity"
        show-value
      />
    </div>
  </div>
</template>
