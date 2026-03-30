<script setup lang="ts">
  import GTCard from './Card.vue';
  import { GTButton } from '../../atoms/Button';
</script>

<template>
  <div class="gt-demo">
    <section class="gt-demo__section">
      <h3>Standard (raised)</h3>
      <div class="max-w-sm">
        <GTCard
          title="Design Tokens"
          subheading="Guide"
          image="/placeholder-640x360.png"
          image-alt="Placeholder"
        >
          <p>Learn how design tokens power the entire Grundtone system.</p>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Navigation card</h3>
      <div class="max-w-sm">
        <GTCard
          nav
          href="#"
          title="Getting Started"
          subheading="Documentation"
          image="/placeholder-640x360.png"
          image-alt="Placeholder"
        >
          <p>Set up Grundtone in your project in under 5 minutes.</p>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Bordered</h3>
      <div class="max-w-sm">
        <GTCard variant="bordered" title="Bordered Card">
          <p>A card with a subtle border instead of elevation.</p>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Flat</h3>
      <div class="max-w-sm">
        <GTCard variant="flat" title="Flat Card">
          <p>No background, no border — just structure and spacing.</p>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Horizontal</h3>
      <div class="max-w-xl">
        <GTCard
          horizontal
          title="Horizontal Layout"
          subheading="Feature"
          image="/placeholder-400x300.png"
          image-alt="Placeholder"
        >
          <p>Image on the left, content on the right.</p>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With footer</h3>
      <div class="max-w-sm">
        <GTCard
          title="Card with Footer"
          image="/placeholder-640x360.png"
          image-alt="Placeholder"
        >
          <p>Footer content is pushed to the bottom via flex.</p>
          <template #footer>
            <a href="#">Read more</a>
          </template>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>With buttons</h3>
      <div class="max-w-sm">
        <GTCard
          title="Introduction to Design Tokens"
          subheading="Course"
          image="/placeholder-640x360.png"
          image-alt="Course image"
        >
          <p>Learn the fundamentals of design tokens and how to apply them.</p>
          <template #footer>
            <div class="flex gap-xs">
              <GTButton size="sm" variant="primary">Enrol</GTButton>
              <GTButton size="sm" variant="outlined" as="a" href="#"
                >Read more</GTButton
              >
            </div>
          </template>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Grid (equal height)</h3>
      <div class="grid grid-cols-3 gap-md">
        <GTCard title="Short" subheading="Grid">
          <p>Brief content.</p>
        </GTCard>
        <GTCard title="Medium" subheading="Grid">
          <p>
            A bit more content to demonstrate that cards stretch to equal height
            in a grid layout.
          </p>
        </GTCard>
        <GTCard title="With Footer" subheading="Grid">
          <p>Footer stays at bottom.</p>
          <template #footer>
            <a href="#">Action</a>
          </template>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>Article card (with meta + tag)</h3>
      <div class="max-w-sm">
        <GTCard
          title="Design Tokens in Practice"
          image="/placeholder-640x360.png"
          image-alt="Article image"
        >
          <div class="meta text-sm text-secondary">
            <span class="tag text-xs">Design</span>
            <time>1 March 2026</time>
            <span aria-hidden="true">&middot;</span>
            <span>6 min read</span>
          </div>
          <p>How to leverage design tokens across platforms.</p>
        </GTCard>
      </div>
    </section>

    <section class="gt-demo__section">
      <h3>External nav card</h3>
      <div class="max-w-sm">
        <GTCard nav external href="https://example.com" title="External Link">
          <p>Opens in a new tab with noopener noreferrer.</p>
        </GTCard>
      </div>
    </section>
  </div>
</template>
