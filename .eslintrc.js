module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/recommended'],
  rules: {
    '@next/next/no-html-link-for-pages': [
      'error',
      './packages/week-one/pages/',
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-unused-vars': 'error',
      },
    },
  ],
};
