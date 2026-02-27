#!/usr/bin/env node

/**
 * Test script for different icon libraries
 * Usage: node test-libraries.mjs [library]
 * 
 * Available libraries:
 * - custom (default)
 * - heroicons
 * - lucide
 * - hybrid
 */

import { 
  createCustomIconsConfig,
  createHeroiconsConfig, 
  createLucideConfig,
  createHybridIconsConfig,
  grundtoneIcons,
  iconMappings,
  mapIconName
} from './dist/index.js';

const library = process.argv[2] || 'custom';

console.log(`🧪 Testing ${library.toUpperCase()} library configuration\n`);

switch(library) {
  case 'custom':
    testCustomIcons();
    break;
  case 'heroicons':
    testHeroicons();
    break;
  case 'lucide':
    testLucide();
    break;
  case 'hybrid':
    testHybrid();
    break;
  case 'mappings':
    testMappings();
    break;
  default:
    console.log('❌ Unknown library. Available: custom, heroicons, lucide, hybrid, mappings');
    process.exit(1);
}

function testCustomIcons() {
  console.log('📦 Custom Icons Configuration');
  
  const config = createCustomIconsConfig(grundtoneIcons, {
    prefix: 'my-icon',
    includeBuiltIn: true
  });
  
  console.log('✅ Configuration:', JSON.stringify(config, null, 2));
  console.log('✅ Available icons:', Object.keys(grundtoneIcons));
  console.log('✅ Bundle size: Minimal (only icons you use)');
  console.log('✅ Dependencies: None required');
  
  console.log('\n📝 Usage example:');
  console.log(`
<template>
  <IconProvider :config="customConfig">
    <Icon name="sun" :size="24" />
    <Icon name="moon" :size="24" />
  </IconProvider>
</template>

<script setup>
import { IconProvider, Icon, createCustomIconsConfig, grundtoneIcons } from '@grundtone/vue';
import MyCustomIcon from './MyCustomIcon.vue';

const customConfig = createCustomIconsConfig({
  ...grundtoneIcons,
  'my-custom': MyCustomIcon,
});
</script>`);
}

function testHeroicons() {
  console.log('🦸 Heroicons Configuration');
  
  const config = createHeroiconsConfig({
    variant: 'outline',
    prefix: 'hero'
  });
  
  console.log('✅ Configuration:', JSON.stringify(config, null, 2));
  console.log('✅ Variants: outline, solid, mini');
  console.log('✅ Bundle size: Tree-shakeable');
  console.log('⚠️  Dependencies: npm install @heroicons/vue');
  
  console.log('\n📦 Install command:');
  console.log('pnpm add @heroicons/vue');
  
  console.log('\n📝 Usage example:');
  console.log(`
<template>
  <IconProvider library="heroicons">
    <Icon name="academic-cap" :size="24" />
    <Icon name="adjustments-horizontal" :size="24" />
    <Icon name="arrow-down" :size="24" />
  </IconProvider>
</template>

<script setup>
import { IconProvider, Icon } from '@grundtone/vue';
</script>`);

  console.log('\n🔗 Popular icons:');
  console.log('- academic-cap, adjustments-horizontal, arrow-down');
  console.log('- chevron-up, chevron-down, chevron-left, chevron-right');
  console.log('- home, user, cog, magnifying-glass, x-mark');
}

function testLucide() {
  console.log('✨ Lucide Configuration');
  
  const config = createLucideConfig({
    strokeWidth: 2,
    prefix: 'lucide'
  });
  
  console.log('✅ Configuration:', JSON.stringify(config, null, 2));
  console.log('✅ Style: Consistent stroke-based icons');
  console.log('✅ Bundle size: Tree-shakeable');
  console.log('⚠️  Dependencies: npm install lucide-vue-next');
  
  console.log('\n📦 Install command:');
  console.log('pnpm add lucide-vue-next');
  
  console.log('\n📝 Usage example:');
  console.log(`
<template>
  <IconProvider library="lucide">
    <Icon name="Activity" :size="24" />
    <Icon name="AlertCircle" :size="24" />
    <Icon name="ArrowDown" :size="24" />
  </IconProvider>
</template>

<script setup>
import { IconProvider, Icon } from '@grundtone/vue';
</script>`);

  console.log('\n🔗 Popular icons:');
  console.log('- Activity, AlertCircle, ArrowDown, ChevronUp');
  console.log('- Home, User, Settings, Search, X');
  console.log('- Note: Lucide uses PascalCase naming');
}

function testHybrid() {
  console.log('🔀 Hybrid Configuration');
  
  const config = createHybridIconsConfig({
    primary: 'heroicons',
    fallbackIcons: {
      'custom-logo': 'MyLogoComponent',
      ...grundtoneIcons
    }
  });
  
  console.log('✅ Configuration:', JSON.stringify(config, null, 2));
  console.log('✅ Best of both worlds: External library + custom fallbacks');
  console.log('✅ Gradual migration: Start with custom, add external later');
  
  console.log('\n📝 Usage example:');
  console.log(`
<template>
  <IconProvider :config="hybridConfig">
    <!-- Uses Heroicons -->
    <Icon name="chevron-up" :size="24" />
    
    <!-- Falls back to custom -->
    <Icon name="sun" :size="24" />
    <Icon name="custom-logo" :size="24" />
  </IconProvider>
</template>

<script setup>
import { IconProvider, Icon, createHybridIconsConfig, grundtoneIcons } from '@grundtone/vue';
import CustomLogo from './CustomLogo.vue';

const hybridConfig = createHybridIconsConfig({
  primary: 'heroicons',
  fallbackIcons: {
    ...grundtoneIcons,
    'custom-logo': CustomLogo,
  },
});
</script>`);
}

function testMappings() {
  console.log('🗺️  Icon Name Mappings');
  
  console.log('✅ Convert between library naming conventions:');
  
  const heroToLucide = [
    'chevron-up',
    'chevron-down', 
    'x-mark',
    'magnifying-glass'
  ];
  
  console.log('\n📝 Heroicons → Lucide:');
  heroToLucide.forEach(name => {
    const mapped = mapIconName(name, 'heroicons', 'lucide');
    console.log(`  ${name} → ${mapped}`);
  });
  
  const lucideToHero = [
    'ChevronUp',
    'X',
    'Search',
    'Settings'
  ];
  
  console.log('\n📝 Lucide → Heroicons:');
  lucideToHero.forEach(name => {
    const mapped = mapIconName(name, 'lucide', 'heroicons');
    console.log(`  ${name} → ${mapped}`);
  });
  
  console.log('\n📝 Usage example:');
  console.log(`
// Convert icon names when switching libraries
const heroIconName = 'chevron-up';
const lucideIconName = mapIconName(heroIconName, 'heroicons', 'lucide');
console.log(lucideIconName); // 'ChevronUp'
`);
  
  console.log('\n🗺️  Available mappings:');
  console.log('Common icons:', Object.keys(iconMappings.common));
}