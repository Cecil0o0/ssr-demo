module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-import')({
      addModulesDirectories: ['src/assets'],
      skipDuplicates: true,
      plugins: [
        require('stylelint')()
      ]
    }),
    require('autoprefixer')()
  ]
}
