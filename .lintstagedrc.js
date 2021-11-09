module.exports = {
  '*.js': ['yarn eslint', 'prettier --write'],
  '*.{ts,tsx}': ['yarn eslint', 'prettier --parser typescript --write'],
  '*.scss': ['prettier --parser scss --write'],
  '*.graphql': ['prettier --parser graphql --write'],
  '**/package.json': ['prettier-package-json --write'],
  '*.json': ['prettier --parser json --write'],
};
