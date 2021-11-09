module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/recommended'],
  rules: {
    'no-unused-vars': 'error',
    '@next/next/no-html-link-for-pages': [
      'error',
      './packages/week-one/pages/',
    ],
  },
};
