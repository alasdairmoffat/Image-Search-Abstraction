module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    // disable rule for redux toolkit state
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
};
