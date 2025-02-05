module.exports = {
  extends: ['next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'quotes': ['warn', 'single'],
    // Temporarily disable quote warnings during development if needed
    // 'quotes': 'off'
  }
} 