// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: 'vue',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // required to lint *.vue files
  plugins: [
    'vue',
    'html'
  ],
  extends: [
    'eslint:recommended'
  ],
  globals: {
    echarts: true
  },
  // add your custom rules here
  rules: {
    'space-before-function-paren': 0
  }
}
