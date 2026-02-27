// Quick test script to verify exports work
import { 
  Icon, 
  IconProvider, 
  grundtoneIcons,
  createCustomIconsConfig,
  useIconConfig,
  SunIcon,
  MoonIcon 
} from './dist/index.js';

console.log('✅ All imports successful!');
console.log('Icon:', typeof Icon);
console.log('IconProvider:', typeof IconProvider);
console.log('grundtoneIcons:', Object.keys(grundtoneIcons));
console.log('createCustomIconsConfig:', typeof createCustomIconsConfig);
console.log('useIconConfig:', typeof useIconConfig);
console.log('SunIcon:', typeof SunIcon);
console.log('MoonIcon:', typeof MoonIcon);