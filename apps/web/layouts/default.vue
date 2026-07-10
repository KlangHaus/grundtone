<template>
  <div class="site">
    <GTSkipLink href="#main">Spring til indhold</GTSkipLink>
    <SiteHeader />
    <main id="main" class="site-main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
