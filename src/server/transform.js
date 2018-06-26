const fs = require('fs')
require("babel-core").transformFile(__dirname + '/./index.js', {}, (err, result) => {
  if (err) return console.log(err)
  const { code } = result
  const ws = fs.createWriteStream(__dirname + '/./es5-index.js', {
    encoding: 'utf8',
    flags: 'w'
  })
  ws.write(`require('babel-polyfill')`)
  ws.write(code)
})
