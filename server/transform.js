const signale = require('signale')
const fs = require('fs')
require("babel-core").transformFile(`${__dirname}/./index.js`, {}, (err, result) => {
  if (err) return console.log(err)
  const { code } = result
  const filepath = `${__dirname}/es5-index.js`
  // 查看文件是否存在
  const Stats = fs.statSync(filepath)
  if (Stats.isFile()) {
    fs.unlinkSync(filepath)
    signale.success(`${filepath}删除成功`)
  }
  // 写文件
  signale.info(`正在写入文件...`)
  const ws = fs.createWriteStream(filepath, {
    encoding: 'utf8',
    flags: 'w'
  })
  ws.write(`require('babel-polyfill')\r\n`)
  ws.end(code)
  ws.on('close', () => {
    signale.success(`${filepath}文件写入完成`)
  })
})
