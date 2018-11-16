// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // add your custom rules here
  rules: {
    indent: ['error', 2, { MemberExpression: 0 }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'arrow-parens': 'off',
    'no-return-assign': 'off',
    'no-plusplus': 'off',
    'no-confusing-arrow': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'lines-between-class-members': 'off',
    'import/no-unresolved': 'off',
    'no-bitwise': ['error', { 'int32Hint': true }],
  },
};
