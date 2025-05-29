module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020, // or higher if your Node.js version supports it
    sourceType: 'module',
  },
  rules: {
    // Add any specific rules or overrides here
    // Example:
    // '@typescript-eslint/no-explicit-any': 'warn',
    'indent': ['error', 2], // Enforce 2-space indentation
    'quotes': ['error', 'single'], // Enforce single quotes
    'semi': ['error', 'always'], // Enforce semicolons
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
  },
};
