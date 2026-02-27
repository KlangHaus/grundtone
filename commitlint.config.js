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
        'ui',           // @grundtone/ui package
        'core',         // @grundtone/core package
        'shared',       // @grundtone/shared package
        'composables',  // @grundtone/composables package
        'design-tokens',// @grundtone/design-tokens package
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