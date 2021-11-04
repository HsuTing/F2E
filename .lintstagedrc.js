module.exports = {
  '*.js': ['yarn eslint', 'prettier --write'],
  '*.scss': ['prettier --parser scss --write'],
  '**/package.json': ['prettier-package-json --write'],
};
