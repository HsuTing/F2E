module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    'no-unused-vars': 'error',
    '@next/next/no-html-link-for-pages': [
      'error',
      './packages/week-one/pages/',
    ],
  },
};
