module.exports = {
  env: {
    browser: true,
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    curly: 'off',
    camelcase: 'off',
    'no-case-declarations': 'off',
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': 'off',
    yoda: 'off',
    'no-extend-native': 'off',
    'lines-between-class-members': 'off',
    'no-template-curly-in-string': 'off',
    'no-new': 'off',
  },
  globals: {
    $: 'readonly',
    Comlink: 'readonly',
    MD5: 'readonly',
    Noty: 'readonly',
    Vue: 'readonly',
    saveAs: 'readonly',
    localforage: 'readonly',
    unsafeWindow: 'readonly',
    GM_addStyle: 'readonly',
    GM_getValue: 'readonly',
    GM_setValue: 'readonly',
    GM_deleteValue: 'readonly',
    GM_registerMenuCommand: 'readonly',
    GM_xmlhttpRequest: 'readonly',
    GM_getResourceText: 'readonly',
  },
  overrides: [
    {
      files: ['*.worker.js'],
      env: {
        worker: true,
      },
      globals: {
        JSZip: 'readonly',
      },
    },
  ],
};
