module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    project: '../tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
  ignorePatterns: ['.eslintrc.js'],
};
