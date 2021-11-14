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
    ecmaVersion: 2018,
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
    'no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
