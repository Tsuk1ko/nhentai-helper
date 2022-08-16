/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.node.json'],
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    yoda: 'off',
    'no-empty-pattern': 'off',
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '$',
            group: 'builtin',
          },
        ],
      },
    ],
    'import/no-unresolved': ['error', { ignore: ['\\$'] }],
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/promise-function-async': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
