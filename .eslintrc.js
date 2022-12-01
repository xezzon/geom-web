module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': [0, { ignore: '@/' }],
    'import/prefer-default-export': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-undef': 0,
    'no-use-before-define': 0,
    'react/display-name': 0,
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unstable-nested-components': 0,
    'react/prop-types': 0,
    semi: 0,
    'react/jsx-no-useless-fragment': 0,
    'max-classes-per-file': 0,
  },
}
