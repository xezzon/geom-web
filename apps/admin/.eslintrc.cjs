const { resolve } = require('path');

/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,
  extends: ['geom'],
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      packageDir: [__dirname, resolve(__dirname, '../../')],
    }],
  },
}
