module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    // 关闭console.log报错
    'no-console': 'off',
    'prefer-const': 'off',
    'no-unused-vars': 'off',
    'no-unused-components': 'off',
    'prettier/prettier': [
      'warn'
    ]
  }
}
