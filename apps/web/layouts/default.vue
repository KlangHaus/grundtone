<template>
  <div class="site">
    <GTSkipLink href="#main" />
    <SiteHeader />
    <main id="main" class="site-main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
