<script setup lang="ts">
  import { ref } from 'vue';
  import GTCarousel from './Carousel.vue';
  import GTCarouselSlide from './CarouselSlide.vue';

  const activeSlide = ref(0);
  const autoplayEnabled = ref(false);

  const slides = [
    { bg: 'var(--color-primary)', label: 'Slide 1' },
    { bg: 'var(--color-success)', label: 'Slide 2' },
    { bg: 'var(--color-warning)', label: 'Slide 3' },
  ];
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4>Default</h4>
      <GTCarousel v-model="activeSlide" style="max-width: 600px">
        <GTCarouselSlide v-for="(s, i) in slides" :key="i">
          <div
            :style="{
              background: s.bg,
              height: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }"
          >
            {{ s.label }}
          </div>
        </GTCarouselSlide>
      </GTCarousel>
      <p class="text-sm text-secondary mt-1">Active: {{ activeSlide }}</p>
    </div>

    <div>
      <h4>Fade variant</h4>
      <GTCarousel fade style="max-width: 600px">
        <GTCarouselSlide v-for="(s, i) in slides" :key="i">
          <div
            :style="{
              background: s.bg,
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 'var(--font-size-xl)',
            }"
          >
            {{ s.label }} (fade)
          </div>
        </GTCarouselSlide>
      </GTCarousel>
    </div>

    <div>
      <h4>Autoplay</h4>
      <label class="flex items-center gap-2 mb-2 text-sm">
        <input v-model="autoplayEnabled" type="checkbox" />
        Autoplay (3s)
      </label>
      <GTCarousel
        :autoplay="autoplayEnabled"
        :interval="3000"
        style="max-width: 600px"
      >
        <GTCarouselSlide v-for="(s, i) in slides" :key="i">
          <div
            :style="{
              background: s.bg,
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 'var(--font-size-xl)',
            }"
          >
            {{ s.label }}
          </div>
        </GTCarouselSlide>
      </GTCarousel>
    </div>

    <div>
      <h4>Without controls</h4>
      <GTCarousel
        :show-controls="false"
        style="max-width: 600px"
      >
        <GTCarouselSlide v-for="(s, i) in slides" :key="i">
          <div
            :style="{
              background: s.bg,
              height: '160px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }"
          >
            {{ s.label }}
          </div>
        </GTCarouselSlide>
      </GTCarousel>
    </div>
  </div>
</template>
