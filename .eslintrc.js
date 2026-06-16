module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['dist', 'coverage', 'example', 'jest.config.js', 'node_modules'],
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'prefer-const': 'warn'
  }
};
