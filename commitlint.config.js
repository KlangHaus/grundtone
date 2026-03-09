export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Test changes
        'build',    // Build system changes
        'ci',       // CI configuration changes
        'chore',    // Maintenance tasks
        'revert',   // Revert previous commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'vue',          // @grundtone/vue package
        'core',         // @grundtone/core package
        'utils',        // @grundtone/utils package
        'design-system', // @grundtone/design-system package
        'react-native', // @grundtone/react-native package
        'nuxt',         // @grundtone/nuxt package
        'deps',         // Dependencies
        'config',       // Configuration files
        'ci',           // CI/CD
        'docs',         // Documentation
        'release',      // Release related
      ],
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 300],
  },
};