import config from '@tsuk1ko/eslint-config';

export default config({
  vue: {
    overrides: {
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: ['/^el-/'],
        },
      ],
    },
  },
});
