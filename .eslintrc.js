module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    webextensions: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-google',
    'plugin:react/recommended',
    'prettier',
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['/src/icon/*'],
  rules: {
    'no-console': 'warn',
    'require-jsdoc': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
