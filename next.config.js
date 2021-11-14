const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
