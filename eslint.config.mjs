import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-control-regex': 0,
      semi: ['error', 'always'],
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
