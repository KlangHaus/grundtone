#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, 'packages');
const packages = fs.readdirSync(packagesDir);

const allDeps = new Map();
const allDevDeps = new Map();

console.log('📦 Analyzing package dependencies across Haspen UI monorepo\n');

packages.forEach(pkg => {
  const packageJsonPath = path.join(packagesDir, pkg, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const packageName = packageJson.name || pkg;
    
    console.log(`\n=== ${packageName} ===`);
    
    // Analyze dependencies
    if (packageJson.dependencies) {
      console.log('Dependencies:');
      Object.entries(packageJson.dependencies).forEach(([name, version]) => {
        console.log(`  ${name}: ${version}`);
        
        if (!allDeps.has(name)) {
          allDeps.set(name, new Map());
        }
        allDeps.get(name).set(packageName, version);
      });
    }
    
    // Analyze devDependencies
    if (packageJson.devDependencies) {
      console.log('DevDependencies:');
      Object.entries(packageJson.devDependencies).forEach(([name, version]) => {
        console.log(`  ${name}: ${version}`);
        
        if (!allDevDeps.has(name)) {
          allDevDeps.set(name, new Map());
        }
        allDevDeps.get(name).set(packageName, version);
      });
    }
  }
});

console.log('\n\n🔍 DEPENDENCY VERSION CONFLICTS:\n');

// Check for version conflicts in regular dependencies
const conflictDeps = [];
allDeps.forEach((versions, depName) => {
  const uniqueVersions = new Set(versions.values());
  if (uniqueVersions.size > 1 && !depName.startsWith('@haspen/')) {
    console.log(`❌ ${depName}:`);
    versions.forEach((version, pkg) => {
      console.log(`  ${pkg}: ${version}`);
    });
    console.log('');
    conflictDeps.push(depName);
  }
});

// Check for version conflicts in devDependencies
const conflictDevDeps = [];
allDevDeps.forEach((versions, depName) => {
  const uniqueVersions = new Set(versions.values());
  if (uniqueVersions.size > 1) {
    console.log(`⚠️  DEV: ${depName}:`);
    versions.forEach((version, pkg) => {
      console.log(`  ${pkg}: ${version}`);
    });
    console.log('');
    conflictDevDeps.push(depName);
  }
});

console.log('\n📊 SUMMARY:');
console.log(`Total packages analyzed: ${packages.length}`);
console.log(`Regular dependency conflicts: ${conflictDeps.length}`);
console.log(`Dev dependency conflicts: ${conflictDevDeps.length}`);

if (conflictDeps.length === 0 && conflictDevDeps.length === 0) {
  console.log('✅ No dependency version conflicts found!');
} else {
  console.log('\n🔧 RECOMMENDED ACTIONS:');
  
  if (conflictDeps.length > 0) {
    console.log('1. Align regular dependency versions:');
    conflictDeps.forEach(dep => {
      console.log(`   - Standardize ${dep} version across all packages`);
    });
  }
  
  if (conflictDevDeps.length > 0) {
    console.log('2. Align dev dependency versions:');
    conflictDevDeps.forEach(dep => {
      console.log(`   - Standardize ${dep} version across all packages`);
    });
  }
  
  console.log('3. Consider using root-level devDependencies for shared tools');
  console.log('4. Update pnpm-lock.yaml after alignment');
}