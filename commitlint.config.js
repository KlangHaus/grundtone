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
        'ui',           // @ipeeon/ui package
        'core',         // @ipeeon/core package
        'shared',       // @ipeeon/shared package
        'composables',  // @ipeeon/composables package
        'design-tokens',// @ipeeon/design-tokens package
        'nuxt',         // @ipeeon/nuxt package
        'storybook',    // Storybook configuration
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